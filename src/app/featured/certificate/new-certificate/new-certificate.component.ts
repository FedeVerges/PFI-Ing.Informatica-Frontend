import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Certificate } from 'src/app/core/models/certificate';
import { CertificateDto } from 'src/app/core/models/dto/certificateDto';
import { StudentDto } from 'src/app/core/models/dto/studentDto';
import { TransactionDto } from 'src/app/core/models/dto/transactionDto';
import { CertificateService } from 'src/app/core/services/certificate.service';
import { Web3Service } from 'src/app/core/services/web3.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-certificate',
  templateUrl: './new-certificate.component.html',
  styleUrls: ['./new-certificate.component.scss']
})
export class NewCertificateComponent implements OnInit {
  certificateForm!: FormGroup;
  amountCertificates: number = 0;
  idContract: number = 0;
  certificates: Certificate[] = [];
  certificateSearchResult: any[] = [];

  constructor(private web3Service: Web3Service,
    private fb: FormBuilder,
    private certificateService: CertificateService,
    private _snackBar: MatSnackBar) {
    this.certificateForm = this.fb.group({

      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      docNumber: ['', [Validators.required]],
      institution: ['', [Validators.required]],
      degreeName: ['', [Validators.required]],
      degreeType: ['', [Validators.required]],
      waferNumber: ['', [Validators.required]],
      recordNumber: ['', [Validators.required]],
      volumeNumber: ['', [Validators.required]],

    })
  }

  get docNumber() { return this.certificateForm.get('docNumber'); }

  ngOnInit(): void {
  }

  addNewCertificate() {
    // Crear el certificado atraves de la funcion createCertificate
    // Validar correctamente los campos.
    if (this.certificateForm.valid) {
      let certificate: CertificateDto = {
        degreeName: this.certificateForm.get('degreeName')!.value,
        certificateTypeId: this.certificateForm.get('degreeType')!.value,
        student: {
          name: this.certificateForm.get('firstName')!.value,
          lastname: this.certificateForm.get('lastName')!.value,
          docNumber: this.certificateForm.get('docNumber')!.value
        } as StudentDto,
        institutionId: this.certificateForm.get('institution')!.value,
        recordNumber: this.certificateForm.get('recordNumber')!.value,
        volumeNumber: this.certificateForm.get('volumeNumber')!.value,
        waferNumber: this.certificateForm.get('waferNumber')!.value
      }
      this.createCertificate(certificate);
    } else {
      this.certificateForm.markAllAsTouched();
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
    // .then(
    //   (result: any) => {
    //     debugger
    //     // TODO: Realizar un converter.
    //     if (result && result.events && result.transactionHash) {
    //       console.info(result.transactionHash);
    //       console.info(result.events);
    //       const returnValues = result.events.CertificateCreated.returnValues;
    //       console.info(returnValues.updatedAt);
    //       let newCertificate: Certificate = {
    //         id: Number(returnValues.id),
    //         student: {
    //           name: returnValues.studentName,
    //           docNumber: returnValues.studentId,
    //         },
    //       }
    //       this.certificates.push(newCertificate);
    //     }
    //   }
    // )
  }

  getCertificatesById(studentId: number) {
    this.web3Service.getCertificatesByStudentId(studentId)
      .then(
        (result) => {
          this.certificateSearchResult = result
        }
      )
  }
}