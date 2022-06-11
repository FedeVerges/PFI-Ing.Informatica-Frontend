import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { threadId } from 'worker_threads';
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
      firstName: [''],
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
          debugger;
          this.certificates = result
        }
      )
  }

  createCertificate(){
    this.web3Service.createCertificate('Escribano', 'Fernando Vargas', '123456789')
    .then(
      (result) => {
        debugger;
      }
    )
    
  }

}
