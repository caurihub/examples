import "jest-extended";

import Ajv from "ajv";

import * as Data from "../../src";
import { checkJsonEqulity } from "../utils";

describe("Nascar Driver Collection Playground", () => {
	const ajv = new Ajv({
		allErrors: true,
	});

	const nascarDriverCollectionJson = Data.NascarDriver.collection;

	const nascarDriverCollection = {
		type: "object",
		additionalProperties: false,
		required: ["name", "description", "teamName", "dateOfBirth", "carType"],
		properties: {
			name: {
				type: "string",
				maxLength: 120,
				minLength: 1,
			},
			description: {
				type: "string",
				maxLength: 1000,
				minLength: 1,
			},
			teamName: {
				type: "string",
				maxLength: 120,
				minLength: 1,
			},
			dateOfBirth: {
				format: "date",
			},
			carType: {
				type: "string",
				maxLength: 10,
				minLength: 1,
			},
		},
	};

	it("collection should be able to compile", () => {
		const validation = ajv.validateSchema(nascarDriverCollection);
		expect(validation).toBeTruthy();
	});

	it("collection should be consistent with json file", () => {
		expect(() =>
			checkJsonEqulity(nascarDriverCollectionJson.jsonSchema, nascarDriverCollection),
		).not.toThrowError();
	});

	const validate = ajv.compile(nascarDriverCollection);

	describe("Asset: driver1.json", () => {
		const driver1 = {
			name: "COREY LAJOIE",
			description:
				"Corey LaJoie returns for another full-time season in the NASCAR " +
				"Cup Series with Go Fas Racing. He earned two top-10 finishes in " +
				"2019 with the team. LaJoie is a third generation racer and a very " +
				"well-known name in the racing world. His grandfather, Don LaJoie, " +
				"is a member of the New England Auto Racing Hall of Fame alongside his " +
				"father, Randy LaJoie, who won the Xfinity Series Championships in 1996 and 1997.",
			teamName: "GO FAS RACING",
			dateOfBirth: "1991-09-25",
			carType: "Ford",
		};

		it("asset 'driver.json' should be consistent with json file", () => {
			expect(() => checkJsonEqulity(Data.NascarDriver.assets.driver1, driver1)).not.toThrowError();
		});

		it("should pass collection schema validation", () => {
			expect(validate(driver1)).toBeTruthy();

			console.log(ajv.errorsText(validate.errors));
		});
	});
});
