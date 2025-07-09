import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountrymanagerRoutingModule } from './countrymanager-routing.module';
import { CountrymanagerComponent } from './countrymanager.component';
import { DoctorRegistrationComponent } from '../../CountryManager/doctor-registration/doctor-registration.component';
import { DoctordashComponent } from '../../CountryManager/doctordash/doctordash.component';
import { HospitaldashComponent } from '../../CountryManager/hospitaldash/hospitaldash.component';
import { GroupofDoctorComponent } from '../../CountryManager/groupof-doctor/groupof-doctor.component';
import { HospitalRegistrationComponent } from '../../CountryManager/Registraions/hospital-registration/hospital-registration.component';
import { DiagnosticRegistrationComponent } from '../../CountryManager/Registraions/diagnostic-registration/diagnostic-registration.component';
import { PharmacyComponent } from '../../CountryManager/pharmacy/pharmacy.component';
import { PharmacyRegistrationComponent } from '../../CountryManager/Registraions/pharmacy-registration/pharmacy-registration.component';
import { NurseComponent } from '../../CountryManager/nurse/nurse.component';
import { NurseRegistrationComponent } from '../../CountryManager/Registraions/nurse-registration/nurse-registration.component';
import { PhysiotherapistComponent } from '../../CountryManager/physiotherapist/physiotherapist.component';
import { PhysiotherapistRegistrationComponent } from '../../CountryManager/Registraions/physiotherapist-registration/physiotherapist-registration.component';
import { MidwifeComponent } from '../../CountryManager/Registraions/midwife/midwife.component';
import { MidwifeRegistrationComponent } from '../../CountryManager/Registraions/midwife-registration/midwife-registration.component';
import { DeliveryCopanyComponent } from '../../CountryManager/Registraions/delivery-copany/delivery-copany.component';
import { DeliveryCompanyRegistrationComponent } from '../../CountryManager/Registraions/delivery-company-registration/delivery-company-registration.component';
import { PlanningComponent } from '../../CountryManager/WorkingDetails/Doctor/planning/planning.component';
import { PlanningDetailsComponent } from '../../CountryManager/WorkingDetails/Doctor/planning-details/planning-details.component';
import { AgendaComponent } from '../../CountryManager/WorkingDetails/Doctor/agenda/agenda.component';
import { NursePlanningComponent } from '../../CountryManager/WorkingDetails/Nurse/nurse-planning/nurse-planning.component';
import { NursePlanningDetailsComponent } from '../../CountryManager/WorkingDetails/Nurse/nurse-planning-details/nurse-planning-details.component';
import { NurseServiceComponent } from '../../CountryManager/WorkingDetails/Nurse/nurse-service/nurse-service.component';
import { NurseServiceDetailsComponent } from '../../CountryManager/WorkingDetails/Nurse/nurse-service-details/nurse-service-details.component';
import { NurseAgendaComponent } from '../../CountryManager/WorkingDetails/Nurse/nurse-agenda/nurse-agenda.component';
import { MidwifePlanningComponent } from '../../CountryManager/WorkingDetails/Midwife/midwife-planning/midwife-planning.component';
import { MidwifeServiceComponent } from '../../CountryManager/WorkingDetails/Midwife/midwife-service/midwife-service.component';
import { MidwifeServiceDetailsComponent } from '../../CountryManager/WorkingDetails/Midwife/midwife-service-details/midwife-service-details.component';
import { MidwifeAgendaComponent } from '../../CountryManager/WorkingDetails/Midwife/midwife-agenda/midwife-agenda.component';
import { CareGiverPlanningComponent } from '../../CountryManager/WorkingDetails/CareGiver/care-giver-planning/care-giver-planning.component';
import { CareGiverPlanningDetailsComponent } from '../../CountryManager/WorkingDetails/CareGiver/care-giver-planning-details/care-giver-planning-details.component';
import { CareGiverServicesComponent } from '../../CountryManager/WorkingDetails/CareGiver/care-giver-services/care-giver-services.component';
import { CareGiverServiceDetailsComponent } from '../../CountryManager/WorkingDetails/CareGiver/care-giver-service-details/care-giver-service-details.component';
import { CareGiverAgendaComponent } from '../../CountryManager/WorkingDetails/CareGiver/care-giver-agenda/care-giver-agenda.component';
import { DiagnosticTestComponent } from '../../CountryManager/WorkingDetails/Diagnostic/diagnostic-test/diagnostic-test.component';
import { DiagnosticTestDetailsComponent } from '../../CountryManager/WorkingDetails/Diagnostic/diagnostic-test-details/diagnostic-test-details.component';
import { DiagnosticPackageComponent } from '../../CountryManager/WorkingDetails/Diagnostic/diagnostic-package/diagnostic-package.component';
import { DiagnosticPackageDetailsComponent } from '../../CountryManager/WorkingDetails/Diagnostic/diagnostic-package-details/diagnostic-package-details.component';
import { DiagnosticPlanningComponent } from '../../CountryManager/WorkingDetails/Diagnostic/diagnostic-planning/diagnostic-planning.component';
import { DiagnosticPlanningDetailsComponent } from '../../CountryManager/WorkingDetails/Diagnostic/diagnostic-planning-details/diagnostic-planning-details.component';
import { DiagnosticAgendaComponent } from '../../CountryManager/WorkingDetails/Diagnostic/diagnostic-agenda/diagnostic-agenda.component';
import { ClinicsdashComponent } from '../../../Pages/CountryManager/Registraions/clinicsdash/clinicsdash.component';
import { DiagnosticdashComponent } from '../../../Pages/CountryManager/Registraions/diagnosticdash/diagnosticdash.component';
import { SharedModule } from '../../SharedModule/shared/shared.module';
import { MidwifePlaningDetailsComponent } from '../WorkingDetails/Midwife/midwife-planing-details/midwife-planing-details.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {  BsDatepickerModule, BsDatepickerConfig,BsLocaleService  } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
import { EditNurseComponent } from '../EditProviders/edit-nurse/edit-nurse.component';
import { EditPhysioComponent } from '../EditProviders/edit-physio/edit-physio.component';
import { EditMidwifeComponent } from '../EditProviders/edit-midwife/edit-midwife.component';
import { EditPharmacyComponent } from '../EditProviders/edit-pharmacy/edit-pharmacy.component';
import { EditDiagnosticComponent } from '../EditProviders/edit-diagnostic/edit-diagnostic.component';
import { EditDoctorComponent } from '../EditProviders/edit-doctor/edit-doctor.component';
import { EditHospitalComponent } from '../EditProviders/edit-hospital/edit-hospital.component';
import { DiagnosticTestNewComponent } from '../WorkingDetails/Diagnostic/diagnostic-test-new/diagnostic-test-new.component';
import { PrescriptionverifierComponent } from '../Registraions/prescriptionverifier/prescriptionverifier.component';
import { PrescriptindashComponent } from '../Registraions/prescriptindash/prescriptindash.component';
import { AdddeliveryComponent } from '../Registraions/adddelivery/adddelivery.component';
import { DeliverydashComponent } from '../Registraions/deliverydash/deliverydash.component';


