import { ListOffersComponent } from './list-offers/list-offers.component';
import { OffreDetailComponent } from './offre-detail/offre-detail.component';
import { EmployeGuard } from '../../../services/employe-guard.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeDashboardComponent } from './employe-dashboard/employe-dashboard.component';
import { ProfilEmployeComponent } from './profil-employe/profil-employe.component';
import { ProfilFilled } from '../../../services/profilFilled.guard';

const routes: Routes = [
  {
    path: '',
    component: EmployeDashboardComponent,
    canActivate: [EmployeGuard, ProfilFilled],
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'profil',
    component: ProfilEmployeComponent,
    canActivate: [EmployeGuard],
    data: {
      title: 'Utilisateur / Profil'
    }
  },
  {
    path: 'offers',
    component: ListOffersComponent,
    canActivate: [EmployeGuard, ProfilFilled],
    data: {
      title: 'Offre / Liste'
    }
  },
  {
    path: 'detail/:id',
    component: OffreDetailComponent,
    canActivate: [EmployeGuard, ProfilFilled],
    data: {
      title: 'Offre / Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeRoutingModule { }
