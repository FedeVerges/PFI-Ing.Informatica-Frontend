import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
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
export class NavBarComponent implements OnDestroy {
  // user$: Observable<UserDto | null>;
  user: UserDto | null = null;
  netwotkStatus: Observable<NetworkStatusDto>;
  role$: Observable<RoleDto | null>;
  student: StudentDto | null = null;
  subscription!: Subscription;

  constructor(private authService: AuthService, private router: Router, private websocketService: WebsocketService) {
    // this.user$ = authService.getCurrentUser();
    this.netwotkStatus = websocketService.currentStatus$;
    this.role$ = authService.getRole();
    // this.subscription = authService.getStudentSelected().subscribe((x) => this.initStudentSelected);
    this.initSubsciptionSelectStudent();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  /**
   * Cuando el usuario elije un perfil de estudiante, este debe ser global para toda la app.
   * Los titulos se cargan a partir del estudiante
   */
  selectStudent() {
    if (this.student) {
      this.authService.setStudentSelected(this.student);
    }
  }

  initSubsciptionSelectStudent() {
    this.subscription = this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.user = user;
        if (user.person?.students && user.person?.students.length > 0) {
          this.student = user.person?.students[0];
        }
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
