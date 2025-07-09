import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { RevenueComponent } from '../Reportlogins/revenue/revenue.component';
import { AppointmentsComponent } from '../Reportlogins/appointments/appointments.component';
import { DeliveryReportsComponent } from '../Reportlogins/delivery-reports/delivery-reports.component';
import { RegisteredEntitiesComponent } from '../Reportlogins/registered-entities/registered-entities.component';
import { CancelledAppointmentsComponent } from '../Reportlogins/cancelled-appointments/cancelled-appointments.component';
import { AllAdminReportsComponent } from '../Reportlogins/all-admin-reports/all-admin-reports.component';
import { AllMonthlySubscriptionsComponent } from '../Reportlogins/all-monthly-subscriptions/all-monthly-subscriptions.component';
import { CountryRevenueComponent } from '../Reportlogins/country-revenue/country-revenue.component';
import { RevenuePharmacyReportComponent } from '../Reportlogins/revenue-pharmacy-report/revenue-pharmacy-report.component';
import { RevenuePharmacyDashboardComponent } from '../Reportlogins/revenue-pharmacy-dashboard/revenue-pharmacy-dashboard.component';
import { DiagnosticHomeReportComponent } from '../Reportlogins/diagnostic-home-report/diagnostic-home-report.component';
import { RevenueDaignosticdashboardComponent } from '../Reportlogins/revenue-daignosticdashboard/revenue-daignosticdashboard.component';
import { DoctorReportsComponent } from '../Reportlogins/doctor-reports/doctor-reports.component';
import { TotalAppointmentReportsComponent } from '../Reportlogins/total-appointment-reports/total-appointment-reports.component';
import { TotalDiagnosticReportsComponent } from '../Reportlogins/total-diagnostic-reports/total-diagnostic-reports.component';
import { TotalPrescriptionReportsComponent } from '../Reportlogins/total-prescription-reports/total-prescription-reports.component';
import { TotalPhysiotherapistReportsComponent } from '../Reportlogins/total-physiotherapist-reports/total-physiotherapist-reports.component';
import { TotalMidwifeReportsComponent } from '../Reportlogins/total-midwife-reports/total-midwife-reports.component';
import { TotalNurseReportsComponent } from '../Reportlogins/total-nurse-reports/total-nurse-reports.component';
import { AuthenticationGuard } from '../../Route-Authguard/authentication.guard';
import { TelmaPaymentDetailsComponent } from '../Reportlogins/telma-payment-details/telma-payment-details.component';
import { InclinicRevenueComponent } from '../Reportlogins/inclinic-revenue/inclinic-revenue.component';

const routes: Routes = [
  {
    path: '',
    component: RegisteredEntitiesComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'Revenue',
    component: RevenueComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'Appointments',
    component: AppointmentsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'DeliveryReports',
    component: DeliveryReportsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'RegisteredEntities',
    component: RegisteredEntitiesComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'CancelledAppointments',
    component: CancelledAppointmentsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'AllAdminReports/:id',
    component: AllAdminReportsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'AllMonthlySubscriptions',
    component: AllMonthlySubscriptionsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'CountryRevenue',
    component: CountryRevenueComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'RevenuePharmacyReport',
    component: RevenuePharmacyReportComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'RevenuePharmacyDashboard',
    component: RevenuePharmacyDashboardComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'DiagnosticHomeReport',
    component: DiagnosticHomeReportComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'RevenueDaignosticdashboard',
    component: RevenueDaignosticdashboardComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'DoctorReports/:id',
    component: DoctorReportsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'TotalAppointmentReports/:id',
    component: TotalAppointmentReportsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'TotalDiagnosticReports',
    component: TotalDiagnosticReportsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'TotalDiagnosticReports/:id',
    component: TotalDiagnosticReportsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'TotalPrescriptionReports',
    component: TotalPrescriptionReportsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'TotalPrescriptionReports/:id',
    component: TotalPrescriptionReportsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'TotalPhysiotherapistReports',
    component: TotalPhysiotherapistReportsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'TotalPhysiotherapistReports/:id',
    component: TotalPhysiotherapistReportsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'TotalMidwifeReports',
    component: TotalMidwifeReportsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'TotalMidwifeReports/:id',
    component: TotalMidwifeReportsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'TotalNurseReports',
    component: TotalNurseReportsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'TotalNurseReports/:id',
    component: TotalNurseReportsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'TelmaPaymentDetails',
    component: TelmaPaymentDetailsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'InclinicRevenue/:id',
    component: InclinicRevenueComponent,
    canActivate: [AuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
