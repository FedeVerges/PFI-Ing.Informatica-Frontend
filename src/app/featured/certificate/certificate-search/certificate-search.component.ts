import { Component, OnInit } from '@angular/core';
import { Certificate } from 'crypto';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';
import { AlertService } from 'src/app/core/services/alert.service';
import { CertificateService } from 'src/app/core/services/certificate.service';

@Component({
  selector: 'app-certificate-search',
  templateUrl: './certificate-search.component.html',
  styleUrls: ['./certificate-search.component.scss']
})
export class CertificateSearchComponent implements OnInit {
  certificateId?: number;
  amountCertificates: number = 0;
  certificateSearchResult?: BlockchainTransactionDto;
  certificates: Certificate[] = [];
  hasResult = true;

  constructor(
    private certificateService: CertificateService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  getCertificatesById(id?: number) {
    if (id) {
      this.certificateService.getCertificatesById(String(id)).subscribe({
        next: (result) => {
          this.certificateSearchResult = result;
          this.hasResult = !!result;
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
