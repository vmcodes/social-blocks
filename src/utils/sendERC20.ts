import { erc20 } from './erc20Abi';
import { getDefaultProvider, Contract, Wallet } from 'ethers';
import { decryptData } from './crypto';

export async function sendERC20(
  _senderAccount: string,
  _receiverAddress: string,
  _contractAddress: string,
  _amount: string,
  _network: string,
) {
  const provider = getDefaultProvider(_network);

  const account = decryptData(_senderAccount);
  const accountData = JSON.parse(account);
  const _privateKey = accountData.privateKey;
  const signer = new Wallet(_privateKey, provider);

  const signedContract = new Contract(_contractAddress, erc20, signer);

  await signedContract.approve(accountData.address, parseFloat(_amount), {
    gasLimit: '100000',
  });

  const safeTransfer = await signedContract.transferFrom(
    accountData.address,
    _receiverAddress,
    parseFloat(_amount),
    {
      gasLimit: '100000',
    },
  );

  safeTransfer.wait(1);

  return safeTransfer.hash;
}
