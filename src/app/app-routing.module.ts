import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./featured/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'new-certificate',
    loadChildren: () => import('./featured/certificate/certificate.module').then(m => m.CertificateModule),
    canActivate:[AuthGuard],
  },
  {
    path: 'validate-certificate',
    loadChildren: () => import('./featured/validate/validate.module').then(m => m.ValidateModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./featured/login/login.module').then(m => m.LoginModule),
  },


  // Siempre al final.
  { path: '*', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
