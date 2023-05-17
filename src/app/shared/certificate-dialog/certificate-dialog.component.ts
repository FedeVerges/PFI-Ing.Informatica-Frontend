import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';
import { RoleDto } from 'src/app/core/models/dto/roleDto';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-certificate-dialog',
  templateUrl: './certificate-dialog.component.html',
  styleUrls: ['./certificate-dialog.component.scss']
})
export class CertificateDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BlockchainTransactionDto,
    private authService: AuthService
  ) {
    this.role$ = this.authService.getRole();
  }
  role$: Observable<RoleDto | null>;
}
