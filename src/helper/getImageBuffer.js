const sharp = require("sharp");

module.exports = function (repoLanguages) {
	const total = Object.values(repoLanguages).reduce(
		(total, current) => total + current,
		0,
	);

	let totalPercentRate = 0;
	const languagesArray = Object.keys(repoLanguages).map(
		(languageName, index, array) => {
			const percentRate = Math.round(
				(Object.values(repoLanguages)[index] / total) * 100,
			);

			const langObject = {
				name: languageName,
				percentRate:
					index === array.length - 1 ? 100 - totalPercentRate : percentRate,
			};

			totalPercentRate += percentRate;

			return langObject;
		},
	);

	const defaultValues = {
		width: 56,
		rect1Width: 47.578,
		rect2Width: 54.152,
		rect3Width: 13.84,
	};

	const compileOptions = {
		width: 0,
	};
};
