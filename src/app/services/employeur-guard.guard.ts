import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeurGuard implements CanActivate {
  /**
   * Constructor
   * @param router The router object
   */
  constructor(
    private router: Router,
    // private dataService: DataService
  ) { }

  /**
   * Can activate function
   * @param next The activated route snapshot object
   * @param state The router state snapshot object
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('access_token') && localStorage.getItem('user_type') == "employeur") {
      // this.getEmployeurByUserId();
      return true;
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_type');
    this.router.navigateByUrl('/login');
    return false;
  }

  // private getEmployeurByUserId() {
  //   let result = 0;
  //   this.dataService.getEmployeurByUserId(parseInt(localStorage.getItem('user_id'))).subscribe((res: any) => {
  //     localStorage.setItem('employeur_id', res.id);
  //   }, (err: any) => {
      
  //   });
  // }

}
