import "jest-extended";

import Ajv from "ajv";

import * as Data from "../../src";
import { checkJsonEqulity } from "../utils";

describe("Nascar Team Collection Playground", () => {
	const ajv = new Ajv({
		allErrors: true,
	});

	const nascarTeamCollectionJson = Data.NascarTeam.collection;

	const nascarTeamCollection = {
		type: "object",
		additionalProperties: false,
		required: ["teamName", "description", "carType", "drivers", "teamOwner", "headquarters", "website"],
		properties: {
			teamName: {
				type: "string",
				maxLength: 120,
				minLength: 1,
			},
			description: {
				type: "string",
				maxLength: 1000,
				minLength: 1,
			},
			carType: {
				type: "string",
				maxLength: 20,
				minLength: 1,
			},
			drivers: {
				type: "array",
				maxItems: 4,
				minItems: 1,
				additionalItems: false,
				uniqueItems: true,
				items: {
					type: "object",
					required: ["name", "number"],
					properties: {
						name: {
							type: "string",
							maxLength: 120,
							minLength: 1,
						},
						number: {
							type: "number",
						},
						ipfsHashImage: {
							type: "string",
							maxLength: 120,
							minLength: 1,
						},
					},
				},
			},
			teamOwner: {
				type: "string",
				maxLength: 120,
				minLength: 1,
			},
			headquarters: {
				type: "string",
				maxLength: 120,
				minLength: 1,
			},
			website: {
				type: "string",
				format: "url",
				maxLength: 120,
				minLength: 1,
			},
			ipfsHashImage: {
				type: "string",
				maxLength: 120,
				minLength: 1,
			},
		},
	};

	it("collection should be able to compile", () => {
		const validation = ajv.validateSchema(nascarTeamCollection);
		expect(validation).toBeTruthy();
	});

	it("collection should be consistent with json file", () => {
		expect(() => checkJsonEqulity(nascarTeamCollectionJson.jsonSchema, nascarTeamCollection)).not.toThrowError();
	});

	const validate = ajv.compile(nascarTeamCollection);

	describe("Asset: chip-ganassi-team.json", () => {
		const chipGanassiTeam = {
			teamName: "CHIP GANASSI RACING TEAM",
			description:
				"Chip Ganassi Racing has been fielding entries in NASCAR since 1989. " +
				"As a team, they have a total of 24 wins in the Cup Series and 22 in " +
				"the Xfinity Series. Car numbers they have run include the 1, 40, 41," +
				" & 42. Notable drivers that have run under the team's banner include" +
				" Kyle Petty, Joe Nemechek, Jimmy Spencer, Jamie McMurray, Sterling Marlin " +
				"and Juan Pablo Montoya. Owner Chip Ganassi also has a full-time IndyCar " +
				"team which has won the Indy 500 four times.",
			carType: "Chevrolet",
			drivers: [
				{
					name: "Kurt Busch",
					number: 1,
					ipfsHashImage: "QmfQnYn2MyKksuPfckWfhGZN9wo1ygFydnwKBh3p6qzoHb",
				},
				{
					name: "Matt Kenseth",
					number: 42,
					ipfsHashImage: "QmbZRGF6xZCD3X5USAp1fyxDeqVXp6a6EiGCRGRUdQaMh3",
				},
			],
			teamOwner: "Chip Ganassi",
			headquarters: "Concord , North Carolina",
			website: "http://www.chipganassiracing.com/",
			ipfsHashImage: "QmbmD1qZVvybm5bhEHkzdLjXRRAtnhh7bhh9gRmbqHC51k",
		};

		it("asset 'chip-ganassi-team.json' should be consistent with json file", () => {
			expect(() => checkJsonEqulity(Data.NascarTeam.assets.chipGanassiTeam, chipGanassiTeam)).not.toThrowError();
		});

		it("should pass collection schema validation", () => {
			expect(validate(chipGanassiTeam)).toBeTruthy();

			console.log(ajv.errorsText(validate.errors));
		});
	});

	describe("Asset: front-row-motosports-team.json", () => {
		const frontRowMotosportsTeam = {
			teamName: "FRONT ROW MOTORSPORTS RACING TEAM",
			description:
				"Front Row Motorsports came into NASCAR full-time in 2005. They began part-time in " +
				"2004 as Means-Jenkins Motorsports. The team currently has a technical alliance with " +
				"Roush Fenway Racing and also has received support from Ford since 2016. " +
				"They fielded primarily two cars for a majority of their time in NASCAR " +
				"and then were awarded the assets from BK Racing in 2018 to field a third car. " +
				"They have used car numbers such as 34, 35, 36, 37, 38, and 55. They have competed " +
				"in 898 Cup Series races and 75 Xfinity Series races. The team has two victories in 2013 and 2016.",
			carType: "Ford",
			drivers: [
				{
					name: "Todd Gilliland",
					number: 38,
					ipfsHashImage: "QmXe8uXDAejRPop2fkSwqP3vQpwLKB3nAcoEMqFN1T3WmA",
				},
				{
					name: "Michael Mcdowell",
					number: 34,
					ipfsHashImage: "QmdaTHAMvRHHrqBymsSyvYK1mZTzHRDmFpze4BQvKP7MUU",
				},
				{
					name: "John Hunter Nemcheck",
					number: 38,
					ipfsHashImage: "QmYq8v2kCcTqDS8yJRBHPbGpSuwzUFDSWJpEKi1cLnm95X",
				},
			],
			teamOwner: "Bob Jenkins",
			headquarters: "Mooresville , North Carolina",
			website: "https://www.teamfrm.com",
			ipfsHashImage: "QmaRJEGpr9ZrARN9XDhxtcSQP13Gvczs4VzKTVcZcetz3G",
		};

		it("asset 'front-row-motosports-team.json' should be consistent with json file", () => {
			expect(() =>
				checkJsonEqulity(Data.NascarTeam.assets.frontRowMotosportsTeam, frontRowMotosportsTeam),
			).not.toThrowError();
		});

		it("should pass collection schema validation", () => {
			expect(validate(frontRowMotosportsTeam)).toBeTruthy();

			console.log(ajv.errorsText(validate.errors));
		});
	});

	describe("Asset: gaunt-brothers-team.json", () => {
		const gauntBrothersTeam = {
			teamName: "GAUNT BROTHERS RACING TEAM",
			description:
				"Gaunt Brothers Racing will be running the full 2020 season for " +
				"the first time in the organization's history. The team debuted in " +
				"2017 at the DAYTONA 500 with D.J. Kennington behind the wheel. " +
				"The next season they rotated through numerous drivers but were able " +
				"to race almost the entire schedule. This season, with Daniel Suarez" +
				" behind the wheel, the organization eyes its first victory.",
			carType: "Toyota",
			drivers: [
				{
					name: "Daniel Suarez",
					number: 96,
					ipfsHashImage: "QmcCkQDSad8AW1UehDo4Lemy8bg6HYMqBpKwY4cyz74ixY",
				},
			],
			teamOwner: "Marty Gaunt",
			headquarters: "Mooresville , NC",
			website: "https://www.gauntbrothersracing.com/",
			ipfsHashImage: "Qme9XgkNEVg11ULZeKNVYcbgMnZxq6JshuNaCvNbcszpWq",
		};

		it("asset 'gaunt-brothers-team.json' should be consistent with json file", () => {
			expect(() =>
				checkJsonEqulity(Data.NascarTeam.assets.gauntBrothersTeam, gauntBrothersTeam),
			).not.toThrowError();
		});

		it("should pass collection schema validation", () => {
			expect(validate(gauntBrothersTeam)).toBeTruthy();

			console.log(ajv.errorsText(validate.errors));
		});
	});

	describe("Asset: germain-team.json", () => {
		const germainTeam = {
			teamName: "GERMAIN RACING TEAM",
			description:
				"Germain Racing has been competing in NASCAR since 2004. " +
				"The team began their career in the Truck Series and won two " +
				"championships in the process with Todd Bodine behind the wheel " +
				"(2006 & 2010). They started to compete full-time in the Cup Series " +
				"back in 2008. They have only used three drivers in their Cup Series history: " +
				"Max Papis, Casey Mears and Ty Dillon. They are still looking for " +
				"their first Cup Series win as an organization.",
			carType: "Ford",
			drivers: [
				{
					name: "Ty Dillon",
					number: 13,
					ipfsHashImage: "QmPC4vcoVHrwhUApn4GE1fQ6kinzRysarmyV4XdpfGRCkS",
				},
			],
			teamOwner: "Bob Germain Jr.",
			headquarters: "Lexington , North Carolina",
			website: "https://www.germainracing.com",
			ipfsHashImage: "QmcsRexmNLRJDSi4SmpMTrs8wCtH1PXcGLPZeECcd1uqdD",
		};

		it("asset 'germain-team.json' should be consistent with json file", () => {
			expect(() => checkJsonEqulity(Data.NascarTeam.assets.germainTeam, germainTeam)).not.toThrowError();
		});

		it("should pass collection schema validation", () => {
			expect(validate(germainTeam)).toBeTruthy();

			console.log(ajv.errorsText(validate.errors));
		});
	});

	describe("Asset: go-fas.json", () => {
		const goFas = {
			teamName: "GO FAS RACING TEAM",
			description:
				"Go FAS Racing arrived on the NASCAR scene back in 2011. " +
				"They have competed in 284 races with a plethora of different " +
				"drivers behind the wheel over the years. Matt DiBenedetto and" +
				" Corey LaJoie are the only two drivers who have competed in the No. " +
				"32 car for the full 36-race season. The team has also fielded " +
				"entries in NASCAR's Whelen Euro Series and Pinty's Series.",
			carType: "Ford",
			drivers: [
				{
					name: "Corey Lajoie",
					number: 32,
					ipfsHashImage: "QmULgKQzXJbn6ZHMCEVx42T9AvPtQjpWFAfbvKHJDzxHnj",
				},
			],
			teamOwner: "Archie St. Hilaire",
			headquarters: "Mooresville , North Carolina",
			website: "https://www.gofasracing.com",
			ipfsHashImage: "QmaeqqpGWqZg8VzaVjdaT3QMQc7bkY5kcNiqGThdEvvbAu",
		};

		it("asset 'go-fas.json' should be consistent with json file", () => {
			expect(() => checkJsonEqulity(Data.NascarTeam.assets.goFas, goFas)).not.toThrowError();
		});

		it("should pass collection schema validation", () => {
			expect(validate(goFas)).toBeTruthy();

			console.log(ajv.errorsText(validate.errors));
		});
	});
});
