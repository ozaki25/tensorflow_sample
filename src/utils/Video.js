import { Webcam } from '../libs/webcam';

const webcamElem = document.getElementById('webcam');
const webcamWrapperElem = document.getElementById('webcam-wrapper');

export default async function main() {
  const webcam = new Webcam(webcamElem);
  await webcam.setup();
  webcamWrapperElem.style.display = 'flex';
}
