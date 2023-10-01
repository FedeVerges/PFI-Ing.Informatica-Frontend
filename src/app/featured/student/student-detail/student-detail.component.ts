import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError, throwError } from 'rxjs';
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
export class StudentDetailComponent {
  studentTitles?: BlockchainTransactionDto[];

  @Input() studentList: StudentDto[] = [];
  studentSelected: StudentDto | undefined;
  certificateDeleted = false;

  @Input() personDocNumber: number = 0;
  @Output() selectedStudent = new EventEmitter<StudentDto>();

  constructor(
    private alertService: AlertService,
    private studentSerivce: StudentService,
    private certificateService: CertificateService,
    private router: Router
  ) {}

  selectStudent(student: StudentDto) {
    this.selectedStudent.emit(student);
  }
}
