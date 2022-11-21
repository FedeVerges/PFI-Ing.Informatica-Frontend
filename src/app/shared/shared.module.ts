import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { CertificateComponent } from "./certificate/certificate.component";
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { StudentComponent } from './student/student.component';


@NgModule({
  declarations: [
    NavBarComponent,
    CertificateComponent,
    StudentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MdbCollapseModule,
    MdbDropdownModule
  ],
  exports: [
    NavBarComponent,
    CertificateComponent,
    StudentComponent
  ]
})
export class SharedModule { }
