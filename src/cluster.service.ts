import { Injectable } from '@nestjs/common';
import { availableParallelism } from 'node:os';
const process = require('node:process');
const cluster = require('node:cluster');
const numCPUs = availableParallelism();

@Injectable()
export class ClusterService {
  static start(callback: Function): void {
    if (cluster.isPrimary) {
      console.log(`MASTER SERVER (${process.pid}) IS RUNNING `);
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} died`);
      });
    } else {
      callback();
    }
  }
}
