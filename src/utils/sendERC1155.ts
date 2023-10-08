import { InternalServerErrorException } from '@nestjs/common';
import { ETHERSCAN_KEY } from '../constants';
import { erc1155 } from './tokenAbi';
import { getDefaultProvider, Contract, Wallet } from 'ethers';
import { decryptData } from './crypto';

export async function sendERC1155(
  _senderAccount: string,
  _receiverAddress: string,
  _contractAddress: string,
  _token: string,
  _network: string,
) {
  try {
    const provider = getDefaultProvider(_network, {
      etherscan: ETHERSCAN_KEY,
    });

    const account = decryptData(_senderAccount);
    const accountData = JSON.parse(account);
    const _privateKey = accountData.privateKey;
    const signer = new Wallet(_privateKey, provider);

    const signedContract = new Contract(_contractAddress, erc1155, signer);

    if (
      !(await signedContract.isApprovedForAll(
        accountData.address,
        _contractAddress,
      ))
    ) {
      const setApprovalTransaction = await signedContract.setApprovalForAll(
        _contractAddress,
        true,
        {
          gasLimit: '1000000',
        },
      );

      await setApprovalTransaction.wait();
    }

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

    return safeTransfer.hash;
  } catch (e) {
    console.log(e);
    throw new InternalServerErrorException();
  }
}
