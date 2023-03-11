import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenDto } from '../models/dto/tokenDto';
import { UserDto } from '../models/dto/userDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(user: string, password: string) {
    const body = {
      user: user,
      password: password
    };
    return this.http.post<TokenDto<UserDto>>(
      environment.serverURL + '/login',
      body
    );
  }
}
