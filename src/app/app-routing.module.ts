import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'home',
    loadChildren: () => import('./featured/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'new-certificate',
    loadChildren: () => import('./featured/certificate/certificate.module').then(m => m.CertificateModule)
  },


  // Siempre al final.
  { path: '*', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
