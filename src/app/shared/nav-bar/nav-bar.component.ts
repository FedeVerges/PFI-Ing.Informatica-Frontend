import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { NetworkStatusDto } from 'src/app/core/models/dto/notificationDto';
import { RoleDto } from 'src/app/core/models/dto/roleDto';
import { StudentDto } from 'src/app/core/models/dto/studentDto';
import { UserDto } from 'src/app/core/models/dto/userDto';
import { AuthService } from 'src/app/core/services/auth.service';
import { WebsocketService } from 'src/app/core/services/websocket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  user$: Observable<UserDto | null>;
  netwotkStatus: Observable<NetworkStatusDto>;
  role$: Observable<RoleDto | null>;
  student$: Observable<StudentDto | null>;

  constructor(private authService: AuthService, private router: Router, private websocketService: WebsocketService) {
    this.user$ = authService.getCurrentUser();
    this.netwotkStatus = websocketService.currentStatus$;
    this.role$ = authService.getRole();
    this.student$ = authService.getStudentSelected();
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
