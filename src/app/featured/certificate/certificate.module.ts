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
import { CertificateDetailComponentWrapper } from './certificate-detail/certificate-detail.component';
import { QRCodeModule } from 'angularx-qrcode';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';

@NgModule({
  declarations: [NewCertificateComponent, MyCertificatesComponent, CertificateDetailComponentWrapper],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CertificateRoutingModule,
    MdbFormsModule,
    MdbRippleModule,
    SharedModule,
  ],
  providers: [Web3Service]
})
export class CertificateModule {}
