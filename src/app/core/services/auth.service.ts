import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  public get isLoginSubject(): BehaviorSubject<boolean> {
    return this._isLoginSubject
  }

  // todo: agregar observable para manejar los roles y permisos.

  constructor(private localStorageService: LocalStorageService) { 
    this.setLogged(this.hasToken());
  }

  /**
   *  Login the user then tell all the subscribers about the new status
   */
  login(token: string, userData: any): void {
    debugger;
    this.localStorageService.setToken(token);
    this.localStorageService.setUser(userData);
    this.setLogged(true);
  }

  /**
   * Log out the user then tell all the subscribers about the new status
   */
  logout(): void {
    debugger
    this.localStorageService.logout();
    this.setLogged(false);
  }

  /**
   * if we have token the user is loggedIn
   * @returns {boolean}
   */
  private hasToken(): boolean {
    debugger;
    const token = this.localStorageService.getToken();
    return token !== null;
  }

  /**
   *
   * @returns {Observable<T>}
   */
  isLoggedIn(): Observable<boolean> {
    debugger;
    return this.isLoginSubject.asObservable();
  }

  setLogged(value:boolean){
    this._isLoginSubject.next(value);
  }

}