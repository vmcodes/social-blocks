import { Wallet } from 'ethers';

export async function newAccount() {
  const wallet = Wallet.createRandom();

  const account = {
    privateKey: wallet.privateKey,
    publicKey: wallet.publicKey,
    address: wallet.address,
  };

  return {
    address: wallet.address,
    mnemonic: wallet.mnemonic.phrase,
    account: JSON.stringify(account),
  };
}
