import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { EmployeurRoutingModule } from './employeur-routing.module';
import { EmployeurDashboardComponent } from './employeur-dashboard/employeur-dashboard.component';
import { CreateOffreComponent } from './create-offre/create-offre.component';
import { DisplayOffresComponent } from './display-offres/display-offres.component';
import { ProfilEmployeurComponent } from './profil-employeur/profil-employeur.component';
import { BadgeComponent } from '../../../additionals-components/badge/badge.component';
import { EditOfferModalComponent } from './edit-offer-modal/edit-offer-modal.component';
import { OffreEmployeurDetailComponent } from './offreEmployeur-detail/offreEmployeur-detail.component';

@NgModule({
  declarations: [
    EmployeurDashboardComponent,
    CreateOffreComponent,
    DisplayOffresComponent,
    OffreEmployeurDetailComponent,
    ProfilEmployeurComponent,
    BadgeComponent,
    EditOfferModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ChartsModule,
    EmployeurRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ]
})
export class EmployeurModule { }
