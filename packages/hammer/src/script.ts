import fifaCollection = require("./data/collections/fifa-collection.json");
import marvelCollection = require("./data/collections/marvel-collection.json");
import breitlingCollection = require("./data/collections/breitling-collection.json");
import nascarCollection = require("./data/collections/nascar-collection.json");
import IWCCollection = require("./data/collections/iwc-collection.json");
import nascarTeamCollection = require("./data/collections/nascar-team-collection.json");
import nascarHeroCardsCollection = require("./data/collections/nascar-hero-card-collection.json");
import arexCollection = require("./data/collections/arex-collection.json");

import ironManAsset = require("./data/assets/marvel/iron-man.json");
import nascarAsset = require("./data/assets/nascar/driver1.json");
import IWCAsset = require("./data/assets/iwc/iwc-watch1.json");

// Nascar teams
import nascarTeam1 = require("./data/assets/nascar-team/chip-ganassi-team.json");
import nascarTeam2 = require("./data/assets/nascar-team/front-row-motosports-team.json");
import nascarTeam3 = require("./data/assets/nascar-team/gaunt-brothers-team.json");
import nascarTeam4 = require("./data/assets/nascar-team/germain-team.json");
import nascarTeam5 = require("./data/assets/nascar-team/go-fas.json");

// Nascar Hero Cards
import nascarHeroCard1 = require("./data/assets/nascar-hero-card/hero-card1.json");
// import nascarHeroCard2 = require("./data/assets/nascar-hero-card/hero-card2.json");
import nascarHeroCard3 = require("./data/assets/nascar-hero-card/hero-card3.json");
import nascarHeroCard4 = require("./data/assets/nascar-hero-card/hero-card4.json");

// FIFA Players
import fifaPlayer1 = require("./data/assets/fifa/player1.json");
import fifaPlayer2 = require("./data/assets/fifa/player2.json");
import fifaPlayer3 = require("./data/assets/fifa/player3.json");
import fifaPlayer4 = require("./data/assets/fifa/player4.json");
import fifaPlayer5 = require("./data/assets/fifa/player5.json");

// Breitling watches
import breitlingWatch1 = require("./data/assets/breitling/breitling-watch1.json");
import breitlingWatch2 = require("./data/assets/breitling/breitling-watch2.json");
import breitlingWatch3 = require("./data/assets/breitling/breitling-watch3.json");

// AREX Weapons
import alpha = require("./data/assets/arex/alpha.json");
import delta = require("./data/assets/arex/delta.json");
import zero1CP = require("./data/assets/arex/zero1CP.json");
import zero1S = require("./data/assets/arex/zero1S.json");
import zero1T = require("./data/assets/arex/zero1T.json");
import zero1TC = require("./data/assets/arex/zero1TC.json");

import { CauriHubConnection } from "@caurihub/client";
import chalk from "chalk";
import delay from "delay";
import faker from "faker";

import { configurations } from "./configurations";
import { FillScript } from "./scripts/FillScript";
import { ShareCoinsScript } from "./scripts/ShareCoinsScript";
import { setupScript } from "./setup";

const { passphrasesFile, delayTime } = configurations;

