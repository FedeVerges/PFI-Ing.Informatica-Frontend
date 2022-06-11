import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Web3Service } from './core/services/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'validador-titulos';
  certificateForm!: FormGroup;

  constructor(private web3Service: Web3Service, private fb:FormBuilder) {
    this.certificateForm = fb.group({
      degree: [''],
      name: [''],
      lastName: [''],
      docNumber: [''],
    }) 
  }
  certificates: any[] = [];
  amountCertificates: number = 0;
  idContract: number = 0;



  getAmountCertificates() {
    this.web3Service.getAmountCertificates()
      .then(
        (result) => {
          this.amountCertificates = result
        }
      )
  }

  getCertificateById(idContract:number) {
    this.web3Service.getCertificateById(idContract)
      .then(
        (result) => {
          this.certificates = result
        }
      )
  }

}
