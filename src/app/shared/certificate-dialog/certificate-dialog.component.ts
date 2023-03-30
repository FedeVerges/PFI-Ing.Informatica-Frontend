import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';

@Component({
  selector: 'app-certificate-dialog',
  templateUrl: './certificate-dialog.component.html',
  styleUrls: ['./certificate-dialog.component.scss']
})
export class CertificateDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: BlockchainTransactionDto) {}

  ngOnInit(): void {}
}
