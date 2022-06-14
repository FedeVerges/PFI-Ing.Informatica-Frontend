import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificateRoutingModule } from './certificate-routing.module';
import { NewCertificateComponent } from './new-certificate/new-certificate.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Web3Service } from 'src/app/core/services/web3.service';
import { BrowserModule } from '@angular/platform-browser';
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
  ],
  providers: [Web3Service],
})
export class CertificateModule { }
