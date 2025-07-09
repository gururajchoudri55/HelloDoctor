import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MastersComponent } from './masters.component';
import { HomeDeliveryFeesComponent } from '../mastercomponents/home-delivery-fees/home-delivery-fees.component';
import { HomeDeliveryFeesDetailsComponent } from '../mastercomponents/home-delivery-fees-details/home-delivery-fees-details.component';
import { CreditCardMasterComponent } from '../mastercomponents/credit-card-master/credit-card-master.component';
import { MasterFeesForHomeServiceComponent } from '../mastercomponents/master-fees-for-home-service/master-fees-for-home-service.component';
import { CountryMasterComponent } from '../mastercomponents/country-master/country-master.component';
import { CountryMasterDetailsComponent } from '../mastercomponents/country-master-details/country-master-details.component';
import { RegionMasterComponent } from '../mastercomponents/region-master/region-master.component';
import { RegionMasterDetailsComponent } from '../mastercomponents/region-master-details/region-master-details.component';
import { ProvincemasterComponent } from '../mastercomponents/provincemaster/provincemaster.component';
import { ProvinceMasterDetailsComponent } from '../mastercomponents/province-master-details/province-master-details.component';
import { CitymasterComponent } from '../mastercomponents/citymaster/citymaster.component';
import { CityMasterDashboardComponent } from '../mastercomponents/city-master-dashboard/city-master-dashboard.component';
import { DepartmentMasterComponent } from '../mastercomponents/department-master/department-master.component';
import { ComplaintMasterComponent } from '../mastercomponents/complaint-master/complaint-master.component';
import { ComplaintMasterDetailsComponent } from '../mastercomponents/complaint-master-details/complaint-master-details.component';
import { SpecializationMasterComponent } from '../mastercomponents/specialization-master/specialization-master.component';
import { SpecializationMasterDetailsComponent } from '../mastercomponents/specialization-master-details/specialization-master-details.component';
import { ServiceMasterComponent } from '../mastercomponents/service-master/service-master.component';
import { ServiceMasterDetailsComponent } from '../mastercomponents/service-master-details/service-master-details.component';
import { DiagnosticTestMasterComponent } from '../mastercomponents/diagnostic-test-master/diagnostic-test-master.component';
import { DiagnosticTestMasterDetailsComponent } from '../mastercomponents/diagnostic-test-master-details/diagnostic-test-master-details.component';
import { CancellationSettingsComponent } from '../mastercomponents/cancellation-settings/cancellation-settings.component';
import { DepartmentDetailsComponent } from '../mastercomponents/department-details/department-details.component';
import { DaignosticTestTypeComponent } from '../mastercomponents/daignostic-test-type/daignostic-test-type.component';
import { DiagnosticTestTypeDetailsComponent } from '../mastercomponents/diagnostic-test-type-details/diagnostic-test-type-details.component';
import { AuthenticationGuard } from '../../Route-Authguard/authentication.guard';
import { DegreeMasterComponent } from '../mastercomponents/degree-master/degree-master.component';
import { DegreeMasterdashComponent } from '../mastercomponents/degree-masterdash/degree-masterdash.component';
import { DrugMasterdashComponent } from '../mastercomponents/drug-masterdash/drug-masterdash.component';
import { SoapDashComponent } from '../mastercomponents/soap-dash/soap-dash.component';
import { VitalsPromicodeComponent } from '../mastercomponents/vitals-promicode/vitals-promicode.component';
import { VitalsPackageComponent } from '../mastercomponents/vitals-package/vitals-package.component';
import { VitalsPackageMasterComponent } from '../mastercomponents/vitals-package-master/vitals-package-master.component';
import { VitalsPromocodeMasterComponent } from '../mastercomponents/vitals-promocode-master/vitals-promocode-master.component';
import { VitalsNarrativesMasterComponent } from '../mastercomponents/vitals-narratives-master/vitals-narratives-master.component';
import { VitalsNarrativesComponent } from '../mastercomponents/vitals-narratives/vitals-narratives.component';
import { PaymentAccountConfigComponent } from '../mastercomponents/payment-account-config/payment-account-config.component';


