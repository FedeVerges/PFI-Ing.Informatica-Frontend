import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Certificate } from 'src/app/core/models/certificate';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Web3Service } from 'src/app/core/services/web3.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router) {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  get user() { return this.loginForm.get('user'); }
  get password() { return this.loginForm.get('password'); }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.authService.login()
        .subscribe((response: any) => {
          if (response?.token) {
            this.localStorageService.setToken(response.token);
            this.router.navigate(['/home']);
          }
        });
    }
  }

}
