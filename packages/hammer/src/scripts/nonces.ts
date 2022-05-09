import { Identities, Utils } from "@cauriland/crypto";
import { CauriHubConnection } from "@caurihub/client";

export const getNonce = async (client: CauriHubConnection, passphrase: string): Promise<Utils.BigNumber> => {
	const senderWallet = await client.api("wallets").get(Identities.Address.fromPassphrase(passphrase));
	return Utils.BigNumber.make(senderWallet.body.data.nonce);
};

export const getNextNonce = async (client: CauriHubConnection, passphrase: string): Promise<Utils.BigNumber> => {
	const nonce = await getNonce(client, passphrase);
	return nonce.plus(1);
};
