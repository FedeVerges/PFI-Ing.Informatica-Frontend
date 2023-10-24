import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonDto } from 'src/app/core/models/dto/personDto';
import { AlertService } from 'src/app/core/services/alert.service';
import { CertificateService } from 'src/app/core/services/certificate.service';
import { Web3Service } from 'src/app/core/services/web3.service';
import { StudentDto } from '../../../core/models/dto/studentDto';
import { TransactionDto } from '../../../core/models/dto/transactionDto';
import { StudentService } from '../../../core/services/student.service';
import { CertificateEth } from 'src/app/core/models/dto/blockchain/certificateEth';
import { StudentEth } from 'src/app/core/models/dto/blockchain/studentEth';
import { UniversityDegreeEth } from 'src/app/core/models/dto/blockchain/universityDegreeEth';

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
        let certificate: CertificateEth;
        if (this.studentSelected) {
          const student: StudentEth = {
            docNumber: this.studentSelected.person.docNumber,
            docType: this.studentSelected.person.docType,
            name: this.studentSelected.person.name,
            lastname: this.studentSelected.person.lastname,
            sex: this.studentSelected.person.sex,
            registrationNumber: this.studentSelected.registrationNumber,
            id: this.studentSelected.blockchainId
          };
          const degree: UniversityDegreeEth = {
            academicUnit: this.studentSelected.academicUnit,
            degreeProgramName: this.studentSelected.degreeProgramName,
            degreeProgramCurriculum:
              this.studentSelected.degreeProgramCurriculum,
            degreeType: this.studentSelected.degreeType,
            universityName: this.studentSelected.universityName
          };
          certificate = {
            student: student,
            active: true,
            universityDegree: degree,
            createdAt: 0,
            id: 0,
            updatedAt: 0,
            waferNumber: this.certificateForm.get('waferNumber')!.value
          };
          // TODO: Ajustar................................................................
          this.createCertificate(certificate);
        }
        /* else {
          const student: StudentEth = {
            docType: this.studentSelected.person.docType,
            registrationNumber: this.studentSelected.registrationNumber,
            id: 0,
            name: this.studentForm.get('name')!.value,
            lastname: this.studentForm.get('lastname')!.value,
            docNumber: this.studentForm.get('docNumber')!.value,
            sex: this.studentForm.get('sex')!.value
          };
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
        */
      } else {
        this.certificateForm.markAllAsTouched();
        this.alertService.showErrorMessage(
          'Verifique los datos del certificado.'
        );
      }
    } else {
      this.alertService.showErrorMessage('Verifique los datos del estudiante.');
    }
  }

  createCertificate(certificate: CertificateEth) {
    this.certificateService.createNewCertificate(certificate).subscribe({
      next: (transactionData: TransactionDto) => {
        if (transactionData && transactionData.receipt) {
          this.successMessage = `Se ha enviado la transacción exitosamente.`;
          this.detailMessage = `En unos minutos la transacción ${transactionData.receipt.transactionHash} será validada y aprobada por la red.`;
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
      degreeProgramCurriculum: student.degreeProgramCurriculum
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
