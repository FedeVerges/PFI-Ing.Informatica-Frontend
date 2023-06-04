import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CERTIFICATE_STATUS } from 'src/app/core/enum/certificateStatus';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';
import { RoleDto } from 'src/app/core/models/dto/roleDto';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CertificateService } from 'src/app/core/services/certificate.service';

@Component({
  selector: 'app-certificate-dialog',
  templateUrl: './certificate-dialog.component.html',
  styleUrls: ['./certificate-dialog.component.scss']
})
export class CertificateDialogComponent {
  public CERTIFICATE_STATUS = CERTIFICATE_STATUS;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BlockchainTransactionDto,
    public dialogRef: MatDialogRef<BlockchainTransactionDto>,
    private authService: AuthService,
    private alertService: AlertService,
    private certificateService: CertificateService
  ) {
    this.role$ = this.authService.getRole();
  }

  deleteCertficate(id: number) {
    // todo: cartel de "Esta seguro de que desea elimiar... "
    this.certificateService.deleteCertificate(id).subscribe({
      next: (res) => {
        this.dialogRef.close({ deleted: true });
      },
      error: (e) => {
        console.log(e);
        this.alertService.showErrorMessage(e);
      }
    });
  }
  role$: Observable<RoleDto | null>;
}
