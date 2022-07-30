import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, catchError } from "rxjs";
import { AuthService } from "./auth.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private localStorageService: LocalStorageService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = req;
        const token = this.localStorageService.getToken();
        if (!token) {
            request = this.addToken(req, token!);
        } else {
            this.authService.logout();
            return next.handle(req);
        }
        return next.handle(request)
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    if (err.status === 401) {
                        this.authService.logout();
                        return next.handle(req);
                    } else if (err.status === 409) {
                        return throwError(() => {
                            const message = JSON.parse(err.message) || '';
                            const error: any = new Error(`${message}`);
                            error.timestamp = Date.now();
                            return error;
                        });
                    } else {
                        return throwError(() => {
                            const error: any = new Error(`Ocurrió un problema.`);
                            error.timestamp = Date.now();
                            return error;
                        });
                    }
                })
            );
    }
    private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    }
}