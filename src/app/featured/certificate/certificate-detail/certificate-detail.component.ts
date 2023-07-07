import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';
import { AlertService } from 'src/app/core/services/alert.service';
import { CertificateService } from 'src/app/core/services/certificate.service';

@Component({
  selector: 'app-certificate-detail-wrapper',
  templateUrl: './certificate-detail.component.html',
  styleUrls: ['./certificate-detail.component.scss']
})
export class CertificateDetailComponentWrapper implements OnInit {
  certificateId: number;
  certificate!: BlockchainTransactionDto;

  constructor(
    private activatedRoute: ActivatedRoute,
    private certificateService: CertificateService,
    private alertService: AlertService
  ) {
    this.certificateId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getCertificatesByStudentId(this.certificateId);
  }

  getCertificatesByStudentId(id?: number) {
    if (id) {
      this.certificateService.getCertificatesById(String(id)).subscribe({
        next: (result) => {
          if (
            result &&
            result.certificate?.id !== 0 &&
            result?.certificate?.student?.id !== 0
          )
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
