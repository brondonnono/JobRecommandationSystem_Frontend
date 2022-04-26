import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { INavData } from '@coreui/angular';
import { AuthService } from '../../services/auth.service';
import { employeurNavItems, employeNavItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public notifBarMinimized = false;
  public navItems: INavData[];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    if (localStorage.getItem('user_type') == "employeur") {
      this.navItems = employeurNavItems;
    } else {
      this.navItems = employeNavItems;
    }
  }
  showNotifBar() {
    this.notifBarMinimized = !this.notifBarMinimized;
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
    console.log('event', e);
  }

  logout() {
    this.authService.logout().subscribe((res: any) => {
      if (res.validation_errors || res.status == 401) {
        console.log('error_res => ', res);
      } else {
        // Store the access token in the localstorage
        console.log('result => ', res);
        // Navigate to home page
        this.router.navigate(['/login']);
      }
    }, (err: any) => {
      // This error can be internal or invalid credentials
      // You need to customize this based on the error.status code
      console.log('error => ', err, ' \n token => ', localStorage.getItem('access_token'));
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('employeur_id');
    localStorage.removeItem('employe_id');
    localStorage.removeItem('user_type');
    this.router.navigate(['/login']);
  }
}
