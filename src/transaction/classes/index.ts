import { IsString, Length } from 'class-validator';

type Network = 'sepolia' | 'matic-mumbai';

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
}
