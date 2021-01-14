const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");
const Handlebars = require("handlebars");
const colors = require("./../resource/colors");

module.exports = async function (repoLanguages) {
	const total = Object.values(repoLanguages).reduce(
		(total, current) => total + current,
		0,
	);

	let totalPercentRate = 0;
	let languagesArray = Object.keys(repoLanguages).map(
		(languageName, index, array) => {
			const percentRate = Number(
				((Object.values(repoLanguages)[index] / total) * 100).toFixed(2),
			);

			const langObject = {
				name: languageName,
				percentRate,
			};

			totalPercentRate += percentRate;
			return langObject;
		},
	);

	const langCount = languagesArray.length;

	const positionDefaultValues = {
		width: 90,
		rect1X: 3.892,
		rect2X: 43.684,
		rect2Height: 54.152,
		rect3X: 13.84,
		text1X: 250.002,
		text2X: 228,
	};

	let totalWidth =
		positionDefaultValues.width * langCount + (100 - 90) * (langCount - 1);
	let totalPosition = {
		...positionDefaultValues,
	};

	languagesArray = languagesArray.map((element, index) => {
		const { name, percentRate } = element;
		let paddingXValue = index === 0 ? 15 : 100;
		let text1PaddingXValue = index === 0 ? 20 : 141;
		let text2PaddingXValue = index === 0 ? 20 : 145.5;

		const badgeValue = {
			rect1X: totalPosition.rect1X + paddingXValue,
			rect2X: totalPosition.rect2X + paddingXValue,
			rect2Height: (percentRate * totalPosition.rect2Height) / 100,
			rect3X: totalPosition.rect3X + paddingXValue,
			text1X: totalPosition.text1X + text1PaddingXValue,
			text2X: totalPosition.text2X + text2PaddingXValue,
			name,
			percentRate,
			color: colors[name],
		};

		totalPosition = {
			...badgeValue,
			rect2Height: positionDefaultValues.rect2Height,
		};

		return badgeValue;
	});

	const compileContext = {
		width: totalWidth,
		languages: languagesArray,
	};
	const filePath = path.join(__dirname, "/../resource/pin.svg");

	try {
		const imageBuffer = await fs.readFile(filePath, { encoding: "utf-8" });
		const svgTemplate = Handlebars.compile(imageBuffer);
		const compiledSvg = svgTemplate(compileContext);

		const pngImageBuffer = await sharp(Buffer.from(compiledSvg))
			.png()
			.toFormat("png")
			.toBuffer();

		return pngImageBuffer;
	} catch (error) {
		console.log(error);
		return false;
	}
};
