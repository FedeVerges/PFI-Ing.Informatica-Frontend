import { Degree } from "./degree";
import { Institute } from "./institute";
import { Student } from "./student";

export interface Certificate {
    student?: Student;
    id?: number;
    year?: string;
    institute?: Institute;
}
export interface CertificateDto {
    institution: string; //Cambiar por Lookups.
    degreeName: string;
    degreeType: string; //Cambiar por Lookups.
    dateCreated?: string;
    dateModified?: string;
    student: {
        documentNumber: string;
        name: string;
        lastName: string;
        documentType?: string; //Cambiar por Lookups.
    }
    waferNumber: string;
}


// {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true,
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     institutionId:{
//         type: DataTypes.NUMBER,
//         allowNull: false,
//     },
//     degreeName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     degreeTipe:{
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     dateCreated: {
//         type: DataTypes.DATE,
//         allowNull: false,
//     },
//     dateModified: {
//         type: DataTypes.DATE,
//         allowNull: false,
//     },
//     studentId: { type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     waferNumber: { type: DataTypes.STRING,
//         allowNull: false,
//     }
// },
