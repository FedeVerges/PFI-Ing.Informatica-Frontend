import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    authService.isLoggedIn().subscribe(value => { debugger; this.isLoggedIn = value });
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

}
