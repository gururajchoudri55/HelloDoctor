import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeRecpPwdComponent } from '../change-recp-pwd/change-recp-pwd.component';
import { HospitalAppointmentsComponent } from '../hospital-appointments/hospital-appointments.component';
import { HospitalDoctorsComponent } from '../hospital-doctors/hospital-doctors.component';
import { HospitalPatientDashComponent } from '../hospital-patient-dash/hospital-patient-dash.component';
import { HospitalPaymentsComponent } from '../hospital-payments/hospital-payments.component';
import { HospitalRecepsistDashComponent } from '../hospital-recepsist-dash/hospital-recepsist-dash.component';
import { HospitalRecepsistComponent } from '../hospital-recepsist/hospital-recepsist.component';
import { HospitalClinicComponent } from './hospital-clinic.component';
import { HospitalDashboardComponent } from './hospital-dashboard/hospital-dashboard.component';
import { HospitalProfileComponent } from './hospital-profile/hospital-profile.component';
import { HospitalSupportComponent } from './hospital-support/hospital-support.component';
import { HospitalSupportdashComponent } from './hospital-supportdash/hospital-supportdash.component';
import { HospitalDashoardDetailsComponent } from './hospital-dashoard-details/hospital-dashoard-details.component';
import { HomeCareApointmentsComponent } from '../home-care-apointments/home-care-apointments.component';
import { VideoCallAppointmentsComponent } from '../video-call-appointments/video-call-appointments.component';
import { HospitalRevenueComponent } from '../hospital-revenue/hospital-revenue.component';
import { HomeCareRevenueDetailsComponent } from '../home-care-revenue-details/home-care-revenue-details.component';
import { VideoCallRevenueDetailsComponent } from '../video-call-revenue-details/video-call-revenue-details.component';
import { InClincAppointmentsComponent } from '../in-clinc-appointments/in-clinc-appointments.component';
import { InClinicRevenueDetailsComponent } from '../in-clinic-revenue-details/in-clinic-revenue-details.component';
import { AuthenticationGuard } from '../../Route-Authguard/authentication.guard';
import { HospitalAppoinmentsComponent } from './hospital-appoinments/hospital-appoinments.component';
import { HospitalHomecareComponent } from '../hospital-homecare/hospital-homecare.component';


const routes: Routes = [
  { path: '', component: HospitalDashboardComponent, canActivate: [AuthenticationGuard] },
  { path: 'HospitalDashboard', component: HospitalDashboardComponent, canActivate: [AuthenticationGuard] },
  { path: 'HospitalProfile', component: HospitalProfileComponent, canActivate: [AuthenticationGuard] },
  { path: 'HospitalSupportdash', component: HospitalSupportdashComponent, canActivate: [AuthenticationGuard] },
  { path: 'HospitalSupport', component: HospitalSupportComponent, canActivate: [AuthenticationGuard] },
  { path: 'HospitalSupport/:id', component: HospitalSupportComponent, canActivate: [AuthenticationGuard] },
  { path: 'HospitalAppointments', component: HospitalAppointmentsComponent, canActivate: [AuthenticationGuard] },
  { path: 'HospitalRecepsist', component: HospitalRecepsistComponent, canActivate: [AuthenticationGuard] },
  { path: 'HospitalRecepsistDash', component: HospitalRecepsistDashComponent, canActivate: [AuthenticationGuard] },
  { path: 'HospitalDoctors', component: HospitalDoctorsComponent, canActivate: [AuthenticationGuard] },
  { path: 'HospitalPayments', component: HospitalPaymentsComponent, canActivate: [AuthenticationGuard] },
  { path: 'HospitalPatientDash', component: HospitalPatientDashComponent, canActivate: [AuthenticationGuard] },
  { path: 'ChangeRecpPwd', component: ChangeRecpPwdComponent, canActivate: [AuthenticationGuard] },
  { path: 'HospitalDashoardDetails/:id', component: HospitalDashoardDetailsComponent, canActivate: [AuthenticationGuard] },
  { path: 'HomeCareApointments', component: HomeCareApointmentsComponent, canActivate: [AuthenticationGuard] },
  { path: 'VideoCallAppointments', component: VideoCallAppointmentsComponent, canActivate: [AuthenticationGuard] },
  { path: 'HospitalRevenue', component: HospitalRevenueComponent, canActivate: [AuthenticationGuard] },
  { path: 'HomeCareRevenueDetails', component: HomeCareRevenueDetailsComponent, canActivate: [AuthenticationGuard] },
  { path: 'VideoCallRevenueDetails', component: VideoCallRevenueDetailsComponent, canActivate: [AuthenticationGuard] },
  { path: 'InClincAppointments', component: InClincAppointmentsComponent, canActivate: [AuthenticationGuard] },
  { path: 'InClinicRevenueDetails', component: InClinicRevenueDetailsComponent, canActivate: [AuthenticationGuard] },
  { path: 'HospitalAppoinments', component: HospitalAppoinmentsComponent, canActivate: [AuthenticationGuard] },
  { path: 'HospitalHomecare', component: HospitalHomecareComponent, canActivate: [AuthenticationGuard] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalClinicRoutingModule { }
