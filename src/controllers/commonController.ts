/**
 Author: Revelation.AF
 Git: nusktec
 **/
import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {HttpStatusCode} from "../interfaces/system";
import {outJson} from "../utils/renders";
import os from 'os';
import {sha1} from "../utils/encryptions";

export const index = async (req: Request, res: Response): Promise<void> => {

    const cpus = os.cpus();
    const loadAverage = os.loadavg(); // 1, 5, and 15-minute averages
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const memoryUsagePercent = ((usedMemory / totalMemory) * 100).toFixed(2);

    const uptime = os.uptime(); // in seconds

    const threadCount = cpus.length;

    function formatBytes(bytes: number): string {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
    }

    function formatUptime(seconds: number): string {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hrs}h ${mins}m ${secs}s`;
    }

    res.status(HttpStatusCode.OK).json(outJson(true, "Server Statistics", {
        cpu: {
            count: cpus.length,
            loadAverage,
            model: cpus[0].model,
        },
        memory: {
            total: formatBytes(totalMemory),
            free: formatBytes(freeMemory),
            used: formatBytes(usedMemory),
            usagePercent: `${memoryUsagePercent}%`,
        },
        uptime: formatUptime(uptime),
        threads: threadCount,
        platform: os.platform(),
        arch: os.arch(),
    }));
};