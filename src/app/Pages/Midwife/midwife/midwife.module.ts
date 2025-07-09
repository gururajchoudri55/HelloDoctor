import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MidwifeRoutingModule } from './midwife-routing.module';
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
import { SharedModule } from '../../SharedModule/shared/shared.module';
import {  BsDatepickerModule, BsDatepickerConfig,BsLocaleService  } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
defineLocale('fr', frLocale);
import { MidwifeRevenueComponent } from '../Midwifecomponents/midwife-revenue/midwife-revenue.component';
import { ActivitityDashboardDetailsComponent } from '../Midwifecomponents/activitity-dashboard-details/activitity-dashboard-details.component';
import { MidwifeRevenueDetailsComponent } from '../Midwifecomponents/midwife-revenue-details/midwife-revenue-details.component';
import { MidwifeSmsComponent } from './midwife-sms/midwife-sms.component';
import { MidwifePaymentreceiptsComponent } from '../Midwifecomponents/midwife-paymentreceipts/midwife-paymentreceipts.component';

@NgModule({
  declarations: [
    MidwifeComponent,
    ActivityDashboardComponent,
    MyAppointmentsComponent,
    ReportsComponent,
    CancelledAppointmentsComponent,
    AgendaComponent,
    ServicesComponent,
    ServiceDetailsComponent,
    NotificationsComponent,
    SupportTicketsComponent,
    ChangePasswordComponent,
    ProfileComponent,
    SupportTicketDetailsComponent,
    MidwifeRevenueComponent,
    ActivitityDashboardDetailsComponent,
    MidwifeRevenueDetailsComponent,
    MidwifeSmsComponent,
    MidwifePaymentreceiptsComponent,

  ],
  imports: [
    CommonModule,
    MidwifeRoutingModule,
    SharedModule,
    BsDatepickerModule
  ]
})
export class MidwifeModule { }
