import { Contract } from '@ethersproject/contracts';
import { ethers } from 'ethers';
import ContractABI from '../contracts/contract.json';

export const currentNetwork = process.env.REACT_APP_NETWORK_ID;
export const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const rpcProvider = new ethers.providers.JsonRpcProvider(
  process.env.REACT_APP_RPC
);

export function getContractObj(provider) {
  if (!!provider) {
    return new Contract(contractAddress, ContractABI, provider);
  } else {
    return new Contract(contractAddress, ContractABI, rpcProvider);
  }
}
