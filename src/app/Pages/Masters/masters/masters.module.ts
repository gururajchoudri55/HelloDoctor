import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastersRoutingModule } from './masters-routing.module';
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
import { SharedModule } from '../../SharedModule/shared/shared.module';
import { DepartmentDetailsComponent } from '../mastercomponents/department-details/department-details.component';
import { DaignosticTestTypeComponent } from '../mastercomponents/daignostic-test-type/daignostic-test-type.component';
import { DiagnosticTestTypeDetailsComponent } from '../mastercomponents/diagnostic-test-type-details/diagnostic-test-type-details.component';
import { DegreeMasterComponent } from '../mastercomponents/degree-master/degree-master.component';
import { DegreeMasterdashComponent } from '../mastercomponents/degree-masterdash/degree-masterdash.component';
import { DrugMasterdashComponent } from '../mastercomponents/drug-masterdash/drug-masterdash.component';
import { SoapDashComponent } from '../mastercomponents/soap-dash/soap-dash.component';
import { VitalsPromicodeComponent } from '../mastercomponents/vitals-promicode/vitals-promicode.component';
import { VitalsPackageComponent } from '../mastercomponents/vitals-package/vitals-package.component';
import { VitalsPackageMasterComponent } from '../mastercomponents/vitals-package-master/vitals-package-master.component';
import { VitalsPromocodeMasterComponent } from '../mastercomponents/vitals-promocode-master/vitals-promocode-master.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { VitalsNarrativesMasterComponent } from '../mastercomponents/vitals-narratives-master/vitals-narratives-master.component';
import { VitalsNarrativesComponent } from '../mastercomponents/vitals-narratives/vitals-narratives.component';
import { PaymentAccountConfigComponent } from '../mastercomponents/payment-account-config/payment-account-config.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'

@NgModule({
  declarations: [
    MastersComponent,
    CancellationSettingsComponent,
    HomeDeliveryFeesComponent,
    HomeDeliveryFeesDetailsComponent,
    CreditCardMasterComponent,
    MasterFeesForHomeServiceComponent,
    CountryMasterComponent,
    CountryMasterDetailsComponent,
    RegionMasterComponent,
    RegionMasterDetailsComponent,
    ProvincemasterComponent,
    ProvinceMasterDetailsComponent,
    CitymasterComponent,
    CityMasterDashboardComponent,
    DepartmentMasterComponent,
    ComplaintMasterComponent,
    ComplaintMasterDetailsComponent,
    SpecializationMasterComponent,
    SpecializationMasterDetailsComponent,
    ServiceMasterComponent,
    ServiceMasterDetailsComponent,
    DiagnosticTestMasterComponent,
    DiagnosticTestMasterDetailsComponent,
    DepartmentDetailsComponent,
    DaignosticTestTypeComponent,
    DiagnosticTestTypeDetailsComponent,
    DegreeMasterComponent,
    DegreeMasterdashComponent,
    DrugMasterdashComponent,
    SoapDashComponent,
    VitalsPromicodeComponent,
    VitalsPackageComponent,
    VitalsPackageMasterComponent,
    VitalsPromocodeMasterComponent,
    VitalsNarrativesMasterComponent,
    VitalsNarrativesComponent,
    PaymentAccountConfigComponent,
    
    
  ],
  imports: [
    CommonModule,
    MastersRoutingModule,
    SharedModule,
    NgMultiSelectDropDownModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class MastersModule { }
