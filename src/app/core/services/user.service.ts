import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: string, password: string) {
    const body = {
      user: user,
      password: password
    }
    return this.http.post<{ token: string, user: { name: string, userId: string, email: string } }>(environment.serverURL + '/login', body);
  }

}
