import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: BlockchainTransactionDto) {}

  ngOnInit(): void {}
}
