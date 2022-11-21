import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/internal/Observable';
import { AcademicUnit } from 'src/app/core/models/academicUnit';
import { Career } from 'src/app/core/models/career';
import { PersonDto } from 'src/app/core/models/dto/personDto';
import { StudentDto } from 'src/app/core/models/dto/studentDto';
import { University } from 'src/app/core/models/university';
import { AlertService } from 'src/app/core/services/alert.service';
import { StudentSerivce } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent implements OnInit {
  studentForm!: FormGroup
  personDocNumber: number | undefined;
  showFormNewStudent = false;
  unversityData?: Observable<University[]>;

  academicUnits: AcademicUnit[] = [];

  careers: Career[] = [];

  constructor(private fb: FormBuilder,
    private alertService: AlertService,
    private studentSerivce: StudentSerivce) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      docNumber: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      genderIdentity: [false,],
      university: ['', [Validators.required]],
      academicUnit: ['', [Validators.required]],
      degreeProgramName: ['', [Validators.required]],
      degreeProgramCurriculum: ['', [Validators.required]],
      degreeProgramOrdinance: ['', [Validators.required]],
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
    this.unversityData = this.studentSerivce.getUniversityCarrerData();
  }

  addNewCertificate() {
    // Crear el certificado atraves de la funcion createCertificate
    // Validar correctamente los campos.
    if (this.studentForm.valid) {
      if (this.studentForm.valid) {
        const person: PersonDto = {
          id: 0,
          name: this.studentForm.get('name')!.value,
          lastname: this.studentForm.get('lastname')!.value,
          docNumber: this.studentForm.get('docNumber')!.value,
          documentType: this.studentForm.get('documentType')!.value,
          sex: this.studentForm.get('sex')!.value
        }
        const student: StudentDto = {
          id: 0,
          person: person,
          universityName: this.university?.value?.name || '',
          academicUnit: this.studentForm.get('academicUnit')!.value,
          degreeProgramName: this.studentForm.get('degreeProgramName')!.value,
          degreeProgramCurriculum: this.studentForm.get('degreeProgramCurriculum')!.value,
          degreeProgramOrdinance: this.studentForm.get('degreeProgramOrdinance')!.value
        };
        this.createStudent(student)
      }
    } else {
      this.studentForm.markAllAsTouched();
      this.alertService.showErrorMessage("Verifique los datos del estudiante.");
    }
  }

  createStudent(student: StudentDto) {
    this.studentSerivce.createStudent(student)
      .subscribe(studentCreated => {
        this.alertService.showAlert(`El estudiante ${studentCreated.person.fullname} ha sido creado con éxito con el número: ${studentCreated.id}!`, undefined, {
          duration: 1000
        } as MatSnackBarConfig);
      })
  }

  setStudentData(student: StudentDto) {
    this.studentForm.patchValue({
      name: student.person.name,
      lastname: student.person.lastname,
      docNumber: student.person.docNumber,
      documentType: student.person.documentType || 'DNI',
      sex: student.person.sex,
      genderIdentity: student.person.genderIdentity,
      university: student.universityName,
      academicUnit: student.academicUnit,
      degreeProgramName: student.degreeProgramName,
      degreeProgramCurriculum: student.degreeProgramCurriculum,
      degreeProgramOrdinance: student.degreeProgramOrdinance,
    });
  }

  clearForm() {
    this.studentForm.reset();
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


}
