import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { PharmacyComponent } from './pharmacy.component';
import { ReportsComponent } from '../Pharma/reports/reports.component';
import { HomeDeliveryChargesComponent } from '../Pharma/home-delivery-charges/home-delivery-charges.component';
import { SpecialOffersComponent } from '../Pharma/special-offers/special-offers.component';
import { ChangePasswordComponent } from '../Pharma/change-password/change-password.component';
import { SupportTicketsComponent } from '../Pharma/support-tickets/support-tickets.component';
import { ProfileComponent } from '../Pharma/profile/profile.component';
import { SpecialofferDetailsComponent } from '../Pharma/specialoffer-details/specialoffer-details.component';
import { SupportTicketDetailsComponent } from '../Pharma/support-ticket-details/support-ticket-details.component';
import { PrecriptionsComponent } from '../Pharma/precriptions/precriptions.component';
import { SharedModule } from '../../SharedModule/shared/shared.module';
import {
  BsDatepickerModule,
  BsDatepickerConfig,
  BsLocaleService,
} from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
import { OrderedMedicinesComponent } from '../Pharma/ordered-medicines/ordered-medicines.component';
import { UploadedPrescriptionComponent } from '../Pharma/uploaded-prescription/uploaded-prescription.component';
import { PharmaSmsComponent } from '../Pharma/pharma-sms/pharma-sms.component';
import { PharmacyChatComponent } from '../Pharma/pharmacy-chat/pharmacy-chat.component';
import { PharmacyPaymentReceiptComponent } from '../Pharma/pharmacy-payment-receipt/pharmacy-payment-receipt.component';
defineLocale('fr', frLocale);

@NgModule({
  declarations: [
    PharmacyComponent,
    ReportsComponent,
    HomeDeliveryChargesComponent,
    SpecialOffersComponent,
    ChangePasswordComponent,
    SupportTicketsComponent,
    ProfileComponent,
    SpecialofferDetailsComponent,
    SupportTicketDetailsComponent,
    PrecriptionsComponent,
    OrderedMedicinesComponent,
    UploadedPrescriptionComponent,
    PharmaSmsComponent,
    PharmacyChatComponent,
    PharmacyPaymentReceiptComponent,
  ],
  imports: [
    CommonModule,
    PharmacyRoutingModule,
    SharedModule,
    BsDatepickerModule,
  ],
})
export class PharmacyModule {}
