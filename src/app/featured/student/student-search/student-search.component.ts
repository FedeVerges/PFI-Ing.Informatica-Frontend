import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private alertService: AlertService, private router: Router) {}

  ngOnInit(): void {}

  searchStudentByDni() {
    if (this.personDocNumber) {
      this.router.navigateByUrl(`/student/search/${this.personDocNumber}`);
    }
  }
}
