import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Todo:Armar Dto de user.
  private _userLogged: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  // private _userLogged$ = this._userLogged.asObservable();

  public get userLogged(): BehaviorSubject<any> {
    return this._userLogged;
  }

  public setUser(newUser: any) {
    this.userLogged.next(newUser);
  }

  // getCurrentUser(): Observable<any> {
  //   return this._userLogged$;
  // }
  constructor(private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }


  login() {
    // todo: Armar Interceptor.
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
    return this.http.post(environment.serverURL + '/login', {}, httpOptions);
  }

  isLoggedIn(): boolean {
    const token = this.localStorage.getToken();
    if (!token) {
      this.logout();
      return false;
    } else {
      return this._userLogged.value !== null;
    }
  }

  logout() {
    this._userLogged.next(null);
    localStorage.clear();
  }
}