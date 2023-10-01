import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { StudentDetailComponent } from '../student-detail/student-detail.component';
import { StudentService } from 'src/app/core/services/student.service';
import { StudentDto } from 'src/app/core/models/dto/studentDto';

@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.scss']
})
export class StudentSearchComponent implements OnInit {
  personDocNumber: number | undefined;
  docNumber: number | undefined;
  enableResults = true;

  @Output() onSearch = new EventEmitter<StudentDto[]>();

  @ViewChild(StudentDetailComponent) detail!: StudentDetailComponent;
  constructor(
    private alertService: AlertService,
    private router: Router,
    private studentSerivce: StudentService
  ) {}

  ngOnInit(): void {}
  searchStudentByDni() {
    if (this.personDocNumber) {
      this.getStudentByDni();
    }
  }

  getStudentByDni() {
    if (this.personDocNumber) {
      this.studentSerivce.getStudentByDni(this.personDocNumber).subscribe({
        next: (students: StudentDto[]) => {
          // Mostrar lista de estudiantes.
          if (students && students.length > 0) {
            this.onSearch.emit(students);
          } else {
            this.alertService.showAlert(
              'No se encontró al estudiante en el sistema',
              undefined,
              {
                panelClass: ['error-snackbar']
              }
            );
          }
        },
        error: (error) => {
          this.alertService.showAlert(
            'No se encontró al estudiante en el sistema',
            undefined,
            {
              panelClass: ['error-snackbar']
            }
          );
        }
      });
    }
  }
}
