import { Component, OnInit } from '@angular/core';
import { catchError, delay, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';
import { StudentDto } from 'src/app/core/models/dto/studentDto';
import { AlertService } from 'src/app/core/services/alert.service';
import { CertificateService } from 'src/app/core/services/certificate.service';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.scss']
})
export class StudentSearchComponent implements OnInit {
  personDocNumber: number | undefined;

  studentList: StudentDto[] = [];
  studentSelected: StudentDto | undefined;

  unversitiesCarrers: any[] = [];
  showTitle = false;
  studentTitles$?: Observable<BlockchainTransactionDto[]>;

  constructor(
    private alertService: AlertService,
    private studentSerivce: StudentService,
    private certificateService: CertificateService
  ) {}

  ngOnInit(): void {}

  getStudentByDni() {
    if (this.personDocNumber) {
      this.studentSerivce.getStudentByDni(this.personDocNumber).subscribe({
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
            this.alertService.showErrorMessage(
              'No se encontró al estudiante en el sistema'
            );
          }
        },
        error: (error) => {
          this.alertService.showErrorMessage(
            error?.message || 'ocurrió un error al solicitar estudiante'
          );
        }
      });
    }
  }

  getTitles(student: StudentDto) {
    this.showTitle = true;
    this.studentTitles$ = this.certificateService
      .getCertificatesByStudentId(String(student.blockchainId))
      .pipe(
        catchError((error) => {
          this.alertService.showErrorMessage(String(error));
          return throwError(() => error);
        })
      );
  }
}
