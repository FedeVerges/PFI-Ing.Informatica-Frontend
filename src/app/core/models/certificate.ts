import { Degree } from "./degree";
import { Institute } from "./institute";
import { Student } from "./student";
export interface Certificate {
    student?: Student;
    id?: number;
    year?: string;
    institute?: Institute;
}