import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Certificate } from 'src/app/core/models/certificate';
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
  certificateSearchResult:any[]=[];

  constructor(private web3Service: Web3Service, private fb: FormBuilder) {
    this.certificateForm = this.fb.group({
      degree: ['', ],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      docNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      institution: ['', [Validators.required]],
      date: ['', ],
    })
  }

  get docNumber() { return this.certificateForm.get('docNumber'); }

  ngOnInit(): void {
  }

  addNewCertificate() {
    // Crear el certificado atraves de la funcion createCertificate
    // Validar correctamente los campos.
    if (this.certificateForm.valid) {
      let certificate : Certificate = { 
        student: {
          degree: {name:this.certificateForm.get('degree')!.value},
          name: this.certificateForm.get('firstName')!.value,
          lastName: this.certificateForm.get('lastName')!.value,
          docNumber: this.certificateForm.get('docNumber')!.value,
          id: this.certificateForm.get('docNumber')!.value,
        }
      }
      this.createCertificate(certificate);
    }
  }

  createCertificate(certificate: Certificate) {
    this.web3Service.createCertificate(certificate.student?.degree?.name!, certificate.student?.name!, certificate.student?.id!)
      .then(
        (result : any) => {
          // TODO: Realizar un converter.
          if(result && result.events && result.transactionHash){
            console.info(result.transactionHash);
            console.info(result.events);
            const returnValues = result.events.CertificateCreated.returnValues;
            console.info(returnValues.updatedAt);
            let newCertificate : Certificate = {
              id: Number(returnValues.id),
              student:{
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



