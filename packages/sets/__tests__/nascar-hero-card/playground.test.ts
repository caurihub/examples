import "jest-extended";

import Ajv from "ajv";

import * as Data from "../../src";
import { checkJsonEqulity } from "../utils";

describe("Nascar Hero Card Collection Playground", () => {
	const ajv = new Ajv({
		allErrors: true,
	});

	const nascarHeroCardCollectionJson = Data.NascarHeroCard.collection;

	const nascarHeroCardCollection = {
		type: "object",
		additionalProperties: false,
		required: ["ipfsHashImageFront", "issuedDate", "issuedLocation", "signed"],
		properties: {
			ipfsHashImageFront: {
				type: "string",
				maxLength: 120,
				minLength: 1,
			},
			ipfsHashImageBack: {
				type: "string",
				maxLength: 120,
				minLength: 1,
			},
			issuedDate: {
				format: "date",
			},
			issuedLocation: {
				type: "string",
				maxLength: 255,
				minLength: 1,
			},
			signed: {
				type: "boolean",
			},
			tags: {
				type: "array",
				maxItems: 12,
				minItems: 1,
				additionalItems: false,
				uniqueItems: true,
				items: {
					type: "string",
				},
			},
		},
	};

	it("collection should be able to compile", () => {
		const validation = ajv.validateSchema(nascarHeroCardCollection);
		expect(validation).toBeTruthy();
	});

	it("collection should be consistent with json file", () => {
		expect(() =>
			checkJsonEqulity(nascarHeroCardCollectionJson.jsonSchema, nascarHeroCardCollection),
		).not.toThrowError();
	});

	const validate = ajv.compile(nascarHeroCardCollection);

	describe("Asset: hero-card1.json", () => {
		const card1 = {
			ipfsHashImageFront: "QmavUFtLyRbUEEFLrmDTyRY5sLMh8UnQxWEenx2tuvzSE6",
			ipfsHashImageBack: "QmdGCntrw9yabGJAU1nG3H38yQ2GLsphg3jwaxSGbXEj61",
			issuedDate: "2020-09-25",
			issuedLocation: "Mooresville , North Carolina",
			signed: true,
		};

		it("asset 'hero-card1.json' should be consistent with json file", () => {
			expect(() => checkJsonEqulity(Data.NascarHeroCard.assets.card1, card1)).not.toThrowError();
		});

		it("should pass collection schema validation", () => {
			expect(validate(card1)).toBeTruthy();

			console.log(ajv.errorsText(validate.errors));
		});
	});

	describe("Asset: hero-card3.json", () => {
		const card3 = {
			ipfsHashImageFront: "QmaNd3vJ5gorZUTz6iQS9NKLT8QhsGGBrpTACFMePcYisP",
			issuedDate: "2020-09-25",
			issuedLocation: "Mooresville , North Carolina",
			signed: true,
		};

		it("asset 'hero-card3.json' should be consistent with json file", () => {
			expect(() => checkJsonEqulity(Data.NascarHeroCard.assets.card3, card3)).not.toThrowError();
		});

		it("should pass collection schema validation", () => {
			expect(validate(card3)).toBeTruthy();

			console.log(ajv.errorsText(validate.errors));
		});
	});

	describe("Asset: hero-card4.json", () => {
		const card4 = {
			ipfsHashImageFront: "QmVPusRrdWL84ELjWFApp4hvYvFnynFpoRoasfwjrgpo1e",
			issuedDate: "2020-09-25",
			issuedLocation: "Mooresville , North Carolina",
			signed: true,
		};

		it("asset 'hero-card4.json' should be consistent with json file", () => {
			expect(() => checkJsonEqulity(Data.NascarHeroCard.assets.card4, card4)).not.toThrowError();
		});

		it("should pass collection schema validation", () => {
			expect(validate(card4)).toBeTruthy();

			console.log(ajv.errorsText(validate.errors));
		});
	});
});
