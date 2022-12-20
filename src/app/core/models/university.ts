import { AcademicUnit } from './academicUnit';

export interface University {
  name: string;
  academicUnits: Array<AcademicUnit>;
}
