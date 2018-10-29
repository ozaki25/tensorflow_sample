import * as tf from '@tensorflow/tfjs';
import yolo, { downloadModel } from 'tfjs-yolo-tiny';
import { Webcam } from '../libs/webcam';

const webcamElem = document.getElementById('webcam');
const webcamWrapperElem = document.getElementById('webcam-wrapper');

function drawRect(x, y, w, h, text = '', color = 'red') {
  console.log('rect', { x, y, w, h, text, color });
  const rect = document.createElement('div');
  const label = document.createElement('div');
  rect.classList.add('rect');
  rect.style.cssText = `top: ${y}; left: ${x}; width: ${w}; height: ${h}; border-color: ${color}`;
  label.classList.add('label');
  label.innerText = text;
  rect.appendChild(label);
  webcamWrapperElem.appendChild(rect);
}

function clearRects() {
  const rects = document.getElementsByClassName('rect');
  while (rects[0]) {
    rects[0].parentNode.removeChild(rects[0]);
  }
}

function doneLoading() {
  webcamWrapperElem.style.display = 'flex';
}

function showError() {
  alert('loading error');
  doneLoading();
}

// worker(webcamElem, drawRect, clearRects, doneLoading).catch(showError);

const worker = new Worker('worker.js');

const main = async () => {
  const webcam = new Webcam(webcamElem);
  const model = await downloadModel();
  alert('モデルの読み込みが完了しました');
  // await webcam.setup();
  doneLoading();
  const body = JSON.stringify({ model, tf, yolo: yolo.toString(), webcam });
  worker.postMessage({ type: 'run', body });
};

function router({ data }) {
  console.log(data);
  const { type, body } = data;
  switch (type) {
    case 'clearRects':
      clearRects();
      break;
    case 'drawRect':
      run(body);
      break;
    default:
      console.log('default');
  }
}

worker.addEventListener('message', router);

main();
