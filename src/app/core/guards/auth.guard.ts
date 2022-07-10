import { Injectable } from "@angular/core";
import {CanActivate, Router } from "@angular/router";
import { LocalStorageService } from "../services/local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private localStorageService: LocalStorageService,
        private router: Router) {};
    canActivate(): boolean {
        let isLoggedIn = this.localStorageService.getToken();
        if (isLoggedIn) {
            return true
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}