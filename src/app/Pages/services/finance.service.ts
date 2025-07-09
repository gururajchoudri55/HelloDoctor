import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  private host = environment.API_URL;
  private url: string = '';

  constructor(private http: HttpClient) { }

  public GetProviderPaidPayments(type:any, year:any, month:any) {
    return this.http.get<any[]>(this.host + '/Doctor/GetProviderPaidPayments?Type=' + type + '&Year=' + year + '&Month=' + month);
  }


  public GetAllAdminPayments(year:any, month:any, type:any) {
    return this.http.get<any[]>(this.host + '/Hospital/GetAllAdminPayments?Year=' + year + '&Month=' + month + '&TypeID=' + type);
  }

  public GetDoctorsMonthlyStatement(doctorid:any, Month:any, year:any, lid:any, tyepid:any) {
    
    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorsMonthlyStatement?DoctorID=' + doctorid + '&Month=' + Month + '&Year=' + year + '&LanguageID=' + lid + '&TypeID=' + tyepid);
  }


  public InsertProviderPaidPayments(data:any) {
    this.url = this.host + '/Doctor/InsertProviderPaidPayments';
    return this.http.post(this.url, data)
  }

  public GetSentInvoice(type:any, year:any, month:any, lid:any) {
    return this.http.get<any[]>(this.host + '/Master/GetSentInvoice?Type=' + type + '&Year=' + year + '&Month=' + month + '&LanguageID=' + lid);
  }
  public AllFilesUploads(files: any, foldername: any) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      
      formdata.append('file_upload', files[i], files[i].name);
    }
    this.url = this.host + '/Doctor/AllFilesUploads?FolderName=' + foldername;
    return this.http.post(this.url, formdata);
  }

  public UpodateSentInvoice(data:any) {
    this.url = this.host + '/Admin/UpodateSentInvoice';
    return this.http.post(this.url, data)
  }

  
  public GetAllProviderSubscriptions(lid:any, year:any, month:any, typeid:any,date:any) {
    
    return this.http.get<any[]>(this.host + '/Doctor/GetAllProviderSubscriptions?LanguageID=' + lid + '&Year=' + year + '&Month=' + month + '&TypeID=' + typeid+'&Date='+date);
  }
  public InsertSentInvoice(data:any) {
    this.url = this.host + '/Master/InsertSentInvoice';
    return this.http.post(this.url, data)
  }

  public UploadInvoicePDF(files:any) {
    ;
    let formdata: FormData = new FormData();
    formdata.append('file_upload', files, files.name);
    return this.http.post(this.host + '/Master/UploadInvoicePDF/', formdata);
  }


}
