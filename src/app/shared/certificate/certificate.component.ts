import {Component, Input, OnInit} from '@angular/core';
import {CertificateDto} from "../../core/models/dto/certificateDto";

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  @Input() certificate: CertificateDto | undefined

  constructor() {
  }

  ngOnInit(): void {
  }

}
