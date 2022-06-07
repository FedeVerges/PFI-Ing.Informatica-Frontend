import { Component } from '@angular/core';
import { Web3Service } from './core/services/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'validador-titulos';

  constructor(private web3Service: Web3Service) {
  }
  
}
