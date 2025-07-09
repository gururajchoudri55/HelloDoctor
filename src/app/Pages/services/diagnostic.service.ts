import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticService {

  private host = environment.API_URL;
  private url: string = '';

  constructor(private http: HttpClient) { }

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


  public GetDiagnosticAppointmentsByApprovedReportsWeb(sdate: any, edate: any, lid: any) {

    return this.http.get<any[]>(this.host + "/Master/GetDiagnosticAppointmentsByApprovedReportsWeb?StartDate=" + sdate +
      "&EndDate=" + edate + "&LanguageID=" + lid);
    return this.http.get(this.url);
  }

  public GetDiagnosticAppointmentsByApprovedReports(diaid: any, sdate: any, enddate: any, lid: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDiagnosticAppointmentsByApprovedReports?DiagnosticCenterID=' + diaid + '&StartDate=' + sdate + '&EndDate=' + enddate + '&LanguageID=' + lid);
  }

  public GetDiagnosticForAdminByLanguageID(did: any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDiagnosticForAdminByLanguageID?LanguageID=' + did);
  }

  public GetDianosticAppointments_PaymentsReport(sdate: any, edate: any, lid: any) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetDianosticAppointments_PaymentsReport?StartDate=' + sdate + '&EndDate=' + edate + '&LanguageID=' + lid);
  }
  public GetDiagnosticCenterTestsForDash(lid: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDiagnosticCenterTestsForDash?LanguageID=' + lid);
  }

  public DeleteDiagnosticCenterTestsForDash(id: any) {

    return this.http.get<any[]>(this.host + '/Doctor/DeleteDiagnosticCenterTestsForDash?ID=' + id);
  }

  public GetDiagnosticOfferByDiagnosticID(diagnosticid: any) {
    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticOfferByDiagnosticID?DiagnosticCenterID=' + diagnosticid);
  }

  public DeleteDoctorRegistration(id: any) {
    return this.http.get<any[]>(this.host + '/Doctor/DeleteDoctorRegistration?ID=' + id);
  }

  public DeleteDiagnosticOffer(id: any) {

    return this.http.get<any[]>(this.host + '/Diagnostic/DeleteDiagnosticOffer?OfferID=' + id);
  }

  public GetDiagnosticPaymentLinkMaster(DID: any) {
    return this.http.get<any[]>(this.host + '/Master/GetDiagnosticPaymentLinkMaster?DiagnosticID=' + DID);
  }

  public DeleteDiagnosticPaymentLinkMaster(id: any) {

    return this.http.get<any[]>(this.host + '/Master/DeleteDiagnosticPaymentLinkMaster?ID=' + id);
  }

  public InsertDiagnosticPaymentLinkMaster(data: any) {
    this.url = this.host + '/Master/InsertDiagnosticPaymentLinkMaster';
    return this.http.post(this.url, data)
  }
  public UpdateDiagnosticPaymentLinkMaster(data: any) {
    this.url = this.host + '/Master/UpdateDiagnosticPaymentLinkMaster';
    return this.http.post(this.url, data)
  }


  public GetMyTeam(did: any) {
    return this.http.get<any[]>(this.host + '/Master/GetMyTeam?DiagnosticID=' + did);
  }


  public GetDiagnosticAppointmentsByUsersReport(id: any, sdate: any, edate: any, lid: any) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticAppointmentsByUsersReport?DiagnosticCenterID=' + id + '&SDate=' + sdate + '&EDate=' + edate + '&LanguageID=' + lid);
  }


  public GetSupportForWeb(lid: any, userid: any, typeid: any, sdate: any, edate: any) {
    return this.http.get<any[]>(this.host + '/Doctor/GetSupportForWeb?LanguageID=' + lid + '&UserID=' + userid + '&TypeID=' + typeid + '&Sdate=' + sdate + '&Edate=' + edate);
  }

  public AllFilesUploads(files: any, foldername: any) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      
      formdata.append('file_upload', files[i], files[i].name);
    }
    this.url = this.host + '/Doctor/AllFilesUploads?FolderName=' + foldername;
    return this.http.post(this.url, formdata);
  }

  public InsertSupportForWeb1(data: any) {
    this.url = this.host + '/Doctor/InsertSupportForWeb1';
    return this.http.post(this.url, data)
  }

  public strongpassword(input: any) {

    var passworddetails = /^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,15})$/;
    return passworddetails.test(input);

  }

  public UpdateDiagnosticCenterAdminRegistrationWeb(data: any) {
    this.url = this.host + '/Diagnostic/UpdateDiagnosticCenterAdminRegistrationWeb';
    return this.http.post(this.url, data)
  }

  public GetDiagnosticLoginForDash(lid: any) {
    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticLoginForDash?LanguageID=' + lid);
  }

  public DeleteMyTeam(id: any, typeid: any) {

    return this.http.get<any[]>(this.host + '/Master/DeleteMyTeam?ID=' + id + '&TypeID=' + typeid);
  }
  public UpdateMyTeam(data: any) {
    this.url = this.host + '/Master/UpdateMyTeam';
    return this.http.post(this.url, data)
  }

  public InsertMyTeam(data: any) {
    this.url = this.host + '/Master/InsertMyTeam';
    return this.http.post(this.url, data)
  }

  public GetDiagnosticReceptionistLogin(did: any) {

    return this.http.get<any[]>(this.host + '/Master/GetDiagnosticReceptionistLogin?DiagnosticID=' + did);
  }
  public InsertDiagnosticReceptionistLogin(data: any) {
    this.url = this.host + '/Master/InsertDiagnosticReceptionistLogin';
    return this.http.post(this.url, data)
  }

  public UpdateDiagnosticReceptionistLogin(data: any) {
    this.url = this.host + '/Master/UpdateDiagnosticReceptionistLogin';
    return this.http.post(this.url, data)
  }

  public DeleteDiagnosticReceptionistLogin(id: any, typeid: any) {

    return this.http.get<any[]>(this.host + '/Master/DeleteDiagnosticReceptionistLogin?ID=' + id + '&TypeID=' + typeid);
  }

  public GetDiagnosticAppointmentsByDiagnosticID(id: any, sdate: any, edate: any, lid: any) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticAppointmentsByDiagnosticID?DiagnosticCenterID=' + id + '&SDate=' + sdate + '&EDate=' + edate + '&LanguageID=' + lid);
  }

  public UpdateDiagnosticAppointments(id: any) {

    return this.http.get<any[]>(this.host + '/Diagnostic/UpdateDiagnosticAppointments?AppointmentID=' + id);
  }

  public UpdateDiagnosticAppointmentsReasonForCancel(data: any) {

    this.url = this.host + '/Pharmacy/UpdateDiagnosticAppointmentsReasonForCancel';
    return this.http.post(this.url, data)
  }

  public UpdateDiagnosticAppointmentsNotVisitedBit(id: any) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateDiagnosticAppointmentsNotVisitedBit?ID=' + id);
  }

  public GetMyTeamAssainOrders(id: any) {
    return this.http.get<any[]>(this.host + '/Diagnostic/GetMyTeamAssainOrders?DiagnosticID=' + id);
  }

  public InsertDiagnostic_HomeSampleOrders(data: any) {
    this.url = this.host + '/Diagnostic/InsertDiagnostic_HomeSampleOrders';
    return this.http.post(this.url, data)
  }
  public InsertPatient_DiagnosticUploads(data: any) {
    ;
    this.url = this.host + '/Admin/InsertPatient_DiagnosticUploads';
    return this.http.post(this.url, data)
  }

  public GetDiagnosticTestsByAppointmentIDWeb(languageid: any, diaid: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDiagnosticTestsByAppointmentIDWeb?LanguageID=' + languageid + '&DiagnosticAppointmentsID=' + diaid);
  }
  public UpdateDiagnosticBookedTests(data: any) {
    this.url = this.host + '/Diagnostic/UpdateDiagnosticBookedTests';
    return this.http.post(this.url, data)
  }

  public GetDiagnosticPackagesByAppointmentIDWeb(languageid: any, diaid: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDiagnosticPackagesByAppointmentIDWeb?LanguageID=' + languageid + '&DiagnosticAppointmentsID=' + diaid);
  }

  public GetDiagnosticAppointmentPhotos(diappid: any) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticAppointmentPhotos?DiagAppID=' + diappid);
  }

  public InsertDiagnosticCenterOffers(data: any) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticCenterOffers';
    return this.http.post(this.url, data)
  }

  public GetDiagnosticTestMaster() {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticTestMaster');
  }

  public InsertDiagnosticCenterOfferPhotos(data: any) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticCenterOfferPhotos';
    return this.http.post(this.url, data)
  }

  public UpdateDiagnosticCenterOffers(data: any) {
    this.url = this.host + '/Diagnostic/UpdateDiagnosticCenterOffers';
    return this.http.post(this.url, data)
  }

  public UpdateDiagnosticCenterOfferPhotos(data: any) {
    this.url = this.host + '/Diagnostic/UpdateDiagnosticCenterOfferPhotos';
    return this.http.post(this.url, data)
  }

  public UpdateDiagnosticAppointmentsByType(diappid: any, amount: any) {

    return this.http.get<any[]>(this.host + '/Diagnostic/UpdateDiagnosticAppointmentsByType?AppointmentID=' + diappid + '&Amount=' + amount);
  }

  public GetDiagnosticpatients(diacenterid: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDiagnosticpatients?DiagnosticCenterID=' + diacenterid);
  }

  public GetDayID(day: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDayID?Day=' + day);
  }


  public GetDiagnosticSlotsWeb(did: any, date: any, timeid: any, dayid: any) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticSlotsWeb?DiagnosticCenterID=' + did + '&Date=' + date + '&TimeID=' + timeid + '&DayID=' + dayid);
  }

  public GetPatientRegistrationDetails() {

    return this.http.get<any[]>(this.host + '/Doctor/GetPatientRegistrationDetails');
  }

  public InsertDiagnosticAppointments(data: any) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticAppointments';
    return this.http.post(this.url, data)
  }

  public InsertDiagnosticBookedTests(data: any) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticBookedTests';
    return this.http.post(this.url, data)
  }
  public GetDiagnosticCenterTestsByID(did: any, lid: any) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetDiagnosticCenterTestsByID?ID=' + did + '&LanguageID=' + lid);
  }

  public GetDiagnosticPackagesByIDMob(did: any, lid: any) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetDiagnosticPackagesByIDMob?DiagnosticCenterID=' + did + '&LanguageID=' + lid);
  }

  public GetPatientDiagnosticsReportsByAppointmentID(aid: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetPatientDiagnosticsReportsByAppointmentID?AppointmentID=' + aid);
  }

  public InserDiagnostic_ChatMaster(data: any) {
    this.url = this.host + '/Diagnostic/InserDiagnostic_ChatMaster';
    return this.http.post(this.url, data)
  }

  public GetDiagnosticChatDetailsWeb(chatid: any) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticChatDetailsWeb?ChatID=' + chatid);
  }
  public GetServerDateAndTime() {

    return this.http.get<any[]>(this.host + '/Doctor/GetServerDateAndTime');
  }


  public InsertDiagnostic_ChatDetails(data: any) {
    this.url = this.host + '/Diagnostic/InsertDiagnostic_ChatDetails';
    return this.http.post(this.url, data)
  }

  public GetCountryCodeMasterWeb() {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetCountryCodeMasterWeb"
    );
  }
}
