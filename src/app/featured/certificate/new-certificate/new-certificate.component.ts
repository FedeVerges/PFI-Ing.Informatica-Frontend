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
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';

@Component({
  selector: 'app-new-certificate',
  templateUrl: './new-certificate.component.html',
  styleUrls: ['./new-certificate.component.scss']
})
export class NewCertificateComponent {
  certificateForm!: FormGroup;
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
  hasCertificate = false;
  currentCertificate: BlockchainTransactionDto | undefined;

  constructor(
    private web3Service: Web3Service,
    private fb: FormBuilder,
    private certificateService: CertificateService,
    private alertService: AlertService,
    private studentSerivce: StudentService,
    private router: Router
  ) {
    this.certificateForm = this.fb.group({
      waferNumber: ['', [Validators.required]]
    });
  }

  addNewCertificate() {
    // Crear el certificado atraves de la funcion createCertificate
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
          degreeProgramCurriculum: this.studentSelected.degreeProgramCurriculum,
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
        this.createCertificate(certificate);
      }
    } else {
      this.certificateForm.markAllAsTouched();
      this.alertService.showErrorMessage(
        'Verifique los datos del certificado.'
      );
    }
  }

  createCertificate(certificate: CertificateEth) {
    this.certificateService.createNewCertificate(certificate).subscribe({
      next: (transactionData: TransactionDto) => {
        if (transactionData && transactionData.receipt) {
          this.successMessage = `Se ha enviado la transacción a la red Ethereum!`;
          this.detailMessage = `En unos minutos la transacción será validada y aprobada por la red.`;
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
    this.getTitles(student);
  }

  clearForm() {
    this.certificateForm.reset();
  }

  goToTransactionList() {
    this.router.navigateByUrl('/transactions');
  }

  getTitles(student: StudentDto) {
    this.certificateService
      .getCertificatesByStudentId(String(student.blockchainId))
      .pipe(
        catchError((error) => {
          this.alertService.showErrorMessage(String(error));
          return throwError(() => error);
        })
      )
      .subscribe((certificates) => {
        this.currentCertificate = certificates.find(
          (c) =>
            c.certificate?.student.id == student.blockchainId &&
            c.certificate.universityDegree.degreeProgramName ===
              student.degreeProgramName &&
            c.certificate.universityDegree.degreeProgramCurriculum ===
              student.degreeProgramCurriculum
        );
        this.hasCertificate = !!this.currentCertificate;
      });
  }
}
