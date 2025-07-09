import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiagnosticComponent } from './diagnostic.component';
import { DiagnosticOrdersComponent } from '../Diagnostics/diagnostic-orders/diagnostic-orders.component';
import { DiagnosticFieldTeamComponent } from '../Diagnostics/diagnostic-field-team/diagnostic-field-team.component';
import { DiagnosticReceptionistLoginComponent } from '../Diagnostics/diagnostic-receptionist-login/diagnostic-receptionist-login.component';
import { DiagnosticLabAgendaComponent } from '../Diagnostics/diagnostic-lab-agenda/diagnostic-lab-agenda.component';
import { DiagnosticFieldTeamDetailsComponent } from '../Diagnostics/diagnostic-field-team-details/diagnostic-field-team-details.component';
import { DiagnosticReceptionistLoginDetailsComponent } from '../Diagnostics/diagnostic-receptionist-login-details/diagnostic-receptionist-login-details.component';
import { DiagnosticReportsComponent } from '../Diagnostics/diagnostic-reports/diagnostic-reports.component';
import { DiagnosticHomeServicesComponent } from '../Diagnostics/diagnostic-home-services/diagnostic-home-services.component';
import { DiagnosticPackageComponent } from '../Diagnostics/diagnostic-package/diagnostic-package.component';
import { DiagnosticPackageDetailsComponent } from '../Diagnostics/diagnostic-package-details/diagnostic-package-details.component';
import { DiagnosticSpecialOffersComponent } from '../Diagnostics/diagnostic-special-offers/diagnostic-special-offers.component';
import { DiagnosticSpecialOffersDetailsComponent } from '../Diagnostics/diagnostic-special-offers-details/diagnostic-special-offers-details.component';
import { DiagnosticPaymentLinkComponent } from '../Diagnostics/diagnostic-payment-link/diagnostic-payment-link.component';
import { DiagnosticLabTechComponent } from '../Diagnostics/diagnostic-lab-tech/diagnostic-lab-tech.component';
import { DiagnosticSupportTicketsComponent } from '../Diagnostics/diagnostic-support-tickets/diagnostic-support-tickets.component';
import { DiagnosticChangePasswordComponent } from '../Diagnostics/diagnostic-change-password/diagnostic-change-password.component';
import { DiagnosticProfileComponent } from '../Diagnostics/diagnostic-profile/diagnostic-profile.component';
import { DiagnosticPaymentLinkDetailsComponent } from '../Diagnostics/diagnostic-payment-link-details/diagnostic-payment-link-details.component';
import { SupportTicketDetailsComponent } from '../Diagnostics/support-ticket-details/support-ticket-details.component';
import { AuthenticationGuard } from '../../Route-Authguard/authentication.guard';
import { PatientRegDashComponent } from '../Diagnostics/patient-reg-dash/patient-reg-dash.component';
import { DiagnosticAppointmentsComponent } from '../Diagnostics/diagnostic-appointments/diagnostic-appointments.component';

const routes: Routes = [
  { path: '', component: DiagnosticOrdersComponent,canActivate: [AuthenticationGuard] },
  {path:'DiagnosticOrders',component:DiagnosticOrdersComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticFieldTeam',component:DiagnosticFieldTeamComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticReceptionistLogin',component:DiagnosticReceptionistLoginComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticLabAgenda',component:DiagnosticLabAgendaComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticFieldTeamDetails',component:DiagnosticFieldTeamDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticFieldTeamDetails/:id',component:DiagnosticFieldTeamDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticReceptionistLoginDetails',component:DiagnosticReceptionistLoginDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticReceptionistLoginDetails/:id',component:DiagnosticReceptionistLoginDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticReports',component:DiagnosticReportsComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticHomeServices',component:DiagnosticHomeServicesComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticPackage',component:DiagnosticPackageComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticPackageDetails',component:DiagnosticPackageDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticSpecialOffers',component:DiagnosticSpecialOffersComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticSpecialOffersDetails',component:DiagnosticSpecialOffersDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticSpecialOffersDetails/:id',component:DiagnosticSpecialOffersDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticPaymentLink',component:DiagnosticPaymentLinkComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticLabTech',component:DiagnosticLabTechComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticSupportTickets',component:DiagnosticSupportTicketsComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticChangePassword',component:DiagnosticChangePasswordComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticProfile',component:DiagnosticProfileComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticPaymentLinkDetails/:id',component:DiagnosticPaymentLinkDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticPaymentLinkDetails',component:DiagnosticPaymentLinkDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'SupportTicketDetails',component:SupportTicketDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'PatientRegDash',component:PatientRegDashComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticAppointments',component:DiagnosticAppointmentsComponent,canActivate: [AuthenticationGuard]},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiagnosticRoutingModule { }
