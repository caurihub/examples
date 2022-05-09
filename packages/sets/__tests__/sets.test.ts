import "jest-extended";

import { Managers, Transactions } from "@cauriland/crypto";
import { Builders, Transactions as NFTTransactions } from "@caurihub/nft-base-crypto";

import * as Data from "../src";

describe("Test CauriHub Sets", () => {
	it("should loop through data and verify that all data is exported correctly", () => {
		expect(Data).not.toBeUndefined();

		for (const set of Object.keys(Data)) {
			const dataSet = Data[set];
			expect(dataSet.collection).not.toBeUndefined();

			for (const asset of Object.keys(dataSet.assets)) {
				expect(dataSet.assets[asset]).not.toBeUndefined();
			}
		}
	});

	it("should loop through data and verify if it compiles with crypto package", () => {
		Managers.configManager.setFromPreset("testnet");
		Managers.configManager.setHeight(2);

		Transactions.TransactionRegistry.registerTransactionType(NFTTransactions.NFTRegisterCollectionTransaction);
		Transactions.TransactionRegistry.registerTransactionType(NFTTransactions.NFTCreateTransaction);

		for (const set of Object.keys(Data)) {
			const dataSet = Data[set];

			const nftRegisterCollection = new Builders.NFTRegisterCollectionBuilder()
				.NFTRegisterCollectionAsset(dataSet.collection)
				.nonce("1")
				.sign("clay harbor enemy utility margin pretty hub comic piece aerobic umbrella acquire");

			expect(nftRegisterCollection.build().verified).toBeTrue();
			expect(nftRegisterCollection.verify()).toBeTrue();

			for (const asset of Object.keys(dataSet.assets)) {
				const nftCreate = new Builders.NFTCreateBuilder()
					.NFTCreateToken({
						collectionId: "8846C7DFD9AFAAE458394148C523BE5F7DEBE1A589CEF8B4B18ED309EF4AB242",
						attributes: dataSet.assets[asset],
					})
					.nonce("1")
					.sign("clay harbor enemy utility margin pretty hub comic piece aerobic umbrella acquire");

				expect(nftCreate.build().verified).toBeTrue();
				expect(nftCreate.verify()).toBeTrue();
			}
		}
	});
});
