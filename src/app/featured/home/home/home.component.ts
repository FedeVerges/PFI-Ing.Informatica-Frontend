import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, catchError, throwError } from 'rxjs';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';
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
  students: StudentDto[] = [];
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

  setStudents(students: StudentDto[]) {
    this.students = students;
    this.currentStudent = undefined;
  }

  getTitles(student: StudentDto) {
    this.currentStudent = student;
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

  goToTransactionList() {
    this.router.navigateByUrl('/transactions');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
