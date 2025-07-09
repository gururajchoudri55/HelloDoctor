import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhysiotherapistComponent } from './physiotherapist.component';
import { MyAppointmentsComponent } from '../Physiotherapycomponents/my-appointments/my-appointments.component';
import { ReportsComponent } from '../Physiotherapycomponents/reports/reports.component';
import { CancelledAppointmentsComponent } from '../Physiotherapycomponents/cancelled-appointments/cancelled-appointments.component';
import { AgendaComponent } from '../Physiotherapycomponents/agenda/agenda.component';
import { NotificationsComponent } from '../Physiotherapycomponents/notifications/notifications.component';
import { SupportTicketsComponent } from '../Physiotherapycomponents/support-tickets/support-tickets.component';
import { SupportTicketDetailsComponent } from '../Physiotherapycomponents/support-ticket-details/support-ticket-details.component';
import { ChangePasswordComponent } from '../Physiotherapycomponents/change-password/change-password.component';
import { ProfileComponent } from '../Physiotherapycomponents/profile/profile.component';
import { ActivityDashboardComponent } from '../Physiotherapycomponents/activity-dashboard/activity-dashboard.component';
import { EMRComponent } from '../Physiotherapycomponents/emr/emr.component';
import { PhysiorevenueComponent } from '../Physiotherapycomponents/physiorevenue/physiorevenue.component';
import { PhysiodashdetailsComponent } from '../Physiotherapycomponents/physiodashdetails/physiodashdetails.component';
import { AuthenticationGuard } from '../../Route-Authguard/authentication.guard';

const routes: Routes = [
  { path: '', component: ActivityDashboardComponent,canActivate: [AuthenticationGuard] },
  { path: 'MyAppointments', component: MyAppointmentsComponent,canActivate: [AuthenticationGuard] },
  { path: 'Reports', component: ReportsComponent,canActivate: [AuthenticationGuard] },
  { path: 'MyAppointments', component: MyAppointmentsComponent,canActivate: [AuthenticationGuard] },
  { path: 'CancelledAppointments', component: CancelledAppointmentsComponent,canActivate: [AuthenticationGuard] },
  { path: 'Agenda', component: AgendaComponent,canActivate: [AuthenticationGuard] },
  { path: 'Notifications', component: NotificationsComponent,canActivate: [AuthenticationGuard] },
  { path: 'SupportTickets', component: SupportTicketsComponent,canActivate: [AuthenticationGuard]},
  { path: 'SupportTicketDetails', component: SupportTicketDetailsComponent,canActivate: [AuthenticationGuard] },
  { path: 'ChangePassword', component: ChangePasswordComponent,canActivate: [AuthenticationGuard] },
  { path: 'Profile', component: ProfileComponent,canActivate: [AuthenticationGuard] },
  { path: 'ActivityDashboard', component: ActivityDashboardComponent,canActivate: [AuthenticationGuard] },
  { path: 'EMR', component: EMRComponent ,canActivate: [AuthenticationGuard]},
  { path: 'Physiorevenue', component: PhysiorevenueComponent ,canActivate: [AuthenticationGuard]},
  { path: 'Physiodashdetails/:id', component: PhysiodashdetailsComponent,canActivate: [AuthenticationGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhysiotherapistRoutingModule { }
