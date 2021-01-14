const getRepoLanguages = require("./../helper/getRepoLanguages");
const getImageBuffer = require("./../helper/getImageBuffer");

module.exports = async function (req, res) {
	const { owner, repo } = req.params;
	const repoLanguages = await getRepoLanguages(owner, repo);

	if (Object.keys(repoLanguages).length === 0) {
		res.writeHead(404).end("Not found");
		return;
	}

	getImageBuffer(repoLanguages);
	res.send("test");
};
