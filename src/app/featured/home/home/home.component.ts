import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, catchError, throwError } from 'rxjs';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';
import { PersonWithStudentsDto } from 'src/app/core/models/dto/personWithStudents';
import { StudentDto } from 'src/app/core/models/dto/studentDto';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CertificateService } from 'src/app/core/services/certificate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  subscription!: Subscription;

  title: string = 'Consultar títulos ingresando número de documento.';
  persons: PersonWithStudentsDto[] = [];
  currentPerson?: PersonWithStudentsDto;
  currentStudent?: StudentDto;

  studentTitles?: BlockchainTransactionDto[];
  certificateDeleted = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private certificateService: CertificateService,
    private alertService: AlertService
  ) {
    this.subscription = authService.getRole().subscribe({
      next: (role) => {
        if (role && role.name) {
          if (role?.name === 'STUDENT') {
            this.title =
              'Consultá tus títulos ingresando tu número de documento.';
          }
        }
      }
    });
  }

  selectPerson(person: PersonWithStudentsDto, student: StudentDto) {
    this.currentStudent = student;
    this.currentPerson = person;
    this.getTitles(this.currentStudent);
  }

  getTitles(student: StudentDto) {
    if (student.blockchainId) {
      this.certificateService
        .getCertificatesByStudentId(String(student.blockchainId))
        .pipe(
          catchError((error) => {
            this.alertService.showErrorMessage(String(error));
            return throwError(() => error);
          })
        )
        .subscribe((certificates) => (this.studentTitles = certificates || []));
    } else {
      this.studentTitles = [];
    }
  }

  goToTransactionList() {
    this.router.navigateByUrl('/transactions');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleSearch($event: PersonWithStudentsDto[]) {
    if ($event && $event.length > 0) {
      this.persons = $event;
      this.currentStudent = undefined;
      this.currentPerson = undefined;
    } else {
      this.alertService.showErrorMessage('No hay estudiantes para mostrar.');
      this.persons = [];
    }
  }
}
