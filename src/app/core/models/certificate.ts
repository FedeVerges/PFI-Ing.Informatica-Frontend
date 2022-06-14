import { Degree } from "./degree";
import { Institute } from "./institute";
import { Student } from "./student";

export interface Certificate {
    student:Student;
    degree:Degree;
    id:number;
    year:string;
    institute:Institute;
}