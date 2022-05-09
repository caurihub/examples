import "jest-extended";

import Ajv from "ajv";

import * as Data from "../../src";
import { checkJsonEqulity } from "../utils";

describe("AREX Collection Playground", () => {
	const ajv = new Ajv({
		allErrors: true,
	});

	const arexCollectionJson = Data.AREX.collection;

	const arexCollection = {
		type: "object",
		additionalProperties: false,
		required: ["name", "description", "serialNumber", "caliber", "length", "height", "width", "barrelLength"],
		properties: {
			name: {
				type: "string",
				maxLength: 120,
				minLength: 1,
			},
			description: {
				type: "string",
				maxLength: 3000,
				minLength: 1,
			},
			serialNumber: {
				type: "string",
				maxLength: 40,
				minLength: 1,
			},
			caliber: {
				type: "string",
				maxLength: 40,
				minLength: 1,
			},
			length: {
				type: "string",
				maxLength: 40,
				minLength: 1,
			},
			height: {
				type: "string",
				maxLength: 40,
				minLength: 1,
			},
			width: {
				type: "string",
				maxLength: 40,
				minLength: 1,
			},
			barrelLength: {
				type: "string",
				maxLength: 40,
				minLength: 1,
			},
			weight: {
				type: "string",
				maxLength: 40,
				minLength: 1,
			},
			weightWithMag: {
				type: "string",
				maxLength: 40,
				minLength: 1,
			},
			frameColors: {
				type: "string",
				maxLength: 255,
				minLength: 1,
			},
			slide: {
				type: "string",
				maxLength: 255,
				minLength: 1,
			},
			slights: {
				type: "string",
				maxLength: 255,
				minLength: 1,
			},
			frame: {
				type: "string",
				maxLength: 40,
				minLength: 1,
			},
			firingPinSafety: {
				type: "string",
				maxLength: 40,
				minLength: 1,
			},
			triggerSafety: {
				type: "string",
				maxLength: 40,
				minLength: 1,
			},
			ambidextrousManualSafety: {
				type: "string",
				maxLength: 40,
				minLength: 1,
			},
			ipfsImageHash: {
				type: "string",
				maxLength: 255,
				minLength: 1,
			},
		},
	};

	it("collection should be able to compile", () => {
		const validation = ajv.validateSchema(arexCollection);
		expect(validation).toBeTruthy();
	});

	it("collection should be consistent with json file", () => {
		expect(() => checkJsonEqulity(arexCollectionJson.jsonSchema, arexCollection)).not.toThrowError();
	});

	const validate = ajv.compile(arexCollection);

	describe("Asset: alpha.json", () => {
		const alpha = {
			name: "AREX ALPHA",
			description:
				"THE AREX ALPHA IS THE NEXT EVOLUTIONARY STEP IN THE AREX HANDGUN FAMILY. " +
				"IT IS A DIRECT DESCENDANT OF THE AREX ZERO 1 AND HAS INHERITED ITS TOUGHNESS " +
				"AND RELIABILITY. LISTENING TO THE PRACTICAL SHOOTERS, AREX DESIGNED AND DEVELOPED" +
				" A PISTOL THAT EXCELS IN COMPETITIVE PRACTICAL SHOOTING AS WELL AS IN TACTICAL " +
				"SCENARIOS. WITH THE ELUSIVE AND ALL IMPORTANT SHOOTABILITY BEING AREXS PRIMARY GOAL, " +
				"A STEEL FRAME WAS USED IN PLACE OF AN ALUMINUM ONE. A REENGINEERED GRIP RESULTS IN " +
				"SHORTER TRIGGER REACH AND NOTABLY HIGHER HAND POSITION. AN UNDERCUT TRIGGER GUARD AND" +
				" EXTENDED BEAVERTAIL COMPLETE THE ERGONOMIC TRANSFORMATION. THE LONG SLIDE HOUSES " +
				"A FIVE INCH BARREL, PROVIDING A LONGER LINE OF SIGHT FOR FASTER AND MORE ACCURATE SHOTS. " +
				"THE SLIDE HAS BEEN LIGHTENED SIGNIFICANTLY UTILIZING LIGHTENING CUTS TO ACCOMPLISH FASTER CYCLING.",
			serialNumber: "6789897676898976",
			caliber: "9 x 19 mm",
			length: "226 mm // 8.9 inches",
			height: "155 mm // 6.1 inches",
			width: "42 mm // 1.65 inches",
			barrelLength: "127 mm // 5.0 inches",
			weight: "1202 g // 42.3 oz",
			frameColors: "Nitrocarburized steel // Graphite black color // Blue // Red",
			slide: "Nitrocarburized steel // Graphite black color",
			slights: "Fiber optic front and fully adjustable black rear sight",
			ipfsImageHash: "QmPbvs8G1jVaH6iHBUC2W1YnwY9AhzD98ydVqnhG9KMej1",
		};

		it("asset 'alpha.json' should be consistent with json file", () => {
			expect(() => checkJsonEqulity(Data.AREX.assets.alpha, alpha)).not.toThrowError();
		});

		it("should pass collection schema validation", () => {
			expect(validate(alpha)).toBeTruthy();

			console.log(ajv.errorsText(validate.errors));
		});
	});

	describe("Asset: delta.json", () => {
		const delta = {
			name: "AREX DELTA",
			description:
				"THE AREX DELTA PISTOL DOES NOT CLAIM TO BE A REVOLUTIONARY BREAKTHROUGH " +
				"BUT YOU WILL FIND IT REPRESENTS A DEFINITIVE EVOLUTIONARY STEP IN MODERN " +
				"HANDGUN DESIGN AND MANUFACTURING. WE HAVE ACHIEVED IMPROVEMENTS OVER SOME OF " +
				"THE MOST POPULAR DESIGNS, ILLUMINATING THE WEAKNESSES AND ENHANCING THEIR ADVANTAGES" +
				" BY APPLYING OUR EXPERTISE AND STATE OF THE ART CARDS/CAM PROCESSES. THE RESULT IS " +
				"A BEST IN CLASS DEFENSIVE PISTOL THAT BOTH EXTREME RELIABILITY AND ACCURACY ALONG WITH A COMPETITIVE PRICE",
			serialNumber: "234567098765",
			caliber: "9 x 19 mm",
			length: "180 mm // 7.0 inches",
			height: "128 mm // 5.0 inches",
			width: "30 mm // 1.18 inches",
			barrelLength: "102 mm // 4.0 inches",
			weight: "545 g // 19.2 oz",
			weightWithMag: "628 g // 22.2 oz",
			frame: "Polymer // Black color",
			slide: "Nitrocarburized steel // Graphite black color",
			slights: "Low profile steel sights",
			firingPinSafety: "Standard",
			triggerSafety: "Standard",
			ambidextrousManualSafety: "Optional",
			ipfsImageHash: "QmRxSiJ5mysPFm3nkfxihg5A1LT68P4VfiUCRXZ5RhFFsp",
		};

		it("asset 'delta.json' should be consistent with json file", () => {
			expect(() => checkJsonEqulity(Data.AREX.assets.delta, delta)).not.toThrowError();
		});

		it("should pass collection schema validation", () => {
			expect(validate(delta)).toBeTruthy();

			console.log(ajv.errorsText(validate.errors));
		});
	});

	describe("Asset: zero1CP.json", () => {
		const zero1CP = {
			name: "AREX Zero 1 CP",
			description:
				"THE AREX ZERO 1 CP DOES NOT CLAIM TO BE A REVOLUTIONARY BREAKTHROUGH BUT " +
				"YOU WILL FIND IT REPRESENTS A DEFINITIVE EVOLUTIONARY STEP IN MODERN HANDGUN DESIGN " +
				"AND MANUFACTURING. WE HAVE ACHIEVED IMPROVEMENTS OVER SOME OF THE MOST POPULAR DESIGNS, " +
				"ILLUMINATING THE WEAKNESSES AND ENHANCING THEIR ADVANTAGES BY APPLYING OUR EXPERTISE AND " +
				"STATE OF THE ART CARDS/CAM PROCESSES. THE RESULT IS A BEST IN CLASS DEFENSIVE PISTOL THAT " +
				"BOTH EXTREME RELIABILITY AND ACCURACY ALONG WITH A COMPETITIVE PRICE",
			serialNumber: "73812371283",
			caliber: "9 x 19 mm",
			length: "184 mm // 7.2 inches",
			height: "127 mm // 5.0 inches",
			width: "38 mm // 1.49 inches",
			barrelLength: "98 mm // 3.85 inches",
			weight: "783 g // 27.6 oz",
			ipfsImageHash: "QmTDBUh77ua326uYGqdT2Pu8ew69hMreJYEoPadgyx1uTB",
		};

		it("asset 'zero1CP.json' should be consistent with json file", () => {
			expect(() => checkJsonEqulity(Data.AREX.assets.zero1CP, zero1CP)).not.toThrowError();
		});

		it("should pass collection schema validation", () => {
			expect(validate(zero1CP)).toBeTruthy();

			console.log(ajv.errorsText(validate.errors));
		});
	});

	describe("Asset: zero1S.json", () => {
		const zero1S = {
			name: "AREX Zero 1 S",
			description:
				"THE AREX ZERO 1 PISTOL DOES NOT CLAIM TO BE A REVOLUTIONARY BREAKTHROUGH " +
				"BUT YOU WILL FIND IT REPRESENTS A DEFINITIVE EVOLUTIONARY STEP IN MODERN HANDGUN " +
				"DESIGN AND MANUFACTURING. WE HAVE ACHIEVED IMPROVEMENTS OVER SOME OF THE MOST POPULAR DESIGNS, " +
				"ELIMINATING THEIR WEAKNESSES AND ENHANCING THEIR ADVANTAGES BY APPLYING OUR EXPERTISE AND " +
				"STATE-OF-THE-ART CAD/CAM PROCESSES. THE RESULT IS A BEST-IN-CLASS DEFENSIVE PISTOL THAT BOASTS " +
				"EXTREME RELIABILITY AND ACCURACY ALONG WITH A COMPETITIVE PRICE.",
			serialNumber: "12312312312",
			caliber: "9 x 19 mm",
			length: "195 mm // 7.6 inches",
			height: "144 mm // 5.6 inches",
			width: "38 mm // 1.49 inches",
			barrelLength: "108 mm // 4.25 inches",
			weight: "833 g // 29.3 oz",
			ipfsImageHash: "QmZeF6k8tPY4kj14chwoseb8NudNyTkGAkd76AoopJPEit",
		};

		it("asset 'zero1S.json' should be consistent with json file", () => {
			expect(() => checkJsonEqulity(Data.AREX.assets.zero1S, zero1S)).not.toThrowError();
		});

		it("should pass collection schema validation", () => {
			expect(validate(zero1S)).toBeTruthy();

			console.log(ajv.errorsText(validate.errors));
		});
	});

	describe("Asset: zero1T.json", () => {
		const zero1T = {
			name: "AREX Zero 1 T",
			description:
				"THE AREX ZERO 1 T (TACTICAL) PISTOL COMPLIES WITH STRICT MILITARY STANDARDS FOR " +
				"RELIABILITY AND HAS PASSED EXTREME TEMPERATURE, HOSTILE ENVIRONMENT, AND DROP TESTS. " +
				"LIMITED LIFETIME WARRANTY FOR THE ORIGINAL RETAIL (COMMERCIAL/CIVILIAN) PURCHASER," +
				" ONE YEAR FOR LAW ENFORCEMENT AND MILITARY CUSTOMERS. SHIPS WITH (2) 20-ROUND MAGS, " +
				"(4) PLATES FOR OPTICS MOUNTING, HARD POLYMER CASE, CABLE PADLOCK, OPERATING MANUAL.",
			serialNumber: "567898765456",
			caliber: "9 x 19 mm",
			length: "213 mm // 8.3 inches",
			height: "150 mm // 5.9 inches",
			width: "38 mm // 1.49 inches",
			barrelLength: "126 mm // 4.9 inches",
			weight: "859 g // 30.3 oz",
			ipfsImageHash: "QmbZqCYXPJVC9VZb5nZhgwyhxjH36DUCxzF5LXL6Cdgwqx",
		};

		it("asset 'zero1T.json' should be consistent with json file", () => {
			expect(() => checkJsonEqulity(Data.AREX.assets.zero1T, zero1T)).not.toThrowError();
		});

		it("should pass collection schema validation", () => {
			expect(validate(zero1T)).toBeTruthy();

			console.log(ajv.errorsText(validate.errors));
		});
	});

	describe("Asset: zero1TC.json", () => {
		const zero1TC = {
			name: "AREX Zero 1 TC",
			description:
				"THE AREX ZERO 1 TC (TACTICAL COMPACT) PISTOL COMPLIES WITH STRICT MILITARY " +
				"STANDARDS FOR RELIABILITY AND HAS PASSED EXTREME TEMPERATURE, HOSTILE ENVIRONMENT, " +
				"AND DROP TESTS. LIMITED LIFETIME WARRANTY FOR THE ORIGINAL RETAIL (COMMERCIAL/CIVILIAN) " +
				"PURCHASER, ONE YEAR FOR LAW ENFORCEMENT AND MILITARY CUSTOMERS. SHIPS WITH (2) 17-ROUND MAGS, " +
				"(4) PLATES FOR OPTICS MOUNTING, HARD POLYMER CASE, CABLE PADLOCK, OPERATING MANUAL.",
			serialNumber: "12312312312",
			caliber: "9 x 19 mm",
			length: "205 mm // 8.0 inches",
			height: "133 mm // 5.2 inches",
			width: "38 mm // 1.49 inches",
			barrelLength: "116.5 mm // 4.5 inches",
			weight: "811 g // 28.6 oz",
			ipfsImageHash: "QmbDJ3Azhj2wwkMisrzUAqVzkZ1ngyNp8WYj4XAADemohq",
		};

		it("asset 'zero1TC.json' should be consistent with json file", () => {
			expect(() => checkJsonEqulity(Data.AREX.assets.zero1TC, zero1TC)).not.toThrowError();
		});

		it("should pass collection schema validation", () => {
			expect(validate(zero1TC)).toBeTruthy();

			console.log(ajv.errorsText(validate.errors));
		});
	});
});
