import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class ProfilFilled implements CanActivate {
    /**
     * Constructor
     * @param router The router object
     */
    constructor(
        private router: Router,
        private dataService: DataService
    ) { }

    /**
     * Can activate function
     * @param next The activated route snapshot object
     * @param state The router state snapshot object
     */
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (localStorage.getItem('user_type') == "employe") {
            this.dataService.getEmployerByUserId(parseInt(localStorage.getItem('user_id'))).subscribe((res: any) => {
                if (res.message) {
                    this.gotoProfil('employe');
                } else {
                    return true;
                }
            }, (err: any) => {
                this.gotoProfil('employe');
            });
        } else if (localStorage.getItem('user_type') == "employeur") {
            this.dataService.getEmployeurByUserId(parseInt(localStorage.getItem('user_id'))).subscribe((res: any) => {
                if (res.message) {
                    this.gotoProfil('employeur');
                } else {
                    return true;
                }
            }, (err: any) => {
                this.gotoProfil('employeur');
            });
        }

        return true;
    }

    gotoProfil(type: string) {
        if (type == 'employe') {
            this.router.navigateByUrl('/employe/profil');
            return false;
        } else if (type == 'employeur') {
            this.router.navigateByUrl('/employeur/profil');
            return false;
        }
        return false;
    }
}
