import { IsOptional, IsString, Length } from 'class-validator';

type Network = 'sepolia' | 'matic-mumbai' | 'optimism-goerli';

export class Transactions {
  @Length(42)
  address: string;

  @IsString()
  network: Network;
}

export class Payment {
  @Length(42)
  receiver: string;

  @IsString()
  amount: string;

  @IsString()
  network: Network;

  @IsOptional()
  contract?: string;
}
