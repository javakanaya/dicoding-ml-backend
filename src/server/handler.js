const getHistories = require("../services/getHistories");
const predictBinaryClassification = require("../services/inferenceService");
const storeData = require("../services/storeData");
const crypto = require("crypto");

async function postPredictHandler(request, h) {
	try {
		const { image } = request.payload;
		const { model } = request.server.app;

		const { isBadRequest, label, suggestion } = await predictBinaryClassification(model, image);
		const id = crypto.randomUUID();
		const createdAt = new Date().toISOString();

		const data = {
			id: id,
			result: label,
			suggestion: suggestion,
			createdAt: createdAt,
		};

		await storeData(id, data);

		const response = h.response({
			status: "success",
			message: !isBadRequest
				? "Model is predicted successfully"
				: "Model is predicted successfully but under threshold. Please use the correct picture",
			data,
		});
		response.code(201);
		return response;
	} catch (error) {
		return h.response({ status: "fail", message: error.message }).code(400);
	}
}

async function getPredictionHistories(request, h) {
	try {
		const histories = await getHistories();

		return h
			.response({
				status: "success",
				data: histories,
			})
			.code(200);
	} catch (error) {
		return h
			.response({
				status: "fail",
				message: "Failed to fetch prediction histories",
			})
			.code(500);
	}
}
module.exports = { postPredictHandler, getPredictionHistories };
