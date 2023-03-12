import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';
import { StudentDto } from 'src/app/core/models/dto/studentDto';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  @Input() student?: StudentDto;
  @Input() certifications: BlockchainTransactionDto[] = [];

  constructor() {}

  ngOnInit(): void {}
}
