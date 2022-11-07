import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { PersonDto } from 'src/app/core/models/dto/personDto';
import { StudentDto } from 'src/app/core/models/dto/studentDto';
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

  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private studentSerivce: StudentSerivce) {

    this.studentForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      docNumber: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      genderIdentity: [false,],
      universityName: ['', [Validators.required]],
      academicUnit: ['', [Validators.required]],
      degreeProgramName: ['', [Validators.required]],
      degreeProgramCurriculum: ['', [Validators.required]],
      degreeProgramOrdinance: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
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
          universityName: this.studentForm.get('universityName')!.value,
          academicUnit: this.studentForm.get('academicUnit')!.value,
          degreeProgramName: this.studentForm.get('degreeProgramName')!.value,
          degreeProgramCurriculum: this.studentForm.get('degreeProgramCurriculum')!.value,
          degreeProgramOrdinance: this.studentForm.get('degreeProgramOrdinance')!.value
        };
        this.createStudent(student)
      }
    } else {
      this.studentForm.markAllAsTouched();
      this._snackBar.open("Verifique los datos del estudiante.", 'Cerrar');
    }
  }

  createStudent(student: StudentDto) {
    this.studentSerivce.createStudent(student)
      .subscribe(studentCreated => {
        debugger
        this._snackBar.open(`El estudiante ${studentCreated.person.fullname} ha sido creado con éxito con el número: ${studentCreated.id}!`, undefined, {
          duration: 1000
        } as MatSnackBarConfig)
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
      universityName: student.universityName,
      academicUnit: student.academicUnit,
      degreeProgramName: student.degreeProgramName,
      degreeProgramCurriculum: student.degreeProgramCurriculum,
      degreeProgramOrdinance: student.degreeProgramOrdinance,
    });
  }

  clearForm() {
    this.studentForm.reset();
  }

}
