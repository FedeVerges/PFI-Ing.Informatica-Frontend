import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AcademicUnit } from 'src/app/core/models/academicUnit';
import { Career } from 'src/app/core/models/career';
import { PersonDto } from 'src/app/core/models/dto/personDto';
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
          plans: ['26/12']
        },
        {
          name: 'Ingeniería en electrónica',
          plans: ['13/08']
        },
        {
          name: 'Ingeniería en Minas',
          plans: ['11/08']
        },
        {
          name: 'Ingeniería Quimica',
          plans: ['13/08']
        }
      ]
    },
    {
      name: 'Facultad de ciencias química bioquímica y farmacia',
      careers: [
        {
          name: 'Licenciatura en Química',
          plans: ['11/19']
        },
        {
          name: 'Licenciatura en Nutrición',
          plans: ['11/09']
        },
        {
          name: 'Licenciatura en Bioquimica',
          plans: ['11/19']
        },
        {
          name: 'Licenciatura en Biologia Molecular',
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

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private studentSerivce: StudentService,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      docNumber: ['', [Validators.required], Validators.max(8)],
      docType: ['', [Validators.required]],
      registrationNumber: ['', [Validators.required], Validators.max(10)],
      sex: ['', [Validators.required]],
      university: ['', [Validators.required]],
      academicUnit: ['', [Validators.required]],
      degreeProgramName: ['', [Validators.required]],
      degreeProgramCurriculum: ['', [Validators.required]],
      //todo: agregar grado del titulo.
      ministerialOrdinance: [''],
      superiorCouncilOrdinance: ['', []],
      directiveCouncilOrdinance: ['', []]
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

  ngOnInit(): void {
    this.studentSerivce.getUniversityCarrerData().subscribe((data) => {
      this.universities = data;
      this.university?.setValue(this.universities[0]);
    });
  }

  addNewStudent() {
    if (this.studentForm.valid) {
      if (this.studentForm.valid) {
        const person: PersonDto = {
          id: 0,
          name: this.studentForm.get('name')!.value,
          lastname: this.studentForm.get('lastname')!.value,
          docNumber: this.studentForm.get('docNumber')!.value,
          sex: this.studentForm.get('sex')!.value
        };
        const student: StudentDto = {
          id: 0,
          person: person,
          universityName: this.university?.value?.name || '',
          academicUnit: this.academicUnit?.value?.name || '',
          degreeProgramName: this.degreeProgramName?.value?.name || '',
          degreeProgramCurriculum: this.studentForm.get(
            'degreeProgramCurriculum'
          )!.value,
          ministerialOrdinance: this.studentForm.get('ministerialOrdinance')!
            .value,
          blockchainId: 0,
          registrationNumber: this.studentForm.get('registrationNumber')!.value,
          superiorCouncilOrdinance: this.studentForm.get(
            'superiorCouncilOrdinance'
          )!.value,
          directiveCouncilOrdinance: this.studentForm.get(
            'directiveCouncilOrdinance'
          )!.value
        };
        this.createStudent(student);
      }
    } else {
      this.studentForm.markAsDirty();
      this.alertService.showErrorMessage('Verifique los datos del estudiante.');
    }
  }

  createStudent(student: StudentDto) {
    this.studentSerivce.createStudent(student).subscribe({
      next: (studentCreated) => {
        this.successMessage = `Nuevo graduado creado!!`;
      },
      error: (e) => {
        this.alertService.showErrorMessage(e);
      }
    });
  }

  setStudentData(student: StudentDto) {
    this.studentForm.patchValue({
      name: student.person.name,
      lastname: student.person.lastname,
      docNumber: student.person.docNumber,
      sex: student.person.sex,
      university: student.universityName,
      academicUnit: student.academicUnit,
      degreeProgramName: student.degreeProgramName,
      degreeProgramCurriculum: student.degreeProgramCurriculum,
      degreeProgramOrdinance: student.ministerialOrdinance
    });
  }

  clearForm() {
    debugger;
    this.studentForm.setValue({
      name: '',
      lastname: '',
      docNumber: '',
      documentType: '',
      sex: '',
      genderIdentity: '',
      university: '',
      academicUnit: '',
      degreeProgramName: '',
      degreeProgramCurriculum: '',
      degreeProgramOrdinance: ''
    });
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
}
