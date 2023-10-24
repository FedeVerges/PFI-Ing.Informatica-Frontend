import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BlockchainTransactionDto } from '../models/dto/blockchainTransactionDto';
import { TransactionDto } from '../models/dto/transactionDto';
import { CertificateEth } from '../models/dto/blockchain/certificateEth';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  constructor(private http: HttpClient) {}

  getAllCertificates() {
    return this.http.get<CertificateEth[]>(
      environment.serverURL + `/certificate/all`
    );
  }

  getCertificatesByStudentId(studentId: string) {
    return this.http.get<BlockchainTransactionDto[]>(
      environment.serverURL + `/certificate/studentId/${studentId}`
    );
  }

  getCertificatesById(id: string) {
    return this.http.get<BlockchainTransactionDto>(
      environment.serverURL + `/certificate/${id}`
    );
  }

  getPdf(id: number) {
    return this.http.get(environment.serverURL + `/pdf/certificate/${id}`);
  }

  getAllTransactions() {
    return this.http.get<BlockchainTransactionDto[]>(
      environment.serverURL + `/transaction/all`
    );
  }

  createNewCertificate(certificate: CertificateEth) {
    return this.http.post<TransactionDto>(
      environment.serverURL + `/certificate/new`,
      certificate
    );
  }

  deleteCertificate(id: number) {
    return this.http.delete<any>(environment.serverURL + `/certificate/${id}`);
  }
}
