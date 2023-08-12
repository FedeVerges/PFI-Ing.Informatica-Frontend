import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'certificate',
    loadChildren: () =>
      import('./featured/certificate/certificate.module').then(
        (m) => m.CertificateModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./featured/home/home.module').then((m) => m.HomeModule)
    // canActivate: [AuthGuard]
  },
  {
    path: 'validate/:certificate',
    loadChildren: () =>
      import('./featured/validate/validate.module').then(
        (m) => m.ValidateModule
      )
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./featured/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./featured/student/student.module').then((m) => m.StudentModule)
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('./featured/transactions/transactions.module').then(
        (m) => m.TransactionsModule
      ),
    canActivate: [AuthGuard]
  },
  // Siempre al final.
  { path: '*', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
