require("dotenv").config();

const Hapi = require("@hapi/hapi");
const routes = require("../server/routes");
const loadModel = require("../services/loadModel");

(async () => {
	const server = Hapi.server({
		port: 3000,
		host: "localhost",
		routes: {
			cors: {
				origin: ["*"],
			},
		},
	});

	const model = await loadModel();
	server.app.model = model;

	server.route(routes);

	server.ext("onPreResponse", function (request, h) {
		const response = request.response;

		// Check if the response is a Boom error
		if (response.isBoom) {
			// Create a new response object with custom error format
			const newResponse = h.response({
				status: "fail",
				message: response.message,
			});

			// Set the HTTP status code as an integer
			newResponse.code(response.output.statusCode);

			// Return the new response
			return newResponse;
		}

		return h.continue;
	});

	await server.start();
	console.log(`Server start at: ${server.info.uri}`);
})();
