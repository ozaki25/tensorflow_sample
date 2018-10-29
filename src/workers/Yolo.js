import * as Comlink from 'comlinkjs';

async function Yolo(cb) {
  return await cb();
}

Comlink.expose(Yolo, self);
