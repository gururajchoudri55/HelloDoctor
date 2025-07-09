import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportComponent } from './support.component';
import { SupportPatientTicketsComponent } from '../SupportTickets/support-patient-tickets/support-patient-tickets.component';
import { SupportEscalatedTicketsComponent } from '../SupportTickets/support-escalated-tickets/support-escalated-tickets.component';
import { SupportProblemResolvePetientComponent } from '../SupportTickets/support-problem-resolve-petient/support-problem-resolve-petient.component';
import { SupportResolvedTicketsProvidersComponent } from '../SupportTickets/support-resolved-tickets-providers/support-resolved-tickets-providers.component';
import { SupportRegistrationComponent } from '../SupportTickets/support-registration/support-registration.component';
import { SupportProfileComponent } from '../SupportTickets/support-profile/support-profile.component';
import { SupportProviderTicketsComponent } from '../SupportTickets/support-provider-tickets/support-provider-tickets.component';
import { RefundSupportComponent } from '../SupportTickets/refund-support/refund-support.component';
import { RefundCompletedTicketsComponent } from '../SupportTickets/refund-completed-tickets/refund-completed-tickets.component';
import { SupportRegistrationDetailsComponent } from '../SupportTickets/support-registration-details/support-registration-details.component';
import { DeleteFilesComponent } from '../SupportTickets/delete-files/delete-files.component';


const routes: Routes = [
  { path: '', component: SupportPatientTicketsComponent },
  {path:'SupportPatientTickets',component:SupportPatientTicketsComponent},
  {path:'SupportEscalatedTickets',component:SupportEscalatedTicketsComponent},
  {path:'SupportProblemResolvePetient',component:SupportProblemResolvePetientComponent},
  {path:'SupportResolvedTicketsProviders',component:SupportResolvedTicketsProvidersComponent},
  {path:'SupportRegistration',component:SupportRegistrationComponent},
  {path:'SupportProfile',component:SupportProfileComponent},
  {path:'SupportProviderTickets',component:SupportProviderTicketsComponent},
  {path:'RefundSupport',component:RefundSupportComponent},
  {path:'RefundCompletedTickets',component: RefundCompletedTicketsComponent},
  {path:'SupportRegistrationDetails',component:SupportRegistrationDetailsComponent},
  {path:'DeleteFiles',component:DeleteFilesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
