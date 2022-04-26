import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('user_type') == "employe") {
      this.router.navigate(['/employe']);
    } else if (localStorage.getItem('user_type') == "employeur") {
      this.router.navigate(['/employeur']);
    }
  }
}
