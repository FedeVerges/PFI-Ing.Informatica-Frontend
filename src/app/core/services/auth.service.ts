import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoleDto } from '../models/dto/roleDto';
import { StudentDto } from '../models/dto/studentDto';
import { UserDto } from '../models/dto/userDto';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _role: BehaviorSubject<RoleDto | null> =
    new BehaviorSubject<RoleDto | null>(null);
  private _studentSelected: BehaviorSubject<StudentDto | null> =
    new BehaviorSubject<StudentDto | null>(null);
  private _user: BehaviorSubject<UserDto | null> =
    new BehaviorSubject<UserDto | null>(null);

  getCurrentUser(): Observable<UserDto | null> {
    return this._user.asObservable();
  }

  setCurrentUser(value: UserDto | null) {
    this._user.next(value);
  }

  getStudentSelected(): Observable<StudentDto | null> {
    return this._studentSelected.asObservable();
  }

  setStudentSelected(value: StudentDto | null) {
    this._studentSelected.next(value);
  }

  getRole(): Observable<RoleDto | null> {
    return this._role.asObservable();
  }

  setRole(value: RoleDto | null) {
    this._role.next(value);
  }

  // todo: agregar observable para manejar los roles y permisos.

  constructor(private localStorageService: LocalStorageService) {
    const user = this.hasToken();
    this.setCurrentUser(user);
    this.setRole(this.hasRole());

    // No hay estudiante seleccionado.
    if (user?.person?.students) {
      this.setStudentSelected(user.person?.students[0]);
    }
  }

  /**
   *  Login the user then tell all the subscribers about the new status
   */
  login(token: string, userData: UserDto, role: RoleDto): void {
    this.localStorageService.setToken(token);
    this.localStorageService.setUser(userData);
    this.localStorageService.setRole(role);
    this.setCurrentUser(userData);
    this.setRole(role);
  }

  /**
   * Log out the user then tell all the subscribers about the new status
   */
  logout(): void {
    this.localStorageService.logout();
    this.setCurrentUser(null);
    this.setRole(null);
    this.setStudentSelected(null);
  }

  /**
   * if we have token the user is loggedIn.
   * @returns {UserDto}
   */
  private hasToken(): UserDto | null {
    const token = this.localStorageService.getToken();
    const user = this.localStorageService.getUser();

    return token !== null ? user : null;
  }
  /**
   * if we have token the user is loggedIn.
   * @returns {RoleDto}
   */
  private hasRole(): RoleDto | null {
    const token = this.localStorageService.getToken();
    const role = this.localStorageService.getRole();

    return token !== null ? role : null;
  }
}
