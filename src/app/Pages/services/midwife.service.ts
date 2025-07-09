import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MidwifeService {

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


  public GetBook_Book_Midwives_Appointment(midwiveid: any, sdate: any, edate: any, lid: any) {

    return this.http.get<any[]>(this.host + '/Admin/GetBook_Book_Midwives_Appointment?MidWivesID=' + midwiveid + '&SDate=' + sdate + '&EDate=' + edate + '&LanguageID=' + lid);
  }

  public GetBook_Book_Midwives_AppointmentReports(midwiveid: any, sdate: any, edate: any, lid: any) {

    return this.http.get<any[]>(this.host + '/Admin/GetBook_Book_Midwives_AppointmentReports?MidWivesID=' + midwiveid + '&SDate=' + sdate + '&EDate=' + edate + '&LanguageID=' + lid);
  }


  public GetMidWifeCommissionDeatailsByMidWifeID(sdate: any, edate: any, docid: any) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetMidWifeCommissionDeatailsByMidWifeID?Sdate=" + sdate + '&Edate=' + edate + '&MidwifeID=' + docid
    );
  }

  public GetMidWife_PatientPaymentCommissionByMidwifeID(sdate: any, edate: any, docid: any) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetMidWife_PatientPaymentCommissionByMidwifeID?Sdate=" + sdate + '&Edate=' + edate + '&MidwifeID=' + docid
    );
  }

  public GetBook_Book_Midwives_AppointmentForWeb(sdate: any, edate: any, lid: any) {
    return this.http.get<any[]>(this.host + "/Master/GetBook_Book_Midwives_AppointmentForWeb?SDate=" + sdate +
      "&EDate=" + edate + "&LanguageID=" + lid);
    return this.http.get(this.url);
  }

  public GetHospital_ClinicForAdminByAdmin(did: any) {

    return this.http.get<any[]>(this.host + '/Hospital/GetHospital_ClinicForAdminByAdmin?LanguageID=' + did);
  }
  public GetNotifications_NPMWeb(userid: any, sdate: any, edate: any, typeid: any, lid: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetNotifications_NPMWeb?UserID=' + userid + '&Sdate=' + sdate + '&Edate=' + edate + '&TypeID=' + typeid + '&LanguageID=' + lid);
  }
  public GetSupportForWeb(lid: any, userid: any, typeid: any, sdate: any, edate: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetSupportForWeb?LanguageID=' + lid + '&UserID=' + userid + '&TypeID=' + typeid + '&Sdate=' + sdate + '&Edate=' + edate);
  }

  public InsertSupportForWeb(data: any) {
    this.url = this.host + '/Doctor/InsertSupportForWeb';
    return this.http.post(this.url, data)
  }


  public AllFilesUploads(files: any, foldername: any) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      
      formdata.append('file_upload', files[i], files[i].name);
    }
    this.url = this.host + '/Doctor/AllFilesUploads?FolderName=' + foldername;
    return this.http.post(this.url, formdata);
  }

  public strongpassword(input: any) {

    var passworddetails = /^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,15})$/;
    return passworddetails.test(input);

  }

  public UpdateMidWivesLogin(data: any) {
    this.url = this.host + '/Admin/UpdateMidWivesLogin';
    return this.http.post(this.url, data)
  }
  public GetMidWivesLoginAdmin(lid: any) {

    return this.http.get<any[]>(this.host + '/Admin/GetMidWivesLoginAdmin?LanguageID=' + lid);
  }

  public UpdateBook_Midwives_AppointmentAcceptedBit(id: any) {

    return this.http.get<any[]>(this.host + '/Admin/UpdateBook_Midwives_AppointmentAcceptedBit?ID=' + id);
  }

  public UpdateBook_Midwives_AppointmentReasonForCancel(data: any) {
    this.url = this.host + '/Admin/UpdateBook_Midwives_AppointmentReasonForCancel';
    return this.http.post(this.url, data)
  }

  public GetBookAppointment_MidwifeServices(lid: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetBookAppointment_MidwifeServices?AppointmtntID=' + lid);
  }
  public UpdateBook_Midwives_AppointmentIsVisitedBit(id: any) {

    return this.http.get<any[]>(this.host + '/Admin/UpdateBook_Midwives_AppointmentIsVisitedBit?ID=' + id);
  }

  public UpdateBook_Midwives_AppointmentNotVisitedBit(aid: any) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateBook_Midwives_AppointmentNotVisitedBit?AppointmentID=' + aid);
  }

  public UploadPatientDocuments(files: any, foldername: any) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      
      formdata.append('file_upload', files[i], files[i].name);
    }
    this.url = this.host + '/Doctor/UploadPatientDocuments?FolderName=' + foldername;
    return this.http.post(this.url, formdata);
  }

  public InsertNPM_PatientSoapNotesWeb(data: any) {

    this.url = this.host + '/Doctor/InsertNPM_PatientSoapNotesWeb';
    return this.http.post(this.url, data)
  }
  public UpdateAmountReceived(id: any, typeid: number) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateAmountReceived?ID=' + id + '&TypeID=' + typeid);
  }

  public UpdateRefundForHomeCare(id: any, typeId: number) {
    return this.http.get<any[]>(this.host + '/Doctor/UpdateRefundForHomeCare?ID=' + id + '&TypeID=' + typeId);
  }

}
