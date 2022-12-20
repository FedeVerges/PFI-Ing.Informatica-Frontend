import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { CertificateComponent } from './certificate/certificate.component';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { StudentComponent } from './student/student.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';

@NgModule({
  declarations: [NavBarComponent, CertificateComponent, StudentComponent],
  imports: [
    CommonModule,
    RouterModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbAccordionModule
  ],
  exports: [NavBarComponent, CertificateComponent, StudentComponent]
})
export class SharedModule {}
