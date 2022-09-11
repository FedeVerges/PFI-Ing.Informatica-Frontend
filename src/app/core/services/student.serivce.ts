import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {StudentDto} from "../models/dto/studentDto";

@Injectable({
  providedIn: 'root'
})
export class StudentSerivce {

  constructor(private http: HttpClient) {
  }

  getStudentByDni(docNumber: number) {
    return this.http.get<StudentDto[]>(environment.serverURL + `/student/${docNumber}`);
  }

}
