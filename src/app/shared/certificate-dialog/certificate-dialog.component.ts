import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';
import { RoleDto } from 'src/app/core/models/dto/roleDto';
import { AuthService } from 'src/app/core/services/auth.service';
import { CertificateService } from 'src/app/core/services/certificate.service';

@Component({
  selector: 'app-certificate-dialog',
  templateUrl: './certificate-dialog.component.html',
  styleUrls: ['./certificate-dialog.component.scss']
})
export class CertificateDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BlockchainTransactionDto,
    private authService: AuthService,
    private certificateService: CertificateService
  ) {
    this.role$ = this.authService.getRole();
  }

  deleteCertficate(id: number) {
    // todo: cartel de "Esta seguro de que desea elimiar... "
    this.certificateService.deleteCertificate(id).subscribe({
      next: (res) => {
        debugger;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
  role$: Observable<RoleDto | null>;
}
