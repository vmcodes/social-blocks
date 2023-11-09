import { InternalServerErrorException } from '@nestjs/common';
import { Alchemy, Wallet, Utils } from 'alchemy-sdk';
import { Network } from 'alchemy-sdk';
import { decryptData } from './crypto';

export async function sendTokens(
  _senderAccount: string,
  _receiverAddress: string,
  _ethAmount: string,
  _settings,
) {
  try {
    const alchemy = new Alchemy(_settings);

    const account = decryptData(_senderAccount);
    const accountData = JSON.parse(account);
    const _privateKey = accountData.privateKey;
    const wallet = new Wallet(_privateKey);
    let chainId = null;

    switch (_settings.network) {
      case Network.ETH_SEPOLIA:
        chainId = 11155111;
        break;

      case Network.MATIC_MUMBAI:
        chainId = 80001;
        break;

      case Network.OPT_GOERLI:
        chainId = 420;
        break;
    }

    const transaction = {
      to: _receiverAddress,
      value: Utils.parseEther(_ethAmount),
      gasLimit: '100000',
      maxPriorityFeePerGas: Utils.parseUnits('5', 'gwei'),
      maxFeePerGas: Utils.parseUnits('20', 'gwei'),
      nonce: await alchemy.core.getTransactionCount(wallet.getAddress()),
      type: 2,
      chainId: chainId, // 1 Corresponds to ETH_MAINNET, 5 ETH_GOERLI
    };

    const rawTransaction = await wallet.signTransaction(transaction);
    const sendTransaction =
      await alchemy.transact.sendTransaction(rawTransaction);

    await alchemy.transact.waitForTransaction(sendTransaction.hash, 1);

    return sendTransaction.hash;
  } catch (e) {
    console.log(e);
    throw new InternalServerErrorException();
  }
}
