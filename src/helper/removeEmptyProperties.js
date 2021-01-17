const omitEmpty = require("omit-empty");

module.exports = function () {
	return function (req, res, next) {
		req.params = omitEmpty(req.params);
		next();
	};
};
