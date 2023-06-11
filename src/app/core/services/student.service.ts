import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudentDto } from '../models/dto/studentDto';
import { University } from '../models/university';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getStudentByDni(docNumber: number) {
    return this.http.get<StudentDto[]>(
      environment.serverURL + `/student/${docNumber}`
    );
  }

  createStudent(student: StudentDto) {
    return this.http.post<StudentDto>(
      environment.serverURL + `/student/new`,
      student
    );
  }

  getUniversityCarrerData() {
    const universityData: University[] = [
      {
        name: 'Universidad Nacional de San Luis',
        academicUnits: [
          {
            name: 'Facultad de ciencias fisico matemáticas y naturales',
            careers: [
              {
                name: 'Ingeniería en informática',
                plans: ['26/12']
              },
              {
                name: 'Ingeniería en electrónica',
                plans: ['13/08']
              },
              {
                name: 'Ingeniería en Minas',
                plans: ['11/08']
              },
              {
                name: 'Ingeniería Quimica',
                plans: ['13/08']
              }
            ]
          },
          {
            name: 'Facultad de ciencias química bioquímica y farmacia',
            careers: [
              {
                name: 'Licenciatura en Química',
                plans: ['11/19']
              },
              {
                name: 'Licenciatura en Nutrición',
                plans: ['11/09']
              },
              {
                name: 'Licenciatura en Bioquimica',
                plans: ['11/19']
              },
              {
                name: 'Licenciatura en Biologia Molecular',
                plans: ['11/19']
              }
            ]
          }
        ]
      }
    ];

    return of(universityData);
  }
}
