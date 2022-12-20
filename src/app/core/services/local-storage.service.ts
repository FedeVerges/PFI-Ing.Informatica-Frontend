import { Injectable } from '@angular/core';
import { RoleDto } from '../models/dto/roleDto';
import { UserDto } from '../models/dto/userDto';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getUser(): UserDto {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      return JSON.parse(userJson);
    }
    return userJson ? JSON.parse(userJson) : userJson;
  }

  setUser(user: UserDto) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getRole(): RoleDto {
    const role = localStorage.getItem('role');
    if (role) {
      return JSON.parse(role);
    }
    return role ? JSON.parse(role) : role;
  }

  setRole(role: RoleDto) {
    localStorage.setItem('role', JSON.stringify(role));
  }

  logout() {
    localStorage.clear();
  }
}
