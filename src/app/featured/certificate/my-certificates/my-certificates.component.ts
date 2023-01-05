import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/core/services/web3.service';

@Component({
  selector: 'app-my-certificates',
  templateUrl: './my-certificates.component.html',
  styleUrls: ['./my-certificates.component.scss']
})
export class MyCertificatesComponent implements OnInit {

  // Debo tener un Estudiante en memoria para sacar los ids.

  constructor(private web3Service:Web3Service) { }

  ngOnInit(): void {
  // Pedir los titutlos al back.
  this.web3Service.getCertificatesByStudentId(1);
  // this.web3Service.getCertificatesByStudentId().subscribe((response) =>{});
  

  // El back deberia conectarse con blockchain y conseguir todos titulos.
  // Generar link de ehterscan por cada uno con los datos almacenados en la bd.
  // Tester y mejorar la UI.
  }

}
