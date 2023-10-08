import { Wallet } from 'ethers';

export function restoreWallet(_mnemonic: string) {
  const wallet = Wallet.fromPhrase(_mnemonic);

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
