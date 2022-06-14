import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { threadId } from 'worker_threads';
import { Web3Service } from './core/services/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
