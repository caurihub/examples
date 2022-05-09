import { Interfaces, Utils } from "@cauriland/crypto";
import { CauriHubConnection } from "@caurihub/client";
import { Interfaces as NFTBaseInterfaces } from "@caurihub/nft-base-crypto";
import faker from "faker";

import { configurations } from "../configurations";
import { createAsset, createAuction, createBid, createCollection, createTrade } from "../creation";
import { getNextNonce, getNonce } from "./nonces";

export class FillScript {
	public client: CauriHubConnection;
	public mainPassphrase: string;

	public collections: string[] = [];
	public assets: string[] = [];
	public auctions: string[] = [];
	public auctionBids: Map<string, string[]> = new Map<string, string[]>();

	public constructor(public readonly passphrases: string[], mainPassphrase?: string) {
		this.client = new CauriHubConnection(configurations.clientHost);
		this.mainPassphrase =
			mainPassphrase || this.passphrases[faker.datatype.number({ max: this.passphrases.length - 1, min: 0 })]!;
	}

	public async createCollection(collection: () => NFTBaseInterfaces.NFTCollectionAsset) {
		const nonce = await getNextNonce(this.client, this.mainPassphrase);
		const transaction = createCollection(collection(), nonce.toFixed(), this.mainPassphrase);
		const broadcastResponse = await this.client.api("transactions").create({ transactions: [transaction] });

		console.log(JSON.stringify(broadcastResponse.body.data, null, 4));
		for (const collectionId of broadcastResponse.body.data.accept) {
			this.collections.push(collectionId);
		}
	}

	public async createCollections(
		numberOfBatches: number,
		numberOfTransactionsPerBatch: number,
		collection: () => NFTBaseInterfaces.NFTCollectionAsset,
	): Promise<void> {
		let nonce = await getNonce(this.client, this.mainPassphrase);
		for (let i = 0; i < numberOfBatches; i++) {
			const transactions: Interfaces.ITransactionJson[] = [];
			for (let i = 1; i < numberOfTransactionsPerBatch + 1; i++) {
				nonce = nonce.plus(1);
				transactions.push(createCollection(collection(), nonce.toFixed(), this.mainPassphrase));
			}

			const broadcastResponse = await this.client.api("transactions").create({ transactions: transactions });
			console.log(JSON.stringify(broadcastResponse.body.data, null, 4));
			for (const collectionId of broadcastResponse.body.data.accept) {
				this.collections.push(collectionId);
			}
		}
	}
	public async createAssets(
		batchs: number,
		transactionsPerBatch: number,
		collectionsUsed: number,
		attributes: () => any,
	): Promise<void> {
		let nonce = await getNonce(this.client, this.mainPassphrase);
		for (let j = 0; j < collectionsUsed; j++) {
			for (let i = 0; i < batchs; i++) {
				const transactions: Interfaces.ITransactionJson[] = [];
				for (let i = 1; i < transactionsPerBatch + 1; i++) {
					nonce = nonce.plus(1);
					transactions.push(
						createAsset(
							{
								collectionId: this.collections[j]!,
								attributes: attributes(),
							},
							nonce.toFixed(),
							this.mainPassphrase,
						),
					);
				}

				const broadcastResponse = await this.client.api("transactions").create({ transactions: transactions });
				console.log(JSON.stringify(broadcastResponse.body.data, null, 4));
				for (const assetId of broadcastResponse.body.data.accept) {
					this.assets.push(assetId);
				}
			}
		}
	}
	public async createAuctions(assetsPerAuction: number, auctions: number): Promise<void> {
		let nonce = await getNonce(this.client, this.mainPassphrase);
		const clonedAssets = [...this.assets];
		for (let i = 0; i < auctions; i++) {
			const transactions: Interfaces.ITransactionJson[] = [];
			nonce = nonce.plus(1);
			transactions.push(
				createAuction(
					{
						nftIds: clonedAssets.splice(0, assetsPerAuction),
						startAmount: Utils.BigNumber.make("1"),
						expiration: {
							blockHeight: 10000000000,
						},
					},
					nonce.toFixed(),
					this.mainPassphrase,
				),
			);

			const broadcastResponse = await this.client.api("transactions").create({ transactions: transactions });
			console.log(JSON.stringify(broadcastResponse.body.data, null, 4));
			for (const auctionId of broadcastResponse.body.data.accept) {
				this.auctions.push(auctionId);
			}
		}
	}
	public async createBids(bidsPerAuction: number, auctionsToBid: number): Promise<void> {
		for (let i = 0; i < auctionsToBid; i++) {
			for (let j = 0; j < bidsPerAuction; j++) {
				const pass = this.passphrases[faker.datatype.number({ max: this.passphrases.length - 1, min: 0 })];
				const transactions: Interfaces.ITransactionJson[] = [];
				const nonce = await getNextNonce(this.client, this.mainPassphrase);
				transactions.push(
					createBid(
						{
							bidAmount: Utils.BigNumber.make(faker.datatype.number({ max: 1000000, min: 2 }).toString()),
							auctionId: this.auctions[i]!,
						},
						nonce.toFixed(),
						pass!,
					),
				);
				const broadcastResponse = await this.client.api("transactions").create({ transactions: transactions });
				console.log(JSON.stringify(broadcastResponse.body.data, null, 4));
				for (const bidId of broadcastResponse.body.data.accept) {
					let entry = this.auctionBids.get(this.auctions[i]!);
					if (!entry) {
						entry = [];
					}
					entry.push(bidId);
					this.auctionBids.set(this.auctions[i]!, entry);
				}
			}
		}
	}

	public async createTrades(): Promise<void> {
		let nonce = await getNonce(this.client, this.mainPassphrase);
		for (const [key, value] of this.auctionBids) {
			const transactions: Interfaces.ITransactionJson[] = [];
			nonce = nonce.plus(1);
			transactions.push(
				createTrade(
					{
						auctionId: key,
						bidId: value[faker.datatype.number({ max: value.length - 1, min: 0 })]!,
					},
					nonce.toFixed(),
					this.mainPassphrase,
				),
			);

			const broadcastResponse = await this.client.api("transactions").create({ transactions: transactions });
			console.log(JSON.stringify(broadcastResponse.body.data, null, 4));
		}
	}
}
