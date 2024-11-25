import * as faceapi from "@vladmandic/face-api";
import * as tf from "@tensorflow/tfjs-node";

const MODEL_PATH = "./public/models";

// Enable production optimizations
tf.enableProdMode();

export async function loadFaceModels() {
  console.log("Loading FaceAPI models...");
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_PATH);
  await faceapi.nets.tinyFaceDetector.loadFromDisk(MODEL_PATH);
  await faceapi.nets.ageGenderNet.loadFromDisk(MODEL_PATH);
  await faceapi.nets.faceExpressionNet.loadFromDisk(MODEL_PATH);
  console.log("Models loaded successfully!");
}

export async function generateTensorFromBuffer(buffer) {
  if (buffer.length === 0) {
    return null;
  }

  const tensor = tf.tidy(() => {
    const decoded = tf.node.decodeImage(buffer, 3);
    let expand;
    if (decoded.shape[2] === 4) {
      const channels = tf.split(decoded, 4, 2);
      const rgb = tf.stack([channels[0], channels[1], channels[2]], 2);
      expand = tf.reshape(rgb, [1, decoded.shape[0], decoded.shape[1], 3]);
    } else {
      expand = tf.expandDims(decoded, 0);
    }
    return tf.cast(expand, "float32");
  });
  return tensor;
}

export async function analyzeFaceImage(tensor) {
  const options = new faceapi.TinyFaceDetectorOptions({
    inputSize: 320,
    scoreThreshold: 0.5,
  });

  const results = await faceapi.detectAllFaces(tensor, options)
    .withAgeAndGender()
    .withFaceExpressions();

  return results.map((result) => ({
    age: result.age.toFixed(1),
    gender: result.gender,
  }));
}
