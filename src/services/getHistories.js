const { Firestore } = require("@google-cloud/firestore");

async function getHistories() {
	const db = new Firestore({
		projectId: process.env.PROJECT_ID,
	});
	const predictCollection = db.collection("prediction");
	const snapshot = await predictCollection.get();

	const histories = [];
	snapshot.forEach((doc) => {
		const history = doc.data();
		histories.push({
			id: doc.id,
			history: {
				result: history.result,
				createdAt: history.createdAt,
				suggestion: history.suggestion,
				id: doc.id,
			},
		});
	});

    return histories;
}

module.exports = getHistories;
