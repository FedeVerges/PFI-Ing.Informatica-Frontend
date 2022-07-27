import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Certificate, CertificateDto } from 'src/app/core/models/certificate';
import { Web3Service } from 'src/app/core/services/web3.service';

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

  constructor(private web3Service: Web3Service, private fb: FormBuilder) {
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
        degreeType: this.certificateForm.get('degreeType')!.value,
        student: {
          name: this.certificateForm.get('firstName')!.value,
          lastName: this.certificateForm.get('lastName')!.value,
          documentNumber: this.certificateForm.get('docNumber')!.value,
        },
        institution: this.certificateForm.get('institution')!.value,
        waferNumber: this.certificateForm.get('waferNumber')!.value
      }
      this.createCertificate(certificate);
    } else {
      this.certificateForm.markAllAsTouched();
    }
  }

  createCertificate(certificate: Certificate) {
    this.web3Service.createCertificate(certificate.student?.degree?.name!, certificate.student?.name!, certificate.student?.id!)
      .then(
        (result: any) => {
          debugger
          // TODO: Realizar un converter.
          if (result && result.events && result.transactionHash) {
            console.info(result.transactionHash);
            console.info(result.events);
            const returnValues = result.events.CertificateCreated.returnValues;
            console.info(returnValues.updatedAt);
            let newCertificate: Certificate = {
              id: Number(returnValues.id),
              student: {
                name: returnValues.studentName,
                docNumber: returnValues.studentId,
              },
            }
            this.certificates.push(newCertificate);
          }
        }
      )
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