import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NurseRoutingModule } from './nurse-routing.module';
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
import { SharedModule } from '../../SharedModule/shared/shared.module';
import {  BsDatepickerModule, BsDatepickerConfig,BsLocaleService  } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
defineLocale('fr', frLocale);
import { CompletedAppointmentsComponent } from '../Nuses/completed-appointments/completed-appointments.component';
import { NurseAdminDashboardComponent } from '../Nuses/nurse-admin-dashboard/nurse-admin-dashboard.component';
import { NurseSmsComponent } from './nurse-sms/nurse-sms.component';
import { NursePaymentReceiptComponent } from '../Nuses/nurse-payment-receipt/nurse-payment-receipt.component';

@NgModule({
  declarations: [
    NurseComponent,
    NurseAdminDashComponent,
    NurseAppointmentsComponent,
    NurseEmrComponent,
    NpmEmrComponent,
    NurseCanceedAppointmentsComponent,
    NurseReportsComponent,
    NurseAgendaComponent,
    NurseSupportDashComponent,
    NurseSupportComponent,
    NurseChangePwdComponent,
    NurseProfileComponent,
    NurseRevenueComponent,
    NotificationsComponent,
    CompletedAppointmentsComponent,
    NurseAdminDashboardComponent,
    NurseSmsComponent,
    NursePaymentReceiptComponent,
  ],
  imports: [
    CommonModule,
    NurseRoutingModule,
    SharedModule,
    BsDatepickerModule

  ]
})
export class NurseModule { }
