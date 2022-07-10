import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getUser() {
    return localStorage.getItem('currentUser');
  }

  setUser(user: any) {
    localStorage.setItem('currentUser', user);
  }


}
