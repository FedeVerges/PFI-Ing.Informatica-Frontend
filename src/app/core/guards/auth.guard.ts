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
        debugger;
        return this.authService
            .isLoggedIn()
            .pipe(
                map(authState => {
                    debugger
                    if (!authState) {
                        this.router.navigate(['/login']);
                        return false;
                    } else {
                        return authState
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