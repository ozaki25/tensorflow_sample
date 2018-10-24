import LinearModel from './LinearModel';

const main = async () => {
  const model = new LinearModel();

  // xs and ys -> array of numbers (x-axis and y-axis)
  await model.trainModel([1], [1]);
};

main();
