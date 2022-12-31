import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCertificatesComponent } from './my-certificates/my-certificates.component';
import { NewCertificateComponent } from './new-certificate/new-certificate.component';

const routes: Routes = [
  { path: '', redirectTo: 'new', pathMatch: 'full' },
  { path: 'new', component: NewCertificateComponent },
  { path: 'my-certificates', component: MyCertificatesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificateRoutingModule {}
