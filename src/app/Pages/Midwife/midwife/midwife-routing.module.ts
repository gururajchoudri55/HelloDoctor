import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MidwifeComponent } from './midwife.component';
import { MyAppointmentsComponent } from '../Midwifecomponents/my-appointments/my-appointments.component';
import { ReportsComponent } from '../Midwifecomponents/reports/reports.component';
import { CancelledAppointmentsComponent } from '../Midwifecomponents/cancelled-appointments/cancelled-appointments.component';
import { AgendaComponent } from '../Midwifecomponents/agenda/agenda.component';
import { ServicesComponent } from '../Midwifecomponents/services/services.component';
import { ServiceDetailsComponent } from '../Midwifecomponents/service-details/service-details.component';
import { NotificationsComponent } from '../Midwifecomponents/notifications/notifications.component';
import { SupportTicketsComponent } from '../Midwifecomponents/support-tickets/support-tickets.component';
import { ChangePasswordComponent } from '../Midwifecomponents/change-password/change-password.component';
import { ProfileComponent } from '../Midwifecomponents/profile/profile.component';
import { ActivityDashboardComponent } from '../Midwifecomponents/activity-dashboard/activity-dashboard.component';
import { SupportTicketDetailsComponent } from '../Midwifecomponents/support-ticket-details/support-ticket-details.component';
import { MidwifeRevenueComponent } from '../Midwifecomponents/midwife-revenue/midwife-revenue.component';
import { ActivitityDashboardDetailsComponent } from '../Midwifecomponents/activitity-dashboard-details/activitity-dashboard-details.component';
import { MidwifeRevenueDetailsComponent } from '../Midwifecomponents/midwife-revenue-details/midwife-revenue-details.component';
import { AuthenticationGuard } from '../../Route-Authguard/authentication.guard';


const routes: Routes = [
  { path: '', component: ActivityDashboardComponent,canActivate: [AuthenticationGuard] },
   {path:'MyAppointments',component:MyAppointmentsComponent,canActivate: [AuthenticationGuard]},
   {path:'Reports',component:ReportsComponent,canActivate: [AuthenticationGuard]},
   {path:'CancelledAppointments',component:CancelledAppointmentsComponent,canActivate: [AuthenticationGuard]},
   {path:'Agenda',component:AgendaComponent,canActivate: [AuthenticationGuard]},
   {path:'Services',component:ServicesComponent,canActivate: [AuthenticationGuard]},
   {path:'ServiceDetails',component:ServiceDetailsComponent,canActivate: [AuthenticationGuard]},
   {path:'Notifications',component:NotificationsComponent,canActivate: [AuthenticationGuard]},
   {path:'SupportTickets',component:SupportTicketsComponent,canActivate: [AuthenticationGuard]},
   {path:'ChangePassword',component:ChangePasswordComponent,canActivate: [AuthenticationGuard]},
   {path:'Profile',component:ProfileComponent,canActivate: [AuthenticationGuard]},
   {path:'ActivityDashboard',component:ActivityDashboardComponent,canActivate: [AuthenticationGuard]},
   {path:'SupportTicketDetails',component:SupportTicketDetailsComponent,canActivate: [AuthenticationGuard]},
   {path:'MidwifeRevenue',component:MidwifeRevenueComponent,canActivate: [AuthenticationGuard]},
   {path:'ActivitityDashboardDetails/:id',component:ActivitityDashboardDetailsComponent,canActivate: [AuthenticationGuard]},
   {path:'MidwifeRevenueDetails/:id',component:MidwifeRevenueDetailsComponent,canActivate: [AuthenticationGuard]},
   {path:'MidwifeRevenueDetails',component:MidwifeRevenueDetailsComponent,canActivate: [AuthenticationGuard]}

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MidwifeRoutingModule { }
