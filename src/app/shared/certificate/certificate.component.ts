import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';
import { RoleDto } from 'src/app/core/models/dto/roleDto';
import { AuthService } from 'src/app/core/services/auth.service';
import { CertificateService } from 'src/app/core/services/certificate.service';
import { CertificateDialogComponent } from '../certificate-dialog/certificate-dialog.component';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent {
  @Input() transaction: BlockchainTransactionDto | undefined;

  // transaction: BlockchainTransactionDto = {
  //   transactionHash: "0x8722542ea90c26e90d7fb946ae103fbdcbb182945205746ad7ba5133266fabeb",
  //   certificate: {
  //     id: 3,
  //     student: {
  //       id: 1,
  //       universityName: "Universidad Nacional de San Luis",
  //       academicUnit: "Facultad Fisico, Matematicas y Naturales",
  //       degreeProgramCurriculum: "16-01",
  //       degreeProgramName: "Ingenieria en Computación",
  //       degreeProgramOrdinance: "123123123",
  //       person: {
  //         id: 1,
  //         name: "Federico",
  //         lastname: "Verges",
  //         fullname: "Federico Verges",
  //         docNumber: "41221778",
  //         sex: "Masculino",
  //         genderIdentity: "false"
  //       }
  //     },
  //     degreeType: "Grado",
  //     degreeName: "Licenciado en Psicologia",
  //     ministerialOrdinance: "asdasd3231",
  //     waferNumber: "23213132sadads",
  //     volumeNumber: "231213321dsaasd",
  //     recordNumber: "213321231asdasd",
  //     status: "ACT",
  //     createdAt: "2022-05-18"
  //   },
  //   certificateBlockchainId: 3,
  //   status: "COMPLETED",
  //   blockHash: "0x9b1debafc8fc396cc23cf5b2fd93619332dda9df8b88392cef53f770c3351190",
  //   etherscanLink: 'https://sepolia.etherscan.io/tx/0x8722542ea90c26e90d7fb946ae103fbdcbb182945205746ad7ba5133266fabeb',
  //   gasUsed: 608876,
  // }

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private certificateService: CertificateService
  ) {
    this.role$ = this.authService.getRole();
  }
  role$: Observable<RoleDto | null>;

  createEtherscanLink() {}

  goDetail(id?: number) {
    if (id && this.transaction) {
      this.dialog.open(CertificateDialogComponent, {
        data: this.transaction,
        autoFocus:false,
      });
    }
  }
}
