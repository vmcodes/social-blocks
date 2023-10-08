import { IsString, Length } from 'class-validator';

export class NFT {
  @IsString()
  contract: string;

  @IsString()
  token: string;

  @IsString()
  network: string;
}

type Network = 'sepolia' | 'matic-mumbai';

export class Transfer {
  @Length(42)
  receiver: string;

  @IsString()
  contract: string;

  @IsString()
  token: string;

  @IsString()
  tokenType: string;

  @IsString()
  network: Network;
}
