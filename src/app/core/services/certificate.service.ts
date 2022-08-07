import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { CertificateDto } from "../models/dto/certificateDto";

@Injectable({
    providedIn: 'root'
})
export class CertificateService {

    constructor(private http: HttpClient) { }

    getAllCertificates() {
        return this.http.get<CertificateDto>(environment.serverURL + `/certificate/all`);
    }

    getAllInstitutions() {

    }
    getCertificateTypes() {

    }

    getAllDegrees() {

    }
    createNewCertificate(certificate: CertificateDto) {
        return this.http.post<CertificateDto>(environment.serverURL + `/certificate/new`, certificate);
    }


}