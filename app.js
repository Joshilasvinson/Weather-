let model;

// Load the TensorFlow.js model
async function loadModel() {
  model = await tf.loadLayersModel('model/model.json');
  console.log('Model loaded');
}

// Set up the canvas and drawing logic
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 15;
ctx.lineCap = 'round';
ctx.strokeStyle = '#000';

let drawing = false;

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
  if (drawing) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
  predictDigit();
});

canvas.addEventListener('mouseleave', () => {
  drawing = false;
});

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById('prediction').textContent = '?';
}

// Prepare image for prediction
function prepareImage() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  const grayScale = [];

  for (let i = 0; i < pixels.length; i += 4) {
    // Convert to grayscale
    grayScale.push(255 - pixels[i] / 255);
  }

  return tf.tensor(grayScale, [28, 28, 1]).reshape([1, 28, 28, 1]);
}

// Predict the digit drawn on the canvas
async function predictDigit() {
  const tensor = prepareImage();
  const prediction = model.predict(tensor);
  const predictedValue = prediction.argMax(-1).dataSync()[0];

  // Display the prediction
  document.getElementById('prediction').textContent = predictedValue;
}

// Load the model when the page loads
window.onload = loadModel;
