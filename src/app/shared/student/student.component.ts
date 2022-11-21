import { Component, OnInit } from '@angular/core';
import { StudentDto } from 'src/app/core/models/dto/studentDto';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  student: StudentDto = {
    id: 0,
    academicUnit: "Facultad de Ciencias Fisico Matematicas y Naturales",
    degreeProgramCurriculum: "12-09",
    degreeProgramName: "Ingenieria en informatica",
    degreeProgramOrdinance: "12-10",
    universityName: "Universidad Nacional de San Luis",
    person: {
      docNumber: "12312312",
      id: 0,
      lastname: "Verges",
      name: "Federico",
      fullname: "Federico Verges",
      sex: "Masculino",
      genderIdentity: null,
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
