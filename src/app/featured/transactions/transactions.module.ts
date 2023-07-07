import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [TransactionsComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    MdbAccordionModule,
    SharedModule
  ]
})
export class TransactionsModule {}
