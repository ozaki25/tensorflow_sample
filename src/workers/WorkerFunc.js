import * as Comlink from 'comlinkjs';
import yolo from './libs/tfjs-yollo-tyny/src/';

async function WorkerFunc(cb) {
  return await cb();
}

Comlink.expose(WorkerFunc, self);
