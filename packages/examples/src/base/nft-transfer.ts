import { Identities, Managers, Transactions, Utils } from "@cauriland/crypto";
import { CauriHubConnection } from "@caurihub/client";
import { Builders, Transactions as NFTTransactions } from "@caurihub/nft-base-crypto";

export const NFTTransfer = async () => {
	// Configure manager and register transaction type
	Managers.configManager.setFromPreset("testnet");
	Managers.configManager.setHeight(2);
	Transactions.TransactionRegistry.registerTransactionType(NFTTransactions.NFTTransferTransaction);

	// Configure our API client
	const client = new CauriHubConnection("http://localhost:4303/api");
	const passphrase = "clay harbor enemy utility margin pretty hub comic piece aerobic umbrella acquire";

	// Step 1: Retrieve the nonce of the sender wallet
	const senderWallet = await client.api("wallets").get(Identities.Address.fromPassphrase(passphrase));
	const senderNonce = Utils.BigNumber.make(senderWallet.body.data.nonce).plus(1);

	// Step 2: Create the transaction
	const transaction = new Builders.NFTTransferBuilder()
		.NFTTransferAsset({
			recipientId: Identities.Address.fromPassphrase(passphrase),
			nftIds: ["7373bbe5524898faec40bfcd12c6161981771f3be6426404208784831f4b0d02"],
		})
		.nonce(senderNonce.toFixed())
		.sign(passphrase);

	// Step 3: Broadcast the transaction
	const broadcastResponse = await client.api("transactions").create({ transactions: [transaction.build().toJson()] });

	// Step 4: Log the response
	console.log(JSON.stringify(broadcastResponse.body.data, null, 4));
};
