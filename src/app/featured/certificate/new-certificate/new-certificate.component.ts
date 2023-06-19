import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Certificate } from 'src/app/core/models/certificate';
import { CertificateService } from 'src/app/core/services/certificate.service';
import { Web3Service } from 'src/app/core/services/web3.service';
import { StudentService } from '../../../core/services/student.service';
import { StudentDto } from '../../../core/models/dto/studentDto';
import { TransactionDto } from '../../../core/models/dto/transactionDto';
import { PersonDto } from 'src/app/core/models/dto/personDto';
import { AlertService } from 'src/app/core/services/alert.service';
import { CertificateDto } from 'src/app/core/models/dto/certificateDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-certificate',
  templateUrl: './new-certificate.component.html',
  styleUrls: ['./new-certificate.component.scss']
})
export class NewCertificateComponent {
  certificateForm!: FormGroup;
  studentForm!: FormGroup;
  amountCertificates: number = 0;
  idContract: number = 0;
  certificates: Certificate[] = [];
  certificateSearchResult: any[] = [];
  personDocNumber: number | undefined;
  showFormNewStudent = false;
  studentList: StudentDto[] = [];
  studentSelected: StudentDto | undefined;
  successMessage: string = '';

  hasError = false;
  detailMessage: string = '';

  constructor(
    private web3Service: Web3Service,
    private fb: FormBuilder,
    private certificateService: CertificateService,
    private alertService: AlertService,
    private studentSerivce: StudentService,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      docNumber: ['', [Validators.required]],
      registrationNumber: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      university: ['', [Validators.required]],
      academicUnit: ['', [Validators.required]],
      degreeProgramName: ['', [Validators.required]],
      degreeProgramCurriculum: ['', [Validators.required]],
      ministerialOrdinance: [''],
      superiorCouncilOrdinance: ['', [Validators.required]],
      directiveCouncilOrdinance: ['', [Validators.required]]
    });
    this.certificateForm = this.fb.group({
      degreeType: ['', [Validators.required]],
      degreeName: [''],
      waferNumber: ['', [Validators.required]]
    });
  }

  addNewCertificate() {
    // Crear el certificado atraves de la funcion createCertificate
    // Validar correctamente los campos.
    if (!this.studentForm.invalid) {
      if (!this.certificateForm.invalid) {
        let certificate: CertificateDto;
        if (this.studentSelected) {
          debugger;
          this.studentSelected.ministerialOrdinance = '1';
          certificate = {
            student: this.studentSelected,
            dateCreated: String(new Date().getTime()),
            dateModified: '0',
            degreeType: this.certificateForm.get('degreeType')!.value,
            degreeName: this.studentSelected.degreeProgramName,
            waferNumber: this.certificateForm.get('waferNumber')!.value
          };
        } else {
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
            universityName: this.certificateForm.get('universityName')!.value,
            academicUnit: this.certificateForm.get('academicUnit')!.value,
            degreeProgramName:
              this.certificateForm.get('degreeProgramName')!.value,
            degreeProgramCurriculum: this.certificateForm.get(
              'degreeProgramCurriculum'
            )!.value,
            ministerialOrdinance: '1',
            blockchainId: 0,
            registrationNumber:
              this.studentForm.get('registrationNumber')!.value,
            superiorCouncilOrdinance: this.studentForm.get(
              'superiorCouncilOrdinance'
            )!.value,
            directiveCouncilOrdinance: this.studentForm.get(
              'directiveCouncilOrdinance'
            )!.value
          };
          certificate = {
            student: student,
            dateCreated: String(new Date().getTime()),
            dateModified: '0',
            degreeType: this.certificateForm.get('degreeType')!.value,
            degreeName: this.certificateForm.get('degreeName')!.value,
            waferNumber: this.certificateForm.get('waferNumber')!.value
          };
        }
        this.createCertificate(certificate);
      } else {
        this.certificateForm.markAllAsTouched();
        this.alertService.showErrorMessage(
          'Verifique los datos del certificado.'
        );
      }
    } else {
      this.studentForm.markAllAsTouched();
      this.alertService.showErrorMessage('Verifique los datos del estudiante.');
    }
  }

  createCertificate(certificate: CertificateDto) {
    this.certificateService.createNewCertificate(certificate).subscribe({
      next: (transactionData: TransactionDto) => {
        if (transactionData && transactionData.receipt) {
          this.successMessage = `Se ha enviado la transacción exitosamente.`;
          this.detailMessage = `En unos minutos la transacción 0x5f20a35fe6fa252519b90f6be5c4e508b59c2afacd2bed34dd329af31a39e628 será validada y aprobada por la red.`;
        }
      },
      error: (error) => {
        this.alertService.showErrorMessage(error);
      }
    });
  }

  getCertificatesById(studentId: number) {
    this.web3Service.getCertificatesByStudentId(studentId).then((result) => {
      this.certificateSearchResult = result;
    });
  }

  getStudentByDni() {
    if (this.personDocNumber) {
      this.studentSerivce.getStudentByDni(this.personDocNumber).subscribe({
        next: (students: StudentDto[]) => {
          // Mostrar lista de estudiantes.
          if (students && students.length > 0) {
            this.studentList = students;
            if (students.length === 1) {
              this.selectStudent(students[0]);
            } else {
              this.studentSelected = undefined;
            }
          } else {
            this.alertService.showErrorMessage(
              'No se encontró al graduado en el sistema'
            );
          }
        },
        error: (error) => {
          this.alertService.showErrorMessage(error);
        }
      });
    }
  }

  selectStudent(student: StudentDto) {
    this.studentSelected = student;
    this.studentForm.patchValue({
      name: student.person.name,
      lastname: student.person.lastname,
      docNumber: student.person.docNumber,
      sex: student.person.sex,
      registrationNumber: student.registrationNumber,
      university: student.universityName,
      academicUnit: student.academicUnit,
      degreeProgramName: student.degreeProgramName,
      degreeProgramCurriculum: student.degreeProgramCurriculum,
      ministerialOrdinance: student.ministerialOrdinance,
      superiorCouncilOrdinance: student.superiorCouncilOrdinance,
      directiveCouncilOrdinance: student.directiveCouncilOrdinance
    });
    this.studentForm.disable();
  }

  clearForm() {
    this.certificateForm.reset();
    this.studentForm.reset();
  }

  goToTransactionList() {
    this.router.navigateByUrl('/transactions');
  }
}
