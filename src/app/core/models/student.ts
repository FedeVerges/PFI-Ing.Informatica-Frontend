import { Degree } from "./degree";

export interface Student {
    name?: string;
    lastName?: string;
    docNumber?: string;
    degree?: Degree;
    id?: number;
}