const routes: Routes = [
  { path: '', component: MastersComponent,canActivate: [AuthenticationGuard] },
  {path:'CancellationSettings',component:CancellationSettingsComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticTestMasterDetails',component:DiagnosticTestMasterDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticTestMasterDetails/:id',component:DiagnosticTestMasterDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticTestMaster',component:DiagnosticTestMasterComponent,canActivate: [AuthenticationGuard]},
  {path:'ServiceMasterDetails',component:ServiceMasterDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'ServiceMasterDetails/:id',component:ServiceMasterDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'ServiceMaster',component:ServiceMasterComponent,canActivate: [AuthenticationGuard]},
  {path:'SpecializationMasterDetails',component:SpecializationMasterDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'SpecializationMasterDetails/:id',component:SpecializationMasterDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'SpecializationMaster',component:SpecializationMasterComponent,canActivate: [AuthenticationGuard]},
  {path:'ComplaintMasterDetails',component:ComplaintMasterDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'ComplaintMasterDetails/:id',component:ComplaintMasterDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'ComplaintMaster',component:ComplaintMasterComponent,canActivate: [AuthenticationGuard]},
  {path:'DepartmentMaster',component:DepartmentMasterComponent,canActivate: [AuthenticationGuard]},
  {path:'CityMasterDashboard',component:CityMasterDashboardComponent,canActivate: [AuthenticationGuard]},
  {path:'Citymaster',component:CitymasterComponent,canActivate: [AuthenticationGuard]},
  {path:'Citymaster/:id',component:CitymasterComponent,canActivate: [AuthenticationGuard]},
  {path:'ProvinceMasterDetails',component:ProvinceMasterDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'ProvinceMasterDetails/:id',component:ProvinceMasterDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'Provincemaster',component:ProvincemasterComponent,canActivate: [AuthenticationGuard]},
  {path:'RegionMasterDetails',component:RegionMasterDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'RegionMasterDetails/:id',component:RegionMasterDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'RegionMaster',component:RegionMasterComponent,canActivate: [AuthenticationGuard]},
  {path:'CountryMasterDetails',component:CountryMasterDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'CountryMasterDetails/:id',component:CountryMasterDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'CountryMaster',component:CountryMasterComponent,canActivate: [AuthenticationGuard]},
  {path:'MasterFeesForHomeService',component:MasterFeesForHomeServiceComponent,canActivate: [AuthenticationGuard]},
  {path:'CreditCardMaster',component:CreditCardMasterComponent,canActivate: [AuthenticationGuard]},
  {path:'HomeDeliveryFeesDetails',component:HomeDeliveryFeesDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'HomeDeliveryFees',component:HomeDeliveryFeesComponent,canActivate: [AuthenticationGuard]},
  {path:'DepartmentDetails',component:DepartmentDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'DepartmentDetails/:id',component:DepartmentDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'DaignosticTestType',component:DaignosticTestTypeComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticTestTypeDetails',component:DiagnosticTestTypeDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'DiagnosticTestTypeDetails/:id',component:DiagnosticTestTypeDetailsComponent,canActivate: [AuthenticationGuard]},
  {path:'degreeMaster',component:DegreeMasterComponent,canActivate: [AuthenticationGuard]},
  {path:'degreeMasterdash',component:DegreeMasterdashComponent,canActivate: [AuthenticationGuard]},
  {path:'DrugMasterdash',component:DrugMasterdashComponent,canActivate: [AuthenticationGuard]},
  {path:'SoapDash',component:SoapDashComponent,canActivate: [AuthenticationGuard]},
  {path:'VitalsPromocode/:id',component:VitalsPromicodeComponent,canActivate: [AuthenticationGuard]},
  {path:'VitalsPackage/:id',component:VitalsPackageComponent,canActivate: [AuthenticationGuard]},
  {path:'VitalsPromocode',component:VitalsPromicodeComponent,canActivate: [AuthenticationGuard]},
  {path:'VitalsPackage',component:VitalsPackageComponent,canActivate: [AuthenticationGuard]},
  {path:'VitalsPackageMaster',component:VitalsPackageMasterComponent,canActivate: [AuthenticationGuard]},
  {path:'VitalsPromocodeMaster',component:VitalsPromocodeMasterComponent,canActivate: [AuthenticationGuard]},
  {path:'VitalsNarrativesMaster',component:VitalsNarrativesMasterComponent,canActivate: [AuthenticationGuard]},
  {path:'VitalsNarratives',component:VitalsNarrativesComponent,canActivate: [AuthenticationGuard]},
  {path:'VitalsNarratives/:id',component:VitalsNarrativesComponent,canActivate: [AuthenticationGuard]},
  {path:'PaymentAccount',component:PaymentAccountConfigComponent,canActivate: [AuthenticationGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
