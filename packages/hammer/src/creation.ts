import { Interfaces, Transactions } from "@cauriland/crypto";
import { Builders as NFTBaseBuilders, Interfaces as NFTBaseInterfaces } from "@caurihub/nft-base-crypto";
import { Builders as NFTExchangeBuilders, Interfaces as NFTExchangeInterfaces } from "@caurihub/nft-exchange-crypto";

export const createTransfer = (
	address: string,
	tokens: number,
	nonce: string,
	passphrase: string,
): Interfaces.ITransactionJson => {
	return Transactions.BuilderFactory.transfer()
		.recipientId(address)
		.amount(tokens.toString())
		.nonce(nonce)
		.sign(passphrase)
		.build()
		.toJson();
};

export const createDelegate = (username: string, nonce: string, passphrase: string): Interfaces.ITransactionJson => {
	return Transactions.BuilderFactory.delegateRegistration()
		.usernameAsset(username)
		.nonce(nonce)
		.sign(passphrase)
		.build()
		.toJson();
};

export const resignDelegate = (nonce: string, passphrase: string): Interfaces.ITransactionJson => {
	return Transactions.BuilderFactory.delegateResignation().nonce(nonce).sign(passphrase).build().toJson();
};

export const createCollection = (
	collection: NFTBaseInterfaces.NFTCollectionAsset,
	nonce: string,
	passphrase: string,
): Interfaces.ITransactionJson => {
	return new NFTBaseBuilders.NFTRegisterCollectionBuilder()
		.NFTRegisterCollectionAsset(collection)
		.nonce(nonce)
		.sign(passphrase)
		.build()
		.toJson();
};

export const createAsset = (
	asset: NFTBaseInterfaces.NFTTokenAsset,
	nonce: string,
	passphrase: string,
): Interfaces.ITransactionJson => {
	return new NFTBaseBuilders.NFTCreateBuilder().NFTCreateToken(asset).nonce(nonce).sign(passphrase).build().toJson();
};

export const createAuction = (
	asset: NFTExchangeInterfaces.NFTAuctionAsset,
	nonce: string,
	passphrase: string,
): Interfaces.ITransactionJson => {
	return new NFTExchangeBuilders.NFTAuctionBuilder()
		.NFTAuctionAsset(asset)
		.nonce(nonce)
		.sign(passphrase)
		.build()
		.toJson();
};

export const createBid = (
	asset: NFTExchangeInterfaces.NFTBidAsset,
	nonce: string,
	passphrase: string,
): Interfaces.ITransactionJson => {
	return new NFTExchangeBuilders.NFTBidBuilder().NFTBidAsset(asset).nonce(nonce).sign(passphrase).build().toJson();
};

export const createTrade = (
	asset: NFTExchangeInterfaces.NFTAcceptTradeAsset,
	nonce: string,
	passphrase: string,
): Interfaces.ITransactionJson => {
	return new NFTExchangeBuilders.NftAcceptTradeBuilder()
		.NFTAcceptTradeAsset(asset)
		.nonce(nonce)
		.sign(passphrase)
		.build()
		.toJson();
};
