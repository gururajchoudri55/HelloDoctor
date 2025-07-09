import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenusRoutingModule } from './menus-routing.module';
import { MenusComponent } from './menus.component';
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
import { ReportDeutilisationComponent } from '../menucomponents/report-deutilisation/report-deutilisation.component';
import { SharedModule } from '../../SharedModule/shared/shared.module';
import {  BsDatepickerModule, BsDatepickerConfig,BsLocaleService  } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
defineLocale('fr', frLocale);
import { FAQnewComponent } from '../menucomponents/faqnew/faqnew.component';
import { QuickGuideNewComponent } from '../menucomponents/quick-guide-new/quick-guide-new.component';
import { DoctorAvailableReportComponent } from '../menucomponents/doctor-available-report/doctor-available-report.component';
import { SmslogsComponent } from '../menucomponents/smslogs/smslogs.component';
import { NurseAvilabilityreportComponent } from '../nurse-avilabilityreport/nurse-avilabilityreport.component';
import { PhysioavailabilityComponent } from '../menucomponents/physioavailability/physioavailability.component';
import { MidwifeAvailabilityComponent } from '../menucomponents/midwife-availability/midwife-availability.component';
import { CategoryComponent } from '../../Ecommerce/category/category.component';
import { CategorydashComponent } from '../../Ecommerce/categorydash/categorydash.component';
import { SubCategoryComponent } from '../../Ecommerce/sub-category/sub-category.component';
import { ProductsdashComponent } from '../../Ecommerce/productsdash/productsdash.component';
import { ProductsComponent } from '../../Ecommerce/products/products.component';
import { SubCategorydashComponent } from '../../Ecommerce/sub-categorydash/sub-categorydash.component';
import { InventoryDashComponent } from '../../Ecommerce/inventory-dash/inventory-dash.component';
import { OrdersDashComponent } from '../../Ecommerce/orders-dash/orders-dash.component';
import { PromoCodeComponent } from '../menucomponents/promo-code/promo-code.component';
import { PromoCodeFormComponent } from '../menucomponents/promo-code-form/promo-code-form.component';
import { PromoCodeReportComponent } from '../menucomponents/promo-code-report/promo-code-report.component';
import { AddQuickGuideComponent } from '../menucomponents/add-quick-guide/add-quick-guide.component';
import { VitalPatientReportComponent } from '../menucomponents/vital-patient-report/vital-patient-report.component';
import { VitalpromocodeReportComponent } from '../menucomponents/vitalpromocode-report/vitalpromocode-report.component';
@NgModule({
  declarations: [
    MenusComponent,
    ReportDeutilisationComponent,
    SupportRegistrationComponent,
    MergePatientDataComponent,
    RoleMenumappingComponent,
    UserRoleMappingComponent,
    SendMailsComponent,
    EmailDashboardComponent,
    SendSmsComponent,
    SmsDashboardComponent,
    FAQComponent,
    QuickerGuideComponent,
    AnnouncementsComponent,
    RegisteredPatientsComponent,
    PatientWalletComponent,
    PatientInvitationsComponent,
    InvitationReportComponent,
    PatientHistoryComponent,
    InvitationmasterComponent,
    DoctorReportComponent,
    PatientReportComponent,
    ImportPatientsComponent,
    SupportRegistrationDetailsComponent,
    RoleMenumappingDetailsComponent,
    UserRoleMappingDetailsComponent,
    FAQDetailsComponent,
    QuickerguideDetailsComponent,
    AnnouncementdetailsComponent,
    InvitationMasterDetailsComponent,
    FAQnewComponent,
    QuickGuideNewComponent,
    DoctorAvailableReportComponent,
   SmslogsComponent,
   NurseAvilabilityreportComponent,
   PhysioavailabilityComponent,
   MidwifeAvailabilityComponent,
   CategoryComponent,
   CategorydashComponent,
   SubCategoryComponent,
   SubCategorydashComponent,
   ProductsComponent,
   ProductsdashComponent,
   InventoryDashComponent,
   OrdersDashComponent,
   PromoCodeComponent,
   PromoCodeFormComponent,
   PromoCodeReportComponent,
   AddQuickGuideComponent,
   PromoCodeReportComponent,
   VitalPatientReportComponent,
   VitalpromocodeReportComponent

  ],
  imports: [
    CommonModule,
    MenusRoutingModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class MenusModule { }
