import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PersonWithStudentsDto } from 'src/app/core/models/dto/personWithStudents';
import { StudentDto } from 'src/app/core/models/dto/studentDto';
import { AlertService } from 'src/app/core/services/alert.service';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class PersonSearchComponent implements OnInit {
  personDocNumber?: number;

  @Output() onSearch = new EventEmitter<PersonWithStudentsDto[]>();
  @Output() onClean = new EventEmitter<boolean>();

  constructor(
    private studentSerivce: StudentService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  getStudentByDni() {
    if (this.personDocNumber) {
      this.studentSerivce
        .getPersonWithStudentsByDni(this.personDocNumber)
        .subscribe({
          next: (persons) => {
            this.onSearch.emit(persons);
          },
          error: (error) => {
            this.alertService.showErrorMessage(error);
          }
        });
    }
  }
}
