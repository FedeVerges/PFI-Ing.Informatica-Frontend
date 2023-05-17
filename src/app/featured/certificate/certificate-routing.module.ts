import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificateDetailComponentWrapper } from './certificate-detail/certificate-detail.component';
import { CertificateSearchComponent } from './certificate-search/certificate-search.component';
import { MyCertificatesComponent } from './my-certificates/my-certificates.component';
import { NewCertificateComponent } from './new-certificate/new-certificate.component';

const routes: Routes = [
  { path: '', redirectTo: 'new', pathMatch: 'full' },
  { path: 'new', component: NewCertificateComponent },
  { path: 'my-certificates', component: MyCertificatesComponent },
  { path: 'search', component: CertificateSearchComponent },
  // Al final siempre.
  { path: ':id', component: CertificateDetailComponentWrapper }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificateRoutingModule {}
