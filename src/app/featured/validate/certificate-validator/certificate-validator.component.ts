import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';
import { AlertService } from 'src/app/core/services/alert.service';
import { CertificateService } from 'src/app/core/services/certificate.service';
import { Subscription } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-certificate-validator',
  templateUrl: './certificate-validator.component.html',
  styleUrls: ['./certificate-validator.component.scss']
})
export class CertificateValidatorComponent {
  certificate?: BlockchainTransactionDto;
  subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private certificateService: CertificateService,
    private alertService: AlertService
  ) {
    this.subscription = this.activatedRoute.params.subscribe({
      next: (params) => {
        const param = params['certificate'];
        if (param && param.length > 0) {
          const encodedWord = CryptoJS.enc.Base64.parse(param);
          const decodedParams = JSON.parse(
            CryptoJS.enc.Utf8.stringify(encodedWord)
          ) as {
            ceritificateBlockchainId: number;
          };
          this.getCertificatesById(decodedParams.ceritificateBlockchainId);
        } else {
          throw new Error('documento no valido.');
        }
      },
      error: (e) => console.error(e)
    });
  }

  getCertificatesById(certificateId: number) {
    if (certificateId) {
      this.certificateService
        .getCertificatesById(String(certificateId))
        .subscribe({
          next: (result) => {
            this.certificate = result;
          },
          error: (e) => {
            this.alertService.showErrorMessage(e);
          }
        });
    } else {
      throw new Error('documento nulo o sin id.');
    }
  }

  /**
   * @deprecated
   * @param certificateForValidate
   * @param storedCertificate
   * @returns
   */
  compareCertificateData(
    certificateForValidate: BlockchainTransactionDto,
    storedCertificate: BlockchainTransactionDto
  ): boolean {
    let ret = false;
    if (
      certificateForValidate !== null &&
      certificateForValidate.certificateBlockchainId &&
      certificateForValidate.certificate !== null
    ) {
      if (
        certificateForValidate.status === storedCertificate.status &&
        certificateForValidate.blockHash === storedCertificate.blockHash &&
        certificateForValidate.certificateBlockchainId ===
          storedCertificate.certificateBlockchainId &&
        certificateForValidate.dateCreated === storedCertificate.dateCreated &&
        certificateForValidate.transactionHash ===
          storedCertificate.transactionHash &&
        certificateForValidate.certificate?.waferNumber ===
          storedCertificate.certificate?.waferNumber
      ) {
        ret = true;
      }
    }
    return ret;
  }
}
