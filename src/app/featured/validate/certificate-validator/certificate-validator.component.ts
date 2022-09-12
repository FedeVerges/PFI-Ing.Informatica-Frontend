import { Component, OnInit } from '@angular/core';
import { Certificate } from 'src/app/core/models/certificate';
import { CertificateDto } from 'src/app/core/models/dto/certificateDto';
import { CertificateService } from 'src/app/core/services/certificate.service';
import { Web3Service } from 'src/app/core/services/web3.service';

@Component({
  selector: 'app-certificate-validator',
  templateUrl: './certificate-validator.component.html',
  styleUrls: ['./certificate-validator.component.scss']
})
export class CertificateValidatorComponent implements OnInit {

  searchStudentId: number = 0;
  amountCertificates: number = 0;
  certificateSearchResult: CertificateDto[] = [];
  certificates: Certificate[] = [];

  constructor(private certificateService: CertificateService) { }

  ngOnInit(): void {
  }


  // getAmountCertificates() {
  //   this.web3Service.getAmountCertificates()
  //     .then(
  //       (result) => {
  //         this.amountCertificates = result
  //       }
  //     )
  // }

  getCertificatesByStudentId(studentId: number) {
    this.certificateService.getCertificatesByStudentId(studentId)
      .subscribe((result) => {
        this.certificateSearchResult = result
      })
  }


}
