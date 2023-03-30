import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';
import { AlertService } from 'src/app/core/services/alert.service';
import { CertificateService } from 'src/app/core/services/certificate.service';

@Component({
  selector: 'app-certificate-detail',
  templateUrl: './certificate-detail.component.html',
  styleUrls: ['./certificate-detail.component.scss']
})
export class CertificateDetailComponent {
  @Input() certificate: BlockchainTransactionDto | undefined;

  constructor() {}
}
