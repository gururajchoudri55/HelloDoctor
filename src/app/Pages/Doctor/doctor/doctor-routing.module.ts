import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MyAppointmentsComponent } from '../my-appointments/my-appointments.component';
import { MyRevenueComponent } from '../../../Pages/Doctor/my-revenue/my-revenue.component';
import { MycalenderComponent } from '../../../Pages/Doctor/mycalender/mycalender.component';
import { MedicalHistoryComponent } from '../medical-history/medical-history.component';
import { NewPatientHistoryComponent } from '../../../Pages/Doctor/new-patient-history/new-patient-history.component';
import { DoctorRefundsComponent } from '../doctor-refunds/doctor-refunds.component';
import { IndependentRecpDashComponent } from '../../../Pages/Doctor/independent-recp-dash/independent-recp-dash.component';
import { DocChangePwdComponent } from '../../../Pages/Doctor/doc-change-pwd/doc-change-pwd.component';
import { DoctorNotificationsComponent } from '../../../Pages/Doctor/doctor-notifications/doctor-notifications.component';
import { DoctorSupportComponent } from '../../../Pages/Doctor/doctor-support/doctor-support.component';
import { DoctorSupportDashComponent } from '../../../Pages/Doctor/doctor-support-dash/doctor-support-dash.component';
import { DoctorProfileComponent } from '../../../Pages/Doctor/doctor-profile/doctor-profile.component';
import { CreateFolderComponent } from '../../../Pages/Doctor/create-folder/create-folder.component';
import { FolderDashComponent } from '../../../Pages/Doctor/folder-dash/folder-dash.component';
import { DashboardDetailsComponent } from '../../../Pages/Doctor/dashboard-details/dashboard-details.component';
import { MyFilesComponent } from '../my-files/my-files.component';
import { SubFolderFilesComponent } from '../sub-folder-files/sub-folder-files.component';
import { MysubfolderfilesComponent } from '../mysubfolderfiles/mysubfolderfiles.component';
import { RevenueDetailsComponent } from '../revenue-details/revenue-details.component';
import { IndependentRecepDetailsComponent } from '../independent-recep-details/independent-recep-details.component';
import { DMEComponent } from '../dme/dme.component';
import { RecpAppointmentsComponent } from '../receptioist/recp-appointments/recp-appointments.component';
import { PatientRedDashComponent } from '../receptioist/patient-red-dash/patient-red-dash.component';
import { PatientRegComponent } from '../receptioist/patient-reg/patient-reg.component';
import { DocPaymentsComponent } from '../receptioist/doc-payments/doc-payments.component';
import { RecpchangepwdComponent } from '../receptioist/recpchangepwd/recpchangepwd.component';
import { DocRecpProfileComponent } from '../receptioist/doc-recp-profile/doc-recp-profile.component';
import { BookDoctorComponent } from '../book-doctor/book-doctor.component';
import { PaymentRecepitComponent } from '../../../Pages/Doctor/payment-recepit/payment-recepit.component';
import { DoctorSlotsComponent } from '../doctor-slots/doctor-slots.component';
import { BookAppointmentComponent } from '../book-appointment/book-appointment.component';
import { AuthenticationGuard } from '../../Route-Authguard/authentication.guard';
import { SentRefferalsComponent } from '../AppointmentActionPages/sent-refferals/sent-refferals.component';
import { RefferedPatientsComponent } from '../AppointmentActionPages/reffered-patients/reffered-patients.component';

const routes: Routes = [
  {
    path: '',
    component: MyAppointmentsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'MyAppointments',
    component: MyAppointmentsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'Dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'Dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'MyRevenue',
    component: MyRevenueComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'Mycalender',
    component: MycalenderComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'MedicalHistory',
    component: MedicalHistoryComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'NewPatientHistory',
    component: NewPatientHistoryComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'DoctorRefunds',
    component: DoctorRefundsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'IndependentRecpDash',
    component: IndependentRecpDashComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'DocChangePwd',
    component: DocChangePwdComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'DoctorNotifications',
    component: DoctorNotificationsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'DoctorSupport',
    component: DoctorSupportComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'DoctorSupportDash',
    component: DoctorSupportDashComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'DoctorProfile',
    component: DoctorProfileComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'CreateFolder',
    component: CreateFolderComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'CreateFolder/:id',
    component: CreateFolderComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'FolderDash',
    component: FolderDashComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'Doctor',
    component: DoctorComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'DashboardDetails/:id',
    component: DashboardDetailsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'Doctor',
    component: DoctorComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'DashboardDetails',
    component: DashboardDetailsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'MyFiles/:id/:Foldername',
    component: MyFilesComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'SubFolderFiles/:folderid/:subfolderid/:Foldername/:SubFolderName',
    component: SubFolderFilesComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'Mysubfolderfiles/:folderid/:subfolderid/:SubfoldersID/:Foldername/:SubFolderName/:SubFoldersName',
    component: MysubfolderfilesComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'RevenueDetails/:id',
    component: RevenueDetailsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'IndependentRecepDetails',
    component: IndependentRecepDetailsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'DME/:patientID',
    component: DMEComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'RecpAppointments',
    component: RecpAppointmentsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'PatientRedDash',
    component: PatientRedDashComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'PatientReg',
    component: PatientRegComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'PatientReg/:id',
    component: PatientRegComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'DocPayments',
    component: DocPaymentsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'Recpchangepwd',
    component: RecpchangepwdComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'DocRecpProfile',
    component: DocRecpProfileComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'BookDoctor',
    component: BookDoctorComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'PaymentRecepit',
    component: PaymentRecepitComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'Doctorslots/:doctorID/:id/:hospital_ClinicID/:appointmentTypeID/:bookingTypeID/:slotDurationID/:doctorName',
    component: DoctorSlotsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'BookAppointment/:doctorSlotID/:slotName/:doctorFees',
    component: BookAppointmentComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'SentRefferals',
    component: SentRefferalsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'RefferedPatients',
    component: RefferedPatientsComponent,
    canActivate: [AuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
