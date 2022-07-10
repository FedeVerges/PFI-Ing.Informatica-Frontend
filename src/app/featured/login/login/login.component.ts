import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Certificate } from 'src/app/core/models/certificate';
import { AuthService } from 'src/app/core/services/auth.service';
import { Web3Service } from 'src/app/core/services/web3.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService:AuthService) {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  get user() { return this.loginForm.get('user'); }
  get password() { return this.loginForm.get('password'); }

  login(){
    debugger;
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
    }else{
      // loggearse.
      this.authService.login().subscribe(response=>{
        console.log(response)
      });
    }
  }

}
