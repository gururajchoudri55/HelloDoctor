import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { MyAppointmentsComponent } from '../../../Pages/Doctor/my-appointments/my-appointments.component';
import { MyRevenueComponent } from '../../../Pages/Doctor/my-revenue/my-revenue.component';
import { DashboardComponent } from '../../../Pages/Doctor/dashboard/dashboard.component';
import {  BsDatepickerModule, BsDatepickerConfig,BsLocaleService  } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
defineLocale('fr', frLocale);
import { MycalenderComponent } from '../../../Pages/Doctor/mycalender/mycalender.component';
import { MedicalHistoryComponent } from '../../../Pages/Doctor/medical-history/medical-history.component';
import { NewPatientHistoryComponent } from '../../../Pages/Doctor/new-patient-history/new-patient-history.component';
import { DoctorRefundsComponent } from '../../../Pages/Doctor/doctor-refunds/doctor-refunds.component';
import { IndependentRecpDashComponent } from '../../../Pages/Doctor/independent-recp-dash/independent-recp-dash.component';
import { DocChangePwdComponent } from '../../../Pages/Doctor/doc-change-pwd/doc-change-pwd.component';
import { DoctorNotificationsComponent } from '../../../Pages/Doctor/doctor-notifications/doctor-notifications.component';
import { DoctorSupportComponent } from '../../../Pages/Doctor/doctor-support/doctor-support.component';
import { DoctorSupportDashComponent } from '../../../Pages/Doctor/doctor-support-dash/doctor-support-dash.component';
import { DoctorProfileComponent } from '../../../Pages/Doctor/doctor-profile/doctor-profile.component';
import { CreateFolderComponent } from '../../../Pages/Doctor/create-folder/create-folder.component';
import { FolderDashComponent } from '../../../Pages/Doctor/folder-dash/folder-dash.component';
import { SharedModule } from '../../SharedModule/shared/shared.module';
import { DashboardDetailsComponent } from '../../../Pages/Doctor/dashboard-details/dashboard-details.component';
import { MyFilesComponent } from '../my-files/my-files.component';
import { SubFolderFilesComponent } from '../sub-folder-files/sub-folder-files.component';
import { MysubfolderfilesComponent } from '../mysubfolderfiles/mysubfolderfiles.component';
import { RevenueDetailsComponent } from '../revenue-details/revenue-details.component';
import { IndependentRecepDetailsComponent } from '../../../Pages/Doctor/independent-recep-details/independent-recep-details.component';
import { DMEComponent } from '../dme/dme.component';
import { RecpAppointmentsComponent } from '../receptioist/recp-appointments/recp-appointments.component';
import { PatientRedDashComponent } from '../receptioist/patient-red-dash/patient-red-dash.component';
import { PatientRegComponent } from '../receptioist/patient-reg/patient-reg.component';
import { DocPaymentsComponent } from '../receptioist/doc-payments/doc-payments.component';
import { RecpchangepwdComponent } from '../receptioist/recpchangepwd/recpchangepwd.component';
import { DocRecpProfileComponent } from '../receptioist/doc-recp-profile/doc-recp-profile.component';
// import { PrescriptionsComponent } from '../AppointmentActionPages/prescriptions/prescriptions.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { DiagnostcTestComponent } from '../AppointmentActionPages/diagnostc-test/diagnostc-test.component';
// import { SOAPNotesComponent } from '../AppointmentActionPages/soap-notes/soap-notes.component';
// import { MedicalcertificateComponent } from '../AppointmentActionPages/medicalcertificate/medicalcertificate.component';
// import { PreviousPrescriptionsComponent } from '../AppointmentActionPages/previous-prescriptions/previous-prescriptions.component';
// import { DoctorReferalsComponent } from '../AppointmentActionPages/doctor-referals/doctor-referals.component';
// import { UploadPrescriptionsComponent } from '../AppointmentActionPages/upload-prescriptions/upload-prescriptions.component';
// import { PatientDocumentsComponent } from '../AppointmentActionPages/patient-documents/patient-documents.component';
// import { GeneratePdfsComponent } from '../AppointmentActionPages/generate-pdfs/generate-pdfs.component';
// import { CheckPdfsComponent } from '../AppointmentActionPages/check-pdfs/check-pdfs.component';
// import { DoctorSmsComponent } from '../doctor-sms/doctor-sms.component';
import { DoctorActionModule } from '../../SharedModule/doctor-action/doctor-action.module';
import { BookDoctorComponent } from '../book-doctor/book-doctor.component';
import { PaymentRecepitComponent } from '../../../Pages/Doctor/payment-recepit/payment-recepit.component';
import { DoctorSlotsComponent } from '../doctor-slots/doctor-slots.component';
import { BookAppointmentComponent } from '../book-appointment/book-appointment.component';
import { SentRefferalsComponent } from '../AppointmentActionPages/sent-refferals/sent-refferals.component';
import { RefferedPatientsComponent } from '../AppointmentActionPages/reffered-patients/reffered-patients.component';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    DoctorComponent,
    MyAppointmentsComponent,
    DashboardComponent,
    MyRevenueComponent,
    MycalenderComponent,
    MedicalHistoryComponent,
    NewPatientHistoryComponent,
    DoctorRefundsComponent,
    IndependentRecpDashComponent,
    DocChangePwdComponent,
    DoctorNotificationsComponent,
    DoctorSupportComponent,
    DoctorSupportComponent,
    DoctorSupportDashComponent,
    DoctorProfileComponent,
    CreateFolderComponent,
    FolderDashComponent,
    DashboardDetailsComponent,
    MyFilesComponent,
    SubFolderFilesComponent,
    MysubfolderfilesComponent,
    RevenueDetailsComponent,
    IndependentRecepDetailsComponent,
    DMEComponent,
    RecpAppointmentsComponent,
    PatientRedDashComponent,
    PatientRegComponent,
    DocPaymentsComponent,
    RecpchangepwdComponent,
    DocRecpProfileComponent,
    BookDoctorComponent,
    PaymentRecepitComponent,
    DoctorSlotsComponent,
    BookAppointmentComponent,
    SentRefferalsComponent,
    RefferedPatientsComponent
  
  
    // PrescriptionsComponent,
    // DiagnostcTestComponent,
    // SOAPNotesComponent,
    // MedicalcertificateComponent,
    // PreviousPrescriptionsComponent,
    // DoctorReferalsComponent,
    // UploadPrescriptionsComponent,
    // PatientDocumentsComponent,
    // GeneratePdfsComponent,
    // CheckPdfsComponent,
    // DoctorSmsComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    FormsModule,
    SharedModule,
    DoctorActionModule,
    // CKEditorModule,
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class DoctorModule {
  constructor(private bsLocaleService: BsLocaleService){

    if(sessionStorage.getItem('LanguageID')=='1')
    {
    }
    else
    {
      this.bsLocaleService.use('fr');//fecha en español, datepicker
    }
 }
}

