import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Certificate } from 'src/app/core/models/certificate';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';
import { AlertService } from 'src/app/core/services/alert.service';
import { CertificateService } from 'src/app/core/services/certificate.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-certificate-validator',
  templateUrl: './certificate-validator.component.html',
  styleUrls: ['./certificate-validator.component.scss']
})
export class CertificateValidatorComponent implements OnInit {
  certificateId?: number;
  amountCertificates: number = 0;
  certificateSearchResult?: BlockchainTransactionDto;
  certificates: Certificate[] = [];
  hasResult = true;
  str: string;
  certificate?: BlockchainTransactionDto;

  constructor(
    private activatedRoute: ActivatedRoute,
    private certificateService: CertificateService,
    private alertService: AlertService
  ) {
    debugger;
    const encodedWord = CryptoJS.enc.Base64.parse(
      this.activatedRoute.snapshot.params['certificate']
    );
    this.str = CryptoJS.enc.Utf8.stringify(encodedWord);
    const certificate = JSON.parse(this.str) as BlockchainTransactionDto;
    if (certificate?.certificateBlockchainId) {
      this.getCertificatesByStudentId(certificate?.certificateBlockchainId);
    }
  }

  ngOnInit(): void {}

  getCertificatesByStudentId(id?: number) {
    if (id) {
      this.certificateService.getCertificatesById(String(id)).subscribe({
        next: (result) => {
          this.certificate = result;
        },
        error: (e) => {
          this.alertService.showErrorMessage(e);
        }
      });
    } else {
      throw new Error('Id nulo');
    }
  }
}
