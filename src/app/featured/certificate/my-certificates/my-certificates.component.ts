import { Component, OnInit } from '@angular/core';
import { filter, Subscription, switchMap, tap } from 'rxjs';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';
import { StudentDto } from 'src/app/core/models/dto/studentDto';
import { AuthService } from 'src/app/core/services/auth.service';
import { CertificateService } from 'src/app/core/services/certificate.service';
import { Web3Service } from 'src/app/core/services/web3.service';

@Component({
  selector: 'app-my-certificates',
  templateUrl: './my-certificates.component.html',
  styleUrls: ['./my-certificates.component.scss']
})
export class MyCertificatesComponent implements OnInit {
  // Debo tener un Estudiante en memoria para sacar los ids.
  student: StudentDto | null = null;
  subscription!: Subscription;
  transactions: BlockchainTransactionDto[] = [];

  constructor(private certificateService: CertificateService, private authService: AuthService) {
    this.initSubsciptionSelectStudent();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initSubsciptionSelectStudent() {
    this.subscription = this.authService
      .getStudentSelected()
      .pipe(
        tap((st) => (this.student = st)),
        filter((st) => st !== null),
        switchMap((st) => this.certificateService.getCertificatesByStudentId(String(st?.blockchainId))),
        tap((b) => (this.transactions = b))
      )
      .subscribe();
  }

  ngOnInit(): void {
    // Pedir los titutlos al back.
    // this.certificateService.getCertificatesByStudentId(1);
    // this.web3Service.getCertificatesByStudentId().subscribe((response) =>{});
    // El back deberia conectarse con blockchain y conseguir todos titulos.
    // Generar link de ehterscan por cada uno con los datos almacenados en la bd.
    // Tester y mejorar la UI.
  }
}
