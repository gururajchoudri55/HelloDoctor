import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenusComponent } from './menus.component';
import { ReportDeutilisationComponent } from '../menucomponents/report-deutilisation/report-deutilisation.component';
import { SupportRegistrationComponent } from '../menucomponents/support-registration/support-registration.component';
import { MergePatientDataComponent } from '../menucomponents/merge-patient-data/merge-patient-data.component';
import { RoleMenumappingComponent } from '../menucomponents/role-menumapping/role-menumapping.component';
import { UserRoleMappingComponent } from '../menucomponents/user-role-mapping/user-role-mapping.component';
import { SendMailsComponent } from '../menucomponents/send-mails/send-mails.component';
import { EmailDashboardComponent } from '../menucomponents/email-dashboard/email-dashboard.component';
import { SendSmsComponent } from '../menucomponents/send-sms/send-sms.component';
import { SmsDashboardComponent } from '../menucomponents/sms-dashboard/sms-dashboard.component';
import { FAQComponent } from '../menucomponents/faq/faq.component';
import { QuickerGuideComponent } from '../menucomponents/quicker-guide/quicker-guide.component';
import { AnnouncementsComponent } from '../menucomponents/announcements/announcements.component';
import { RegisteredPatientsComponent } from '../menucomponents/registered-patients/registered-patients.component';
import { PatientWalletComponent } from '../menucomponents/patient-wallet/patient-wallet.component';
import { PatientInvitationsComponent } from '../menucomponents/patient-invitations/patient-invitations.component';
import { InvitationReportComponent } from '../menucomponents/invitation-report/invitation-report.component';
import { PatientHistoryComponent } from '../menucomponents/patient-history/patient-history.component';
import { InvitationmasterComponent } from '../menucomponents/invitationmaster/invitationmaster.component';
import { DoctorReportComponent } from '../menucomponents/doctor-report/doctor-report.component';
import { PatientReportComponent } from '../menucomponents/patient-report/patient-report.component';
import { ImportPatientsComponent } from '../menucomponents/import-patients/import-patients.component';
import { SupportRegistrationDetailsComponent } from '../menucomponents/support-registration-details/support-registration-details.component';
import { RoleMenumappingDetailsComponent } from '../menucomponents/role-menumapping-details/role-menumapping-details.component';
import { UserRoleMappingDetailsComponent } from '../menucomponents/user-role-mapping-details/user-role-mapping-details.component';
import { FAQDetailsComponent } from '../menucomponents/faqdetails/faqdetails.component';
import { QuickerguideDetailsComponent } from '../menucomponents/quickerguide-details/quickerguide-details.component';
import { AnnouncementdetailsComponent } from '../menucomponents/announcementdetails/announcementdetails.component';
import { InvitationMasterDetailsComponent } from '../menucomponents/invitation-master-details/invitation-master-details.component';
import { FAQnewComponent } from '../menucomponents/faqnew/faqnew.component';
import { QuickGuideNewComponent } from '../menucomponents/quick-guide-new/quick-guide-new.component';
import { AuthenticationGuard } from '../../Route-Authguard/authentication.guard';
import { DoctorAvailableReportComponent } from '../menucomponents/doctor-available-report/doctor-available-report.component';
import { SmslogsComponent } from '../menucomponents/smslogs/smslogs.component';
import { NurseAvilabilityreportComponent } from '../nurse-avilabilityreport/nurse-avilabilityreport.component';
import { PhysioavailabilityComponent } from '../menucomponents/physioavailability/physioavailability.component';
import { MidwifeAvailabilityComponent } from '../menucomponents/midwife-availability/midwife-availability.component';
import { CategoryComponent } from '../../Ecommerce/category/category.component';
import { CategorydashComponent } from '../../Ecommerce/categorydash/categorydash.component';
import { SubCategoryComponent } from '../../Ecommerce/sub-category/sub-category.component';
import { SubCategorydashComponent } from '../../Ecommerce/sub-categorydash/sub-categorydash.component';
import { ProductsComponent } from '../../Ecommerce/products/products.component';
import { ProductsdashComponent } from '../../Ecommerce/productsdash/productsdash.component';
import { InventoryDashComponent } from '../../Ecommerce/inventory-dash/inventory-dash.component';
import { OrdersDashComponent } from '../../Ecommerce/orders-dash/orders-dash.component';
import { PromoCodeComponent } from '../menucomponents/promo-code/promo-code.component';
import { PromoCodeFormComponent } from '../menucomponents/promo-code-form/promo-code-form.component';
import { PromoCodeReportComponent } from '../menucomponents/promo-code-report/promo-code-report.component';
import { AddQuickGuideComponent } from '../menucomponents/add-quick-guide/add-quick-guide.component';
import { VitalPatientReportComponent } from '../menucomponents/vital-patient-report/vital-patient-report.component';
import { VitalpromocodeReportComponent } from '../menucomponents/vitalpromocode-report/vitalpromocode-report.component';


