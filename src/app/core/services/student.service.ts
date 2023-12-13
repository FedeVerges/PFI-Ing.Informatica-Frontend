import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudentDto } from '../models/dto/studentDto';
import { University } from '../models/university';
import { PersonWithStudentsDto } from '../models/dto/personWithStudents';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getStudentByDni(docNumber: number) {
    return this.http.get<StudentDto[]>(
      environment.serverURL + `/student/${docNumber}/hasCertificate/false`
    );
  }

  getPersonWithStudentsByDni(docNumber: number) {
    return this.http.get<PersonWithStudentsDto[]>(
      environment.serverURL + `/person/${docNumber}`
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
                name: 'Ingeniería en Informática',
                type: 'GRADO',
                plans: ['26/12']
              },
              {
                name: 'Ingeniería en Electrónica',
                type: 'GRADO',
                plans: ['13/08']
              },
              {
                name: 'Ingeniería en Minas',
                type: 'GRADO',
                plans: ['11/08']
              },

              {
                name: 'Profesorado en ciencias de la computación',
                type: 'PREGRADO',
                plans: ['11/08']
              },
              {
                name: 'Analista programador universitario',
                type: 'PREGRADO',
                plans: ['10/22']
              },
              {
                name: 'Doctorado en ciencias de la computación',
                type: 'POSGRADO',
                plans: ['13/22']
              }
            ]
          },
          {
            name: 'Facultad de química bioquímica y farmacia',
            careers: [
              {
                name: 'Profesorado en Química',
                type: 'PREGRADO',
                plans: ['10/21']
              },
              {
                name: 'Tecnicatura Universitaria en Higiene y Seguridad del Trabajo',
                type: 'PREGRADO',
                plans: ['10/23']
              },
              {
                name: 'Ingeniería Química',
                type: 'GRADO',
                plans: ['13/08']
              },
              {
                name: 'Licenciatura en Química',
                type: 'GRADO',
                plans: ['11/19']
              },
              {
                name: 'Licenciatura en Nutrición',
                type: 'GRADO',
                plans: ['11/09']
              },
              {
                name: 'Licenciatura en Bioquímica',
                type: 'GRADO',
                plans: ['11/19']
              },
              {
                name: 'Licenciatura en Biología Molecular',
                type: 'GRADO',
                plans: ['11/19']
              },
              {
                name: 'Doctorado en Bioquímica',
                type: 'POSGRADO',
                plans: ['13/22']
              },
              {
                name: 'Doctorado en Biología',
                type: 'POSGRADO',
                plans: ['13/22']
              }
            ]
          }
        ]
      }
    ];

    return of(universityData);
  }
}