export const main = async () => {
	/** Setup the script - registering transaction types and network settings */
	const client = new CauriHubConnection(configurations.clientHost);
	const peersResponse = await client.api("peers").all();
	const peers = peersResponse.body.data;
	if (Array.isArray(peers) && peers.length) {
		// @ts-ignore
		configurations.clientHost = `http://${peers[0]!.ip}:${peers[0]!.plugins["@cauriland/core-api"].port}/api`;
	}
	console.log(chalk.blue("Setup script"));
	await setupScript();

	/** Transfer coins to known wallet from master wallet which you get from the arguments */
	console.log(chalk.green("Transfer coins to known wallets"));

	const shareCoins = new ShareCoinsScript(process.argv.slice(2).join(" "));
	await shareCoins.splitCoins(5000, passphrasesFile.secrets);

	await delay(delayTime);

	const scriptType = new FillScript(passphrasesFile.secrets, passphrasesFile.secrets[0]);

	console.log(chalk.green("Create FIFA collections"));
	/**
	 *	The first argument is number of batches you want to create
	 *	The second argument is numberOfTransactionsPerBatch I suggest that you don't put over
	 *	40 transactions per batch since the default number is 40 in core
	 *	The third argument is the collection asset
	 */
	await scriptType.createCollections(1, 1, () => fifaCollection);

	await delay(delayTime);

	console.log(chalk.green("Create FIFA assets"));
	/**
	 *  The first argument is number of batches
	 *  The second argument is number of transactionsPerBatch
	 *	The third argument is number of collections used, it takes of an example first three collections
	 * 	you created in first par of the script and makes that many batches of transactions for each
	 */
	await scriptType.createAssets(3, 40, 1, () => {
		return [fifaPlayer1, fifaPlayer2, fifaPlayer3, fifaPlayer4, fifaPlayer5][
			faker.random.number({ max: 4, min: 0 })
		];
	});

	await delay(delayTime);

	console.log(chalk.green("Create FIFA auctions"));
	/**
	 * The first argument is assetsPerAuction, it is the number of assets you want to put
	 * inside the each auction, make sure there are enough of assets created in the previous
	 * part of the script
	 * The second argument is the number of transactions you want to create
	 * */
	await scriptType.createAuctions(4, 10);

	await delay(delayTime);

	console.log(chalk.green("Create FIFA bids"));
	/**
	 * The first argument is number of bids you want to create for each auction you created in previous
	 * part of the script
	 * The second argument is the number of auctions you want to bid to, make sure you created enough of them in
	 * previous part of the script
	 * */
	await scriptType.createBids(15, 10);

	await delay(delayTime);

	console.log(chalk.green("Create FIFA trades"));
	/**
	 * Creates trades for each auction
	 * */
	await scriptType.createTrades();

	await delay(delayTime);

	/** Marvel collection fill script */
	const fillScriptMarvelCollection = new FillScript(passphrasesFile.secrets, passphrasesFile.secrets[1]);

	console.log(chalk.green("Create Marvel collections"));
	await fillScriptMarvelCollection.createCollections(1, 1, () => marvelCollection);
	await delay(delayTime);

	console.log(chalk.green("Create Iron Man assets"));
	await fillScriptMarvelCollection.createAssets(2, 40, 1, () => ironManAsset);

	await delay(delayTime);

	console.log(chalk.green("Create Marvel auctions"));
	await fillScriptMarvelCollection.createAuctions(2, 10);

	await delay(delayTime);

	console.log(chalk.green("Create Marvel bids"));
	await fillScriptMarvelCollection.createBids(5, 4);

	await delay(delayTime);

	console.log(chalk.green("Create Marvel trades"));
	await fillScriptMarvelCollection.createTrades();

	await delay(delayTime);

	/** Breitling collection fill script */

	const fillScriptBreitlingCollection = new FillScript(passphrasesFile.secrets, passphrasesFile.secrets[2]);

	console.log(chalk.green("Create Breitling collections"));
	await fillScriptBreitlingCollection.createCollections(1, 1, () => breitlingCollection);
	await delay(delayTime);

	console.log(chalk.green("Create Breitling watch assets"));
	await fillScriptBreitlingCollection.createAssets(2, 40, 1, () => {
		return [breitlingWatch1, breitlingWatch2, breitlingWatch3][faker.random.number({ max: 2, min: 0 })];
	});

	await delay(delayTime);

	console.log(chalk.green("Create Breitling auctions"));
	await fillScriptBreitlingCollection.createAuctions(2, 12);

	await delay(delayTime);

	console.log(chalk.green("Create Breitling bids"));
	await fillScriptBreitlingCollection.createBids(15, 5);

	await delay(delayTime);

	console.log(chalk.green("Create Breitling trades"));
	await fillScriptBreitlingCollection.createTrades();

	await delay(delayTime);

	/** Nascar collection fill script */

	const fillScriptNascarCollection = new FillScript(passphrasesFile.secrets, passphrasesFile.secrets[3]);

	console.log(chalk.green("Create Nascar collections"));
	await fillScriptNascarCollection.createCollections(1, 1, () => nascarCollection);
	await delay(delayTime);

	console.log(chalk.green("Create Nascar assets"));
	await fillScriptNascarCollection.createAssets(2, 40, 1, () => nascarAsset);

	await delay(delayTime);

	console.log(chalk.green("Create Nascar auctions"));
	await fillScriptNascarCollection.createAuctions(2, 15);

	await delay(delayTime);

	console.log(chalk.green("Create Nascar bids"));
	await fillScriptNascarCollection.createBids(15, 5);

	await delay(delayTime);

	console.log(chalk.green("Create Nascar trades"));
	await fillScriptNascarCollection.createTrades();

	await delay(delayTime);

	/** IWC collection fill script */

	const fillScriptIWCCollection = new FillScript(passphrasesFile.secrets, passphrasesFile.secrets[4]);

	console.log(chalk.green("Create IWC collections"));
	await fillScriptIWCCollection.createCollections(1, 1, () => IWCCollection);
	await delay(delayTime);

	console.log(chalk.green("Create IWC assets"));
	await fillScriptIWCCollection.createAssets(2, 40, 1, () => IWCAsset);

	await delay(delayTime);

	console.log(chalk.green("Create IWC auctions"));
	await fillScriptIWCCollection.createAuctions(2, 13);

	await delay(delayTime);

	console.log(chalk.green("Create IWC bids"));
	await fillScriptIWCCollection.createBids(15, 8);

	await delay(delayTime);

	console.log(chalk.green("Create IWC trades"));
	await fillScriptIWCCollection.createTrades();

	await delay(delayTime);

	/** Nascar team fill script */
	const nascarTeamScriptType = new FillScript(passphrasesFile.secrets, passphrasesFile.secrets[5]);

	console.log(chalk.green("Create Nascar Team collection"));
	await nascarTeamScriptType.createCollections(1, 1, () => {
		return nascarTeamCollection;
	});

	await delay(delayTime);

	console.log(chalk.green("Create Nascar Team assets"));
	await nascarTeamScriptType.createAssets(3, 40, 1, () => {
		return [nascarTeam1, nascarTeam2, nascarTeam3, nascarTeam4, nascarTeam5][
			faker.random.number({ max: 4, min: 0 })
		];
	});

	await delay(delayTime);

	console.log(chalk.green("Create Nascar Team auctions"));
	await nascarTeamScriptType.createAuctions(2, 17);

	await delay(delayTime);

	console.log(chalk.green("Create Nascar Team bids"));
	await nascarTeamScriptType.createBids(13, 10);

	await delay(delayTime);

	console.log(chalk.green("Create Nascar Team trades"));
	await nascarTeamScriptType.createTrades();

	await delay(delayTime);

	/** Nascar Hero Cards fill script */
	const nascarHeroCardsScriptType = new FillScript(passphrasesFile.secrets, passphrasesFile.secrets[6]);

	console.log(chalk.green("Create Nascar Hero Cards collection"));
	await nascarHeroCardsScriptType.createCollections(1, 1, () => nascarHeroCardsCollection);

	await delay(delayTime);

	console.log(chalk.green("Create Nascar Hero Cards assets"));
	await nascarHeroCardsScriptType.createAssets(3, 40, 1, () => {
		const heroCard = [nascarHeroCard1, nascarHeroCard3, nascarHeroCard4][faker.random.number({ max: 2, min: 0 })];

		heroCard!.issuedDate = faker.date.between("2015-1-1", "2020-11-25").toISOString().slice(0, 10);
		heroCard!.issuedLocation = faker.address.state();
		heroCard!.signed = faker.random.boolean();

		return heroCard;
	});

	await delay(delayTime);

	console.log(chalk.green("Create Nascar Hero Cards auctions"));
	await nascarHeroCardsScriptType.createAuctions(2, 5);

	await delay(delayTime);

	console.log(chalk.green("Create Nascar Hero Cards bids"));
	await nascarHeroCardsScriptType.createBids(3, 3);

	await delay(delayTime);

	console.log(chalk.green("Create Nascar Hero Cards trades"));
	await nascarHeroCardsScriptType.createTrades();

	await delay(delayTime);

	/** AREX fill script */
	const arexScriptType = new FillScript(passphrasesFile.secrets, passphrasesFile.secrets[7]);

	console.log(chalk.green("AREX collection"));
	await arexScriptType.createCollections(1, 1, () => arexCollection);

	await delay(delayTime);

	console.log(chalk.green("AREX assets"));
	await arexScriptType.createAssets(1, 40, 1, () => {
		const arexWeapons = [alpha, delta, zero1CP, zero1S, zero1T, zero1TC];
		const selected = arexWeapons[faker.random.number({ max: arexWeapons.length - 1, min: 0 })];

		selected!.serialNumber = faker.random.uuid();

		return selected;
	});

	await delay(delayTime);

	console.log(chalk.green("AREX auctions"));
	await arexScriptType.createAuctions(1, 3);

	await delay(delayTime);

	console.log(chalk.green("AREX bids"));
	await arexScriptType.createBids(5, 2);

	await delay(delayTime);

	console.log(chalk.green("AREX trades"));
	await arexScriptType.createTrades();

	await delay(delayTime);
};
