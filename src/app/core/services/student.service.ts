import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudentDto } from '../models/dto/studentDto';
import { University } from '../models/university';

@Injectable({
  providedIn: 'root'
})
export class StudentSerivce {
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
                name: 'Ingeniería en informática'
              },
              {
                name: 'Ingeniería en electrónica'
              },
              {
                name: 'Ingeniería en minas'
              },
              {
                name: 'Ingeniería quimica'
              },
              {
                name: 'Ingeniería en periodismo deportivo'
              }
            ]
          },
          {
            name: 'Facultad de ciencias química bioquímica y farmacia',
            careers: [
              {
                name: 'Licenciatura en química'
              },
              {
                name: 'Licenciatura en nutrición'
              },
              {
                name: 'Licenciatura en bioquimica'
              },
              {
                name: 'Licenciatura en biologia molecular'
              },
              {
                name: 'Licenciatura en psicomotriciadad bacteriana'
              }
            ]
          }
        ]
      },
      {
        name: 'Universidad La Punta',
        academicUnits: [
          {
            name: 'Ciencias de la computación',
            careers: [
              {
                name: 'Tecnicatura en desarollo de videojuegos'
              },
              {
                name: 'Tecnicatura en desarrollo'
              },
              {
                name: 'Tecnicatura superior en refrigeración de materiales de construcción'
              }
            ]
          }
        ]
      }
    ];

    return of(universityData);
  }
}
