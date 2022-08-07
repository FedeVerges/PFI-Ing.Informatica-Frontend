import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificateRoutingModule } from './certificate-routing.module';
import { NewCertificateComponent } from './new-certificate/new-certificate.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Web3Service } from 'src/app/core/services/web3.service';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    NewCertificateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CertificateRoutingModule,
    MdbFormsModule,
    MatSnackBarModule,
  ],
  providers: [Web3Service, AuthService],
})
export class CertificateModule { }
