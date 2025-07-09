import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiagnosticRoutingModule } from './diagnostic-routing.module';
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
import { SharedModule } from '../../SharedModule/shared/shared.module';
import {
  BsDatepickerModule,
  BsDatepickerConfig,
  BsLocaleService,
} from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
import { TestPackagesComponent } from '../Diagnostics/test-packages/test-packages.component';
import { DiagnosticSmsComponent } from '../Diagnostics/diagnostic-sms/diagnostic-sms.component';
import { PatientRegDashComponent } from '../Diagnostics/patient-reg-dash/patient-reg-dash.component';
import { DiagnosticAppointmentsComponent } from '../Diagnostics/diagnostic-appointments/diagnostic-appointments.component';
defineLocale('fr', frLocale);
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DiagnosticchatComponent } from '../Diagnostics/diagnosticchat/diagnosticchat.component';
import { DiagnosticPaymentRecepitComponent } from '../Diagnostics/diagnostic-payment-recepit/diagnostic-payment-recepit.component';

@NgModule({
  declarations: [
    DiagnosticComponent,
    DiagnosticOrdersComponent,
    DiagnosticOrdersComponent,
    DiagnosticFieldTeamComponent,
    DiagnosticReceptionistLoginComponent,
    DiagnosticLabAgendaComponent,
    DiagnosticFieldTeamDetailsComponent,
    DiagnosticReceptionistLoginDetailsComponent,
    DiagnosticReportsComponent,
    DiagnosticHomeServicesComponent,
    DiagnosticPackageComponent,
    DiagnosticPackageDetailsComponent,
    DiagnosticSpecialOffersComponent,
    DiagnosticSpecialOffersDetailsComponent,
    DiagnosticPaymentLinkComponent,
    DiagnosticLabTechComponent,
    DiagnosticSupportTicketsComponent,
    DiagnosticChangePasswordComponent,
    DiagnosticProfileComponent,
    DiagnosticPaymentLinkDetailsComponent,
    SupportTicketDetailsComponent,
    TestPackagesComponent,
    DiagnosticSmsComponent,
    PatientRegDashComponent,
    DiagnosticAppointmentsComponent,
    DiagnosticchatComponent,
    DiagnosticPaymentRecepitComponent,
  ],
  imports: [
    CommonModule,
    DiagnosticRoutingModule,
    SharedModule,
    BsDatepickerModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
})
export class DiagnosticModule {}
