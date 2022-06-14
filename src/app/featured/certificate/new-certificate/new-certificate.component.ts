import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Web3Service } from 'src/app/core/services/web3.service';

@Component({
  selector: 'app-new-certificate',
  templateUrl: './new-certificate.component.html',
  styleUrls: ['./new-certificate.component.scss']
})
export class NewCertificateComponent implements OnInit {
  certificateForm!: FormGroup;
  certificates: any[] = [];
  amountCertificates: number = 0;
  idContract: number = 0;

  constructor(private web3Service: Web3Service, private fb: FormBuilder) {
    this.certificateForm = this.fb.group({
      degree: [''],
      firstName: [''],
      lastName: [''],
      docNumber: [''],
    })
  }

  ngOnInit(): void {
  }

  getAmountCertificates() {
    this.web3Service.getAmountCertificates()
      .then(
        (result) => {
          this.amountCertificates = result
        }
      )
  }

  getCertificateById(idContract: number) {
    this.web3Service.getCertificateById(idContract)
      .then(
        (result) => {
          debugger;
          this.certificates = result
        }
      )
  }

  createCertificate() {
    this.web3Service.createCertificate('Escribano', 'Fernando Vargas', '123456789')
      .then(
        (result) => {
          debugger;
        }
      )

  }
}
