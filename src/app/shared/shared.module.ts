import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdbModule } from './mdb/mdb.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { AuthService } from '../core/services/auth.service';


@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MdbCollapseModule,
  ],
  exports: [
    NavBarComponent,
  ]
})
export class SharedModule { }
