import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { CertificateComponent } from './certificate/certificate.component';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { StudentComponent } from './student/student.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CertificateDetailComponent } from './certificate-detail/certificate-detail.component';
import { QRCodeModule } from 'angularx-qrcode';
import { MatDialogModule } from '@angular/material/dialog';
import { CertificateDialogComponent } from './certificate-dialog/certificate-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { StudentSearchComponent } from '../featured/student/student-search/student-search.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    NavBarComponent,
    CertificateComponent,
    StudentComponent,
    CertificateDetailComponent,
    CertificateDialogComponent,
    TransactionDetailComponent,
    StudentSearchComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MdbCollapseModule,
    FormsModule,
    ReactiveFormsModule,
    MdbDropdownModule,
    MdbAccordionModule,
    QRCodeModule,
    MatDialogModule,
    MatButtonModule,
    MdbTooltipModule
  ],
  exports: [
    NavBarComponent,
    CertificateComponent,
    StudentComponent,
    CertificateDetailComponent,
    CertificateDialogComponent,
    StudentSearchComponent,
    MessageComponent
  ]
})
export class SharedModule {}
