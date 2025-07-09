
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterloginsRoutingModule } from './registerlogins-routing.module';
import { RegisterloginsComponent } from './registerlogins.component';
import { HospitalDashDetailsComponent } from '../ManageLogins/hospital-dash-details/hospital-dash-details.component';
import { DotorDashComponent } from '../ManageLogins/dotor-dash/dotor-dash.component';
import { DoctorDashDetailsComponent } from '../ManageLogins/doctor-dash-details/doctor-dash-details.component';
import { DiagnosticDashComponent } from '../ManageLogins/diagnostic-dash/diagnostic-dash.component';
import { DiagnosticDetailsComponent } from '../ManageLogins/diagnostic-details/diagnostic-details.component';
import { PharmacyDashComponent } from '../ManageLogins/pharmacy-dash/pharmacy-dash.component';
import { PharmacyDetailsComponent } from '../ManageLogins/pharmacy-details/pharmacy-details.component';
import { NurseDashComponent } from '../ManageLogins/nurse-dash/nurse-dash.component';
import { NurseDetailsComponent } from '../ManageLogins/nurse-details/nurse-details.component';
import { PhysiotherapistDashComponent } from '../ManageLogins/physiotherapist-dash/physiotherapist-dash.component';
import { PhysiotherapistDetailsComponent } from '../ManageLogins/physiotherapist-details/physiotherapist-details.component';
import { MidwifeDashComponent } from '../ManageLogins/midwife-dash/midwife-dash.component';
import { MidwifeDetailsComponent } from '../ManageLogins/midwife-details/midwife-details.component';
import { DeliveryCompanyDashComponent } from '../ManageLogins/delivery-company-dash/delivery-company-dash.component';
import { DeliveryCompanyDetailsComponent } from '../ManageLogins/delivery-company-details/delivery-company-details.component';
import { HospitalDashComponent } from '../ManageLogins/hospital-dash/hospital-dash.component';
import { SharedModule } from '../../SharedModule/shared/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'

@NgModule({
  declarations: [
    RegisterloginsComponent,
    HospitalDashComponent,
    HospitalDashDetailsComponent,
    DotorDashComponent,
    DoctorDashDetailsComponent,
    DiagnosticDashComponent,
    DiagnosticDetailsComponent,
    PharmacyDashComponent,
    PharmacyDetailsComponent,
    NurseDashComponent,
    NurseDetailsComponent,
    PhysiotherapistDashComponent,
    PhysiotherapistDetailsComponent,
    MidwifeDashComponent,
    MidwifeDetailsComponent,
    DeliveryCompanyDashComponent,
    DeliveryCompanyDetailsComponent,
 
  ],
  imports: [
    CommonModule,
    RegisterloginsRoutingModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class RegisterloginsModule { }
