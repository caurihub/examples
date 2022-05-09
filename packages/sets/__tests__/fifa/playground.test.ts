import "jest-extended";

import Ajv from "ajv";

import * as Data from "../../src";
import { checkJsonEqulity } from "../utils";

describe("FIFA Collection Playground", () => {
	const ajv = new Ajv({
		allErrors: true,
	});

	const fifaCollectionJson = Data.Fifa.collection;

	const fifaCollection = {
		type: "object",
		additionalProperties: false,
		required: ["name", "nation", "league", "club"],
		properties: {
			name: {
				type: "string",
				maxLength: 120,
				minLength: 1,
			},
			nation: {
				type: "string",
				maxLength: 80,
				minLength: 1,
			},
			league: {
				type: "string",
				maxLength: 255,
				minLength: 1,
			},
			club: {
				type: "string",
				maxLength: 255,
				minLength: 1,
			},
			stats: {
				type: "object",
				additionalProperties: false,
				required: ["physical", "mental", "technical", "goalkeeping"],
				properties: {
					physical: {
						type: "object",
						additionalProperties: false,
						required: [
							"acceleration",
							"agility",
							"jumping",
							"strength",
							"sprintSpeed",
							"balance",
							"stamina",
							"reactions",
						],
						properties: {
							acceleration: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							agility: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							jumping: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							strength: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							sprintSpeed: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							balance: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							stamina: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							reactions: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
						},
					},
					mental: {
						type: "object",
						additionalProperties: false,
						required: ["aggression", "attackPos", "interceptions", "vision"],
						properties: {
							aggression: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							attackPos: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							interceptions: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							vision: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
						},
					},
					technical: {
						type: "object",
						additionalProperties: false,
						required: [
							"ballControl",
							"crossing",
							"dribbling",
							"finishing",
							"FKAcc",
							"headingAcc",
							"longPassing",
							"shortPassing",
							"defAwareness",
							"shotPower",
							"longShots",
							"standTackle",
							"slideTackle",
							"volleys",
							"curve",
							"penalties",
						],
						properties: {
							ballControl: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							crossing: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							dribbling: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							finishing: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							FKAcc: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							headingAcc: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							longPassing: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							shortPassing: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							defAwareness: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							shotPower: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							longShots: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							standTackle: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							slideTackle: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							volleys: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							curve: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							penalties: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
						},
					},
					goalkeeping: {
						type: "object",
						additionalProperties: false,
						required: ["GKDiving", "GKHandling", "GKKicking", "GKReflexes", "GKPositioning"],
						properties: {
							GKDiving: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							GKHandling: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							GKKicking: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							GKReflexes: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
							GKPositioning: {
								type: "number",
								maximum: 100,
								minimum: 0,
							},
						},
					},
				},
			},
		},
	};

	it("collection should be able to compile", () => {
		const validation = ajv.validateSchema(fifaCollection);
		expect(validation).toBeTruthy();
	});

	it("collection should be consistent with json file", () => {
		expect(() => checkJsonEqulity(fifaCollectionJson.jsonSchema, fifaCollection)).not.toThrowError();
	});

	const validate = ajv.compile(fifaCollection);

	describe("Asset: player1.json", () => {
		const player1 = {
			name: "Timo Werner",
			nation: "Germany",
			league: "Premier League",
			club: "Chelsea",
			stats: {
				physical: {
					acceleration: 94,
					sprintSpeed: 89,
					agility: 83,
					balance: 76,
					jumping: 76,
					stamina: 84,
					strength: 67,
					reactions: 88,
				},
				mental: {
					aggression: 63,
					interceptions: 38,
					attackPos: 90,
					vision: 66,
				},
				technical: {
					ballControl: 86,
					crossing: 71,
					dribbling: 85,
					finishing: 90,
					FKAcc: 59,
					headingAcc: 80,
					longPassing: 80,
					defAwareness: 40,
					shotPower: 87,
					shortPassing: 80,
					longShots: 79,
					standTackle: 20,
					slideTackle: 19,
					volleys: 88,
					curve: 72,
					penalties: 79,
				},
				goalkeeping: {
					GKDiving: 0,
					GKHandling: 0,
					GKKicking: 0,
					GKReflexes: 0,
					GKPositioning: 0,
				},
			},
		};

		it("asset 'player1.json' should be consistent with json file", () => {
			expect(() => checkJsonEqulity(Data.Fifa.assets.player1, player1)).not.toThrowError();
		});

		it("should pass collection schema validation", () => {
			expect(validate(player1)).toBeTruthy();

			console.log(ajv.errorsText(validate.errors));
		});
	});

	describe("Asset: player2.json", () => {
		const player2 = {
			name: "Lionel Messi",
			nation: "Argentina",
			league: "LaLiga Santander",
			club: "FC Barcelona",
			stats: {
				physical: {
					acceleration: 92,
					sprintSpeed: 80,
					agility: 91,
					balance: 96,
					jumping: 69,
					stamina: 73,
					strength: 70,
					reactions: 94,
				},
				mental: {
					aggression: 44,
					interceptions: 41,
					attackPos: 90,
					vision: 97,
				},
				technical: {
					ballControl: 97,
					crossing: 71,
					dribbling: 85,
					finishing: 90,
					FKAcc: 59,
					headingAcc: 80,
					longPassing: 80,
					defAwareness: 40,
					shotPower: 87,
					shortPassing: 80,
					longShots: 79,
					standTackle: 20,
					slideTackle: 19,
					volleys: 88,
					curve: 72,
					penalties: 79,
				},
				goalkeeping: {
					GKDiving: 0,
					GKHandling: 0,
					GKKicking: 0,
					GKReflexes: 0,
					GKPositioning: 0,
				},
			},
		};

		it("asset 'player2.json' should be consistent with json file", () => {
			expect(() => checkJsonEqulity(Data.Fifa.assets.player2, player2)).not.toThrowError();
		});

		it("should pass collection schema validation", () => {
			expect(validate(player2)).toBeTruthy();

			console.log(ajv.errorsText(validate.errors));
		});
	});

	describe("Asset: player3.json", () => {
		const player3 = {
			name: "Christiano Ronaldo dos Santos Aveiro",
			nation: "Portugal",
			league: "Serie A TIM",
			club: "Piemonte Calcio",
			stats: {
				physical: {
					acceleration: 87,
					sprintSpeed: 91,
					agility: 87,
					balance: 71,
					jumping: 95,
					stamina: 84,
					strength: 78,
					reactions: 95,
				},
				mental: {
					aggression: 63,
					interceptions: 29,
					attackPos: 95,
					vision: 82,
				},
				technical: {
					ballControl: 92,
					crossing: 84,
					dribbling: 88,
					finishing: 95,
					FKAcc: 76,
					headingAcc: 90,
					longPassing: 77,
					shortPassing: 82,
					defAwareness: 28,
					shotPower: 94,
					longShots: 93,
					standTackle: 32,
					slideTackle: 24,
					volleys: 86,
					curve: 81,
					penalties: 84,
				},
				goalkeeping: {
					GKDiving: 7,
					GKHandling: 11,
					GKKicking: 15,
					GKReflexes: 11,
					GKPositioning: 14,
				},
			},
		};

		it("asset 'player3.json' should be consistent with json file", () => {
			expect(() => checkJsonEqulity(Data.Fifa.assets.player3, player3)).not.toThrowError();
		});

		it("should pass collection schema validation", () => {
			expect(validate(player3)).toBeTruthy();

			console.log(ajv.errorsText(validate.errors));
		});
	});

	describe("Asset: player4.json", () => {
		const player4 = {
			name: "Josip Ilicic",
			nation: "Slovenia",
			league: "Serie A TIM",
			club: "Atalanta",
			stats: {
				physical: {
					acceleration: 71,
					sprintSpeed: 69,
					agility: 71,
					balance: 66,
					jumping: 34,
					stamina: 69,
					strength: 74,
					reactions: 84,
				},
				mental: {
					aggression: 58,
					interceptions: 46,
					attackPos: 85,
					vision: 87,
				},
				technical: {
					ballControl: 88,
					crossing: 82,
					dribbling: 88,
					finishing: 85,
					FKAcc: 85,
					headingAcc: 58,
					longPassing: 74,
					shortPassing: 86,
					defAwareness: 53,
					shotPower: 88,
					longShots: 89,
					standTackle: 32,
					slideTackle: 26,
					volleys: 83,
					curve: 85,
					penalties: 78,
				},
				goalkeeping: {
					GKDiving: 13,
					GKHandling: 13,
					GKKicking: 8,
					GKReflexes: 6,
					GKPositioning: 12,
				},
			},
		};

		it("asset 'player4.json' should be consistent with json file", () => {
			expect(() => checkJsonEqulity(Data.Fifa.assets.player4, player4)).not.toThrowError();
		});

		it("should pass collection schema validation", () => {
			expect(validate(player4)).toBeTruthy();

			console.log(ajv.errorsText(validate.errors));
		});
	});

	describe("Asset: player5.json", () => {
		const player5 = {
			name: "Diego Maradona",
			nation: "Argentina",
			league: "Icons",
			club: "Icons",
			stats: {
				physical: {
					acceleration: 91,
					sprintSpeed: 85,
					agility: 89,
					balance: 98,
					jumping: 80,
					stamina: 75,
					strength: 74,
					reactions: 93,
				},
				mental: {
					aggression: 76,
					interceptions: 46,
					attackPos: 92,
					vision: 95,
				},
				technical: {
					ballControl: 95,
					crossing: 87,
					dribbling: 96,
					finishing: 94,
					FKAcc: 93,
					headingAcc: 67,
					longPassing: 87,
					shortPassing: 90,
					defAwareness: 30,
					shotPower: 83,
					longShots: 91,
					standTackle: 44,
					slideTackle: 39,
					volleys: 86,
					curve: 94,
					penalties: 92,
				},
				goalkeeping: {
					GKDiving: 11,
					GKHandling: 15,
					GKKicking: 7,
					GKReflexes: 8,
					GKPositioning: 14,
				},
			},
		};

		it("asset 'player5.json' should be consistent with json file", () => {
			expect(() => checkJsonEqulity(Data.Fifa.assets.player5, player5)).not.toThrowError();
		});

		it("should pass collection schema validation", () => {
			expect(validate(player5)).toBeTruthy();

			console.log(ajv.errorsText(validate.errors));
		});
	});
});
