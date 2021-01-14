const axios = require("axios");

module.exports = async function (owner, repo) {
	const requestUri = `https://api.github.com/repos/${owner}/${repo}/languages`;

	try {
		const request = await axios.get(requestUri);
		return request.data;
	} catch (error) {
		return {};
	}
};
