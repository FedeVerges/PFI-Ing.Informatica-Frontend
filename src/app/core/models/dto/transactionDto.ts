import { CertificateDto } from './certificateDto';
import {BlockchainTransactionDto} from "./blockchainTransactionDto";


export interface TransactionDto {
    receipt: BlockchainTransactionDto;
    certificate:CertificateDto;
    status:string;
}
