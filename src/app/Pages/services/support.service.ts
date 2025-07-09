import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private host = environment.API_URL;
  private url: string = '';
  constructor(private http: HttpClient) { }


  public GetSupportForWebForSupportLogin(lid: any, sdate: any, edate: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetSupportForWebForSupportLogin?LanguageID=' + lid + '&Sdate=' + sdate + '&Edate=' + edate);
  }

  public UpdateSupportForWebAcceptedbit(id: any) {

    return this.http.get<any[]>(this.host + '/Doctor/UpdateSupportForWebAcceptedbit?ID=' + id);
  }


  public AllFilesUploads(files: any, foldername: any) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      
      formdata.append('file_upload', files[i], files[i].name);
    }
    this.url = this.host + '/Doctor/AllFilesUploads?FolderName=' + foldername;
    return this.http.post(this.url, formdata);
  }

  public UpdateSupportForWebMeridionalCommetnts(data: any) {
    this.url = this.host + '/Doctor/UpdateSupportForWebMeridionalCommetnts';
    return this.http.post(this.url, data)
  }


  public UpdateSupportForWebResolvedbit(data: any) {
    this.url = this.host + '/Doctor/UpdateSupportForWebResolvedbit';
    return this.http.post(this.url, data)
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

  public GetSupport(lid: any, id: any) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetSupport?Sdate=" + lid + '&Edate=' + id
    );
  }


  public GetSupportIssueTypeWeb(id: any) {
    
    return this.http.get<any[]>(this.host + '/Doctor/GetSupportIssueTypeWeb?LanguageID=' + id);
  }

  public GetSupportResolvedBit(lid: any) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetSupportResolvedBit?ID=" + lid
    );
  }


  public UpdateSupport(data:any) {
    this.url = this.host + '/Doctor/UpdateSupport';
    return this.http.post(this.url, data)
  }

  public GetSupportRegistrationByID(lid:any, id:any) {

    return this.http.get<any[]>(
      this.host + "/Doctor/GetSupportRegistrationByID?LanguageID=" + lid + '&ID=' + id
    );
  }

  public GetCityMasterBYIDandLanguageID(did:any, lid:any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetCityMasterBYIDandLanguageID?CountryID=' + did + '&LanguageID=' + lid);
  }

  public GetAreaMasterByCityIDAndLanguageID(did:any, lid:any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetAreaMasterByCityIDAndLanguageID?CityID=' + did + '&LanguageID=' + lid);
  }

  public GetRegionMasterWeb(id:any) {
    
    return this.http.get<any[]>(this.host + '/Doctor/GetRegionMasterWeb?CountryID=' + id);
  }

  public GetCountryMasterByLanguageID(lid:any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetCountryMasterByLanguageID?LanguageID=' + lid);
  }
  public UpdateSupportRegistration(data:any) {
    this.url = this.host + '/Doctor/UpdateSupportRegistration';
    return this.http.post(this.url, data)
  }

  public GetPatientRefundStatusWeb(lid:any, sdate:any, edate:any) {
    return this.http.get<any[]>(this.host + '/Doctor/GetPatientRefundStatusWeb?LanguageID=' + lid + '&StartDate=' + sdate + '&EndDate=' + edate);
  }

  public UpdatePatientRefundStatus(data:any) {
    this.url = this.host + '/Doctor/UpdatePatientRefundStatus';
    return this.http.post(this.url, data)
  }

  public GetAdmin_Masters_labels(lid:any) {

    return this.http.get<any[]>(this.host + '/LanguageMaster/GetAdmin_Masters_labels?LanguageID=' + lid);
  }

  
  public GetSupportRegistration(lid:any) {
    return this.http.get<any[]>(
      this.host + "/Doctor/GetSupportRegistration?LanguageID=" + lid
    );
  }


  public DeleteSupportRegistration(lid:any) {
    return this.http.get<any[]>(
      this.host + "/Doctor/DeleteSupportRegistration?ID=" + lid
    );
  }


  public InsertSupportRegistration(data:any) {
    this.url = this.host + '/Doctor/InsertSupportRegistration';
    return this.http.post(this.url, data)
  }


  
  public GetDeleteuserProfileWeb() {
    return this.http.get<any[]>(
      this.host + "/Doctor/GetDeleteuserProfileWeb" 
    );
  }


  public UpdateDeleteUserProfile(data:any) {
    this.url = this.host + '/Doctor/UpdateDeleteUserProfile';
    return this.http.post(this.url, data)
  }


}
