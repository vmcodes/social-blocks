import { GOERLI_RPC, MUMBAI_RPC, SEPOLIA_RPC } from '../constants';

export const rpcFilter = (network: string) => {
  let RPC = null;

  switch (network) {
    case 'sepolia':
      RPC = SEPOLIA_RPC;
      break;
    case 'matic-mumbai':
      RPC = MUMBAI_RPC;
      break;
    case 'optimism-goerli':
      RPC = GOERLI_RPC;
      break;
    default:
      break;
  }

  return RPC;
};
