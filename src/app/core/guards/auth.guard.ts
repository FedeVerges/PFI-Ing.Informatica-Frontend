import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { map } from "rxjs/internal/operators/map";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { };
    canActivate() {
        return this.authService
            .getCurrentUser()
            .pipe(
                map(userLogged => {
                    if (!userLogged || !userLogged.id || !userLogged.role) {
                        this.router.navigate(['/login']);
                        return false;
                    } else {
                        return true
                    }
                })
            )
    }


    // if (this.authService.isLoggedIn()) {
    //     return true
    // } else {
    //     this.router.navigate(['/login']);
    //     return false;
    // }
}