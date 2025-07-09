import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceComponent } from './finance.component';
import { FinanceBillingDashboardComponent } from '../financecomponents/finance-billing-dashboard/finance-billing-dashboard.component';
import { FinanceSubscriptionBillingComponent } from '../financecomponents//finance-subscription-billing/finance-subscription-billing.component';
import { FinanceSubscriptionPaidReportsComponent } from '../financecomponents/finance-subscription-paid-reports/finance-subscription-paid-reports.component';
import { AllProviderPaymrntsComponent } from '../financecomponents/all-provider-paymrnts/all-provider-paymrnts.component';
import { FinancePaidReportsComponent } from '../financecomponents/finance-paid-reports/finance-paid-reports.component';
import { AuthenticationGuard } from '../../Route-Authguard/authentication.guard';

const routes: Routes = [
  { path: '', component:FinanceSubscriptionBillingComponent,canActivate: [AuthenticationGuard] },
  {path:'FinanceBillingDashboard',component:FinanceBillingDashboardComponent,canActivate: [AuthenticationGuard]},
  {path:'FinanceSubscriptionBilling',component:FinanceSubscriptionBillingComponent,canActivate: [AuthenticationGuard]},
  {path:'FinanceSubscriptionPaidReports',component:FinanceSubscriptionPaidReportsComponent,canActivate: [AuthenticationGuard]},
  {path:'AllProviderPaymrnts',component:AllProviderPaymrntsComponent,canActivate: [AuthenticationGuard]},
  {path:'FinancePaidReports',component:FinancePaidReportsComponent,canActivate: [AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
