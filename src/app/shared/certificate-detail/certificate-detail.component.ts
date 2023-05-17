import { Component, Input } from '@angular/core';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';

@Component({
  selector: 'app-certificate-detail',
  templateUrl: './certificate-detail.component.html',
  styleUrls: ['./certificate-detail.component.scss']
})
export class CertificateDetailComponent {
  @Input() certificate: BlockchainTransactionDto | undefined;

  constructor() {}
}