const routes: Routes = [
  { path: '', component: MenusComponent },
  { path: 'ReportDeutilisation', component: ReportDeutilisationComponent, canActivate: [AuthenticationGuard] },
  { path: 'SupportRegistration', component: SupportRegistrationComponent, canActivate: [AuthenticationGuard] },
  { path: 'RoleMenumapping', component: RoleMenumappingComponent, canActivate: [AuthenticationGuard] },
  { path: 'RoleMenumapping/:id', component: RoleMenumappingComponent, canActivate: [AuthenticationGuard] },
  { path: 'UserRoleMapping', component: UserRoleMappingComponent, canActivate: [AuthenticationGuard] },
  { path: 'SendMails', component: SendMailsComponent, canActivate: [AuthenticationGuard] },
  { path: 'SendSms', component: SendSmsComponent, canActivate: [AuthenticationGuard] },
  { path: 'EmailDashboard', component: EmailDashboardComponent, canActivate: [AuthenticationGuard] },
  { path: 'SmsDashboard', component: SmsDashboardComponent, canActivate: [AuthenticationGuard] },
  { path: 'FAQ', component: FAQComponent, canActivate: [AuthenticationGuard] },
  { path: 'QuickerGuide', component: QuickerGuideComponent, canActivate: [AuthenticationGuard] },
  { path: 'Announcements', component: AnnouncementsComponent, canActivate: [AuthenticationGuard] },
  { path: 'RegisteredPatients', component: RegisteredPatientsComponent, canActivate: [AuthenticationGuard] },
  { path: 'PatientWallet', component: PatientWalletComponent, canActivate: [AuthenticationGuard] },
  { path: 'PatientInvitations', component: PatientInvitationsComponent, canActivate: [AuthenticationGuard] },
  { path: 'InvitationReport', component: InvitationReportComponent, canActivate: [AuthenticationGuard] },
  { path: 'PatientHistory', component: PatientHistoryComponent, canActivate: [AuthenticationGuard] },
  { path: 'Invitationmaster', component: InvitationmasterComponent, canActivate: [AuthenticationGuard] },
  { path: 'DoctorReport', component: DoctorReportComponent, canActivate: [AuthenticationGuard] },
  { path: 'ImportPatients', component: ImportPatientsComponent, canActivate: [AuthenticationGuard] },
  { path: 'PatientReport', component: PatientReportComponent, canActivate: [AuthenticationGuard] },
  { path: 'SupportRegistrationDetails', component: SupportRegistrationDetailsComponent, canActivate: [AuthenticationGuard] },
  { path: 'SupportRegistrationDetails/:id', component: SupportRegistrationDetailsComponent, canActivate: [AuthenticationGuard] },
  { path: 'RoleMenumappingDetails', component: RoleMenumappingDetailsComponent, canActivate: [AuthenticationGuard] },
  { path: 'UserRoleMappingDetails', component: UserRoleMappingDetailsComponent, canActivate: [AuthenticationGuard] },
  { path: 'UserRoleMappingDetails/:id', component: UserRoleMappingDetailsComponent, canActivate: [AuthenticationGuard] },
  { path: 'FAQDetails', component: FAQDetailsComponent, canActivate: [AuthenticationGuard] },
  { path: 'FAQDetails/:id', component: FAQDetailsComponent, canActivate: [AuthenticationGuard] },
  { path: 'QuickerguideDetails', component: QuickerguideDetailsComponent, canActivate: [AuthenticationGuard] },
  { path: 'QuickerguideDetails/:id', component: QuickerguideDetailsComponent, canActivate: [AuthenticationGuard] },
  { path: 'Announcementdetails', component: AnnouncementdetailsComponent, canActivate: [AuthenticationGuard] },
  { path: 'Announcementdetails/:id', component: AnnouncementdetailsComponent, canActivate: [AuthenticationGuard] },
  { path: 'InvitationMasterDetails', component: InvitationMasterDetailsComponent, canActivate: [AuthenticationGuard] },
  { path: 'MergePatientData', component: MergePatientDataComponent, canActivate: [AuthenticationGuard] },
  { path: 'FAQnew', component: FAQnewComponent, canActivate: [AuthenticationGuard] },
  { path: 'QuickGuideNew', component: QuickGuideNewComponent, canActivate: [AuthenticationGuard] },
  { path: 'DoctorAvailableReport', component: DoctorAvailableReportComponent, canActivate: [AuthenticationGuard] },
  { path: 'Smslogs', component: SmslogsComponent, canActivate: [AuthenticationGuard] },
  { path: 'NurseAvilability', component: NurseAvilabilityreportComponent, canActivate: [AuthenticationGuard] },
  { path: 'Physioavailability', component: PhysioavailabilityComponent, canActivate: [AuthenticationGuard] },
  { path: 'MidwifeAvailability', component: MidwifeAvailabilityComponent, canActivate: [AuthenticationGuard] },
  { path: 'Category', component: CategoryComponent, canActivate: [AuthenticationGuard] },
  { path: 'Category/:id', component: CategoryComponent, canActivate: [AuthenticationGuard] },
  { path: 'CategoryDash', component: CategorydashComponent, canActivate: [AuthenticationGuard] },

  { path: 'SubCategory', component: SubCategoryComponent, canActivate: [AuthenticationGuard] },
  { path: 'SubCategory/:id', component: SubCategoryComponent, canActivate: [AuthenticationGuard] },
  { path: 'SubCategorydash', component: SubCategorydashComponent, canActivate: [AuthenticationGuard] },
  { path: 'Products', component: ProductsComponent, canActivate: [AuthenticationGuard] },
  { path: 'Products/:id', component: ProductsComponent, canActivate: [AuthenticationGuard] },
  { path: 'Productsdash', component: ProductsdashComponent, canActivate: [AuthenticationGuard] },
  { path: 'InventoryDash', component: InventoryDashComponent, canActivate: [AuthenticationGuard] },
  { path: 'OrdersDash', component: OrdersDashComponent, canActivate: [AuthenticationGuard] },
  { path: 'promoCode', component: PromoCodeComponent, canActivate: [AuthenticationGuard] },
  { path: 'promoCodeForm', component: PromoCodeFormComponent, canActivate: [AuthenticationGuard] },
  { path: 'promoCodeForm/:id', component: PromoCodeFormComponent, canActivate: [AuthenticationGuard] },
  { path: 'promoCodeReport', component: PromoCodeReportComponent, canActivate: [AuthenticationGuard] },
  { path: 'AddQuickGuide', component: AddQuickGuideComponent, canActivate: [AuthenticationGuard] },
  { path: 'VitalPatientReport', component: VitalPatientReportComponent, canActivate: [AuthenticationGuard] },
  { path: 'VitalsPromoCodeReport', component: VitalpromocodeReportComponent, canActivate: [AuthenticationGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusRoutingModule { }
