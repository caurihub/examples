import { Identities, Managers, Transactions, Utils } from "@cauriland/crypto";
import { CauriHubConnection } from "@caurihub/client";

export const coreTransfer = async () => {
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
	const transaction = Transactions.BuilderFactory.transfer()
		.recipientId("PQSKQhcs5d7jKBUwKwCJTGq8XjosQ1oXZh")
		.amount("1000")
		.nonce(senderNonce.toFixed())
		.sign(passphrase);

	// Step 3: Broadcast the transaction
	const broadcastResponse = await client.api("transactions").create({ transactions: [transaction.build().toJson()] });

	// Step 4: Log the response
	console.log(JSON.stringify(broadcastResponse.body.data, null, 4));
};

void coreTransfer();
