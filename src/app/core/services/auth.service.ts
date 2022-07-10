import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {

    constructor(private http: HttpClient) {}

    login(){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Access-Control-Allow-Origin':'*',
            })
          };
        return this.http.get(environment.serverURL + '/ping',httpOptions);
    }
  }