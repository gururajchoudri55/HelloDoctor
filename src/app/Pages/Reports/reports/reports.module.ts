import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { RegisteredEntitiesComponent } from '../Reportlogins/registered-entities/registered-entities.component';
import { ReportsComponent } from './reports.component';
import { RevenueComponent } from '../Reportlogins/revenue/revenue.component';
import { AppointmentsComponent } from '../Reportlogins/appointments/appointments.component';
import { DeliveryReportsComponent } from '../Reportlogins/delivery-reports/delivery-reports.component';
import { AllAdminReportsComponent } from '../Reportlogins/all-admin-reports/all-admin-reports.component';
import { AllMonthlySubscriptionsComponent } from '../Reportlogins/all-monthly-subscriptions/all-monthly-subscriptions.component';
import { CountryRevenueComponent } from '../Reportlogins/country-revenue/country-revenue.component';
import { RevenuePharmacyReportComponent } from '../Reportlogins/revenue-pharmacy-report/revenue-pharmacy-report.component';
import { RevenuePharmacyDashboardComponent } from '../Reportlogins/revenue-pharmacy-dashboard/revenue-pharmacy-dashboard.component';
import { DiagnosticHomeReportComponent } from '../Reportlogins/diagnostic-home-report/diagnostic-home-report.component';
import { RevenueDaignosticdashboardComponent } from '../Reportlogins/revenue-daignosticdashboard/revenue-daignosticdashboard.component';
import { SharedModule } from '../../SharedModule/shared/shared.module';
import { CancelledAppointmentsComponent } from '../Reportlogins/cancelled-appointments/cancelled-appointments.component';
import { DoctorReportsComponent } from '../Reportlogins/doctor-reports/doctor-reports.component';
import { TotalAppointmentReportsComponent } from '../Reportlogins/total-appointment-reports/total-appointment-reports.component';
import { TotalDiagnosticReportsComponent } from '../Reportlogins/total-diagnostic-reports/total-diagnostic-reports.component';
import { TotalPrescriptionReportsComponent } from '../Reportlogins/total-prescription-reports/total-prescription-reports.component';
import { TotalPhysiotherapistReportsComponent } from '../Reportlogins/total-physiotherapist-reports/total-physiotherapist-reports.component';
import { TotalMidwifeReportsComponent } from '../Reportlogins/total-midwife-reports/total-midwife-reports.component';
import { TotalNurseReportsComponent } from '../Reportlogins/total-nurse-reports/total-nurse-reports.component';
import {
  BsDatepickerModule,
  BsDatepickerConfig,
  BsLocaleService,
} from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TelmaPaymentDetailsComponent } from '../Reportlogins/telma-payment-details/telma-payment-details.component';
import { InclinicRevenueComponent } from '../Reportlogins/inclinic-revenue/inclinic-revenue.component';
defineLocale('fr', frLocale);

@NgModule({
  declarations: [
    ReportsComponent,
    RegisteredEntitiesComponent,
    RevenueComponent,
    AppointmentsComponent,
    DeliveryReportsComponent,
    CancelledAppointmentsComponent,
    AllAdminReportsComponent,
    AllMonthlySubscriptionsComponent,
    CountryRevenueComponent,
    RevenuePharmacyReportComponent,
    RevenuePharmacyDashboardComponent,
    DiagnosticHomeReportComponent,
    RevenueDaignosticdashboardComponent,
    DoctorReportsComponent,
    TotalAppointmentReportsComponent,
    TotalDiagnosticReportsComponent,
    TotalPrescriptionReportsComponent,
    TotalPhysiotherapistReportsComponent,
    TotalMidwifeReportsComponent,
    TotalNurseReportsComponent,
    TelmaPaymentDetailsComponent,
    InclinicRevenueComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule,
  ],
})
export class ReportsModule {
  constructor(private bsLocaleService: BsLocaleService) {
    if (sessionStorage.getItem('LanguageID') == '1') {
    } else {
      this.bsLocaleService.use('fr'); //fecha en español, datepicker
    }
  }
}
