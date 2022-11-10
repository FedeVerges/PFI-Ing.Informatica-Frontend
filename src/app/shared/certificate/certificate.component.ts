import { Component, Input, OnInit } from '@angular/core';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  // @Input() transaction: BlockchainTransactionDto | undefined

  transaction: BlockchainTransactionDto = {
    transactionHash: "0x8722542ea90c26e90d7fb946ae103fbdcbb182945205746ad7ba5133266fabeb",
    certificate: {
      id: 3,
      student: {
        id: 1,
        universityName: "Universidad Nacional de San Luis",
        academicUnit: "Facultad Fisico, Matematicas y Naturales",
        degreeProgramCurriculum: "16-01",
        degreeProgramName: "Ingenieria en Computación",
        degreeProgramOrdinance: "123123123",
        person: {
          id: 1,
          name: "Federico",
          lastname: "Verges",
          fullname: "Federico Verges",
          docNumber: "41221778",
          sex: "Masculino",
          genderIdentity: "false"
        }
      },
      degreeType: "Grado",
      degreeName: "Licenciado en Psicologia",
      ministerialOrdinance: "asdasd3231",
      waferNumber: "23213132sadads",
      volumeNumber: "231213321dsaasd",
      recordNumber: "213321231asdasd",
      status: "ACT",
      createdAt: "2022-05-18"
    },
    certificateBlockchainId: 3,
    status: "COMPLETED",
    blockHash: "0x9b1debafc8fc396cc23cf5b2fd93619332dda9df8b88392cef53f770c3351190",
    etherscanLink: 'https://sepolia.etherscan.io/tx/0x8722542ea90c26e90d7fb946ae103fbdcbb182945205746ad7ba5133266fabeb',
    gasUsed: 608876,
  }

  constructor() {
  }

  ngOnInit(): void { }

  createEtherscanLink() {

  }

}
