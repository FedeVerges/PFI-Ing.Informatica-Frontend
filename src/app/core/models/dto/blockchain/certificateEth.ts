import { StudentEth } from './studentEth';
import { UniversityDegreeEth } from './universityDegreeEth';

export interface CertificateEth {
  id: number;
  student: StudentEth;
  universityDegree: UniversityDegreeEth;
  waferNumber: string;
  createdAt: number;
  updatedAt: number;
  active: boolean; // Activo TODO: cambiar por texto.
}
