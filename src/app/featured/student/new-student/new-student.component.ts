import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AcademicUnit } from 'src/app/core/models/academicUnit';
import { Career } from 'src/app/core/models/career';
import { PersonDto } from 'src/app/core/models/dto/personDto';
import { PersonWithStudentsDto } from 'src/app/core/models/dto/personWithStudents';
import { StudentDto } from 'src/app/core/models/dto/studentDto';
import { University } from 'src/app/core/models/university';
import { AlertService } from 'src/app/core/services/alert.service';
import { StudentService } from 'src/app/core/services/student.service';

const UNSL: University = {
  name: 'Universidad Nacional de San Luis',
  academicUnits: [
    {
      name: 'Facultad de ciencias fisico matemáticas y naturales',
      careers: [
        {
          name: 'Ingeniería en informática',
          type: 'GRADO',
          plans: ['26/12']
        },
        {
          name: 'Ingeniería en electrónica',
          type: 'GRADO',
          plans: ['13/08']
        },
        {
          name: 'Ingeniería en Minas',
          type: 'GRADO',
          plans: ['11/08']
        },
        {
          name: 'Ingeniería Quimica',
          type: 'GRADO',
          plans: ['13/08']
        }
      ]
    },
    {
      name: 'Facultad de ciencias química bioquímica y farmacia',
      careers: [
        {
          name: 'Licenciatura en Química',
          type: 'GRADO',
          plans: ['11/19']
        },
        {
          name: 'Licenciatura en Nutrición',
          type: 'GRADO',
          plans: ['11/09']
        },
        {
          name: 'Licenciatura en Bioquimica',
          type: 'GRADO',
          plans: ['11/19']
        },
        {
          name: 'Licenciatura en Biologia Molecular',
          type: 'GRADO',
          plans: ['11/19']
        }
      ]
    }
  ]
};

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent implements OnInit {
  studentForm!: FormGroup;
  personDocNumber: number | undefined;
  showFormNewStudent = false;
  universities: University[] = [];

  academicUnits: AcademicUnit[] = [];

  careers: Career[] = [];

  plans: string[] = [];

  successMessage: string = '';

  hasError = false;
  personList?: PersonWithStudentsDto[];
  personSelected?: PersonWithStudentsDto;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private studentSerivce: StudentService,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      docNumber: [
        '',
        [Validators.required, Validators.minLength(7), Validators.maxLength(8)]
      ],
      docType: ['', [Validators.required]],
      registrationNumber: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(10)]
      ],
      sex: ['', [Validators.required]],
      university: ['', [Validators.required]],
      academicUnit: ['', [Validators.required]],
      degreeType: ['', [Validators.required]],
      degreeProgramName: ['', [Validators.required]],
      degreeProgramCurriculum: ['', [Validators.required]]
    });
  }

  get university() {
    return this.studentForm.get('university');
  }
  get academicUnit() {
    return this.studentForm.get('academicUnit');
  }
  get degreeProgramName() {
    return this.studentForm.get('degreeProgramName');
  }

  get name() {
    return this.studentForm.get('name');
  }

  ngOnInit(): void {
    this.studentSerivce.getUniversityCarrerData().subscribe((data) => {
      this.universities = data;
      this.university?.setValue(this.universities[0]);
    });
  }

  addNewStudent() {
    const person: PersonDto = {
      id: 0,
      name: this.studentForm.get('name')!.value,
      lastname: this.studentForm.get('lastname')!.value,
      docType: this.studentForm.get('docType')!.value,
      docNumber: this.studentForm.get('docNumber')!.value,
      sex: this.studentForm.get('sex')!.value
    };
    const student: StudentDto = {
      id: 0,
      person: person,
      universityName: this.university?.value?.name || '',
      academicUnit: this.academicUnit?.value?.name || '',
      degreeProgramName: this.degreeProgramName?.value?.name || '',
      degreeProgramCurriculum: this.studentForm.get('degreeProgramCurriculum')!
        .value,
      blockchainId: 0,
      registrationNumber: this.studentForm.get('registrationNumber')!.value,
      degreeType: this.studentForm.get('degreeType')!.value
    };
    // Verificar si el estudiante fue buscado o es nuevo.
    if (this.personSelected) {
      if (this.validateStudentsData(this.personSelected.students, student)) {
        student.person = {
          docNumber: this.personSelected.docNumber,
          docType: this.personSelected.docType,
          lastname: this.personSelected.lastname,
          name: this.personSelected.name,
          sex: this.personSelected.sex,
          fullname: this.personSelected.fullname,
          id: this.personSelected.id
        };
        this.createStudent(student);
      } else {
        this.studentForm.markAllAsTouched();
        this.alertService.showErrorMessage(
          'Verifique los datos del estudiante.'
        );
      }
    } else {
      if (this.studentForm.valid) {
        this.createStudent(student);
      } else {
        this.studentForm.markAllAsTouched();
        this.alertService.showErrorMessage(
          'Verifique los datos del estudiante.'
        );
      }
    }
  }

  createStudent(student: StudentDto) {
    this.studentSerivce.createStudent(student).subscribe({
      next: (studentCreated) => {
        this.successMessage = `Nuevo graduado creado!!`;
        this.clearForm();
      },
      error: (e) => {
        this.alertService.showErrorMessage(e);
      }
    });
  }

  setStudentData(person: PersonWithStudentsDto) {
    this.studentForm.patchValue({
      name: person.name,
      lastname: person.lastname,
      docNumber: person.docNumber,
      sex: person.sex,
      docType: person.docType
    });
  }

  clearForm() {
    this.studentForm.patchValue(
      {
        name: '',
        lastname: '',
        docNumber: '',
        docType: '',
        sex: '',
        academicUnit: '',
        registrationNumber: '',
        degreeType: '',
        degreeProgramName: '',
        degreeProgramCurriculum: ''
      },
      {
        emitEvent: false
      }
    );
  }

  changeUniversity() {
    const unversitySelected = this.university?.value as University;
    if (unversitySelected) {
      this.academicUnits = unversitySelected?.academicUnits;
      this.careers = [];
    } else {
      this.academicUnits = [];
      this.careers = [];
    }
  }

  changeAcademicUnit() {
    const academicUnitSelected = this.academicUnit?.value as AcademicUnit;
    if (academicUnitSelected) {
      this.careers = academicUnitSelected?.careers;
    } else {
      this.careers = [];
    }
  }

  goToCreateCeritificate() {
    this.router.navigateByUrl('/certificate/new');
  }

  handleSearch($event: PersonWithStudentsDto[]) {
    this.personList = $event && $event.length > 0 ? $event : [];
    if (this.personList.length > 0) {
      // Si hay una sola persona
      if (this.personList.length === 1) {
        this.selectPerson(this.personList[0]);
      } else {
        this.personSelected = undefined;
      }
    } else {
      this.alertService.showErrorMessage('La persona no existe');
    }
  }

  selectPerson(person: PersonWithStudentsDto) {
    this.personSelected = person;
    this.setStudentData(person);
  }

  handleClean($event: boolean) {
    this.personSelected = undefined;
    this.personList = undefined;
    this.clearForm();
  }

  /**
   * Solo se comparan los datos de la universidad.
   * @param  students Lista de estudiantes de la persona.
   * @param st2 Estudiante 2 con el que se van a comparar los datos para no agregar a uno repetido.
   * @returns
   */
  validateStudentsData(students: StudentDto[], st2: StudentDto): boolean {
    const filtered = students.filter(
      (st) =>
        st.registrationNumber === st2.registrationNumber ||
        (st.degreeProgramName === st2.degreeProgramName &&
          st.degreeProgramCurriculum === st2.degreeProgramCurriculum)
    );
    return filtered.length === 0;
  }
}
