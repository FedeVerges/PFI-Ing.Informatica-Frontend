import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StudentDto } from 'src/app/core/models/dto/studentDto';
import { AlertService } from 'src/app/core/services/alert.service';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  personDocNumber?: number;

  @Output() onSearch = new EventEmitter<StudentDto[]>();
  @Output() onClean = new EventEmitter<boolean>();

  constructor(
    private studentSerivce: StudentService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  getStudentByDni() {
    if (this.personDocNumber) {
      this.studentSerivce.getStudentByDni(this.personDocNumber).subscribe({
        next: (students: StudentDto[]) => {
          this.onSearch.emit(students);
        },
        error: (error) => {
          this.alertService.showErrorMessage(error);
        }
      });
    }
  }
}
