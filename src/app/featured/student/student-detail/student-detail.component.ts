import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';
import { StudentDto } from 'src/app/core/models/dto/studentDto';
import { AlertService } from 'src/app/core/services/alert.service';
import { CertificateService } from 'src/app/core/services/certificate.service';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {
  studentTitles?: BlockchainTransactionDto[];

  studentList: StudentDto[] = [];
  studentSelected: StudentDto | undefined;
  showTitle = false;
  personDocNumber = 0;

  constructor(
    private alertService: AlertService,
    private studentSerivce: StudentService,
    private certificateService: CertificateService,
    private activatedRoute: ActivatedRoute
  ) {
    // Escuchar parametros de ruta y buscar al estudiante.
    this.personDocNumber = this.activatedRoute.snapshot.params['docNumber'];
    if (this.personDocNumber && this.personDocNumber > 0) {
      this.getStudentByDni();
    } else {
      throw new Error('Falta parametro de documento');
    }
  }
  getStudentByDni() {
    if (this.personDocNumber) {
      this.studentSerivce.getStudentByDni(this.personDocNumber).subscribe({
        next: (students: StudentDto[]) => {
          // Mostrar lista de estudiantes.
          if (students && students.length > 0) {
            this.studentList = students;
            if (students.length === 1) {
              this.studentSelected = students[0];
              this.getTitles(this.studentSelected);
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

  ngOnInit(): void {}

  selectStudent(student: StudentDto) {
    this.studentSelected = student;
    this.getTitles(student);
  }

  // todo: Terminar tabla de certificaciones.
  getTitles(student: StudentDto) {
    this.showTitle = true;
    this.certificateService
      .getCertificatesByStudentId(String(student.blockchainId))
      .pipe(
        catchError((error) => {
          this.alertService.showErrorMessage(String(error));
          return throwError(() => error);
        })
      )
      .subscribe((certificates) => (this.studentTitles = certificates || []));
  }
}
