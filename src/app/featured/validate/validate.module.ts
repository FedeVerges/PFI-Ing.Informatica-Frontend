import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidateRoutingModule } from './validate-routing.module';
import { CertificateValidatorComponent } from './certificate-validator/certificate-validator.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@NgModule({
  declarations: [CertificateValidatorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ValidateRoutingModule,
    SharedModule,
    MdbFormsModule
  ]
})
export class ValidateModule {}
