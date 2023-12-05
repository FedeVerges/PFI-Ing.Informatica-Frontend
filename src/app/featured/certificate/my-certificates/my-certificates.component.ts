import { Component, OnInit } from '@angular/core';
import { request } from 'http';
import {
  EMPTY,
  empty,
  filter,
  forkJoin,
  map,
  merge,
  mergeAll,
  mergeMap,
  Observable,
  of,
  pipe,
  Subscription,
  switchMap,
  tap
} from 'rxjs';
import { BlockchainTransactionDto } from 'src/app/core/models/dto/blockchainTransactionDto';
import { StudentDto } from 'src/app/core/models/dto/studentDto';
import { UserDto } from 'src/app/core/models/dto/userDto';
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

  user$: Observable<UserDto | null>;

  constructor(
    private certificateService: CertificateService,
    private authService: AuthService
  ) {
    this.initSubsciptionSelectStudent();
    this.user$ = this.authService.getCurrentUser();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initSubsciptionSelectStudent() {
    this.subscription = this.authService
      .getCurrentUser()
      .pipe(
        // tap((usr) => (this.student = usr.)),
        filter(
          (usr) =>
            usr !== null &&
            !!usr?.person?.students &&
            usr?.person?.students.length > 0
        ),
        switchMap((usr) => {
          const studentsWithTitles = usr?.person?.students.filter(
            (st) => st.blockchainId
          );
          if (studentsWithTitles?.length && studentsWithTitles?.length > 0) {
            const requests: Observable<any>[] = studentsWithTitles.map((st) => {
              return this.certificateService
                .getCertificatesByStudentId(String(st.blockchainId))
                .pipe(map((s) => s[0]));
            })!;
            return forkJoin(requests);
          } else {
            return EMPTY;
          }
        }),
        tap((b: BlockchainTransactionDto[]) => {
          debugger;
          this.transactions = b;
        })
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
