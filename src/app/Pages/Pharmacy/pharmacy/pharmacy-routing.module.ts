import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AuthenticationGuard } from '../../Route-Authguard/authentication.guard';

const routes: Routes =
  [
    { path: '', component: PharmacyComponent, canActivate: [AuthenticationGuard] },
    { path: 'Pharmacy', component: PharmacyComponent, canActivate: [AuthenticationGuard] },
    { path: 'Reports', component: ReportsComponent , canActivate: [AuthenticationGuard]},
    { path: 'HomeDeliveryCharges', component: HomeDeliveryChargesComponent, canActivate: [AuthenticationGuard] },
    { path: 'SpecialOffers', component: SpecialOffersComponent , canActivate: [AuthenticationGuard]},
    { path: 'ChangePassword', component: ChangePasswordComponent , canActivate: [AuthenticationGuard]},
    { path: 'SupportTickets', component: SupportTicketsComponent , canActivate: [AuthenticationGuard]},
    { path: 'Profile', component: ProfileComponent , canActivate: [AuthenticationGuard]},
    { path: 'SpecialofferDetails', component: SpecialofferDetailsComponent , canActivate: [AuthenticationGuard]},
    { path: 'SpecialofferDetails/:id', component: SpecialofferDetailsComponent , canActivate: [AuthenticationGuard]},
    { path: 'SupportTicketDetails', component: SupportTicketDetailsComponent , canActivate: [AuthenticationGuard]},
    { path: 'Precriptions', component: PrecriptionsComponent , canActivate: [AuthenticationGuard]}



  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacyRoutingModule { }
