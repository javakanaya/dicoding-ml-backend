const tf = require("@tensorflow/tfjs-node");
async function preprocessImage(image) {
	// Decode the JPEG image to a tensor
	const tensor = tf.node.decodeImage(image, 3); // Ensure 3 channels

	// Resize the image to 224x224
	const resizedTensor = tf.image.resizeBilinear(tensor, [224, 224]);

	// Normalize the pixel values to the range [0, 1]
	const normalizedTensor = resizedTensor.div(255.0);

	// Add a batch dimension
	const batchedTensor = normalizedTensor.expandDims(0);

	return batchedTensor;
}

async function predictBinaryClassification(model, image) {
	// Decode the JPEG image to a tensor
	const tensor = tf.node
		.decodeImage(image, 3)
		.resizeNearestNeighbor([224, 224])
		.expandDims()
		.toFloat();

	// Perform the prediction
	const prediction = model.predict(tensor);
	const score = await prediction.data(); // Get the prediction score

	// Convert the score to a percentage
	const finalScore = Math.max(...score) * 100;

	let label, isBadRequest;
	if (finalScore > 99) {
		label = "Cancer";
		isBadRequest = false;
	} else if (finalScore < 1) {
		label = "Non-cancer";
		isBadRequest = false;
	} else {
		label = finalScore > 50 ? "Cancer" : "Non-cancer";
		isBadRequest = true;
	}

	// Provide explanation and suggestion based on the predicted class
	let suggestion;
	if (label === "Cancer") {
		suggestion =
			"Segera konsultasi dengan dokter spesialis untuk pemeriksaan lebih lanjut dan pengobatan.";
	} else {
		suggestion =
			"Tetap pantau kesehatan kulit secara berkala dan konsultasikan dengan dokter jika ada perubahan yang mencurigakan.";
	}

	// Return the results
	return { isBadRequest, label, suggestion };
}

module.exports = predictBinaryClassification;
