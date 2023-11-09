import { InternalServerErrorException } from '@nestjs/common';
import { Network, Alchemy, Utils } from 'alchemy-sdk';

export async function estimateGas(
  _senderAddress: string,
  _receiverAddress: string,
  _amount: string,
  _settings,
) {
  const alchemy = new Alchemy(_settings);

  let chainId = null;

  switch (_settings.network) {
    case Network.ETH_SEPOLIA:
      chainId = 11155111;
      break;

    case Network.MATIC_MUMBAI:
      chainId = 80001;
      break;

    case Network.BASE_GOERLI:
      chainId = 84531;
      break;
  }

  try {
    const transaction = {
      from: _senderAddress,
      to: _receiverAddress,
      value: Utils.parseEther(_amount),
      type: 2,
      chainId: chainId,
    };

    const gas = await alchemy.core.estimateGas(transaction);

    return Utils.formatUnits(gas, 'gwei');
  } catch (e) {
    console.log(e);
    throw new InternalServerErrorException();
  }
}
