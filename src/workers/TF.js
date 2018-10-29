import * as Comlink from 'comlinkjs';

async function TF(cb) {
  return await cb();
}

Comlink.expose(TF, self);
