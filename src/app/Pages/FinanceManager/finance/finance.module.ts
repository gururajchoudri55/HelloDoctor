import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceRoutingModule } from './finance-routing.module';
import { FinanceComponent } from './finance.component';
import { FinanceBillingDashboardComponent } from '../financecomponents/finance-billing-dashboard/finance-billing-dashboard.component';
import { FinanceSubscriptionBillingComponent } from '../financecomponents//finance-subscription-billing/finance-subscription-billing.component';
import { FinanceSubscriptionPaidReportsComponent } from '../financecomponents/finance-subscription-paid-reports/finance-subscription-paid-reports.component';
import { AllProviderPaymrntsComponent } from '../financecomponents/all-provider-paymrnts/all-provider-paymrnts.component';
import { FinancePaidReportsComponent } from '../financecomponents/finance-paid-reports/finance-paid-reports.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {  BsDatepickerModule, BsDatepickerConfig,BsLocaleService  } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
import { SharedModule } from '../../SharedModule/shared/shared.module';
defineLocale('fr', frLocale);


@NgModule({
  declarations: [
    FinanceComponent,
    FinancePaidReportsComponent,
    FinanceBillingDashboardComponent,
    FinanceSubscriptionBillingComponent,
    FinanceSubscriptionPaidReportsComponent,
    AllProviderPaymrntsComponent


  ],
  imports: [
    CommonModule,
    FinanceRoutingModule,
  NgMultiSelectDropDownModule,
  SharedModule

  ]
})
export class FinanceModule { }
