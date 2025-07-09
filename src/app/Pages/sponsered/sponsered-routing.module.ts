import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpAppointmentSponsershipComponent } from './sp-appointment-sponsership/sp-appointment-sponsership.component';
import { SpDiagnosticCenterComponent } from './sp-diagnostic-center/sp-diagnostic-center.component';
import { SpHomePageSponsershipComponent } from './sp-home-page-sponsership/sp-home-page-sponsership.component';
import { SpHospitalComponent } from './sp-hospital/sp-hospital.component';
import { SpPharmacyComponent } from './sp-pharmacy/sp-pharmacy.component';
import { SponseredComponent } from './sponsered.component';
import { SPHospitalDetailsComponent } from './sphospital-details/sphospital-details.component';
import { SpDiagnosticDetailsComponent } from './sp-diagnostic-details/sp-diagnostic-details.component';
import { SpPharmacyDetailsComponent } from './sp-pharmacy-details/sp-pharmacy-details.component';
import { SpHomepageDetailsComponent } from './sp-homepage-details/sp-homepage-details.component';
import { SpAppointmentDetailsComponent } from './sp-appointment-details/sp-appointment-details.component';
import { SponseredArticleDashboardComponent } from './sponsered-article-dashboard/sponsered-article-dashboard.component';
import { SponseredArticleRegistrationComponent } from './sponsered-article-registration/sponsered-article-registration.component';

const routes: Routes = [
  { path: '', component: SponseredComponent },
  {path:'SpHospital',component:SpHospitalComponent},
  {path:'SpDiagnosticCenter',component:SpDiagnosticCenterComponent},
  {path:'SpPharmacy',component:SpPharmacyComponent},
  {path:'SpHomePageSponsership',component:SpHomePageSponsershipComponent},
  {path:'SpAppointmentSponsership',component:SpAppointmentSponsershipComponent},
  {path:'SPHospitalDetails',component:SPHospitalDetailsComponent},
  {path:'SPHospitalDetails/:id',component:SPHospitalDetailsComponent},
  {path:'SpDiagnosticDetails',component:SpDiagnosticDetailsComponent},
  {path:'SpDiagnosticDetails/:id',component:SpDiagnosticDetailsComponent},
  {path:'SpPharmacyDetails',component:SpPharmacyDetailsComponent},
  {path:'SpPharmacyDetails/:id',component:SpPharmacyDetailsComponent},
  {path:'SpHomepageDetails',component:SpHomepageDetailsComponent},
  {path:'SpHomepageDetails/:id',component:SpHomepageDetailsComponent},
  {path:'SpAppointmentDetails',component:SpAppointmentDetailsComponent},
  {path:'SpAppointmentDetails/:id',component:SpAppointmentDetailsComponent},
  {path:'SponseredArticleDashboard',component:SponseredArticleDashboardComponent},
  {path:'SponseredArticleRegistration',component:SponseredArticleRegistrationComponent},
  {path:'SponseredArticleRegistration/:id',component:SponseredArticleRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponseredRoutingModule { }
