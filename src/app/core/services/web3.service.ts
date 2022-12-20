import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
const URL_GANACHE = 'http://127.0.0.1:7545';
declare let require: any;
let tokenAbi = require('../../../../../../blockchain/certificateContract/build/contracts/Certificates.json');

// import {Certificate} from '';
@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private _web3!: Web3;
  contactAddress: string = environment.contractAddress;
  certificateContract: Contract | undefined = undefined;
  certificates = [];

  public get web3(): Web3 {
    return this._web3;
  }
  public set web3(value: Web3) {
    this._web3 = value;
  }
  private accounts: string[] = [];
  public ready = false;

  public accountsObservable = new Subject<string[]>();

  constructor() {
    // // URL de la conexion.
    // this.web3 = new Web3(URL_GANACHE);
    // this.web3.setProvider(new Web3.providers.HttpProvider(URL_GANACHE));
    // console.log(this.web3);
    // this.web3.eth.getAccounts().then(
    //   (result: string[]) => {
    //     this.accounts = result;
    //   }
    // );
    // this.certificateContract = this.getCertificateContract();
  }

  private getCertificateContract() {
    const abi = tokenAbi.abi;
    const certificateContract = new this.web3.eth.Contract(
      abi,
      this.contactAddress
    );
    return certificateContract;
  }

  public async getCertificatesByStudentId(id: number) {
    return this.certificateContract!.methods.getCertificatesByStudentId(
      id
    ).call() as Promise<any>;
  }

  public async getAmountCertificates() {
    return this.certificateContract!.methods.amountCertificates().call() as Promise<any>;
  }

  public async createCertificate(
    profession: string,
    name: string,
    studentId: number
  ) {
    // Hacer el correcto manejo de errores.
    const transaction = this.certificateContract!.methods.createCertificate(
      profession,
      name,
      studentId
    );
    const senderWalletAddress = this.accounts[0];
    const gas = await transaction.estimateGas({ from: senderWalletAddress });
    return transaction.send({
      from: senderWalletAddress,
      gas: gas
    }) as Promise<any>;
  }

  // const provider = await this.getWebProvider();
  // const signer = provider.getSigner();
  // this.web3.eth.getAccounts().then(console.log);

  // return new this.web3.eth.Contract(
  //   environment.contractAddress,
  //   Gallery.abi,
  //   bySigner ? signer : provider,
  // )
}
