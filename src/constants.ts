import * as dotenv from 'dotenv';
dotenv.config();

export const MONGO_DB_URI = process.env.MONGO_URI;

export const ACCESS_SECRET = process.env.ACCESS_SECRET;

export const SECRET_KEY = process.env.SECRET_KEY;

export const SECRET_IV = process.env.SECRET_IV;

export const ENCRYPTION_METHOD = process.env.ENCRYPTION_METHOD;

export const SEPOLIA_KEY = process.env.SEPOLIA_KEY;

export const MUMBAI_KEY = process.env.MUMBAI_KEY;

export const GOERLI_KEY = process.env.GOERLI_KEY;

export const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;

export const PRIVATE_KEY = process.env.PRIVATE_KEY;

export const SEPOLIA_RPC = process.env.SEPOLIA_RPC;

export const MUMBAI_RPC = process.env.MUMBAI_RPC;

export const GOERLI_RPC = process.env.GOERLI_RPC;
