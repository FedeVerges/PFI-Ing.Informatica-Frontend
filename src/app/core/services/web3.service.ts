import { Injectable } from '@angular/core';
import Web3 from 'web3';

const URL_GANACHE = 'http://127.0.0.1:7545';
@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private _web3!: Web3;
  
  public get web3(): Web3 {
    return this._web3;
  }
  public set web3(value: Web3) {
    this._web3 = value;
  }
  
  constructor() {
    // URL de la conexion.
    this.web3 = new Web3(URL_GANACHE);
    // this.web3.setProvider(new Web3.providers.HttpProvider(URL_GANACHE));
    console.log(this.web3)
    debugger
    this.web3.eth.getAccounts().then(console.log);
  }




}
