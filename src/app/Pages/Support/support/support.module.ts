import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportRoutingModule } from './support-routing.module';
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
import { SharedModule } from '../../SharedModule/shared/shared.module';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SupportRegistrationDetailsComponent } from '../SupportTickets/support-registration-details/support-registration-details.component';
import { DeleteFilesComponent } from '../SupportTickets/delete-files/delete-files.component';
defineLocale('fr', frLocale);

@NgModule({
  declarations: [
    SupportComponent,
    SupportProviderTicketsComponent,
    SupportPatientTicketsComponent,
    SupportEscalatedTicketsComponent,
    SupportProblemResolvePetientComponent,
    SupportResolvedTicketsProvidersComponent,
    SupportRegistrationComponent,
    SupportProfileComponent,
    RefundSupportComponent,
    RefundCompletedTicketsComponent,
    SupportRegistrationDetailsComponent,
    DeleteFilesComponent,


  ],
  imports: [
    CommonModule,
    SupportRoutingModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule
  ]
})
export class SupportModule {
  constructor( private bsLocaleService: BsLocaleService){

    if(sessionStorage.getItem('LanguageID')=='1')
    {
    }
    else
    {
      this.bsLocaleService.use('fr');//fecha en español, datepicker
    }
  
  }
 }
