import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { NewStudentComponent } from './new-student/new-student.component';
import { StudentSearchComponent } from './student-search/student-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentDetailComponent } from './student-detail/student-detail.component';

@NgModule({
  declarations: [NewStudentComponent, StudentDetailComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MdbRippleModule,
    SharedModule
  ]
})
export class StudentModule {}
