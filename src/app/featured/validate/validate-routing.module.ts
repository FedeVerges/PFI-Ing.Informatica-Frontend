import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificateValidatorComponent } from './certificate-validator/certificate-validator.component';

const routes: Routes = [
  { path: '', component: CertificateValidatorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidateRoutingModule { }
