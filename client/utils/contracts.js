import { ethers } from 'ethers';
import { getContractObj } from '.';

export function isAddress(address) {
  try {
    ethers.utils.getAddress(address);
  } catch (e) {
    return false;
  }
  return true;
}

export function toEth(amount) {
  return ethers.utils.formatEther(String(amount), { commify: true });
}

export function toWei(amount) {
  return ethers.utils.parseEther(String(amount));
}

/**
 * Governance Token Contract Management
 */
export async function getTotalSupply(provider) {
  const contractObj = getContractObj(provider);
  const totalSupply = await contractObj.totalSupply(0);
  console.log('totalSupply', totalSupply);
  return Number(totalSupply);
}

export async function getMaxSupply(provider) {
  const contractObj = getContractObj(provider);
  if (contractObj) {
    const maxSupply = await contractObj.maxSupply();
    return Number(maxSupply);
  }
  return 0;
}

export async function getMintedStatus(account, provider) {
  const contractObj = getContractObj(provider);
  if (contractObj) {
    const isMinted = await contractObj.isMinted(account);
    return isMinted;
  }
  return false;
}

export async function mint(provider) {
  const contractObj = getContractObj(provider);
  try {
    const price = await contractObj.price();

    const tx = await contractObj.mint({ value: price });
    const receipt = await tx.wait(2);
    if (receipt.confirmations) {
      return tx.hash;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
}
