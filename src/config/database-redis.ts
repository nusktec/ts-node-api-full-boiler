import config from "./config";

/**
 /Author: Revelation A.F
 /Git: nusktec
 **/
import process from "process";
const con = config[process.env.NODE_ENV!];
import { RedisClientType, createClient } from 'redis';

const redisUrl = con.redis_uri;

class RedisClient {
 private static client: RedisClientType | null = null;
 private static isConnected = false;

 static async connect(): Promise<void> {
  if (this.client && this.isConnected) return;

  this.client = createClient({ url: redisUrl });

  this.client.on('error', (err) => {
   this.isConnected = false;
   console.error('❌ Redis error:', err);
  });

  this.client.on('ready', () => {
   this.isConnected = true;
   console.log('✅ Redis client connected and ready');
  });

  await this.client.connect();
 }

 static getClient(): RedisClientType {
  if (!this.client) throw new Error('Redis client not connected');
  return this.client;
 }

 static getConnectionOptions() {
  return { url: redisUrl };
 }

 static isReady(): boolean {
  return this.isConnected;
 }
}

export default RedisClient;

/**
import RedisClient from './config/RedisClient';

await RedisClient.connect();

const redis = RedisClient.getClient();
await redis.set('key', 'value');
const value = await redis.get('key');
 **/