import { IsString } from 'class-validator';

export class RestoreWallet {
  @IsString()
  mnemonic: string;
}
