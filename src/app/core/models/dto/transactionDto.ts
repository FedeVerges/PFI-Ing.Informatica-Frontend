import { BlockchainTransactionDto } from './blockchainTransactionDto';
import { CertificateEth } from './blockchain/certificateEth';

export interface TransactionDto {
  receipt: BlockchainTransactionDto;
  certificate: CertificateEth;
  status: string;
}
