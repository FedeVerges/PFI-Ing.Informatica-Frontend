import { CertificateEth } from './blockchain/certificateEth';

export interface BlockchainTransactionDto {
  transactionHash?: string;
  studentName: string;
  certificate?: CertificateEth; // Solo para cuando quiero mostrar toda la info del titulo.
  certificateBlockchainId?: number;
  status?: string;
  blockHash?: string;
  etherscanLink?: string;
  gasUsed?: number;
  dateCreated?: string;
  dateModified?: string;
}
