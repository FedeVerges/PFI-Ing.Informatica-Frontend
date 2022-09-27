import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { RoleDto } from "../models/dto/roleDto";
import { UserDto } from "../models/dto/userDto";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: BehaviorSubject<UserDto | null> = new BehaviorSubject<UserDto | null>(null);
  private _role: BehaviorSubject<RoleDto | null> = new BehaviorSubject<RoleDto | null>(null);
  
  
  public get currentUser(): BehaviorSubject<UserDto | null> {
    return this._user
  }

  // todo: agregar observable para manejar los roles y permisos.

  constructor(private localStorageService: LocalStorageService) { 
    this.setCurrentUser(this.hasToken());
    this._role.next(this.hasRole());
  }

  /**
   *  Login the user then tell all the subscribers about the new status
   */
  login(token: string, userData: UserDto, role:RoleDto): void {
    this.localStorageService.setToken(token);
    this.localStorageService.setUser(userData);
    this.localStorageService.setRole(role);
    this.setCurrentUser(userData);
    this.role.next(role);
  }

  /**
   * Log out the user then tell all the subscribers about the new status
   */
  logout(): void {
    this.localStorageService.logout();
    this.setCurrentUser(null);
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

  /**
   *
   * @returns {Observable<T>}
   */
  getCurrentUser(): Observable<UserDto | null> {
    return this._user.asObservable();
  }

  setCurrentUser(value: UserDto | null) {
    this._user.next(value);
  }


  getRole(): Observable<RoleDto | null> {
    return this._role.asObservable();
  }

  public get role(): BehaviorSubject<RoleDto | null> {
    return this._role;
  }
  public set role(value: BehaviorSubject<RoleDto | null>) {
    this._role = value;
  }

}