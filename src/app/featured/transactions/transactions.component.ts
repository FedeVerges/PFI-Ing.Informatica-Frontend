import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';
import { AlertService } from 'src/app/core/services/alert.service';
import { CertificateService } from 'src/app/core/services/certificate.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  // transaction: BlockchainTransactionDto = {
  //   transactionHash:
  //     '0x8722542ea90c26e90d7fb946ae103fbdcbb182945205746ad7ba5133266fabeb',
  //   certificate: {
  //     id: 3,
  //     student: {
  //       id: 1,
  //       universityName: 'Universidad Nacional de San Luis',
  //       academicUnit: 'Facultad Fisico, Matematicas y Naturales',
  //       degreeProgramCurriculum: '16-01',
  //       degreeProgramName: 'Ingenieria en Computación',
  //       blockchainId: 2,
  //       directiveCouncilOrdinance: '123123123123',
  //       ministerialOrdinance: '123123123123',
  //       registrationNumber: 123123123,
  //       superiorCouncilOrdinance: '123123123123',
  //       person: {
  //         id: 1,
  //         name: 'Federico',
  //         lastname: 'Verges',
  //         fullname: 'Federico Verges',
  //         docNumber: '41221778',
  //         sex: 'Masculino'
  //       }
  //     },
  //     degreeType: 'Grado',
  //     degreeName: 'Licenciado en Psicologia',
  //     waferNumber: '23213132sadads',
  //     status: 'ACT',
  //     dateCreated: '2022-05-18'
  //   },
  //   certificateBlockchainId: 3,
  //   status: 'COMPLETED',
  //   blockHash:
  //     '0x9b1debafc8fc396cc23cf5b2fd93619332dda9df8b88392cef53f770c3351190',
  //   etherscanLink:
  //     'https://sepolia.etherscan.io/tx/0x8722542ea90c26e90d7fb946ae103fbdcbb182945205746ad7ba5133266fabeb',
  //   gasUsed: 608876
  // };

  transactionList: BlockchainTransactionDto[] = [];

  constructor(
    private certificateService: CertificateService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.certificateService
      .getAllTransactions()
      .pipe(
        tap((res) => (this.transactionList = res)),
        catchError((e) => {
          this.alertService.showErrorMessage(e);
          throw e;
        })
      )
      .subscribe();
  }

  goDetail(id: number) {
    if (id) {
      this.router.navigateByUrl(`certificate/${id}`);
    } else {
      throw new Error('Id certificado nulo.');
    }
  }
}
