import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private host = environment.API_URL;
  private url: string = '';

  constructor(private http: HttpClient) { }

  public GetProvidersAuditReport(id: any, sdate: any, edate: any) {
    
    return this.http.get<any[]>(this.host + '/Doctor/GetProvidersAuditReport?TypeID=' + id + '&Sdate=' + sdate + '&Edate=' + edate);
  }

  public GetDates(newDate: any) {
    var d = new Date(newDate),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    var date = month + "-" + day + "-" + year;
    return date = year + "-" + month + "-" + day;

  }

  public GetSupportRegistration(lid: any) {
    return this.http.get<any[]>(
      this.host + "/Doctor/GetSupportRegistration?LanguageID=" + lid
    );
  }

  public GetCountryMasterByLanguageID(lid: any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetCountryMasterByLanguageID?LanguageID=' + lid);
  }

  public GetRegionMasterWeb(id: any) {
    
    return this.http.get<any[]>(this.host + '/Doctor/GetRegionMasterWeb?CountryID=' + id);
  }

  public GetCityMasterBYIDandLanguageID(did: any, lid: any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetCityMasterBYIDandLanguageID?CountryID=' + did + '&LanguageID=' + lid);
  }

  public GetAreaMasterByCityIDAndLanguageID(did: any, lid: any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetAreaMasterByCityIDAndLanguageID?CityID=' + did + '&LanguageID=' + lid);
  }

  public InsertSupportRegistration(data: any) {
    this.url = this.host + '/Doctor/InsertSupportRegistration';
    return this.http.post(this.url, data)
  }

  public GetPatientRegistrationDetails() {

    return this.http.get<any[]>(this.host + '/Doctor/GetPatientRegistrationDetails');
  }


  public UpdatePatientRegistrationMobileNumber(data: any) {
    this.url = this.host + '/Doctor/UpdatePatientRegistrationMobileNumber';
    return this.http.post(this.url, data)
  }

  public GetUsers_RoleMapping(lid: any) {
    return this.http.get<any[]>(this.host + '/Doctor/GetUsers_RoleMapping?LanguageID=' + lid);
  }


  public DeleteUsers_RoleMapping(id: any) {
    return this.http.get<any[]>(this.host + '/Doctor/DeleteUsers_RoleMapping?ID=' + id);
  }

  public UpdateUsers_RoleMapping(data: any) {
    this.url = this.host + '/Doctor/UpdateUsers_RoleMapping';
    return this.http.post(this.url, data)
  }


  public GetPatientEmails(lid: any, sdate: any, edate: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetPatientEmails?LanguageID=' + lid + '&Sdate=' + sdate + '&Edate=' + edate);
  }


  public GetEmail_Attachments(lid: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetEmail_Attachments?ID=' + lid);
  }


  public GetPatient_Sms(lid: any, sdate: any, edate: any) {
    return this.http.get<any[]>(this.host + '/Doctor/GetPatient_Sms?LanguageID=' + lid + '&Sdate=' + sdate + '&Edate=' + edate);
  }

  public GetFrequentlyAskedQuestions(lid: any) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetFrequentlyAskedQuestions?LanguageID=" + lid
    );
  }

  public DeleteFrequentlyAskedQuestions(id: any) {
    return this.http.get<any[]>(
      this.host + "/Doctor/DeleteFrequentlyAskedQuestions?ID=" + id
    );
  }

  public GetFAQ_Attachments(faqid: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetFAQ_Attachments?FaqID=' + faqid);
  }

  public GetQuickGuide(lid: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetQuickGuide?LanguageID=' + lid);
  }

  public GetAnnouncements(sdate: any, edate: any, lid: any) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetAnnouncements?Sdate=" + sdate + '&Edate=' + edate + '&LanguageID=' + lid
    );
  }

  public DisableAnnouncements(id: any) {

    return this.http.get<any[]>(
      this.host + "/Doctor/DisableAnnouncements?ID=" + id
    );
  }

  public EnableAnnouncements(id: any) {

    return this.http.get<any[]>(
      this.host + "/Doctor/EnableAnnouncements?ID=" + id
    );
  }

  public GetPatientRegistration(sdate: any, edate: any, lid: any) {

    return this.http.get<any[]>(this.host + "/Master/GetPatientRegistration?Sdate=" + sdate + '&Edate=' + edate + '&LanguageID=' + lid);
  }

  public GetPatientWalletDetailsBySdateAndDate(sdate: any, edate: any, lid: any) {
    return this.http.get<any[]>(
      this.host + "/Doctor/GetPatientWalletDetailsBySdateAndDate?Sdate=" + sdate + '&Edate=' + edate + '&LanguageID=' + lid
    );
  }

  public DeletePatientRegistration(id: any) {

    return this.http.get<any[]>(
      this.host + "/Master/DeletePatientRegistration?ID=" + id
    );
  }

  public EnablePatientRegistration(id: any) {
    return this.http.get<any[]>(
      this.host + "/Master/EnablePatientRegistration?ID=" + id
    );
  }
  public DeleteAnnouncements(id: any) {

    return this.http.get<any[]>(
      this.host + "/Doctor/DeleteAnnouncements?ID=" + id
    );
  }

  public GetPatient_Referal_InvitationsWeb(id: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetPatient_Referal_InvitationsWeb?LanguageID=' + id);
  }


  public SendTwillioSMS(phoneno: any, msg: any) {
    return this.http.get<any[]>(this.host + '/Doctor/TelmaAPI?PhoneNumber=' + phoneno + '&Message=' + msg); 
   // return this.http.get<any[]>(this.host + '/Doctor/SendTwillioSMS?PhoneNumber=' + phoneno + '&Message=' + msg);
  }

  public GetPatient_Referal_InvitationsReports(lid: any) {

    return this.http.get<any[]>(this.host + '/Hospital/GetPatient_Referal_InvitationsReports?LanguageID=' + lid);
  }

  public GetBookAppointmentByReports(patientid: any, sdate: any, edate: any, lid: any) {

    return this.http.get<any[]>(this.host + '/Hospital/GetBookAppointmentByReports?PatientID=' + patientid + '&SDate=' + sdate + '&EDate=' + edate + '&LanguageID=' + lid);
  }


  public GetPatient_Invites_Master(id: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetPatient_Invites_Master?LanguageID=' + id);
  }

  public DeleteSupportRegistration(lid: any) {

    return this.http.get<any[]>(
      this.host + "/Doctor/DeleteSupportRegistration?ID=" + lid
    );
  }

  public GetImportPatients_Exceptions() {

    return this.http.get<any[]>(this.host + '/PatientRegistration/GetImportPatients_Exceptions');
  }


  public GetPatientRegistrationForSendEmailsWeb(lid: any) {
    return this.http.get<any[]>(this.host + '/Doctor/GetPatientRegistrationForSendEmailsWeb?LanguageID=' + lid);
  }
  public AllFilesUploads(files: any, foldername: any) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      
      formdata.append('file_upload', files[i], files[i].name);
    }
    this.url = this.host + '/Doctor/AllFilesUploads?FolderName=' + foldername;
    return this.http.post(this.url, formdata);
  }

  public GetPatientRegistrationForSendEmails(did: any) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetPatientRegistrationForSendEmails?LanguageID=' + did);
  }

  public DoctorIdentityProof(files: any) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.host + '/Doctor/IdentityUpload/', formdata);
  }

  public InsertAnnouncements(data: any) {
    this.url = this.host + '/Doctor/InsertAnnouncements';
    return this.http.post(this.url, data)
  }
  public GetAdmin_FrequntlyAskedQuestions(lid: any) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetAdmin_FrequntlyAskedQuestions?LanguageID=" + lid
    );
  }

  public InsertFrequentlyAskedQuestions(data: any) {
    this.url = this.host + '/Doctor/InsertFrequentlyAskedQuestions';
    return this.http.post(this.url, data)
  }
  public InsertFAQ_Attachments(data: any) {
    this.url = this.host + '/Doctor/InsertFAQ_Attachments';
    return this.http.post(this.url, data)
  }
  public UpdateFrequentlyAskedQuestions(data: any) {
    this.url = this.host + '/Doctor/UpdateFrequentlyAskedQuestions';
    return this.http.post(this.url, data)
  }

  public DeleteQuickGuide(id: any) {

    return this.http.get<any[]>(this.host + '/Doctor/DeleteQuickGuide?ID=' + id);
  }

  public GetTopicMaster() {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetTopicMaster"
    );
  }

  public UpdateQuickGuide(data: any) {
    this.url = this.host + '/Doctor/UpdateQuickGuide';
    return this.http.post(this.url, data)
  }

  public sendemail(data: any) {
    
    this.url = this.host + '/Doctor/sendemail';
    return this.http.post(this.url, data)
  }

  public InsertPatientEmails(data: any) {
    this.url = this.host + '/Doctor/InsertPatientEmails';
    return this.http.post(this.url, data)
  }

  public InsertEmail_Attachments(data: any) {
    this.url = this.host + '/Doctor/InsertEmail_Attachments';
    return this.http.post(this.url, data)
  }

  public insertPatient_Sms(data: any) {
    this.url = this.host + '/Doctor/insertPatient_Sms';
    return this.http.post(this.url, data)
  }

  public GetHospital_ClinicForAdminByAdmin(did: any) {

    return this.http.get<any[]>(this.host + '/Hospital/GetHospital_ClinicForAdminByAdmin?LanguageID=' + did);
  }

  public GetDoctorForAdminByLanguageID(did: any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDoctorForAdminByLanguageID?LanguageID=' + did);
  }

  public InsertpatientImportExcel(data: any) {
    this.url = this.host + '/PatientRegistration/InsertpatientImportExcel';
    return this.http.post(this.url, data)

  }


  public InsertpatientImportExcel1(data: any) {
    this.url = this.host + '/PatientRegistration/InsertPatientRegistrationForExcelNew';
    return this.http.post(this.url, data)

  }

  public UpdatePatientWalletDetails(data: any) {
    this.url = this.host + '/Doctor/UpdatePatientWalletDetails';
    return this.http.post(this.url, data)
  }

  public GetServerDateAndTime() {

    return this.http.get<any[]>(this.host + '/Doctor/GetServerDateAndTime');
  }
  public InsertPatient_WalletLog(data: any) {
    this.url = this.host + '/Doctor/InsertPatient_WalletLog';
    return this.http.post(this.url, data)
  }
  public UpdateAnnouncements(data: any) {
    this.url = this.host + '/Doctor/UpdateAnnouncements';
    return this.http.post(this.url, data)
  }


  public GetDoctorsTimeWiseWeb(dayid: any, AppointmentDate: any, AppointmentTypeID: any, TypeID: any, DepartmentID: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorsTimeWiseWeb?DayID=' + dayid + '&AppointmentDate=' + AppointmentDate + '&AppointmentTypeID=' + AppointmentTypeID + '&TypeID=' + TypeID + '&DepartmentID=' + DepartmentID);
  }


  public GetDayID(day: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDayID?Day=' + day);
  }


  public GetinwiSms_Logs() {

    return this.http.get<any[]>(this.host + '/Doctor/GetinwiSms_Logs');
  }

  public GetTwillioSms_Logs() {

    return this.http.get<any[]>(this.host + '/Doctor/GetTwillioSms_Logs');
  }

  public GetNurseTimeWiseWeb(dayid: any, AppointmentDate: any, AppointmentTypeID: any, TypeID: any, DepartmentID: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetNurseTimeWiseWeb?DayID=' + dayid + '&AppointmentDate=' + AppointmentDate + '&AppointmentTypeID=' + AppointmentTypeID + '&TypeID=' + TypeID + '&DepartmentID=' + DepartmentID);
  }


  public GetPhysioTimeWiseWeb(dayid: any, AppointmentDate: any, AppointmentTypeID: any, TypeID: any, DepartmentID: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetPhysioTimeWiseWeb?DayID=' + dayid + '&AppointmentDate=' + AppointmentDate + '&AppointmentTypeID=' + AppointmentTypeID + '&TypeID=' + TypeID + '&DepartmentID=' + DepartmentID);
  }

  public GetMidwifeTimeWiseWeb(dayid: any, AppointmentDate: any, AppointmentTypeID: any, TypeID: any, DepartmentID: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetMidwifeTimeWiseWeb?DayID=' + dayid + '&AppointmentDate=' + AppointmentDate + '&AppointmentTypeID=' + AppointmentTypeID + '&TypeID=' + TypeID + '&DepartmentID=' + DepartmentID);
  }


  public updatePatientMobileno(ID: any, MobileNumber: any, EmailID: any) {

    return this.http.get<any[]>(this.host + '/Doctor/updatePatientMobileno?ID=' + ID + '&MobileNumber=' + MobileNumber + '&EmailID=' + EmailID);
  }

  public Getcategoryfordashboard() {

    return this.http.get<any[]>(this.host + '/BookAppointment/GetItemCategory');
  }

  public DeleteCategory(id: any) {

    return this.http.get<any[]>(
      this.host + "/BookAppointment/DeleteItemCategory?ID=" + id
    );
  }

  public InsertCategoryItem(data: any) {

    this.url = this.host + '/BookAppointment/InsertItemCategory';
    return this.http.post(this.url, data)
  }

  public GetCategoryById(CategoryId: any) {
    return this.http.get(this.host + '/BookAppointment/GetItemCategoryByID?ID=' + CategoryId);
  }



  public UpdateCategory(data: any) {
    return this.http.post<any>(this.host + '/BookAppointment/UpdateItemCategory', data);
  }


  public GetSubcategory() {

    return this.http.get<any[]>(
      this.host + "/Admin/GetSubcategory"
    );
  }

  public GetItemCategory() {

    this.url = this.host + '/BookAppointment/GetItemCategory';
    return this.http.get(this.url)
  }


  public GetItems() {

    this.url = this.host + '/BookAppointment/GetItems';
    return this.http.get(this.url)
  }

  public GetInventory() {

    return this.http.get<any[]>(
      this.host + "/Admin/GetInventory"
    );
  }
  public DeleteSubcategory(id: any) {

    return this.http.get<any[]>(
      this.host + "/Admin/DeleteSubcategory?ID=" + id
    );
  }



  public InsertSubcategory(data: any) {
    this.url = this.host + '/Admin/InsertSubcategory';
    return this.http.post(this.url, data)
  }


  public UpdateSubcategory(data: any) {

    this.url = this.host + '/BookAppointment/UpdateSubcategory';
    return this.http.post(this.url, data)
  }

  public deleteItems(ID: any) {

    this.url = this.host + '/BookAppointment/DeleteProduct?ID=' + ID;
    return this.http.get(this.url)
  }

  public InsertItems(data: any) {
    this.url = this.host + '/Admin/InsertItems';
    return this.http.post(this.url, data)
  }


  public insertItems(entity: any) {

    this.url = this.host + '/BookAppointment/InsertProduct';
    return this.http.post(this.url, entity)
  }

  public GetsubcategoryByCategoryID(ID: any) {

    this.url = this.host + '/BookAppointment/GetsubcategoryByCategoryID?ItemCategoryID=' + ID;
    return this.http.get(this.url)
  }
  public Insert_ItemPhotos(data: any) {

    this.url = this.host + '/BookAppointment/Insert_ItemPhotos';
    return this.http.post(this.url, data)
  }

  public UpdateProductImages(data: any) {
    this.url = this.host + '/BookAppointment/UpdateProductImages';
    return this.http.post(this.url, data)
  }

  public UpdateProducts(data: any) {

    this.url = this.host + '/Doctor/UpdateProducts';
    return this.http.post(this.url, data)
  }

  public GetProductsImagesByID(ID: any) {

    this.url = this.host + '/BookAppointment/GetProductsImagesByID?ID=' + ID;
    return this.http.get(this.url)
  }

  public DeleteInventory(diacenterid: any) {

    return this.http.get<any[]>(this.host + '/Doctor/DeleteInventory?ID=' + diacenterid);
  }

  public GetSalesPromoCodeRegistration() {
    return this.http.get<any[]>(this.host + '/Doctor/GetSalesPromoCodeRegistration');
  }

  public InsertSalesPromoCodeRegistration(data: any) {
    this.url = this.host + '/Doctor/InsertSalesPromoCodeRegistration/';
    return this.http.post(this.url, data)
  }

  public DeleteSalesPromoCodeRegistration(id: any) {
    return this.http.get<any[]>(this.host + '/Doctor/DeleteSalesPromoCodeRegistration?ID=' + id);
  }

  public UpdateSalesPromoCodeRegistration(data: any) {
    this.url = this.host + '/Doctor/UpdateSalesPromoCodeRegistration';
    return this.http.post(this.url, data)
  }

  public GetSalesPromoRegReport() {
    return this.http.get<any[]>(this.host + '/Doctor/GetSalesPromoRegReport');
  }

  sendSms(smsMobileNo: number, smsDesc: string) {
    let str=smsMobileNo.toString();
    if((str.substring (0, 4)) == '+212'){
      console.log("phoneno"+str.slice(3))
      str.slice(3);
      return this.http.get<any[]>("https://www.telma.net/sms_connect/sendsms/login?login=TERRA_INNOV&password=t3rR@_1Nn0V&msisdn_to="+str+"&body="+smsDesc+"&oadc=TERRA INNOV");
        }
        else{
          return this.http.get<any[]>(this.host + '/Doctor/SendTwillioSMS?PhoneNumber=' + str + '&Message=' + smsDesc);
        }
    
   // return this.http.get<any[]>(this.host + '/Doctor/SendTwillioSMS?PhoneNumber=' + smsMobileNo + '&Message=' + smsDesc)
  }

  public InsertChapterMaster(data: any) {
    this.url = this.host + '/Doctor/InsertChapterMaster';
    return this.http.post(this.url, data)
  }
  public InsertQuickGuide(data: any) {

    this.url = this.host + '/Doctor/InsertQuickGuide';
    return this.http.post(this.url, data)
  }
  public GetMenuRoleMappingTable(lid: any) {
    return this.http.get<any[]>(this.host + '/Doctor/GetMenuRoleMappingTable?LanguageID=' + lid);
  }
  public InsertMenuRoleMappingTable(data: any) {
    this.url = this.host + '/Doctor/InsertMenuRoleMappingTable';
    return this.http.post(this.url, data)
  }
  public EnableMenuRoleMappingTable(data: any) {
    this.url = this.host + '/Doctor/EnableMenuRoleMappingTable';
    return this.http.post(this.url, data)
  }
  public DisableMenuRoleMappingTable(data: any) {
    this.url = this.host + '/Doctor/DisableMenuRoleMappingTable';
    return this.http.post(this.url, data)
  }
  public DeleteMenuRoleMappingTable(roleid: any, menuid: any) {
    return this.http.get<any[]>(this.host + '/Doctor/DeleteMenuRoleMappingTable?RoleID=' + roleid + '&MenuID=' + menuid);
  }
  public DeleteMenuRoleMappingTableRow(id: any) {
    return this.http.get<any[]>(this.host + '/Doctor/DeleteMenuRoleMappingTableRow?ID=' + id);
  }
  public GetSubMenuMaster(lid: any, menuid: any) {
    return this.http.get<any[]>(this.host + '/Doctor/GetSubMenuMaster?LanguageID=' + lid + '&MenuID=' + menuid);
  }

  public GetMenuMaster(lid: any) {
    return this.http.get<any[]>(this.host + '/Doctor/GetMenuMaster?LanguageID=' + lid);
  }
  public GetRoleTypesMasterByAdminLogins(lid: any) {
    return this.http.get<any[]>(this.host + '/Doctor/GetRoleTypesMasterByAdminLogins?LanguageID=' + lid);
  }
  public GetPromoCodeReport() {
    return this.http.get<any[]>(this.host + '/Master/GetPromoCodeReport');
  }
  public GetPatientVitalsReportReport() {
    return this.http.get<any[]>(this.host + '/Master/GetPatientVitalsReportReport');
  }

}
