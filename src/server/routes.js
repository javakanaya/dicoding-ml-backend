const { postPredictHandler, getPredictionHistories } = require("../server/handler");

const routes = [
	{
		path: "/predict",
		method: "POST",
		handler: postPredictHandler,
		options: {
			payload: {
				allow: "multipart/form-data",
				multipart: true,
				maxBytes: 1 * 1000 * 1000, // Set max payload size to 1 MB
			},
		},
	},
	{
		path: "/predict/histories",
		method: "GET",
		handler: getPredictionHistories,
	},
];

module.exports = routes;
