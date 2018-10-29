import * as Comlink from 'comlinkjs';

async function WorkerFunc(cb) {
  return await cb();
}

Comlink.expose(WorkerFunc, self);
