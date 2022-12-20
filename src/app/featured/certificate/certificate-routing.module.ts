import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCertificateComponent } from './new-certificate/new-certificate.component';

const routes: Routes = [{ path: '', component: NewCertificateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificateRoutingModule {}
