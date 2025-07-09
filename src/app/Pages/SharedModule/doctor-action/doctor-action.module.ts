import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrescriptionsComponent } from '../../Doctor/AppointmentActionPages/prescriptions/prescriptions.component';
import { DiagnostcTestComponent } from '../../Doctor/AppointmentActionPages/diagnostc-test/diagnostc-test.component';
import { SOAPNotesComponent } from '../../Doctor/AppointmentActionPages/soap-notes/soap-notes.component';
import { MedicalcertificateComponent } from '../../Doctor/AppointmentActionPages/medicalcertificate/medicalcertificate.component';
import { PreviousPrescriptionsComponent } from '../../Doctor/AppointmentActionPages/previous-prescriptions/previous-prescriptions.component';
import { DoctorReferalsComponent } from '../../Doctor/AppointmentActionPages/doctor-referals/doctor-referals.component';
import { UploadPrescriptionsComponent } from '../../Doctor/AppointmentActionPages/upload-prescriptions/upload-prescriptions.component';
import { PatientDocumentsComponent } from '../../Doctor/AppointmentActionPages/patient-documents/patient-documents.component';
import { GeneratePdfsComponent } from '../../Doctor/AppointmentActionPages/generate-pdfs/generate-pdfs.component';
import { CheckPdfsComponent } from '../../Doctor/AppointmentActionPages/check-pdfs/check-pdfs.component';
import { DoctorSmsComponent } from '../../Doctor/doctor-sms/doctor-sms.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharedModule } from '../shared/shared.module';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { DoctorChatComponent } from '../../Doctor/AppointmentActionPages/doctor-chat/doctor-chat.component';
import { VideoCallLoaderComponent } from '../../VideoCall/video-call/video-call-loader/video-call-loader.component';
import { VaccineComponent } from '../../Doctor/AppointmentActionPages/vaccine/vaccine.component';
defineLocale('fr', frLocale);

@NgModule({
  declarations: [
    PrescriptionsComponent,
    DiagnostcTestComponent,
    SOAPNotesComponent,
    MedicalcertificateComponent,
    PreviousPrescriptionsComponent,
    DoctorReferalsComponent,
    UploadPrescriptionsComponent,
    PatientDocumentsComponent,
    GeneratePdfsComponent,
    CheckPdfsComponent,
    DoctorSmsComponent,
    DoctorChatComponent,
    VideoCallLoaderComponent,
    VaccineComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  exports:[
    PrescriptionsComponent,
    DiagnostcTestComponent,
    SOAPNotesComponent,
    MedicalcertificateComponent,
    PreviousPrescriptionsComponent,
    DoctorReferalsComponent,
    UploadPrescriptionsComponent,
    PatientDocumentsComponent,
    GeneratePdfsComponent,
    CheckPdfsComponent,
    DoctorSmsComponent,
    DoctorChatComponent,
    VideoCallLoaderComponent,
    VaccineComponent
  ]
})
export class DoctorActionModule {
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