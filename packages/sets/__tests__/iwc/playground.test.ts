import "jest-extended";

import Ajv from "ajv";

import * as Data from "../../src";
import { checkJsonEqulity } from "../utils";

describe("IWC Collection Playground", () => {
	const ajv = new Ajv({
		allErrors: true,
	});

	const iwcCollectionJson = Data.Iwc.collection;

	const iwcCollection = {
		type: "object",
		additionalProperties: false,
		required: ["name", "description", "modelName", "chf", "dateOfPurchase"],
		properties: {
			name: {
				type: "string",
				maxLength: 200,
				minLength: 1,
			},
			description: {
				type: "string",
				maxLength: 1000,
				minLength: 1,
			},
			modelName: {
				type: "string",
				maxLength: 50,
				minLength: 1,
			},
			chf: {
				type: "string",
				maxLength: 50,
				minLength: 1,
			},
			dateOfPurchase: {
				format: "date",
			},
			technicalData: {
				type: "object",
				additionalProperties: true,
			},
		},
	};

	it("collection should be able to compile", () => {
		const validation = ajv.validateSchema(iwcCollection);
		expect(validation).toBeTruthy();
	});

	it("collection should be consistent with json file", () => {
		expect(() => checkJsonEqulity(iwcCollectionJson.jsonSchema, iwcCollection)).not.toThrowError();
	});

	const validate = ajv.compile(iwcCollection);

	describe("Asset: watch1.json", () => {
		const watch1 = {
			name: "PORTOFINO HAND-WOUND TOURBILLON RETROGRADE",
			description: "18 ct 5N gold case, Manual-winding, Diameter 45.0 mm. Made in Schaffhausen, Switzerland.",
			modelName: "IW516501",
			chf: "62 000",
			dateOfPurchase: "2018-02-29",
			technicalData: {
				movement: {
					caliber: "59900 Calibre",
					movement: "IWC-manufactured movement",
					otherInformation:
						"Manual-winding, 192 hours Power Reserve, Frequency 28800.0 vph (4.0 hz), 315 Components, 38 Jewels, Cotes de Geneve, perlage",
				},
				case:
					"18 ct 5N gold case, Diameter 45.0 mm, Height 14.0 mm, See-through sapphire glass back, Water resistance 3 bar",
				dial: "Silver-plated dial",
				strap: "Dark brown alligator leather strap by Santoni, Strap width 22 mm",
				features: [
					"Flying minute tourbillon",
					"Hacking tourbillon mechanism",
					"8 days power reserve",
					"Retrograde date display",
					"Power reserve display",
					"Sapphire glass, arched-edge, antireflective coating on both sides",
				],
			},
		};

		it("asset 'watch1.json' should be consistent with json file", () => {
			expect(() => checkJsonEqulity(Data.Iwc.assets.watch1, watch1)).not.toThrowError();
		});

		it("should pass collection schema validation", () => {
			expect(validate(watch1)).toBeTruthy();

			console.log(ajv.errorsText(validate.errors));
		});
	});
});
