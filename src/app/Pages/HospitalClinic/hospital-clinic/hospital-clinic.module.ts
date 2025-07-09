import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalClinicRoutingModule } from './hospital-clinic-routing.module';
import { HospitalClinicComponent } from './hospital-clinic.component';
import { HospitalDashboardComponent } from './hospital-dashboard/hospital-dashboard.component';
import { HospitalProfileComponent } from './hospital-profile/hospital-profile.component';
import { HospitalSupportdashComponent } from './hospital-supportdash/hospital-supportdash.component';
import { HospitalSupportComponent } from './hospital-support/hospital-support.component';
import { HospitalAppointmentsComponent } from '../hospital-appointments/hospital-appointments.component';
import { HospitalRecepsistComponent } from '../hospital-recepsist/hospital-recepsist.component';
import { HospitalRecepsistDashComponent } from '../hospital-recepsist-dash/hospital-recepsist-dash.component';
import { HospitalDoctorsComponent } from '../hospital-doctors/hospital-doctors.component';
import { HospitalPaymentsComponent } from '../hospital-payments/hospital-payments.component';
import { HospitalPatientDashComponent } from '../hospital-patient-dash/hospital-patient-dash.component';
import { ChangeRecpPwdComponent } from '../change-recp-pwd/change-recp-pwd.component';
import { SharedModule } from '../../SharedModule/shared/shared.module';
import {  BsDatepickerModule, BsDatepickerConfig,BsLocaleService  } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
defineLocale('fr', frLocale);
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HospitalDashoardDetailsComponent } from './hospital-dashoard-details/hospital-dashoard-details.component';
import { HomeCareApointmentsComponent } from '../home-care-apointments/home-care-apointments.component';
import { VideoCallAppointmentsComponent } from '../video-call-appointments/video-call-appointments.component';
import { HospitalRevenueComponent } from '../hospital-revenue/hospital-revenue.component';
import { HomeCareRevenueDetailsComponent } from '../home-care-revenue-details/home-care-revenue-details.component';
import { VideoCallRevenueDetailsComponent } from '../video-call-revenue-details/video-call-revenue-details.component';
import { InClincAppointmentsComponent } from '../in-clinc-appointments/in-clinc-appointments.component';
import { InClinicRevenueDetailsComponent } from '../in-clinic-revenue-details/in-clinic-revenue-details.component';
import { HospitalAppoinmentsComponent } from './hospital-appoinments/hospital-appoinments.component';
import { HospitalHomecareComponent } from '../hospital-homecare/hospital-homecare.component';



@NgModule({
  declarations: [
    HospitalClinicComponent,
    HospitalDashboardComponent,
    HospitalProfileComponent,
    HospitalSupportdashComponent,
    HospitalSupportComponent,
    HospitalAppointmentsComponent,
    HospitalRecepsistComponent,
    HospitalRecepsistDashComponent,
    HospitalDoctorsComponent,
    HospitalPaymentsComponent,
    HospitalPatientDashComponent,
    ChangeRecpPwdComponent,
    HospitalDashoardDetailsComponent,
    HomeCareApointmentsComponent,
    VideoCallAppointmentsComponent,
    HospitalRevenueComponent,
    HomeCareRevenueDetailsComponent,
    VideoCallRevenueDetailsComponent,
    InClincAppointmentsComponent,
    InClinicRevenueDetailsComponent,
    HospitalAppoinmentsComponent,
    HospitalHomecareComponent,

  ],
  imports: [
    CommonModule,
    HospitalClinicRoutingModule,
    SharedModule,
    BsDatepickerModule,
    NgMultiSelectDropDownModule
  ]
})
export class HospitalClinicModule { }
