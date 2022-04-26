import { OffreEmployeurDetailComponent } from './offreEmployeur-detail/offreEmployeur-detail.component';
import { EmployeurGuard } from '../../../services/employeur-guard.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeurDashboardComponent } from './employeur-dashboard/employeur-dashboard.component';
import { DisplayOffresComponent } from './display-offres/display-offres.component';
import { CreateOffreComponent } from './create-offre/create-offre.component';
import { ProfilEmployeurComponent } from './profil-employeur/profil-employeur.component';
import { EditOfferModalComponent } from './edit-offer-modal/edit-offer-modal.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeurDashboardComponent,
    canActivate: [EmployeurGuard],
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'profil',
    component: ProfilEmployeurComponent,
    canActivate: [EmployeurGuard],
    data: {
      title: 'Profil'
    }
  },
  {
    path: 'listeOffres',
    component: DisplayOffresComponent,
    canActivate: [EmployeurGuard],
    data: {
      title: 'Liste des offres'
    }
  },
  {
    path: 'createOffre',
    component: CreateOffreComponent,
    canActivate: [EmployeurGuard],
    data: {
      title: 'Liste des offres'
    }
  },
  {
    path: 'editOffer/:id',
    component: EditOfferModalComponent,
    canActivate: [EmployeurGuard],
    data: {
      title: 'Modifier une offre'
    }
  },
  {
    path: 'myOfferDetails/:id',
    component: OffreEmployeurDetailComponent,
    canActivate: [EmployeurGuard],
    data: {
      title: 'Details de l\'offre'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeurRoutingModule {}
