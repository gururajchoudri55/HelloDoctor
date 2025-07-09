import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhysioService {

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

  public GetBook_Physio_Appointment(id: any, sdate: any, edate: any, lid: any) {

    return this.http.get<any[]>(this.host + '/Admin/GetBook_Physio_Appointment?PhysioID=' + id + '&SDate=' + sdate + '&EDate=' + edate + '&LanguageID=' + lid);
  }

  public GetHomeCareDistinctPatientID(lid: any) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetHomeCareDistinctPatientID?LanguageID=' + lid);
  }
  public GetBook_Physio_AppointmentReports(physioid: any, sdate: any, edate: any, lid: any) {

    return this.http.get<any[]>(this.host + '/Admin/GetBook_Physio_AppointmentReports?PhysioID=' + physioid + '&SDate=' + sdate + '&EDate=' + edate + '&LanguageID=' + lid);
  }

  public GetPhysiotherapistLoginAdmin(lid: any) {

    return this.http.get<any[]>(this.host + '/Admin/GetPhysiotherapistLoginAdmin?LanguageID=' + lid);
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

  public UpdatePhysiotherapistLogin(data: any) {
    this.url = this.host + '/Admin/UpdatePhysiotherapistLogin';
    return this.http.post(this.url, data)
  }

  public GetDepartmentMasterByLanguageID(lid: any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDepartmentMasterByLanguageID?LanguageID=' + lid);
  }

  public GePhysiotherapyRegistrationByIDandLanguageID(did: any, lid: any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GePhysiotherapyRegistrationByIDandLanguageID?ID=' + did + '&LanguageID=' + lid);
  }

  public GetCountryMasterByLanguageID(lid: any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetCountryMasterByLanguageID?LanguageID=' + lid);
  }

  public GetCityMasterBYIDandLanguageID(did: any, lid: any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetCityMasterBYIDandLanguageID?CountryID=' + did + '&LanguageID=' + lid);
  }

  public GetAreaMasterByCityIDAndLanguageID(did: any, lid: any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetAreaMasterByCityIDAndLanguageID?CityID=' + did + '&LanguageID=' + lid);
  }

  public UpdatephysiotherapyRegistration(data: any) {

    this.url = this.host + '/Admin/UpdatephysiotherapyRegistration';
    return this.http.post(this.url, data)
  }

  public GetPhsyioTherapistCommissionDeatailsByPhysioID(sdate: any, edate: any, docid: any) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetPhsyioTherapistCommissionDeatailsByPhysioID?Sdate=" + sdate + '&Edate=' + edate + '&PhysiotherepistID=' + docid
    );
  }

  public UpdateBook_Physio_AppointmentAcceptedBit(id: any) {

    return this.http.get<any[]>(this.host + '/Admin/UpdateBook_Physio_AppointmentAcceptedBit?ID=' + id);
  }
  public UpdateBook_Physio_AppointmentReasonForCancel(data: any) {
    this.url = this.host + '/Admin/UpdateBook_Physio_AppointmentReasonForCancel';
    return this.http.post(this.url, data)
  }
  public GetBookAppointment_PhysioServices(id: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetBookAppointment_PhysioServices?AppointmtntID=' + id);
  }

  public UpdateBook_Physio_AppointmentIsVisitedBit(id: any) {

    return this.http.get<any[]>(this.host + '/Admin/UpdateBook_Physio_AppointmentIsVisitedBit?ID=' + id);
  }

  public UpdateBook_Physio_AppointmentNotVisitedBit(aid: any) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateBook_Physio_AppointmentNotVisitedBit?AppointmentID=' + aid);
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
