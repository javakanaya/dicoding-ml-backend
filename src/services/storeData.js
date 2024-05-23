const { Firestore } = require("@google-cloud/firestore");

async function storeData(id, data) {
	const db = new Firestore({
		projectId: process.env.PROJECT_ID,
	});

	const predictCollection = db.collection("predictions");
	return predictCollection.doc(id).set(data);
}

module.exports = storeData;
