import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { NetworkStatusDto } from 'src/app/core/models/dto/notificationDto';
import { AuthService } from 'src/app/core/services/auth.service';
import { WebsocketService } from 'src/app/core/services/websocket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLoggedIn: Observable<boolean>;
  netwotkStatus: Observable<NetworkStatusDto>;

  constructor(private authService: AuthService, private router: Router, private websocketService: WebsocketService) {
    this.isLoggedIn = authService.isLoggedIn()
    this.netwotkStatus = websocketService.currentStatus$;
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
