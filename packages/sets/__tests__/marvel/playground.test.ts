import "jest-extended";

import Ajv from "ajv";

import * as Data from "../../src";
import { checkJsonEqulity } from "../utils";

describe("Marvel Collection Playground", () => {
	const ajv = new Ajv({
		allErrors: true,
	});

	const marvelCollectionJson = Data.Marvel.collection;

	const marvelCollection = {
		type: "object",
		additionalProperties: false,
		required: [
			"id",
			"name",
			"description",
			"modified",
			"thumbnail",
			"resourceURI",
			"comics",
			"series",
			"stories",
			"events",
			"urls",
		],
		properties: {
			id: {
				type: "number",
			},
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
			modified: {
				type: "string",
				maxLength: 60,
				minLength: 1,
			},
			thumbnail: {
				type: "object",
				required: ["path", "extension"],
				properties: {
					path: {
						type: "string",
						format: "url",
						maxLength: 120,
						minLength: 1,
					},
					extension: {
						type: "string",
						maxLength: 6,
						minLength: 1,
					},
				},
			},
			resourceURI: {
				type: "string",
				format: "url",
				maxLength: 120,
				minLength: 1,
			},
			comics: {
				type: "object",
				required: ["available", "collectionURI", "items"],
				properties: {
					available: {
						type: "number",
					},
					collectionURI: {
						type: "string",
						format: "url",
						maxLength: 120,
						minLength: 1,
					},
					items: {
						type: "array",
						maxItems: 200,
						minItems: 1,
						additionalItems: false,
						uniqueItems: false,
						items: {
							type: "object",
							required: ["resourceURI", "name"],
							properties: {
								resourceURI: {
									type: "string",
									format: "url",
									maxLength: 120,
									minLength: 1,
								},
								name: {
									type: "string",
									maxLength: 120,
									minLength: 1,
								},
							},
						},
					},
				},
			},
			series: {
				type: "object",
				required: ["available", "collectionURI", "items"],
				properties: {
					available: {
						type: "number",
					},
					collectionURI: {
						type: "string",
						format: "url",
						maxLength: 120,
						minLength: 1,
					},
					items: {
						type: "array",
						maxItems: 200,
						minItems: 1,
						additionalItems: false,
						uniqueItems: false,
						items: {
							type: "object",
							required: ["resourceURI", "name"],
							properties: {
								resourceURI: {
									type: "string",
									format: "url",
									maxLength: 120,
									minLength: 1,
								},
								name: {
									type: "string",
									maxLength: 120,
									minLength: 1,
								},
							},
						},
					},
				},
			},
			stories: {
				type: "object",
				required: ["available", "collectionURI", "items"],
				properties: {
					available: {
						type: "number",
					},
					collectionURI: {
						type: "string",
						format: "url",
						maxLength: 120,
						minLength: 1,
					},
					items: {
						type: "array",
						maxItems: 200,
						minItems: 1,
						additionalItems: false,
						uniqueItems: false,
						items: {
							type: "object",
							required: ["resourceURI", "name", "type"],
							properties: {
								resourceURI: {
									type: "string",
									format: "url",
									maxLength: 120,
									minLength: 1,
								},
								name: {
									type: "string",
									maxLength: 120,
									minLength: 1,
								},
								type: {
									type: "string",
									maxLength: 60,
									minLength: 1,
								},
							},
						},
					},
				},
			},
			events: {
				type: "object",
				required: ["available", "collectionURI", "items"],
				properties: {
					available: {
						type: "number",
					},
					collectionURI: {
						type: "string",
						format: "url",
						maxLength: 120,
						minLength: 1,
					},
					items: {
						type: "array",
						maxItems: 200,
						minItems: 1,
						additionalItems: false,
						uniqueItems: false,
						items: {
							type: "object",
							required: ["resourceURI", "name"],
							properties: {
								resourceURI: {
									type: "string",
									format: "url",
									maxLength: 120,
									minLength: 1,
								},
								name: {
									type: "string",
									maxLength: 120,
									minLength: 1,
								},
							},
						},
					},
				},
			},
			urls: {
				type: "array",
				maxItems: 50,
				minItems: 1,
				additionalItems: false,
				uniqueItems: false,
				items: {
					type: "object",
					required: ["type", "url"],
					properties: {
						type: {
							type: "string",
							maxLength: 120,
							minLength: 1,
						},
						url: {
							type: "string",
							format: "url",
							maxLength: 255,
							minLength: 1,
						},
					},
				},
			},
		},
	};

	it("collection should be able to compile", () => {
		const validation = ajv.validateSchema(marvelCollection);
		expect(validation).toBeTruthy();
	});

	it("collection should be consistent with json file", () => {
		expect(() => checkJsonEqulity(marvelCollectionJson.jsonSchema, marvelCollection)).not.toThrowError();
	});

	const validate = ajv.compile(marvelCollection);

	describe("Asset: iron-man.json", () => {
		const ironMan = {
			id: 1009368,
			name: "Iron Man",
			description:
				"Wounded, captured and forced to build a weapon by his enemies, billionaire industrialist Tony Stark instead created an advanced suit of armor to save his life and escape captivity. Now with a new outlook on life, Tony uses his money and intelligence to make the world a safer, better place as Iron Man.",
			modified: "2016-09-28T12:08:19-0400",
			thumbnail: {
				path: "http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55",
				extension: "jpg",
			},
			resourceURI: "http://gateway.marvel.com/v1/public/characters/1009368",
			comics: {
				available: 2567,
				collectionURI: "http://gateway.marvel.com/v1/public/characters/1009368/comics",
				items: [
					{
						resourceURI: "http://gateway.marvel.com/v1/public/comics/43495",
						name: "A+X (2012) #2",
					},
					{
						resourceURI: "http://gateway.marvel.com/v1/public/comics/43506",
						name: "A+X (2012) #7",
					},
				],
			},
			series: {
				available: 2567,
				collectionURI: "http://gateway.marvel.com/v1/public/characters/1009368/comics",
				items: [
					{
						resourceURI: "http://gateway.marvel.com/v1/public/series/16450",
						name: "A+X (2012 - 2014)",
					},
					{
						resourceURI: "http://gateway.marvel.com/v1/public/series/6079",
						name: "Adam: Legend of the Blue Marvel (2008)",
					},
				],
			},
			stories: {
				available: 3889,
				collectionURI: "http://gateway.marvel.com/v1/public/characters/1009368/stories",
				items: [
					{
						resourceURI: "http://gateway.marvel.com/v1/public/stories/670",
						name: "X-MEN (2004) #186",
						type: "cover",
					},
					{
						resourceURI: "http://gateway.marvel.com/v1/public/stories/892",
						name: "THOR (1998) #81",
						type: "cover",
					},
				],
			},
			events: {
				available: 31,
				collectionURI: "http://gateway.marvel.com/v1/public/characters/1009368/events",
				items: [
					{
						resourceURI: "http://gateway.marvel.com/v1/public/events/116",
						name: "Acts of Vengeance!",
					},
					{
						resourceURI: "http://gateway.marvel.com/v1/public/events/303",
						name: "Age of X",
					},
				],
			},
			urls: [
				{
					type: "detail",
					url:
						"http://marvel.com/comics/characters/1009368/iron_man?utm_campaign=apiRef&utm_source=be105ab34ee223ae2b4c2f09d92340b6",
				},
				{
					type: "wiki",
					url:
						"http://marvel.com/universe/Iron_Man_(Anthony_Stark)?utm_campaign=apiRef&utm_source=be105ab34ee223ae2b4c2f09d92340b6",
				},
				{
					type: "comiclink",
					url:
						"http://marvel.com/comics/characters/1009368/iron_man?utm_campaign=apiRef&utm_source=be105ab34ee223ae2b4c2f09d92340b6",
				},
			],
		};

		it("asset 'iron-man.json' should be consistent with json file", () => {
			expect(() => checkJsonEqulity(Data.Marvel.assets.ironMan, ironMan)).not.toThrowError();
		});

		it("should pass collection schema validation", () => {
			expect(validate(ironMan)).toBeTruthy();

			console.log(ajv.errorsText(validate.errors));
		});
	});
});
