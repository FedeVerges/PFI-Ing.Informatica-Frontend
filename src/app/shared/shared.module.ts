import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import {CertificateComponent} from "./certificate/certificate.component";
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';


@NgModule({
  declarations: [
    NavBarComponent,
    CertificateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MdbCollapseModule,
    MdbDropdownModule
  ],
  exports: [
    NavBarComponent,
    CertificateComponent
  ]
})
export class SharedModule { }
