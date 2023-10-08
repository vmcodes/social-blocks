import { InternalServerErrorException } from '@nestjs/common';
import { GOERLI_KEY, MUMBAI_KEY, SEPOLIA_KEY } from '../constants';
import { Network } from 'alchemy-sdk';

export const networkFilter = (network: string) => {
  let NETWORK_KEY = null;
  let NETWORK = null;

  switch (network) {
    case 'sepolia':
      NETWORK_KEY = SEPOLIA_KEY;
      NETWORK = Network.ETH_SEPOLIA;
      break;
    case 'matic-mumbai':
      NETWORK_KEY = MUMBAI_KEY;
      NETWORK = Network.MATIC_MUMBAI;
      break;
    case 'optimism-goerli':
      NETWORK_KEY = GOERLI_KEY;
      NETWORK = Network.OPT_GOERLI;
      break;
    default:
      throw new InternalServerErrorException();
  }

  const settings = {
    apiKey: NETWORK_KEY,
    network: NETWORK,
  };

  return settings;
};
