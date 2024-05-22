const tf = require("@tensorflow/tfjs-node");
const { NIL } = require("uuid");

async function predictBinaryClassification(model, image) {
	try {
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
			isBadRequest = true;
			label = null;
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
	} catch (error) {
		throw new Error("Terjadi kesalahan dalam melakukan prediksi");
	}
}

module.exports = predictBinaryClassification;
