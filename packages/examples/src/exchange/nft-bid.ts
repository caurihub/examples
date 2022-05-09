import { Identities, Managers, Transactions, Utils } from "@cauriland/crypto";
import { CauriHubConnection } from "@caurihub/client";
import { Builders, Transactions as NFTTransactions } from "@caurihub/nft-exchange-crypto";

export const NFTBid = async () => {
	// Configure manager and register transaction type
	Managers.configManager.setFromPreset("testnet");
	Managers.configManager.setHeight(2);
	Transactions.TransactionRegistry.registerTransactionType(NFTTransactions.NFTBidTransaction);

	// Configure our API client
	const client = new CauriHubConnection("https://devnet-explorer.caurihub.sh/api");
	const passphrase = "give income reflect velvet derive train sudden panic quit video fancy enlist";

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
	const transaction = new Builders.NFTBidBuilder()
		.NFTBidAsset({
			bidAmount: Utils.BigNumber.make("1100"),
			auctionId: "f5e4af457f339baf40d09a435713a37cf61319c8c7585a35b12c1c660482b2e3",
		})
		.nonce(senderNonce.toFixed())
		.sign(passphrase);

	// Step 3: Broadcast the transaction
	const broadcastResponse = await client.api("transactions").create({ transactions: [transaction.build().toJson()] });

	// Step 4: Log the response
	console.log(broadcastResponse.body)
	console.log(JSON.stringify(broadcastResponse.body.data, null, 4));
};

void NFTBid();
