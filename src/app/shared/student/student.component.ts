import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goDetail(id: number) {
    if (id) {
      this.router.navigateByUrl(`certificate/${id}`);
    } else {
      throw new Error('Id certificado nulo.');
    }
  }
}
