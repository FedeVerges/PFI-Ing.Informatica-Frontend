import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { MdbModule } from 'src/app/shared/mdb/mdb.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentSearchComponent } from '../student/student-search/student-search.component';
import { StudentDetailComponent } from '../student/student-detail/student-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

@NgModule({
  declarations: [HomeComponent, StudentSearchComponent, StudentDetailComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MdbModule,
    FormsModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MdbRippleModule,
    MdbValidationModule,
    SharedModule
  ]
})
export class HomeModule {}
