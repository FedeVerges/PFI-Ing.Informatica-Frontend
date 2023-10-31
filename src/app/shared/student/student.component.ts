import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';
import { StudentDto } from 'src/app/core/models/dto/studentDto';
import { CertificateDialogComponent } from '../certificate-dialog/certificate-dialog.component';
import { PersonWithStudentsDto } from 'src/app/core/models/dto/personWithStudents';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  @Input() student?: StudentDto;
  @Input() person?: PersonWithStudentsDto;

  @Input() certifications?: BlockchainTransactionDto[] = [];

  @Output() selectedStudent: EventEmitter<StudentDto> = new EventEmitter();

  @Input() disableButton = false;

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {}

  selectStudent(st: StudentDto) {
    this.selectedStudent.emit(st);
  }
}
