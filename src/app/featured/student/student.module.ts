import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { NewStudentComponent } from './new-student/new-student.component';
import { StudentSearchComponent } from './student-search/student-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';


@NgModule({
  declarations: [
    NewStudentComponent,
    StudentSearchComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MatSnackBarModule,
    MdbRippleModule,
  ]
})
export class StudentModule { }
