import { erc1155 } from './nftAbi';
import { getDefaultProvider, Contract, Wallet } from 'ethers';
import { decryptData } from './crypto';

export async function sendERC1155(
  _senderAccount: string,
  _receiverAddress: string,
  _contractAddress: string,
  _token: string,
  _network: string,
) {
  const provider = getDefaultProvider(_network);

  const account = decryptData(_senderAccount);
  const accountData = JSON.parse(account);
  const _privateKey = accountData.privateKey;
  const signer = new Wallet(_privateKey, provider);

  const signedContract = new Contract(_contractAddress, erc1155, signer);

  await signedContract.setApprovalForAll(_contractAddress, true, {
    gasLimit: '100000',
  });

  const safeTransfer = await signedContract.safeTransferFrom(
    accountData.address,
    _receiverAddress,
    _token,
    1,
    '0x',
    {
      gasLimit: '1000000',
    },
  );

  safeTransfer.wait(1);

  return safeTransfer.hash;
}
