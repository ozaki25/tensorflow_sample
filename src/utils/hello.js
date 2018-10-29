import * as tf from '@tensorflow/tfjs';
import yolo, { downloadModel } from 'tfjs-yolo-tiny';
import { Webcam } from '../libs/webcam';

let model;
const webcam = new Webcam(document.getElementById('webcam'));
const webcamElem = document.getElementById('webcam-wrapper');

(async function main() {
  try {
    model = await downloadModel();
    alert('モデルの読み込みが完了しました');
    await webcam.setup();
    doneLoading();
    run();
  } catch (e) {
    console.error(e);
    showError();
  }
})();

async function run() {
  setInterval(async () => {
    clearRects();
    const inputImage = webcam.capture();
    const t0 = performance.now();
    const boxes = await yolo(inputImage, model);
    const t1 = performance.now();
    console.log(`YOLO inference took ${t1 - t0} milliseconds.`);
    boxes.forEach(box => {
      const { top, left, bottom, right, classProb, className } = box;
      drawRect(
        left,
        top,
        right - left,
        bottom - top,
        `${className}: ${Math.round(classProb * 100)}%`,
      );
    });
    await tf.nextFrame();
  }, 1000);
}

function drawRect(x, y, w, h, text = '', color = 'red') {
  console.log('rect', { x, y, w, h, text, color });
  const rect = document.createElement('div');
  const label = document.createElement('div');
  rect.classList.add('rect');
  rect.style.cssText = `top: ${y}; left: ${x}; width: ${w}; height: ${h}; border-color: ${color}`;
  label.classList.add('label');
  label.innerText = text;
  rect.appendChild(label);
  webcamElem.appendChild(rect);
}

function clearRects() {
  const rects = document.getElementsByClassName('rect');
  while (rects[0]) {
    rects[0].parentNode.removeChild(rects[0]);
  }
}

function doneLoading() {
  const webcam = document.getElementById('webcam-wrapper');
  webcam.style.display = 'flex';
}

function showError() {
  alert('loading error');
  doneLoading();
}
