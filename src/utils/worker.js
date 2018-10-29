async function start() {
  console.log('start');
}

async function run({ tf, yolo, model, webcam }) {
  console.log('run');
  console.log({ tf, model, yolo, webcam });
  const parseModel = JSON.parse(model);
  console.log(eval(yolo));
  const parseYolo = eval(yolo);
  setInterval(async function() {
    self.postMessage({ type: 'clearRects' });
    const inputImage = webcam.capture();
    const t0 = performance.now();
    const boxes = await parseYolo(inputImage, parseModel);
    const t1 = performance.now();
    console.log(`YOLO inference took ${t1 - t0} milliseconds.`);
    boxes.forEach(box => {
      const { top, left, bottom, right, classProb, className } = box;
      self.postMessage({
        type: 'drawRect',
        body: {
          x: left,
          y: top,
          w: right - left,
          h: bottom - top,
          text: `${className}: ${Math.round(classProb * 100)}%`,
        },
      });
    });
    await tf.nextFrame();
  }, 1000 * 100000);
}

function router({ data }) {
  console.log(data);
  const { type, body } = data;
  const parseBody = JSON.parse(body);
  console.log(parseBody);
  switch (type) {
    case 'start':
      start(parseBody);
      break;
    case 'run':
      run(parseBody);
      break;
    default:
      console.log('default');
  }
}

self.addEventListener('message', router);
