import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AuthenticationGuard } from '../../Route-Authguard/authentication.guard';



const routes: Routes = [
  { path: '', component: RegisterloginsComponent ,canActivate: [AuthenticationGuard]},
  {path:'HospitalDash',component:HospitalDashComponent,canActivate: [AuthenticationGuard]},
  {path:'HospitalDashDetails',component:HospitalDashDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'DotorDash',component:DotorDashComponent,canActivate: [AuthenticationGuard]},
  {path:'DoctorDashDetails',component:DoctorDashDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticDash',component:DiagnosticDashComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticDetails',component:DiagnosticDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'PharmacyDash',component:PharmacyDashComponent,canActivate: [AuthenticationGuard]},
  {path:'PharmacyDetails',component:PharmacyDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'NurseDash',component:NurseDashComponent,canActivate: [AuthenticationGuard]},
  {path:'NurseDetails',component:NurseDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'PhysiotherapistDash',component:PhysiotherapistDashComponent,canActivate: [AuthenticationGuard]},
  {path:'PhysiotherapistDetails',component:PhysiotherapistDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'MidwifeDash',component:MidwifeDashComponent,canActivate: [AuthenticationGuard]},
  {path:'MidwifeDetails',component:MidwifeDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'DeliveryCompanyDash',component: DeliveryCompanyDashComponent,canActivate: [AuthenticationGuard]},
  {path:'DeliveryCompanyDetails',component: DeliveryCompanyDetailsComponent,canActivate: [AuthenticationGuard]}





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterloginsRoutingModule { }
