import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CERTIFICATE_STATUS } from 'src/app/core/enum/certificateStatus';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';
import { RoleDto } from 'src/app/core/models/dto/roleDto';
import { UserDto } from 'src/app/core/models/dto/userDto';
import { AuthService } from 'src/app/core/services/auth.service';
import { CertificateService } from 'src/app/core/services/certificate.service';
import { CertificateDialogComponent } from '../certificate-dialog/certificate-dialog.component';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent {
  public CERTIFICATE_STATUS = CERTIFICATE_STATUS;

  @Input() transaction: BlockchainTransactionDto | undefined;
  @Input() certificateDeleted: boolean = false;

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
    this.user$ = this.authService.getCurrentUser();
  }
  role$: Observable<RoleDto | null>;
  user$: Observable<UserDto | null>;

  goDetail(id?: number) {
    debugger;
    if (id && this.transaction) {
      this.dialog
        .open(CertificateDialogComponent, {
          data: this.transaction,
          autoFocus: false
        })
        .afterClosed()
        .subscribe((res) => {});
    }
  }

  exportPdf(id?: number) {
    if (id && this.transaction) {
      this.certificateService.getPdf(id).subscribe((res: any) => {
        this.downloadPdf(res.document, res.name);
      });
    }
  }

  downloadPdf(base64: string, docName: string) {
    const byteArray = new Uint8Array(
      atob(base64)
        .split('')
        .map((char) => char.charCodeAt(0))
    );
    const file = new Blob([byteArray], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    let pdfName = docName || 'report.pdf';
    //window.open(fileURL);

    // Construct the 'a' element
    let link = document.createElement('a');
    link.download = pdfName;
    link.target = '_blank';

    // Construct the URI
    link.href = fileURL;
    document.body.appendChild(link);
    link.click();

    // Cleanup the DOM
    document.body.removeChild(link);
  }
}
