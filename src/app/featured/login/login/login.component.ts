import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDto } from 'src/app/core/models/dto/userDto';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  user$: Observable<UserDto | null>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.user$ = authService.getCurrentUser();
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get user() {
    return this.loginForm.get('user');
  }
  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      const userName = this.user?.value;
      const password = this.password?.value;
      if (userName && password) {
        // Realizar controles.
        this.userService.login(userName, password).subscribe({
          next: (response) => {
            if (response?.token && response.role) {
              const userData: UserDto = {
                name: response?.content.name,
                id: response?.content.id,
                email: response?.content.email,
                person: response?.content.person
              };
              this.authService.login(response.token, userData, response.role);
              // todo: dependiendo del rol, va a una pantalla o a otra.
              this.router.navigateByUrl('student/search');
            }
          },
          error: (e) => this.alertService.showErrorMessage(e)
        });
      }
    }
  }
}
