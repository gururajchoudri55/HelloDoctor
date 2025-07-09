import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  private host = environment.API_URL;
  private url: string = '';
  constructor(private http: HttpClient) { }

  public GetHospital_ClinicForAdminByAdmin(did:any) {

    return this.http.get<any[]>(this.host + '/Hospital/GetHospital_ClinicForAdminByAdmin?LanguageID=' + did);
  } 


  public InsertHospitalClinicAdminRegistration(data:any) {
    this.url = this.host + '/Hospital/InsertHospitalClinicAdminRegistration';
    return this.http.post(this.url, data)
  }

  public GetDoctorRegistratingLogins(lid:any) {
    return this.http.get<any[]>(this.host + '/Admin/GetDoctorRegistratingLogins?LanguageID=' + lid);
  }

  public InsertDoctorLogin(data:any) {
    this.url = this.host + '/Doctor/InsertDoctorLogin';
    return this.http.post(this.url, data)
  }


  public GetDoctorLoginForDash(lid:any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDoctorLoginForDash?LanguageID=' + lid);
  }


  public GetDiagnosticCenterListByLanguageID(lid:any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDiagnosticCenterListByLanguageID?LanguageID=' + lid);
  }

  public GetDiagnosticLoginForDash(lid:any) {

    return this.http.get<any[]>(this.host + '/Diagnostic/GetDiagnosticLoginForDash?LanguageID=' + lid);
  }

  public InsertDiagnosticCenterAdminRegistration(data:any) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticCenterAdminRegistration';
    return this.http.post(this.url, data)
  }

  public GetMidWivesRegistratingLogins(lid:any) {

    return this.http.get<any[]>(this.host + '/Admin/GetMidWivesRegistratingLogins?LanguageID=' + lid);
  }

  public InsertMidWivesLogin(data:any) {

    this.url = this.host + '/Admin/InsertMidWivesLogin';
    return this.http.post(this.url, data)
  }

  public GetPhysiotherapyRegistringLogins(lid:any) {

    return this.http.get<any[]>(this.host + '/Admin/GetPhysiotherapyRegistringLogins?LanguageID=' + lid);
  }

  public InsertPhysiotherapistLogin(data:any) {

    this.url = this.host + '/Admin/InsertPhysiotherapistLogin';
    return this.http.post(this.url, data)
  }

  public GetPharmacyForAdminByLanguageID(did:any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetPharmacyForAdminByLanguageID?LanguageID=' + did);
  }


  public InsertPharmacyAdminRegistration(data:any) {
    this.url = this.host + '/Pharmacy/InsertPharmacyAdminRegistration';
    return this.http.post(this.url, data)
  }
 
  public GetNurseListForRegisteringLogin(lid:any) {

    return this.http.get<any[]>(this.host + '/Admin/GetNurseListForRegisteringLogin?LanguageID=' + lid);
  }


  public InsertNurseLogin(data:any) {

    this.url = this.host + '/Admin/InsertNurseLogin';
    return this.http.post(this.url, data)
  }

  public GetDeliveryCompanyAdminByLanguageID(did:any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDeliveryCompanyAdminByLanguageID?LanguageID=' + did);
  }
 
  public InsertDeliveryCompanyLogin(data:any) {
    this.url = this.host + '/Admin/InsertDeliveryCompanyLogin';
    return this.http.post(this.url, data)
  }

  public DisableDoctorLogin(id:any) {

    return this.http.get<any[]>(this.host + '/Doctor/DisableDoctorLogin?DoctorID=' + id);
  }

  public EnableDoctorLogin(docid:any) {

    return this.http.get<any[]>(this.host + '/Doctor/EnableDoctorLogin?DoctorID=' + docid);
  }

  public strongpassword(input:any) {

    var passworddetails = /^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,15})$/;
    return passworddetails.test(input);

  }


  public UpdateDoctorLogins(data:any) {
    this.url = this.host + '/Doctor/UpdateDoctorLogins';
    return this.http.post(this.url, data)
  }
   
  public GetHospital_ClinicLoginForDash(lid:any) {

    return this.http.get<any[]>(this.host + '/Hospital/GetHospital_ClinicLoginForDash?LanguageID=' + lid);
  }

  public DisableHospital_ClinicLogin(hosid:any) {

    return this.http.get<any[]>(this.host + '/Hospital/DisableHospital_ClinicLogin?Hospital_ClinicID=' + hosid);
  }
  
  public EnableHospital_ClinicLogin(hosid:any) {

    return this.http.get<any[]>(this.host + '/Hospital/EnableHospital_ClinicLogin?Hospital_ClinicID=' + hosid);
  }

  public DisableDiagnosticLogin(id:any) {

    return this.http.get<any[]>(this.host + '/Diagnostic/DisableDiagnosticLogin?DiagnosticCenterID=' + id);
  }

  public EnableDiagnosticLogin(id:any) {

    return this.http.get<any[]>(this.host + '/Diagnostic/EnableDiagnosticLogin?DiagnosticCenterID=' + id);
  }

  public UpdateDiagnosticCenterAdminRegistrationWeb(data:any) {
    this.url = this.host + '/Diagnostic/UpdateDiagnosticCenterAdminRegistrationWeb';
    return this.http.post(this.url, data)
  }

  public GetPharmacyLoginForDash(lid:any) {

    return this.http.get<any[]>(this.host + '/Pharmacy/GetPharmacyLoginForDash?LanguageID=' + lid);
  }

  public DisablePharmacyLogin(id:any) {

    return this.http.get<any[]>(this.host + '/Pharmacy/DisablePharmacyLogin?PharmacyID=' + id);
  }
  public EnablePharmacyLogin(id:any) {

    return this.http.get<any[]>(this.host + '/Pharmacy/EnablePharmacyLogin?PharmacyID=' + id);
  }

  public UpdatePharmacyAdminRegistration(data:any) {
    this.url = this.host + '/Pharmacy/UpdatePharmacyAdminRegistration';
    return this.http.post(this.url, data)
  }

  public GetNurseLoginAdmin(lid:any) {

    return this.http.get<any[]>(this.host + '/Admin/GetNurseLoginAdmin?LanguageID=' + lid);
  }


  public DisableNurseLogin(id:any) {

    return this.http.get<any[]>(this.host + '/Admin/DisableNurseLogin?NurseID=' + id);
  }

  public EnableNurseLogin(id:any) {

    return this.http.get<any[]>(this.host + '/Admin/EnableNurseLogin?NurseID=' + id);
  }

  public UpdateNurseLogin(data:any) {
    this.url = this.host + '/Admin/UpdateNurseLogin';
    return this.http.post(this.url, data)
  }
   
  public GetPhysiotherapistLoginAdmin(lid:any) {

    return this.http.get<any[]>(this.host + '/Admin/GetPhysiotherapistLoginAdmin?LanguageID=' + lid);
  }

  public DisablePhysiotherapistLogin(id:any) {

    return this.http.get<any[]>(this.host + '/Admin/DisablePhysiotherapistLogin?PhysiotherapistID=' + id);
  }



  public EnablePhysiotherapistLogin(id:any) {

    return this.http.get<any[]>(this.host + '/Admin/EnablePhysiotherapistLogin?PhysiotherapistID=' + id);
  }

  
  public UpdatePhysiotherapistLogin(data:any) {
    this.url = this.host + '/Admin/UpdatePhysiotherapistLogin';
    return this.http.post(this.url, data)
  }

  public GetMidWivesLoginAdmin(lid:any) {

    return this.http.get<any[]>(this.host + '/Admin/GetMidWivesLoginAdmin?LanguageID=' + lid);
  }

  public DisableMidWivesLogin(id:any) {

    return this.http.get<any[]>(this.host + '/Admin/DisableMidWivesLogin?MidWiveID=' + id);
  }


  public EnableMidWivesLogin(id:any) {

    return this.http.get<any[]>(this.host + '/Admin/EnableMidWivesLogin?MidWiveID=' + id);
  }

  public UpdateMidWivesLogin(data:any) {
    this.url = this.host + '/Admin/UpdateMidWivesLogin';
    return this.http.post(this.url, data)
  }

  public GetDeliveryCompanyLoginAdmin(lid:any) {

    return this.http.get<any[]>(this.host + '/Admin/GetDeliveryCompanyLoginAdmin?LanguageID=' + lid);
  }

  public DisableDeliveryCompanyLogin(id:any) {

    return this.http.get<any[]>(this.host + '/Admin/DisableDeliveryCompanyLogin?DeliveryCompanyID=' + id);
  }
  
  public EnableDeliveryCompanyLogin(id:any) {

    return this.http.get<any[]>(this.host + '/Admin/EnableDeliveryCompanyLogin?DeliveryCompanyID=' + id);
  }


  public UpdateDeliveryCompanyLogin(data:any) {
    this.url = this.host + '/Admin/UpdateDeliveryCompanyLogin';
    return this.http.post(this.url, data)
  }

  public UpdateUsers_RoleMapping(data:any) {
    this.url = this.host + '/Doctor/UpdateUsers_RoleMapping';
    return this.http.post(this.url, data)
  }


  public UpdateHospitalClinicAdminRegistration(data:any) {
    this.url = this.host + '/Hospital/UpdateHospitalClinicAdminRegistration';
    return this.http.post(this.url, data)
  }

  
  generateRandomPassword() {
    var result = '';
    length = 8;
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }
}
