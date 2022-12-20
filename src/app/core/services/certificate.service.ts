import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BlockchainTransactionDto } from '../models/dto/blockchainTransactionDto';
import { CertificateDto } from '../models/dto/certificateDto';
import { TransactionDto } from '../models/dto/transactionDto';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  constructor(private http: HttpClient) {}

  getAllCertificates() {
    return this.http.get<CertificateDto>(
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

  getAllInstitutions() {}
  getCertificateTypes() {}

  getAllDegrees() {}

  createNewCertificate(certificate: CertificateDto) {
    return this.http.post<TransactionDto>(
      environment.serverURL + `/certificate/new`,
      certificate
    );
  }
}