defineLocale('fr', frLocale);


// import {NoCommaPipe} from '../../../../no-comma-pipe';
@NgModule({
  declarations: [
    CountrymanagerComponent,
    DoctorRegistrationComponent,
    DoctordashComponent,
    HospitaldashComponent,
    GroupofDoctorComponent,
    HospitalRegistrationComponent,
    DiagnosticRegistrationComponent,
    PharmacyComponent,
    PharmacyRegistrationComponent,
    NurseComponent,
    NurseRegistrationComponent,
    PhysiotherapistComponent,
    PhysiotherapistRegistrationComponent,
    MidwifeComponent,
    MidwifeRegistrationComponent,
    DeliveryCopanyComponent,
    DeliveryCompanyRegistrationComponent,
    PlanningComponent,
    PlanningDetailsComponent,
    AgendaComponent,
    NursePlanningComponent,
    NursePlanningDetailsComponent,
    NurseServiceComponent,
    NurseServiceDetailsComponent,
    NurseAgendaComponent,
    MidwifePlanningComponent,
    MidwifeServiceComponent,
    MidwifeServiceDetailsComponent,
    MidwifeAgendaComponent,
    CareGiverPlanningComponent,
    CareGiverPlanningDetailsComponent,
    CareGiverServicesComponent,
    CareGiverServiceDetailsComponent,
    CareGiverAgendaComponent,
    DiagnosticTestComponent,
    DiagnosticTestDetailsComponent,
    DiagnosticPackageComponent,
    DiagnosticPackageDetailsComponent,
    DiagnosticPlanningComponent,
    DiagnosticPlanningDetailsComponent,
    DiagnosticAgendaComponent,
    ClinicsdashComponent,
    DiagnosticdashComponent,
    MidwifePlaningDetailsComponent,
    EditNurseComponent,
    EditPhysioComponent,
    EditMidwifeComponent,
    EditPharmacyComponent,
    EditDiagnosticComponent,
    EditDoctorComponent,
    EditHospitalComponent,
    DiagnosticTestNewComponent,
    PrescriptionverifierComponent,
    PrescriptindashComponent,
    AdddeliveryComponent,
    DeliverydashComponent,
    // NoCommaPipe
  ],
  imports: [
    CommonModule,
    CountrymanagerRoutingModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
 

})

export class CountrymanagerModule { 
  constructor( private bsLocaleService: BsLocaleService){
    if(sessionStorage.getItem('LanguageID')=='1')
    {
  
    }
    else
    {
      this.bsLocaleService.use('fr');//fecha en español, datepicker
    }
  }
}
