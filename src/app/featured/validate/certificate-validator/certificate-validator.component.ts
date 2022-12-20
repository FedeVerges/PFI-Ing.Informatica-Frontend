import { Component, OnInit } from '@angular/core';
import { Certificate } from 'src/app/core/models/certificate';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';
import { CertificateDto } from 'src/app/core/models/dto/certificateDto';
import { AlertService } from 'src/app/core/services/alert.service';
import { CertificateService } from 'src/app/core/services/certificate.service';
import { Web3Service } from 'src/app/core/services/web3.service';

@Component({
  selector: 'app-certificate-validator',
  templateUrl: './certificate-validator.component.html',
  styleUrls: ['./certificate-validator.component.scss']
})
export class CertificateValidatorComponent implements OnInit {
  certificateId: number = 0;
  amountCertificates: number = 0;
  certificateSearchResult?: BlockchainTransactionDto;
  certificates: Certificate[] = [];

  constructor(
    private certificateService: CertificateService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  getCertificatesByStudentId(id: number) {
    this.certificateService.getCertificatesById(String(id)).subscribe({
      next: (result) => {
        this.certificateSearchResult = result;
      },
      error: (e) => {
        this.alertService.showErrorMessage(e);
      }
    });
  }
}
