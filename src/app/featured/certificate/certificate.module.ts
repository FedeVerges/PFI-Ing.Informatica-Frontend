import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificateRoutingModule } from './certificate-routing.module';
import { NewCertificateComponent } from './new-certificate/new-certificate.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Web3Service } from 'src/app/core/services/web3.service';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MyCertificatesComponent } from './my-certificates/my-certificates.component';

@NgModule({
  declarations: [NewCertificateComponent, MyCertificatesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CertificateRoutingModule,
    MdbFormsModule,
    MdbRippleModule
  ],
  providers: [Web3Service]
})
export class CertificateModule {}
