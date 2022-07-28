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
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      return JSON.parse(userJson);
    }
    return userJson ? JSON.parse(userJson) : userJson;
  }

  setUser(user: any) {
    localStorage.setItem('currentUser', user);
  }


}
