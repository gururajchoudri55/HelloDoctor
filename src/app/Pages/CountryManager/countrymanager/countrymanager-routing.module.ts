import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { MidwifeRegistrationComponent } from '../../CountryManager/Registraions/midwife-registration/midwife-registration.component';
import { MidwifeComponent } from '../../CountryManager/Registraions/midwife/midwife.component';
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
import { PhysiotherapistRegistrationComponent } from '../../CountryManager/Registraions/physiotherapist-registration/physiotherapist-registration.component';
import { ClinicsdashComponent } from '../Registraions/clinicsdash/clinicsdash.component';
import { DiagnosticdashComponent } from '../Registraions/diagnosticdash/diagnosticdash.component';
import { MidwifePlaningDetailsComponent } from '../WorkingDetails/Midwife/midwife-planing-details/midwife-planing-details.component';
import { AuthenticationGuard } from '../../Route-Authguard/authentication.guard';
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

const routes: Routes = [
  { path: '', component: DoctorRegistrationComponent,canActivate: [AuthenticationGuard] },
  { path: 'DoctorRegistration', component: DoctorRegistrationComponent,canActivate: [AuthenticationGuard] },
  { path: 'Doctordash', component: DoctordashComponent,canActivate: [AuthenticationGuard] },
  { path: 'Hospitaldash', component: HospitaldashComponent ,canActivate: [AuthenticationGuard]},
  { path: 'GroupofDoctor', component: GroupofDoctorComponent ,canActivate: [AuthenticationGuard]},
  { path: 'DiagnosticRegistration', component: DiagnosticRegistrationComponent,canActivate: [AuthenticationGuard] },
  { path: 'PharmacyRegistration', component: PharmacyRegistrationComponent,canActivate: [AuthenticationGuard] },
  { path: 'Pharmacy', component: PharmacyComponent ,canActivate: [AuthenticationGuard]},
  { path: 'Nurse', component: NurseComponent,canActivate: [AuthenticationGuard] },
  { path: 'NurseRegistration', component: NurseRegistrationComponent,canActivate: [AuthenticationGuard] },
  { path: 'Physiotherapist', component: PhysiotherapistComponent ,canActivate: [AuthenticationGuard]},
  { path: 'Midwife', component: MidwifeComponent,canActivate: [AuthenticationGuard] },
  { path: 'MidwifeRegistration', component: MidwifeRegistrationComponent,canActivate: [AuthenticationGuard] },
  { path: 'DeliveryCopany', component: DeliveryCopanyComponent,canActivate: [AuthenticationGuard] },
  { path: 'DeliveryCompanyRegistration', component: DeliveryCompanyRegistrationComponent,canActivate: [AuthenticationGuard] },
  { path: 'Planning', component: PlanningComponent ,canActivate: [AuthenticationGuard]},
  { path: 'PlanningDetails', component: PlanningDetailsComponent,canActivate: [AuthenticationGuard] },
  { path: 'Agenda', component: AgendaComponent,canActivate: [AuthenticationGuard] },
  { path: 'NursePlanning', component: NursePlanningComponent ,canActivate: [AuthenticationGuard]},
  { path: 'NursePlanningDetails', component: NursePlanningDetailsComponent,canActivate: [AuthenticationGuard] },
  { path: 'NurseService', component: NurseServiceComponent,canActivate: [AuthenticationGuard] },
  { path: 'NurseServiceDetails', component: NurseServiceDetailsComponent,canActivate: [AuthenticationGuard] },
  { path: 'NurseServiceDetails/:id', component: NurseServiceDetailsComponent,canActivate: [AuthenticationGuard] },
  { path: 'NurseAgenda', component: NurseAgendaComponent,canActivate: [AuthenticationGuard] },
  { path: 'MidwifePlanning', component: MidwifePlanningComponent,canActivate: [AuthenticationGuard] },
  { path: 'MidwifeService', component: MidwifeServiceComponent,canActivate: [AuthenticationGuard] },
  { path: 'MidwifeServiceDetails', component: MidwifeServiceDetailsComponent ,canActivate: [AuthenticationGuard]},
  { path: 'MidwifeServiceDetails/:id', component: MidwifeServiceDetailsComponent ,canActivate: [AuthenticationGuard]},
  { path: 'MidwifeAgenda', component: MidwifeAgendaComponent,canActivate: [AuthenticationGuard] },
  { path: 'CareGiverPlanning', component: CareGiverPlanningComponent,canActivate: [AuthenticationGuard] },
  { path: 'CareGiverPlanningDetails', component: CareGiverPlanningDetailsComponent,canActivate: [AuthenticationGuard] },
  { path: 'CareGiverServices', component: CareGiverServicesComponent,canActivate: [AuthenticationGuard] },
  { path: 'CareGiverServiceDetails', component: CareGiverServiceDetailsComponent ,canActivate: [AuthenticationGuard]},
  { path: 'CareGiverServiceDetails/:id', component: CareGiverServiceDetailsComponent ,canActivate: [AuthenticationGuard]},

  { path: 'CareGiverAgenda', component: CareGiverAgendaComponent,canActivate: [AuthenticationGuard] },
  { path: 'DiagnosticTest', component: DiagnosticTestComponent ,canActivate: [AuthenticationGuard]},
  { path: 'DiagnosticTestDetails', component: DiagnosticTestDetailsComponent,canActivate: [AuthenticationGuard] },
  { path: 'DiagnosticPackage', component: DiagnosticPackageComponent,canActivate: [AuthenticationGuard] },
  { path: 'DiagnosticPackageDetails', component: DiagnosticPackageDetailsComponent,canActivate: [AuthenticationGuard] },
  { path: 'DiagnosticPlanning', component: DiagnosticPlanningComponent,canActivate: [AuthenticationGuard]},
  { path: 'DiagnosticPlanningDetails', component: DiagnosticPlanningDetailsComponent,canActivate: [AuthenticationGuard] },
  { path: 'DiagnosticAgenda', component: DiagnosticAgendaComponent,canActivate: [AuthenticationGuard] },
  { path: 'HospitalRegistration', component: HospitalRegistrationComponent,canActivate: [AuthenticationGuard] },
  { path: 'PhysiotherapistRegistration', component: PhysiotherapistRegistrationComponent ,canActivate: [AuthenticationGuard]},
  { path: 'Clinicsdash', component: ClinicsdashComponent,canActivate: [AuthenticationGuard] },
  { path: 'Diagnosticdash', component: DiagnosticdashComponent ,canActivate: [AuthenticationGuard]},
  { path: 'MidwifePlaningDetails', component: MidwifePlaningDetailsComponent ,canActivate: [AuthenticationGuard]},
  { path: 'EditNurse/:id', component: EditNurseComponent ,canActivate: [AuthenticationGuard]},
  { path: 'EditPhysio/:id', component: EditPhysioComponent ,canActivate: [AuthenticationGuard]},
  { path: 'EditMidwife/:id', component: EditMidwifeComponent ,canActivate: [AuthenticationGuard]},
  { path: 'EditPharmacy/:id', component: EditPharmacyComponent ,canActivate: [AuthenticationGuard]},
  { path: 'EditDiagnostic/:id', component: EditDiagnosticComponent ,canActivate: [AuthenticationGuard]},
  { path: 'EditDoctor/:id', component: EditDoctorComponent ,canActivate: [AuthenticationGuard]},
  { path: 'EditHospital/:id', component: EditHospitalComponent ,canActivate: [AuthenticationGuard]},
  { path: 'DiagnosticTestNew', component: DiagnosticTestNewComponent ,canActivate: [AuthenticationGuard]},
  { path: 'DiagnosticTestNew/:id', component: DiagnosticTestNewComponent ,canActivate: [AuthenticationGuard]},

  { path: 'addprescriptionverifier', component: PrescriptionverifierComponent,canActivate: [AuthenticationGuard] },
  { path: 'addprescriptionverifier/:id', component: PrescriptionverifierComponent,canActivate: [AuthenticationGuard] },
  { path: 'PrescriptionDash', component: PrescriptindashComponent,canActivate: [AuthenticationGuard] },
  { path: 'adddelivery', component: AdddeliveryComponent ,canActivate: [AuthenticationGuard]},
  { path: 'deliverydash', component: DeliverydashComponent,canActivate: [AuthenticationGuard] },
  { path: 'DeliveryCompanyRegistration/:id', component: DeliveryCompanyRegistrationComponent,canActivate: [AuthenticationGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountrymanagerRoutingModule { }
