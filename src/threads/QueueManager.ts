/**
 /Author: Revelation A.F
 /Git: nusktec
 **/
import { Queue, Worker, Job } from 'bullmq';
import RedisClient from '../config/database-redis';
import handlers from '../handlers'; // dynamic import of all handlers

// 👇 Get the types of the handlers
type HandlerMap = typeof handlers;
type ActionType = keyof HandlerMap;

// 👇 Define the queue job payload structure
type QueueJob<T = any> = {
    action: ActionType;
    data: T;
};

const queueName = 'mainQueue';

const queue = new Queue<QueueJob>(queueName, {
    connection: RedisClient.getConnectionOptions(),
    defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: false,
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 5000,
        },
    },
});

export const addToQueue = async <K extends ActionType>(
    action: K,
    data: Parameters<HandlerMap[K]>[0] // auto-detect parameter type from handler
): Promise<void> => {
    if (!queue) throw new Error('Queue not initialized');
    await queue.add(action, { action, data });
};

// 👇 Queue processor function
export const processQueue = (): void => {
    const worker = new Worker<QueueJob>(
        queueName,
        async (job: Job<QueueJob>) => {
            const { action, data } = job.data;
            const handler = handlers[action];
            if (!handler) throw new Error(`❌ No handler for action: ${action}`);
            await handler(data); // Type-safe handler call
        },
        {
            connection: RedisClient.getConnectionOptions(),
            concurrency: 1, // ensures FIFO
        }
    );

    worker.on('completed', (job) => {
        console.log(`✅ [${job.name}] Job ${job.id} completed`);
    });

    worker.on('failed', (job, err) => {
        console.error(`❌ [${job?.name}] Job ${job?.id} failed:`, err);
    });
};
