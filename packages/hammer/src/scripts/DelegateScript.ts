import { Identities, Interfaces } from "@cauriland/crypto";
import { CauriHubConnection } from "@caurihub/client";

import { configurations } from "../configurations";
import { createDelegate, resignDelegate } from "../creation";

export class DelegateScript {
	public client = new CauriHubConnection(configurations.clientHost);

	public constructor(public readonly passphrase: string) {}

	public async createDelegate(delegateName: string) {
		const wallet = await this.client.api("wallets").get(Identities.Address.fromPassphrase(this.passphrase));

		const nonce = +wallet.body.data.nonce + 1;

		const delegate = createDelegate(delegateName, nonce.toString(), this.passphrase);

		const broadcastResponse = await this.client.api("transactions").create({ transactions: [delegate] });
		console.log(JSON.stringify(broadcastResponse.body.data, null, 4));
		if (!broadcastResponse.body.data.accept.includes(delegate.id!)) {
			throw new Error("Error creating delegate");
		}
	}

	public async resignDelegate() {
		const wallet = await this.client.api("wallets").get(Identities.Address.fromPassphrase(this.passphrase));

		const nonce = +wallet.body.data.nonce + 1;

		const delegate = resignDelegate(nonce.toString(), this.passphrase);

		const broadcastResponse = await this.client.api("transactions").create({ transactions: [delegate] });
		console.log(JSON.stringify(broadcastResponse.body.data, null, 4));
	}
}
