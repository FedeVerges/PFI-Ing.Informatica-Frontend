import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificateRoutingModule } from './certificate-routing.module';
import { NewComponent } from './new/new.component';
import { NewCertificateComponent } from './new-certificate/new-certificate.component';


@NgModule({
  declarations: [
    NewComponent,
    NewCertificateComponent
  ],
  imports: [
    CommonModule,
    CertificateRoutingModule
  ]
})
export class CertificateModule { }
