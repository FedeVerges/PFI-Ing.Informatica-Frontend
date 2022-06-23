import { Component, OnInit } from '@angular/core';
import { Certificate } from 'src/app/core/models/certificate';
import { Web3Service } from 'src/app/core/services/web3.service';

@Component({
  selector: 'app-certificate-validator',
  templateUrl: './certificate-validator.component.html',
  styleUrls: ['./certificate-validator.component.scss']
})
export class CertificateValidatorComponent implements OnInit {

  searchStudentId:number = 0;
  amountCertificates: number = 0;
  certificateSearchResult:any[]=[];
  certificates: Certificate[] = [];

  constructor(private web3Service: Web3Service,) { }

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

  getCertificatesByStudentId(studentId: number) {
    this.web3Service.getCertificatesByStudentId(studentId)
      .then(
        (result) => {
          this.certificateSearchResult = result
        }
      )
  }


}
