import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Certificate } from 'src/app/core/models/certificate';
import { CertificateService } from 'src/app/core/services/certificate.service';
import { Web3Service } from 'src/app/core/services/web3.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { StudentSerivce } from "../../../core/services/student.serivce";
import { CertificateDto } from "../../../core/models/dto/certificateDto";
import { StudentDto } from "../../../core/models/dto/studentDto";
import { TransactionDto } from "../../../core/models/dto/transactionDto";
import { Student } from 'src/app/core/models/student';
import { PersonDto } from 'src/app/core/models/dto/personDto';

@Component({
  selector: 'app-new-certificate',
  templateUrl: './new-certificate.component.html',
  styleUrls: ['./new-certificate.component.scss']
})
export class NewCertificateComponent implements OnInit {

  certificateForm!: FormGroup;
  studentForm!: FormGroup
  amountCertificates: number = 0;
  idContract: number = 0;
  certificates: Certificate[] = [];
  certificateSearchResult: any[] = [];
  personDocNumber: number | undefined;
  showFormNewStudent = false;
  studentList: StudentDto[] = [];
  studentSelected: StudentDto | undefined;

  constructor(private web3Service: Web3Service,
    private fb: FormBuilder,
    private certificateService: CertificateService,
    private _snackBar: MatSnackBar,
    private studentSerivce: StudentSerivce) {

    this.studentForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      docNumber: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      genderIdentity: ['',],
    });
    this.certificateForm = this.fb.group({
      universityName: ['', [Validators.required]],
      academicUnit: ['', [Validators.required]],
      degreeProgramName: ['', [Validators.required]],
      degreeProgramCurriculum: ['', [Validators.required]],
      degreeProgramOrdinance: ['', [Validators.required]],
      degreeType: ['', [Validators.required]],
      degreeName: ['', [Validators.required]],
      ministerialOrdninance: ['', [Validators.required]],
      waferNumber: ['', [Validators.required]],
      volumeNumber: ['', [Validators.required]],
      recordNumber: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  addNewCertificate() {
    debugger;
    // Crear el certificado atraves de la funcion createCertificate
    // Validar correctamente los campos.
    if (this.studentForm.valid) {
      if (this.certificateForm.valid) {
        let certificate: CertificateDto;
        if (this.studentSelected) {
          this.studentSelected.person.documentType = this.studentForm.get('documentType')?.value || 'DNI'
          certificate = {
            student: this.studentSelected,
            degreeType: this.certificateForm.get('degreeType')!.value,
            degreeName: this.certificateForm.get('degreeName')!.value,
            ministerialOrdinance: this.certificateForm.get('ministerialOrdninance')!.value,
            recordNumber: this.certificateForm.get('recordNumber')!.value,
            volumeNumber: this.certificateForm.get('volumeNumber')!.value,
            waferNumber: this.certificateForm.get('waferNumber')!.value
          }
        } else {
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
            universityName: this.certificateForm.get('universityName')!.value,
            academicUnit: this.certificateForm.get('academicUnit')!.value,
            degreeProgramName: this.certificateForm.get('degreeProgramName')!.value,
            degreeProgramCurriculum: this.certificateForm.get('degreeProgramCurriculum')!.value,
            degreeProgramOrdinance: this.certificateForm.get('degreeProgramOrdinance')!.value
          };
          certificate = {
            student: student,
            degreeType: this.certificateForm.get('degreeType')!.value,
            degreeName: this.certificateForm.get('degreeName')!.value,
            ministerialOrdinance: this.certificateForm.get('ministerialOrdninance')!.value,
            recordNumber: this.certificateForm.get('recordNumber')!.value,
            volumeNumber: this.certificateForm.get('volumeNumber')!.value,
            waferNumber: this.certificateForm.get('waferNumber')!.value
          }
        }
        this.createCertificate(certificate);
      } else {
        this.certificateForm.markAllAsTouched();
        this._snackBar.open("Verifique los datos del certificado.", 'Cerrar');
      }
    } else {
      this.studentForm.markAllAsTouched();
      this._snackBar.open("Verifique los datos del estudiante.", 'Cerrar');
    }
  }

  createCertificate(certificate: CertificateDto) {
    this.certificateService.createNewCertificate(certificate)
      .subscribe((transactionData: TransactionDto) => {
        if (transactionData && transactionData.receipt) {
          this._snackBar.open("Su certificado ha sido creado con exito.", undefined, {
            duration: 1
          } as MatSnackBarConfig)
        }
      })
  }

  getCertificatesById(studentId: number) {
    this.web3Service.getCertificatesByStudentId(studentId)
      .then(
        (result) => {
          this.certificateSearchResult = result
        }
      )
  }

  getStudentByDni() {
    if (this.personDocNumber) {
      this.studentSerivce.getStudentByDni(this.personDocNumber)
        .subscribe({
          next: (students: StudentDto[]) => {
            // Mostrar lista de estudiantes.
            if (students && students.length > 0) {
              this.studentList = students;
              if (students.length === 1) {
                this.selectStudent(students[0])
              }
            } else {
              this._snackBar.open("No se encontró al estudiante en el sistema", undefined, {
                duration: 1000
              } as MatSnackBarConfig)
            }
          },
          error: error => {
            this._snackBar.open(error, undefined, {
              duration: 1000
            } as MatSnackBarConfig)
          }
        })
    }
  }

  selectStudent(student: StudentDto) {
    this.studentSelected = student;
    this.studentForm.patchValue({
      name: student.person.name,
      lastname: student.person.lastname,
      docNumber: student.person.docNumber,
      documentType: student.person.documentType || 'DNI',
      sex: student.person.sex,
      genderIdentity: student.person.genderIdentity,
    });
    this.certificateForm.patchValue({
      universityName: student.universityName,
      academicUnit: student.academicUnit,
      degreeProgramName: student.degreeProgramName,
      degreeProgramCurriculum: student.degreeProgramCurriculum,
      degreeProgramOrdinance: student.degreeProgramOrdinance,
    })
  }

  clearForm() {
    this.certificateForm.reset();
    this.studentForm.reset();
  }
}
