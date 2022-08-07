import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
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
      const userName = this.user?.value;
      const password = this.password?.value
      if (userName && password) {
        // Realizar controles.
        this.userService.login(userName, password)
          .subscribe((response) => {
            if (response?.token) {
              const userData = {
                userName: response?.content.name,
                id: response?.content.id,
                email: response?.content.email,
              }
              this.authService.login(response.token, userData);
              this.router.navigateByUrl('new-certificate');
            }
          });
      }
    }
  }
}