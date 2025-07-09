import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhysiotherapistRoutingModule } from './physiotherapist-routing.module';
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
import { SharedModule } from '../../SharedModule/shared/shared.module';
import {  BsDatepickerModule, BsDatepickerConfig,BsLocaleService  } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
import { PhysiorevenueComponent } from '../Physiotherapycomponents/physiorevenue/physiorevenue.component';
import { PhysiodashdetailsComponent } from '../Physiotherapycomponents/physiodashdetails/physiodashdetails.component';
import { PhysiosmsComponent } from './physiosms/physiosms.component';
import { PhysioPaymentreceiptsComponent } from '../../../Pages/Physiotherapist/Physiotherapycomponents/physio-paymentreceipts/physio-paymentreceipts.component';

defineLocale('fr', frLocale);


@NgModule({
  declarations: [
    PhysiotherapistComponent,
    ActivityDashboardComponent,
    MyAppointmentsComponent,
    ReportsComponent,
    CancelledAppointmentsComponent,
    AgendaComponent,
    NotificationsComponent,
    SupportTicketsComponent,
    SupportTicketDetailsComponent,
    ChangePasswordComponent,
    ProfileComponent,
    EMRComponent,
    PhysiorevenueComponent,
    PhysiodashdetailsComponent,
    PhysiosmsComponent,
    PhysioPaymentreceiptsComponent


  ],
  imports: [
    CommonModule,
    PhysiotherapistRoutingModule,
    SharedModule,
    BsDatepickerModule
  ]
})
export class PhysiotherapistModule { }
