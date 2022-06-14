import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCertificateComponent } from './featured/certificate/new-certificate/new-certificate.component';

const routes: Routes = [
  { path: '', redirectTo: 'new-certificate', pathMatch: 'full' },
  {
    path: 'new-certificate',
    component: NewCertificateComponent,
    loadChildren: () => import('./featured/certificate/certificate.module').then(m => m.CertificateModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
