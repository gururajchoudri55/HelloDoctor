import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NurseService {

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


  public GetSupportForWeb(lid: any, userid: any, typeid: any, sdate: any, edate: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetSupportForWeb?LanguageID=' + lid + '&UserID=' + userid + '&TypeID=' + typeid + '&Sdate=' + sdate + '&Edate=' + edate);
  }


  public GetNotifications_NPMWeb(userid: any, sdate: any, edate: any, typeid: any, lid: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetNotifications_NPMWeb?UserID=' + userid + '&Sdate=' + sdate + '&Edate=' + edate + '&TypeID=' + typeid + '&LanguageID=' + lid);
  }

  public GetBook_Nurse_AppointmentForWeb(sdate: any, edate: any, lid: any) {

    return this.http.get<any[]>(this.host + "/Master/GetBook_Nurse_AppointmentForWeb?SDate=" + sdate + "&EDate=" + edate + "&LanguageID=" + lid);
    return this.http.get(this.url);
  }

  public GetBook_Nurse_AppointmentReports(nurseid: any, sdate: any, edate: any, lid: any) {

    return this.http.get<any[]>(this.host + '/Admin/GetBook_Nurse_AppointmentReports?NurseID=' + nurseid + '&SDate=' + sdate + '&EDate=' + edate + '&LanguageID=' + lid);
  }

  public GetHomeCareDistinctPatientID(lid: any) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetHomeCareDistinctPatientID?LanguageID=' + lid);
  }

  public GetNurseCommissionDeatailsAdminRevenueByNurseID(sdate: any, edate: any, docid: any) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetNurseCommissionDeatailsAdminRevenueByNurseID?Sdate=" + sdate + '&Edate=' + edate + '&NurseID=' + docid
    );
  }

  public GetPatientDetails(id: any, lid: any) {

    return this.http.get<any[]>(this.host + '/PatientRegistration/GetPatientDetails?ID=' + id + '&LanguageID=' + lid);
  }

  public GetAllHomeCareSoap(pid: any, lid: any) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetAllHomeCareSoap?PatientID=' + pid + '&LanguageID=' + lid);
  }

  public GetHomeCaeeSoapNotesByID(id: any, lid: any) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetHomeCaeeSoapNotesByID?ID=' + id + '&LanguageID=' + lid);
  }
  public GetNurseLoginAdmin(lid: any) {

    return this.http.get<any[]>(this.host + '/Admin/GetNurseLoginAdmin?LanguageID=' + lid);
  }

  public strongpassword(input: any) {

    var passworddetails = /^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,15})$/;
    return passworddetails.test(input);

  }
  public UpdateNurseLogin(data: any) {
    this.url = this.host + '/Admin/UpdateNurseLogin';
    return this.http.post(this.url, data)
  }


  public GetBook_Nurse_Appointment(id: any, sdate: any, edate: any, lid: any) {

    return this.http.get<any[]>(this.host + '/Admin/GetBook_Nurse_Appointment?NurseID=' + id + '&SDate=' + sdate + '&EDate=' + edate + '&LanguageID=' + lid);
  }

  public UpdateBook_Nurse_AppointmentAcceptedBit(id: any) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateBook_Nurse_AppointmentAcceptedBit?ID=' + id);
  }
  public UpdateBookAppointmentReasonForCancel(data: any) {

    this.url = this.host + '/Pharmacy/UpdateBookAppointmentReasonForCancel';
    return this.http.post(this.url, data)
  }

  public UpdateBook_Nurse_AppointmentReasonForCancelBit(data: any) {
    this.url = this.host + '/Doctor/UpdateBook_Nurse_AppointmentReasonForCancelBit';
    return this.http.post(this.url, data)
  }

  public GetBookAppointment_NurseServices(id: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetBookAppointment_NurseServices?AppointmtntID=' + id);
  }

  public UpdateBook_Nurse_AppointmentVisitedBit(id: any) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateBook_Nurse_AppointmentVisitedBit?ID=' + id);
  }
  public UpdateBook_Nurse_AppointmentNotVisitedBit(aid: any) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateBook_Nurse_AppointmentNotVisitedBit?AppointmentID=' + aid);
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

  public DoctorReports(files: any, foldername: any) {
    
    let formdata: FormData = new FormData();
    formdata.append('file_upload', files, files.name);
    
    this.url = this.host + '/Doctor/UploadPatientDocuments?FolderName=' + foldername;
    return this.http.post(this.url, formdata);
  }

  public UpdateBook_Nurse_AppointmentPdfUrl(data: any) {

    this.url = this.host + '/Doctor/UpdateBook_Nurse_AppointmentPdfUrl';
    return this.http.post(this.url, data)
  }

  public sendemail(data: any) {
    
    this.url = this.host + '/Doctor/sendemail';
    return this.http.post(this.url, data);
    
  }

  public UpdateBook_Midwives_Appointment(data: any) {

    this.url = this.host + '/Doctor/UpdateBook_Midwives_Appointment';
    return this.http.post(this.url, data)
  }

  public UpdateBook_Physio_AppointmentPdfUrl(data: any) {

    this.url = this.host + '/Doctor/UpdateBook_Physio_AppointmentPdfUrl';
    return this.http.post(this.url, data)
  }

  public UpdateAmountReceived(id: any, typeid: number) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateAmountReceived?ID=' + id + '&TypeID=' + typeid);
  }

  public UpdateRefundForHomeCare(id: any, typeId: number) {
    return this.http.get<any[]>(this.host + '/Doctor/UpdateRefundForHomeCare?ID=' + id + '&TypeID=' + typeId);
  }

}
