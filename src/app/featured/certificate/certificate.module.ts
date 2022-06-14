import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificateRoutingModule } from './certificate-routing.module';
import { NewCertificateComponent } from './new-certificate/new-certificate.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewCertificateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CertificateRoutingModule,
  ]
})
export class CertificateModule { }
