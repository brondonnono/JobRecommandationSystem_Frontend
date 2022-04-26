import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeGuard implements CanActivate {
  /**
   * Constructor
   * @param router The router object
   */
  constructor(
    private router: Router
  ) { }

  /**
   * Can activate function
   * @param next The activated route snapshot object
   * @param state The router state snapshot object
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('access_token') && localStorage.getItem('user_type') == "employe") {
      return true;
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_type');
    this.router.navigateByUrl('/login');
    return false;
  }

}
