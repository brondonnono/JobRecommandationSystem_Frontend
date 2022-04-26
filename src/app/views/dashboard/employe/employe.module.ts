import { ContainerBoxComponent } from './../../../additionals-components/container-box/container-box.component';
import { EmployeDashboardComponent } from './employe-dashboard/employe-dashboard.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { EmployeRoutingModule } from './employe-routing.module';
import { ProfilEmployeComponent } from './profil-employe/profil-employe.component';
import { CommonModule } from '@angular/common';
import { OffreDetailComponent } from './offre-detail/offre-detail.component';
import { BadgeComponent } from '../../../additionals-components/badge/badge.component';
import { ListOffersComponent } from './list-offers/list-offers.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';




@NgModule({
  declarations: [
    ProfilEmployeComponent,
    EmployeDashboardComponent,
    OffreDetailComponent,
    BadgeComponent,
    ContainerBoxComponent,
    ListOffersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TabsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ChartsModule,
    EmployeRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  exports: [ BadgeComponent, ContainerBoxComponent ]
})
export class EmployeModule { }
