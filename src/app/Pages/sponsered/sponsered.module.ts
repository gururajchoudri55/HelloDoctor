import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponseredRoutingModule } from './sponsered-routing.module';
import { SponseredComponent } from './sponsered.component';
import { SpHospitalComponent } from './sp-hospital/sp-hospital.component';
import { SpDiagnosticCenterComponent } from './sp-diagnostic-center/sp-diagnostic-center.component';
import { SpPharmacyComponent } from './sp-pharmacy/sp-pharmacy.component';
import { SpHomePageSponsershipComponent } from './sp-home-page-sponsership/sp-home-page-sponsership.component';
import { SpAppointmentSponsershipComponent } from './sp-appointment-sponsership/sp-appointment-sponsership.component';
import { SPHospitalDetailsComponent } from './sphospital-details/sphospital-details.component';
import { SpDiagnosticDetailsComponent } from './sp-diagnostic-details/sp-diagnostic-details.component';
import { SpPharmacyDetailsComponent } from './sp-pharmacy-details/sp-pharmacy-details.component';
import { SpHomepageDetailsComponent } from './sp-homepage-details/sp-homepage-details.component';
import { SpAppointmentDetailsComponent } from './sp-appointment-details/sp-appointment-details.component';
import { SharedModule } from '../SharedModule/shared/shared.module';
import {  BsDatepickerModule, BsDatepickerConfig,BsLocaleService  } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
defineLocale('fr', frLocale);
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SponseredArticleDashboardComponent } from './sponsered-article-dashboard/sponsered-article-dashboard.component';
import { SponseredArticleRegistrationComponent } from './sponsered-article-registration/sponsered-article-registration.component';


@NgModule({
  declarations: [
    SponseredComponent,
    SpHospitalComponent,
    SpDiagnosticCenterComponent,
    SpPharmacyComponent,
    SpHomePageSponsershipComponent,
    SpAppointmentSponsershipComponent,
    SPHospitalDetailsComponent,
    SpDiagnosticDetailsComponent,
    SpPharmacyDetailsComponent,
    SpHomepageDetailsComponent,
    SpAppointmentDetailsComponent,
    SponseredArticleDashboardComponent,
    SponseredArticleRegistrationComponent,
 
  ],
  imports: [
    CommonModule,
    SponseredRoutingModule,
    SharedModule,
    BsDatepickerModule,
    NgMultiSelectDropDownModule
  ]
})
export class SponseredModule { }
