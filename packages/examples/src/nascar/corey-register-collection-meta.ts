import { Identities, Managers, Transactions, Utils } from "@cauriland/crypto";
import { CauriHubConnection } from "@caurihub/client";
import { Builders, Transactions as NFTTransactions } from "@caurihub/nft-base-crypto";

export const CoreyRegisterCollectionMeta = async (): Promise<void> => {
	// Configure manager and register transaction type
	Transactions.TransactionRegistry.registerTransactionType(NFTTransactions.NFTRegisterCollectionTransaction);

	// Configure our API client
	const client = new CauriHubConnection("https://explorer.caurihub.sh/api");
	const passphrase = "rhythm weird nephew cruise barrel hazard humble doll habit similar cushion color";

	// Configure manager and register transaction type
	const configs = await client.api("node").crypto();
	const {
		body: {
			data: {
				block: { height },
			},
		},
	} = await client.get("blockchain");

	Managers.configManager.setConfig({
		network: configs.body.data.network,
		milestones: configs.body.data.milestones,
		genesisBlock: Managers.configManager.getPreset("devnet").genesisBlock,
		exceptions: configs.body.data.exceptions,
	});
	Managers.configManager.setHeight(height);

	// Step 1: Retrieve the nonce of the sender wallet
	const senderWallet = await client.api("wallets").get(Identities.Address.fromPassphrase(passphrase));
	const senderNonce = Utils.BigNumber.make(senderWallet.body.data.nonce).plus(1);

	// Step 2: Create the transaction
	const transaction = new Builders.NFTRegisterCollectionBuilder()
		.NFTRegisterCollectionAsset({
			name: "NASCAR - Corey LaJoie collection",
			description: "NASCAR - Corey LaJoie collection",
			maximumSupply: 1000000,
			jsonSchema: {
				type: "object",
				properties: {
					ipfsHashImageFront: {
						type: "string",
						maxLength: 120,
						minLength: 1,
					},
					title: {
						type: "string",
						maxLength: 50,
						minLength: 1,
					},
					subtitle: {
						type: "string",
						maxLength: 50,
						minLength: 1,
					},
					issuedDate: {
						type: "string",
						format: "date",
					},
					carNumber: {
						type: "string",
						maxLength: 120,
						minLength: 1,
					},
					season: {
						type: "string",
						maxLength: 120,
						minLength: 1,
					},
					description: {
						type: "string",
						maxLength: 2500,
						minLength: 1,
					},
					issuedLocation: {
						type: "string",
						maxLength: 255,
						minLength: 1,
					},
					issuedLocationLat: {
						type: "number",
					},
					issuedLocationLng: {
						type: "number",
					},
					issuedAddress: {
						type: "string",
						maxLength: 500,
						minLength: 1,
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
			},
			metadata: {
				ipfsHashImageFront: "QmSFmpVbtCsg6h1HGgrvuTprwziHknsRnuzGT8QMDyeFBR",
				title: "Corey LaJoie",
				subtitle: "Go Fas Racing",
				issuedDate: "2021-04-09",
				carNumber: "#23",
				season: "2020",
				description:
					"Corey LaJoie is a renowned name in the racing world and he will be driving the No. 7 Chevrolet full-time in the 2021 NASCAR Cup Series season. Corey is a third-generation racer and has an established racer pedigree - his grandfather, Don LaJoie, is a member of the New England Auotracing hall of fame.His father, Randy LaJoie, is also a member of the New England Auotracing hall of fame and he won the Xfinity Series Championships in both 1996 and 1997.",
				issuedLocation: "Daytona International Speedway",
				issuedLocationLat: 29.1854,
				issuedLocationLng: 81.069267,
				issuedAddress: "1801 W International Speedway Blvd, Daytona Beach, FL 32114, United States",
				tags: ["limited"],
			},
		})
		.nonce(senderNonce.toFixed())
		.sign(passphrase);

	// Step 3: Broadcast the transaction
	const broadcastResponse = await client.api("transactions").create({ transactions: [transaction.build().toJson()] });

	// Step 4: Log the response
	console.log(JSON.stringify(broadcastResponse.body.data, null, 4));
};
