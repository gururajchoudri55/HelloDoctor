import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NurseComponent } from './nurse.component';
import { NpmEmrComponent } from '../Nuses/npm-emr/npm-emr.component';
import { NurseAdminDashComponent } from '../Nuses/nurse-admin-dash/nurse-admin-dash.component';
import { NurseAppointmentsComponent } from '../Nuses/nurse-appointments/nurse-appointments.component';
import { NurseCanceedAppointmentsComponent } from '../Nuses/nurse-canceed-appointments/nurse-canceed-appointments.component';
import { NurseEmrComponent } from '../Nuses/nurse-emr/nurse-emr.component';
import { NurseReportsComponent } from '../Nuses/nurse-reports/nurse-reports.component';
import { NurseAgendaComponent } from '../Nuses/nurse-agenda/nurse-agenda.component';
import { NurseChangePwdComponent } from '../Nuses/nurse-change-pwd/nurse-change-pwd.component';
import { NurseProfileComponent } from '../Nuses/nurse-profile/nurse-profile.component';
import { NurseSupportComponent } from '../Nuses/nurse-support/nurse-support.component';
import { NurseSupportDashComponent } from '../Nuses/nurse-support-dash/nurse-support-dash.component';
import { NurseRevenueComponent } from '../Nuses/nurse-revenue/nurse-revenue.component';
import { NotificationsComponent } from '../Nuses/notifications/notifications.component';
import { CompletedAppointmentsComponent } from '../Nuses/completed-appointments/completed-appointments.component';
import { NurseAdminDashboardComponent } from '../Nuses/nurse-admin-dashboard/nurse-admin-dashboard.component';
import { AuthenticationGuard } from '../../Route-Authguard/authentication.guard';


const routes: Routes = [
  { path: '', component: NurseAppointmentsComponent,canActivate: [AuthenticationGuard] },
  { path: 'NurseAppointments', component: NurseAppointmentsComponent,canActivate: [AuthenticationGuard] },
  { path: 'NurseAdminDash', component: NurseAdminDashComponent,canActivate: [AuthenticationGuard] },
  { path: 'NurseCanceedAppointments', component: NurseCanceedAppointmentsComponent,canActivate: [AuthenticationGuard] },
  { path: 'NurseEmr', component: NurseEmrComponent ,canActivate: [AuthenticationGuard]},
  { path: 'NurseReports', component: NurseReportsComponent,canActivate: [AuthenticationGuard] },
  { path: 'NpmEmr/:patientID', component: NpmEmrComponent,canActivate: [AuthenticationGuard] },
  { path: 'NurseAgenda', component: NurseAgendaComponent ,canActivate: [AuthenticationGuard]},
  { path: 'NurseChangePwd', component: NurseChangePwdComponent,canActivate: [AuthenticationGuard] },
  { path: 'NurseProfile', component: NurseProfileComponent ,canActivate: [AuthenticationGuard]},
  { path: 'NurseSupport', component: NurseSupportComponent ,canActivate: [AuthenticationGuard]},
  { path: 'NurseSupportDash', component: NurseSupportDashComponent,canActivate: [AuthenticationGuard] },
  { path: 'NurseRevenue', component: NurseRevenueComponent ,canActivate: [AuthenticationGuard]},
  { path: 'Notifications', component: NotificationsComponent,canActivate: [AuthenticationGuard] },
  { path: 'CompletedAppointments', component: CompletedAppointmentsComponent,canActivate: [AuthenticationGuard] },
  { path: 'NurseAdminDashboard/:id', component: NurseAdminDashboardComponent,canActivate: [AuthenticationGuard] },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NurseRoutingModule { }
