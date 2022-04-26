import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
import { BsModalService } from 'ngx-bootstrap/modal';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './views/login/login.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailResetPasswordModalComponent } from './additionals-components/email-reset-password-modal/email-reset-password-modal.component';
import { ConfirmationMessageModalComponent } from './additionals-components/confirmation-message-modal/confirmation-message-modal.component';
import { EditItemModalComponent } from './additionals-components/edit-item-modal/edit-item-modal.component';
import { ConfirmButtonModalComponent } from './additionals-components/confirm-button-modal/confirm-button-modal.component';
import { UploadPictureModalComponent } from './additionals-components/upload-picture-modal/upload-picture-modal.component';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    HttpClientModule,
    PerfectScrollbarModule,
    AppSidebarModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    LoginModule,
    IconSetModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    RegisterComponent,
    ConfirmationMessageModalComponent,
    EmailResetPasswordModalComponent,
    EditItemModalComponent,
    ConfirmButtonModalComponent,
    UploadPictureModalComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    IconSetService,
    BsModalService,
  ],
  bootstrap: [ AppComponent ],

})
export class AppModule { }
