import * as tf from '@tensorflow/tfjs';
import yolo, { downloadModel } from 'tfjs-yolo-tiny';
import * as Comlink from 'comlinkjs';
import { Webcam } from '../libs/webcam';

const webcamElem = document.getElementById('webcam');
const webcamWrapperElem = document.getElementById('webcam-wrapper');

function drawRect({ style, text }) {
  const rect = document.createElement('div');
  const label = document.createElement('div');
  rect.classList.add('rect');
  rect.style.cssText = style;
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

function execYolo(inputImage, model) {
  return async function() {
    const boxes = await yolo(inputImage, model);
    return boxes.map(({ top, left, bottom, right, classProb, className }) => ({
      style: `top: ${top}; left: ${left}; width: ${right - left}; height: ${bottom -
        top}; border-color: red`,
      text: `${className}: ${Math.round(classProb * 100)}%`,
    }));
  };
}

async function main() {
  const Yolo = Comlink.proxy(new Worker('../workers/Yolo.js'));
  const webcam = new Webcam(webcamElem);
  await webcam.setup();
  const model = await downloadModel();
  // alert('モデルの読み込みが完了しました');
  doneLoading();
  setInterval(async () => {
    clearRects();
    const inputImage = webcam.capture();
    const boxes = await Yolo(Comlink.proxyValue(execYolo(inputImage, model)));
    boxes.forEach(drawRect);
    await Yolo(Comlink.proxyValue(tf.nextFrame));
  }, 1000);
}

main();
