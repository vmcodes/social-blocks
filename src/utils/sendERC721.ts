import { InternalServerErrorException } from '@nestjs/common';
import { ETHERSCAN_KEY } from '../constants';
import { erc721 } from './tokenAbi';
import { getDefaultProvider, Contract, Wallet } from 'ethers';
import { decryptData } from './crypto';

export async function sendERC721(
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

    const signedContract = new Contract(_contractAddress, erc721, signer);

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

    const safeTransfer = await signedContract.transferFrom(
      accountData.address,
      _receiverAddress,
      _token,
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
