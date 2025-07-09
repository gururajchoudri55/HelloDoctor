import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class VideocallService {
  private host = environment.API_URL;
  private url: string = '';
  constructor(private http: HttpClient) { }


  public InsertBook_DoctorPatientBookedVideoConference(data: any) {

    this.url = this.host + '/Admin/InsertBook_DoctorPatientBookedVideoConference';
    return this.http.post(this.url, data)
  }
  public UpdateBook_DoctorPatientBookedVideoConference(data: any) {
    this.url = this.host + '/Admin/UpdateBook_DoctorPatientBookedVideoConference';
    return this.http.post(this.url, data)
  }

  public GetVideoStatus(id: any) {
    return this.http.get(this.host + '/Doctor/GetVideoStatus?AppID=' + id);
  }

  public GetBookAppointmentCompletedSession(id: any) {
    return this.http.get(this.host + '/Doctor/GetBookAppointmentCompletedSession?ID=' + id);
  }
  public UpdateAlertbit(aid: any) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateAlertbit?AppointmentID=' + aid);
  }
  public UpdateAlertBitsBack(aid: any) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateAlertBitsBack?AppointmentID=' + aid);
  }

  public GetBookAppointmentByPatientID(patientid: any, appid: any, lid: any) {
    return this.http.get<any[]>(this.host + '/PatientRegistration/GetBookAppointmentByPatientID?PatientID=' + patientid + '&AppointmentID=' + appid + '&LanguageID=' + lid);
  }
  public GetPatient_Illnessphotos(appid: any) {

    return this.http.get<any[]>(this.host + '/Admin/GetPatient_Illnessphotos?AppoitmentID=' + appid);
  }

  public GetPatient_IllnessVedioes(mid: any) {

    return this.http.get<any[]>(this.host + '/Admin/GetPatient_IllnessVedioes?AppointmentID=' + mid);
  }

  public GetPatient_DiagnosticUploadsByDoctorIDPatientID(docID: any, patID: any) {
    return this.http.get<any[]>(this.host + '/Diagnostic/GetPatient_DiagnosticUploadsByDoctorIDPatientID?DoctorID=' + docID + '&PatientID=' + patID);
  }

  public GetDoctor_ChatDetailsMobileWeb(chatid: any) {

    return this.http.get<any[]>(this.host + '/Admin/GetDoctor_ChatDetailsMobileWeb?ChatID=' + chatid);
  }

  // public GetDoctor_ChatDetailsMobileWeb(chatid: any) {

  //   return this.http.get<any[]>(this.host + '/Doctor/GetPatientVitalsByAppointmentID?ChatID=' + chatid);
  // }

  public GetPatientVitalsByAppID(id: any) {

    return this.http.get<any[]>(this.host + '/Admin/GetPatientVitalsByAppID?AppointmentID='+id );
  }

  public GetPatientReferalHistory(PatientId: any,LanguageID:any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorReferalsWeb?PatientId='+ PatientId + '&LanguageID=' + LanguageID);
  }
}
