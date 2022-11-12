import { Component, OnInit } from '@angular/core';
import { StudentDto } from 'src/app/core/models/dto/studentDto';
import { AlertService } from 'src/app/core/services/alert.service';
import { StudentSerivce } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.scss']
})
export class StudentSearchComponent implements OnInit {

  personDocNumber: number | undefined;

  studentList: StudentDto[] = [];
  studentSelected: StudentDto | undefined;

  constructor(
    private alertService: AlertService,
    private studentSerivce: StudentSerivce) { }

  ngOnInit(): void { }

  getStudentByDni() {
    if (this.personDocNumber) {
      this.studentSerivce.getStudentByDni(this.personDocNumber)
        .subscribe({
          next: (students: StudentDto[]) => {
            // Mostrar lista de estudiantes.
            if (students && students.length > 0) {
              this.studentList = students;
              if (students.length === 1) {
                this.studentSelected = students[0];
              } else {
                this.studentSelected = undefined;
              }
            } else {
              this.alertService.showErrorMessage("No se encontró al estudiante en el sistema");
            }
          },
          error: error => {
            this.alertService.showErrorMessage(error);
          }
        })
    }
  }

}
