const predictClassification = require("../services/inferenceService");
const crypto = require("crypto");

async function postPredictHandler(request, h) {
	const { image } = request.payload;
	const { model } = request.server.app;

	const { isBadRequest, label, suggestion } = await predictClassification(model, image);
	const id = crypto.randomUUID();
	const createdAt = new Date().toISOString();

	const data = {
		id: id,
		result: label,
		suggestion: suggestion,
		createdAt: createdAt,
	};

	const response = h.response({
		status: "success",
		message: !isBadRequest
			? "Model is predicted successfully"
			: "Model is predicted successfully but under threshold. Please use the correct picture",
		data,
	});
	response.code(201);
	return response;
}

module.exports = postPredictHandler;
