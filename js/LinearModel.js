import * as tf from '@tensorflow/tfjs';

class LinearModel {
  async trainModel(xs, ys) {
    const layers = tf.layers.dense({
      units: 1, // Dimensionality of the output space
      inputShape: [1], // Only one param
    });
    const lossAndOptimizer = {
      loss: 'meanSquaredError',
      optimizer: 'sgd', // Stochastic gradient descent
    };

    this.linearModel = tf.sequential();
    this.linearModel.add(layers); // Add the layer
    this.linearModel.compile(lossAndOptimizer);

    // Start the model training!
    await this.linearModel.fit(tf.tensor1d(xs), tf.tensor1d(ys));
  }
}

export default LinearModel;
