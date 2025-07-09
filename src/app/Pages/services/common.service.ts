import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private host = environment.API_URL;

  private url: string = '';

  constructor(private http: HttpClient) {
    console.log(this.host);
  }
  private host2 = 'https://voiladoc.org/VoiladocRegistrationsWebApi';
  //Test
  //private host3="https://madagascar.voiladoc-eastafrica.com/MadagascarWebAndroidTest"
  //live
  private host3 =
    'https://madagascar.voiladoc-eastafrica.com/VoiladocMorrocoTestApi';

  GetLanguageMaster() {
    return this.http.get<any[]>(
      this.host + '/LanguageMaster/GetLanguageMaster'
    );
  }

  public GetRoleTypesMasterBYID(lid: any) {
    return this.http.get<any[]>(
      this.host + '/LanguageMaster/GetRoleTypesMasterBYID?LanguageID=' + lid
    );
  }

  public Authenicate(data: any) {
    this.url = this.host + '/Doctor/Authenicate';
    return this.http.post(this.url, data);
  }

  public GetDoctorLogin(uname: any, pwd: any, lid: any, pinno: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetDoctorLogin?UserName=' +
        uname +
        '&Password=' +
        pwd +
        '&LanguageID=' +
        lid +
        '&Pinno=' +
        pinno
    );
  }
  public GetHospitalAdminRegistrationLogin(
    uname: any,
    pwd: any,
    lid: any,
    pinno: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetHospitalAdminRegistrationLogin?UserName=' +
        uname +
        '&Password=' +
        pwd +
        '&LanguageID=' +
        lid +
        '&Pinno=' +
        pinno
    );
  }

  public GetDiagnosticCenterAdminRegistrationLogin(
    uname: any,
    pwd: any,
    lid: any,
    pinno: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetDiagnosticCenterAdminRegistrationLogin?UserName=' +
        uname +
        '&Password=' +
        pwd +
        '&LanguageID=' +
        lid +
        '&Pinno=' +
        pinno
    );
  }

  public GetPharmacyAdminRegistrationLogin(
    uname: any,
    pwd: any,
    lid: any,
    pinno: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetPharmacyAdminRegistrationLogin?UserName=' +
        uname +
        '&Password=' +
        pwd +
        '&LanguageID=' +
        lid +
        '&Pinno=' +
        pinno
    );
  }

  public GetNurseLogin(uname: any, pwd: any, lid: any, pinno: any) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetNurseLogin?UserName=' +
        uname +
        '&Password=' +
        pwd +
        '&LanguageID=' +
        lid +
        '&Pinno=' +
        pinno
    );
  }

  public GetPhysiotherapistLogin(uname: any, pwd: any, lid: any, pinno: any) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetPhysiotherapistLogin?UserName=' +
        uname +
        '&Password=' +
        pwd +
        '&LanguageID=' +
        lid +
        '&Pinno=' +
        pinno
    );
  }

  public GetMidWivesLogin(uname: any, pwd: any, lid: any, pinno: any) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetMidWivesLogin?UserName=' +
        uname +
        '&Password=' +
        pwd +
        '&LanguageID=' +
        lid +
        '&Pinno=' +
        pinno
    );
  }

  public GetDeliveryCompanyLogin(uname: any, pwd: any, lid: any, pinno: any) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetDeliveryCompanyLogin?UserName=' +
        uname +
        '&Password=' +
        pwd +
        '&LanguageID=' +
        lid +
        '&Pinno=' +
        pinno
    );
  }

  public GetLocalDoctorRegistrationUnameAndPwd(
    uname: any,
    pwd: any,
    pinno: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetLocalDoctorRegistrationUnameAndPwd?UserName=' +
        uname +
        '&Password=' +
        pwd +
        '&Pinno=' +
        pinno
    );
  }

  public GetMeridionalAdmin_LoginUnameAndPwd(uname: any, pwd: any, pinno: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetMeridionalAdmin_LoginUnameAndPwd?UserName=' +
        uname +
        '&Password=' +
        pwd +
        '&Pinno=' +
        pinno
    );
  }

  public GetSupportRegistrationUnameAndPwd(uname: any, pwd: any, pinno: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetSupportRegistrationUnameAndPwd?UserName=' +
        uname +
        '&Password=' +
        pwd +
        '&Pinno=' +
        pinno
    );
  }
  public GetReceiptionistLogin(uname: any, pwd: any, pinno: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetReceiptionistLogin?UserName=' +
        uname +
        '&Password=' +
        pwd +
        '&Pinno=' +
        pinno
    );
  }

  public GetUsers_RoleMappingByUnameAndPwd(
    uname: any,
    pwd: any,
    roleid: any,
    pinno: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetUsers_RoleMappingByUnameAndPwd?UserName=' +
        uname +
        '&Password=' +
        pwd +
        '&RoleID=' +
        roleid +
        '&Pinno=' +
        pinno
    );
  }

  public InsertProvidersAuditReport(data: any) {
    this.url = this.host + '/Doctor/InsertProvidersAuditReport';
    return this.http.post(this.url, data);
  }

  public GetDiagnosticReceptionistLoginByUserNameAndPassword(
    uname: any,
    password: any,
    pinno: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Master/GetDiagnosticReceptionistLoginByUserNameAndPassword?UserName=' +
        uname +
        '&Password=' +
        password +
        '&Pinno=' +
        pinno
    );
  }
  public GetIndependentDoctors_ReceptionistByUserNameAndPwd(
    pinno: any,
    uname: any,
    pwd: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetIndependentDoctors_ReceptionistByUserNameAndPwd?Pinno=' +
        pinno +
        '&UserName=' +
        uname +
        '&Password=' +
        pwd
    );
  }

  public GetDoctorForAdminByLanguageID(did: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetDoctorForAdminByLanguageID?LanguageID=' +
        did
    );
  }

  public GetDepartmentMasterByLanguageID(lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetDepartmentMasterByLanguageID?LanguageID=' +
        lid
    );
  }
  public GetHospital_ClinicForAdminByAdmin(did: any) {
    return this.http.get<any[]>(
      this.host +
        '/Hospital/GetHospital_ClinicForAdminByAdmin?LanguageID=' +
        did
    );
  }

  public GetPharmacyForAdminByLanguageID(did: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetPharmacyForAdminByLanguageID?LanguageID=' +
        did
    );
  }
  public GetDiagnosticForAdminByLanguageID(did: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetDiagnosticForAdminByLanguageID?LanguageID=' +
        did
    );
  }

  public GetPhysiotherapyRegistrationAdminByLanguageID(did: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetPhysiotherapyRegistrationAdminByLanguageID?LanguageID=' +
        did
    );
  }

  public GetMidWivesRegistrationByLanguageID(did: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetMidWivesRegistrationByLanguageID?LanguageID=' +
        did
    );
  }
  public GetNurseRegistrationAdminByLanguageID(did: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetNurseRegistrationAdminByLanguageID?LanguageID=' +
        did
    );
  }

  public GetCountryMasterByLanguageID(lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetCountryMasterByLanguageID?LanguageID=' +
        lid
    );
  }
  public GetRegionMasterWeb(id: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetRegionMasterWeb?CountryID=' + id
    );
  }

  public GetCityMasterBYIDandLanguageID(did: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetCityMasterBYIDandLanguageID?CountryID=' +
        did +
        '&LanguageID=' +
        lid
    );
  }

  public GetAreaMasterByCityIDAndLanguageID(did: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetAreaMasterByCityIDAndLanguageID?CityID=' +
        did +
        '&LanguageID=' +
        lid
    );
  }

  public GetInsuranceMasterByLanguageID(lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetInsuranceMasterByLanguageID?LanguageID=' +
        lid
    );
  }

  public HospitalClinicPhotos(files: any) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(
      this.host + '/Hospital/HospitalPhotoUpload/',
      formdata
    );
  }

  public Getlocation(address: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/Getlocation?Address=' + address
    );
  }
  public InsertHospital_ClinicPhotos(data: any) {
    this.url = this.host + '/Hospital/InsertHospital_ClinicPhotos';
    return this.http.post(this.url, data);
  }

  public InsertHospitalClinicDetailsMaster(data: any) {
    this.url = this.host + '/Hospital/InsertHospitalClinicDetailsMaster';
    return this.http.post(this.url, data);
  }
  public InsertHospital_ClinicInsurance(data: any) {
    this.url = this.host + '/Hospital/InsertHospital_ClinicInsurance';
    return this.http.post(this.url, data);
  }

  public GetDoctorTypeMasterByLanguageID(lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetDoctorTypeMasterByLanguageID?LanguageID=' +
        lid
    );
  }

  public GetDegreeMasterBylanguageID(lid: any) {
    return this.http.get<any[]>(
      this.host + '/ServiceMaster/GetDegreeMasterBylanguageID?LanguageID=' + lid
    );
  }
  public GetSpecilaizationMasterByLanguageID(lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetSpecilaizationMasterByLanguageID?LanguageID=' +
        lid
    );
  }

  public DoctorIdentityProof(files: any) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.host + '/Doctor/IdentityUpload/', formdata);
  }

  public DoctorPhotoUpload(files: any) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.host + '/Doctor/PhotoUpload/', formdata);
  }

  public InsertDoctorEducation(data: any) {
    this.url = this.host + '/Doctor/InsertDoctorEducation';
    return this.http.post(this.url, data);
  }
  public DeleteDoctorEducation(id: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/DeleteDoctorEducation?ID=' + id
    );
  }

  public UpdateDoctorEducationByID(data: any) {
    this.url = this.host + +'/Doctor/UpdateDoctorEducationByID/';
    return this.http.post(this.url, data);
  }

  public InsertDoctorExperience(data: any) {
    this.url = this.host + '/Doctor/InsertDoctorExperience';
    return this.http.post(this.url, data);
  }

  public InsertDoctorMembership(data: any) {
    this.url = this.host + '/Doctor/InsertDoctorMembership';
    return this.http.post(this.url, data);
  }
  public InsertDoctorMedicalProofs(data: any) {
    this.url = this.host + '/Doctor/InsertDoctorMedicalProofs';
    return this.http.post(this.url, data);
  }

  public InsertDoctorIdentityProofs(data: any) {
    this.url = this.host + '/Doctor/InsertDoctorIdentityProofs';
    return this.http.post(this.url, data);
  }
  public InsertDoctorRegistration(data: any) {
    this.url = this.host + '/Doctor/InsertDoctorRegistration';
    return this.http.post(this.url, data);
  }

  public InsertDoctorSpecialization(data: any) {
    this.url = this.host + '/Doctor/InsertDoctorSpecialization';
    return this.http.post(this.url, data);
  }

  public InsertDoctorMedicalRegistration(data: any) {
    this.url = this.host + '/Doctor/InsertDoctorMedicalRegistration';
    return this.http.post(this.url, data);
  }

  public DeleteDoctorRegistration(id: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/DeleteDoctorRegistration?ID=' + id
    );
  }

  public DeleteHospital_Clinic(id: any) {
    return this.http.get<any[]>(
      this.host + '/Hospital/DeleteHospital_Clinic?ID=' + id
    );
  }

  public DeletePharmacy(id: any) {
    return this.http.get<any[]>(
      this.host + '/Pharmacy/DeletePharmacy?ID=' + id
    );
  }

  public DeleteDiagnosticCenter(id: any) {
    return this.http.get<any[]>(
      this.host + '/Diagnostic/DeleteDiagnosticCenter?ID=' + id
    );
  }

  public DeleteNurseRegistration(id: any) {
    return this.http.get<any[]>(
      this.host + '/Admin/DeleteNurseRegistration?ID=' + id
    );
  }

  public DeletePhysiotherapyRegistrationAdmin(id: any) {
    return this.http.get<any[]>(
      this.host + '/Admin/DeletePhysiotherapyRegistrationAdmin?ID=' + id
    );
  }

  public DeleteMidWivesRegistration(id: any) {
    return this.http.get<any[]>(
      this.host + '/Admin/DeleteMidWivesRegistration?ID=' + id
    );
  }

  public GetDeliveryCompanyAdminByLanguageID(did: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetDeliveryCompanyAdminByLanguageID?LanguageID=' +
        did
    );
  }

  public DeleteDeliveryCompany(id: any) {
    return this.http.get<any[]>(
      this.host + '/Admin/DeleteDeliveryCompany?ID=' + id
    );
  }

  public GetAdminDashboardCounts(lid: any, sdate: any, edate: any) {
    return this.http.get<any[]>(
      this.host +
        '/Master/GetAdminDashboardCounts?LanguageID=' +
        lid +
        '&Sdate=' +
        sdate +
        '&Edate=' +
        edate
    );
    return this.http.get(this.url);
  }

  public InsertPharmacyPhotos(data: any) {
    this.url = this.host + '/Pharmacy/InsertPharmacyPhotos';
    return this.http.post(this.url, data);
  }

  public pharmacyphoto(files: any) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(
      this.host + '/Pharmacy/PharmacyPhotoUpload/',
      formdata
    );
  }
  public InsertPharmacyRegistration(data: any) {
    this.url = this.host + '/Pharmacy/InsertPharmacyRegistration';
    return this.http.post(this.url, data);
  }

  public GetDates(newDate: any) {
    var d = new Date(newDate),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var date = month + '-' + day + '-' + year;
    return (date = year + '-' + month + '-' + day);
  }

  public AllFilesUploads(files: any, foldername: any) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    this.url = this.host + '/Doctor/AllFilesUploads?FolderName=' + foldername;
    return this.http.post(this.url, formdata);
  }

  public InsertNurseRegistration(data: any) {
    this.url = this.host + '/Admin/InsertNurseRegistration';
    return this.http.post(this.url, data);
  }

  public InsertNurseSpecialization(data: any) {
    this.url = this.host + '/Admin/InsertNurseSpecialization';
    return this.http.post(this.url, data);
  }

  public InsertphysiotherapyRegistrationAdmin(data: any) {
    this.url = this.host + '/Admin/InsertphysiotherapyRegistrationAdmin';
    return this.http.post(this.url, data);
  }
  public InsertPhysiotherapySpecialization(data: any) {
    this.url = this.host + '/Admin/InsertPhysiotherapySpecialization';
    return this.http.post(this.url, data);
  }

  public InsertMidWivesRegistration(data: any) {
    this.url = this.host + '/Admin/InsertMidWivesRegistration';
    return this.http.post(this.url, data);
  }
  public InsertDiagnosticCenterRegistration(data: any) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticCenterRegistration';
    return this.http.post(this.url, data);
  }

  public InsertInsertDiagnosticCenterPhotos(data: any) {
    this.url = this.host + '/Diagnostic/InsertInsertDiagnosticCenterPhotos';
    return this.http.post(this.url, data);
  }

  public InsertDiagnosticCenterInsurances(data: any) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticCenterInsurances';
    return this.http.post(this.url, data);
  }

  public GetAllCancelledAppoentmentReport(
    typeid: any,
    sdate: any,
    edate: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Hospital/GetAllCancelledAppoentmentReport?TypeID=' +
        typeid +
        '&Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&LanguageID=' +
        lid
    );
  }

  //working details

  public GetHospital_ClinicDetailsForAdminByLanguageID(did: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetHospital_ClinicDetailsForAdminByLanguageID?Hospital_ClinicID=' +
        did +
        '&LanguageID=' +
        lid
    );
  }

  public GetHospital_ClinicDetailsForAdmin(id: any) {
    return this.http.get<any[]>(
      this.host +
        '/Hospital/GetHospital_ClinicDetailsForAdmin?Hospital_ClinicID=' +
        id
    );
  }

  public GetDoctorListByLanguageID(lid: any) {
    return this.http.get<any[]>(
      this.host + '/ServiceMaster/GetDoctorListByLanguageID?LanguageID=' + lid
    );
  }
  public GetDaysMasterByLanguageID(lid: any) {
    return this.http.get<any[]>(
      this.host + '/ServiceMaster/GetDaysMasterByLanguageID?LanguageID=' + lid
    );
  }
  public GetBookingTypeMasterByLanguageID(lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetBookingTypeMasterByLanguageID?LanguageID=' +
        lid
    );
  }

  public GetBookAppointmentTypeMasterWebByLanguageID(lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetBookAppointmentTypeMasterWebByLanguageID?LanguageID=' +
        lid
    );
  }
  public InsertBookingType(data: any) {
    this.url = this.host + '/Admin/InsertBookingType';
    return this.http.post(this.url, data);
  }

  public InsertBookAppointmentType(data: any) {
    this.url = this.host + '/Admin/InsertBookAppointmentType';
    return this.http.post(this.url, data);
  }

  public GetAllHospital_ClinicListByIDByLanguageID(hid: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetAllHospital_ClinicListByIDByLanguageID?Hospital_ClinicID=' +
        hid +
        '&LanguageID=' +
        lid
    );
  }

  public GetSlotsMasterByID(timedivisonid: any, slottypeid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetSlotsMasterByID?TimeDivisionID=' +
        timedivisonid +
        '&SlotTypeID=' +
        slottypeid
    );
  }

  public InsertDoctorHospitalDetails(data: any) {
    this.url = this.host + '/Doctor/InsertDoctorHospitalDetails';
    return this.http.post(this.url, data);
  }

  public InsertDoctorSlotByID(data: any) {
    this.url = this.host + '/Doctor/InsertDoctorSlotByID';

    return this.http.post(this.url, data);
  }

  public EnableNurseService(lid: any) {
    return this.http.get<any[]>(
      this.host + '/PatientRegistration/EnableNurseService?ID=' + lid
    );
  }

  public DisableNurseService(lid: any) {
    return this.http.get<any[]>(
      this.host + '/PatientRegistration/DisableNurseService?ID=' + lid
    );
  }

  public GetNurseServicesByIDWeb(lid: any, nurseid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetNurseServicesByIDWeb?LanguageID=' +
        lid +
        '&NurseID=' +
        nurseid
    );
  }

  public UpdateMidWifeServicesRegistrationEnableDisable(typeid: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/UpdateMidWifeServicesRegistrationEnableDisable?TypeID=' +
        typeid +
        '&ID=' +
        lid
    );
  }

  public GetPhysioServicesByIDWeb(lid: any, physioid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetPhysioServicesByIDWeb?LanguageID=' +
        lid +
        '&PhysiotherapyID=' +
        physioid
    );
  }

  public EnableMidWifeService(lid: any) {
    return this.http.get<any[]>(
      this.host + '/PatientRegistration/EnableMidWifeService?ID=' + lid
    );
  }

  public DisableMidWifeService(lid: any) {
    return this.http.get<any[]>(
      this.host + '/PatientRegistration/DisableMidWifeService?ID=' + lid
    );
  }

  public GetMidWifeServicesWeb(MidWifeID: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetMidWifeServicesWeb?MidWifeID=' +
        lid +
        '&LanguageID=' +
        lid
    );
  }

  public GetDiagnosticCenterTestsForDash(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetDiagnosticCenterTestsForDash?LanguageID=' + lid
    );
  }

  public GetDiagnosticCenterPackages(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetDiagnosticCenterPackages?LanguageID=' + lid
    );
  }
  public DeleteDiagnosticCenterPackages(id: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/DeleteDiagnosticCenterPackages?ID=' + id
    );
  }

  public DeleteDiagnosticCenterTestsForDash(id: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/DeleteDiagnosticCenterTestsForDash?ID=' + id
    );
  }
  public GetDoctorForAdminByLanguageIDForWorking(lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctorForAdminByLanguageIDForWorking?LanguageID=' +
        lid
    );
  }

  public GetDoctorWorkingDetails(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetDoctorWorkingDetails?LanguageID=' + lid
    );
  }

  public GetDoctorHospitalDetailsWebByDoctorID(mid: any, LanguageID: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctorHospitalDetailsWebByDoctorID?DoctorID=' +
        mid +
        '&LanguageID=' +
        LanguageID
    );
  }

  public GetDoctorSlotsByDoctorID(doctorid: any, slottypeid: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctorSlotsByDoctorID?DoctorID=' +
        doctorid +
        '&SlotTypeID=' +
        slottypeid +
        '&LanguageID=' +
        lid
    );
  }

  public InsertDoctorSlotsWeb(data: any) {
    this.url = this.host + '/Doctor/InsertDoctorSlotsWeb';
    return this.http.post(this.url, data);
  }

  public DeleteDoctSlots(id: any) {
    return this.http.get<any[]>(
      this.host + '/Diagnostic/DeleteDoctorSlots?ID=' + id
    );
  }
  public UpdateDoctorSlotsWeb(data: any) {
    this.url = this.host + '/Diagnostic/UpdateDoctorSlotsWeb';
    return this.http.post(this.url, data);
  }

  public GetDoctorHospitalDetailsDoctors(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetDoctorHospitalDetailsDoctors?LanguageID=' + lid
    );
  }

  public GetDoctorcalenderSlotsByDoctorID(
    doctorid: any,
    slottypeid: any,
    startdate: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctorcalenderSlotsByDoctorID?DoctorID=' +
        doctorid +
        '&SlotTypeID=' +
        slottypeid +
        '&StartDate=' +
        startdate +
        '&LanguageID=' +
        lid
    );
  }

  public GetDoctorHospitalsByDoctorID(lid: any, docid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctorHospitalsByDoctorID?LanguageID=' +
        lid +
        '&DoctorID=' +
        docid
    );
  }
  public GetDoctorAppointmentByDateBySlot(
    doctorid: any,
    slotid: any,
    appdate: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctorAppointmentByDateBySlot?DoctorID=' +
        doctorid +
        '&DoctorSlotID=' +
        slotid +
        '&ApptDatetime=' +
        appdate
    );
  }

  public GetDoctorCancelledAppointmentByDateWise(
    doctorid: any,
    slotid: any,
    appdate: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctorCancelledAppointmentByDateWise?DoctorID=' +
        doctorid +
        '&DoctorSlotID=' +
        slotid +
        '&ApptDatetime=' +
        appdate
    );
  }

  public InsertDoctorSlots_DateWiseAvailable(data: any) {
    this.url = this.host + '/Doctor/InsertDoctorSlots_DateWiseAvailable';
    return this.http.post(this.url, data);
  }

  public sendemail(data: any) {
    this.url = this.host + '/Doctor/sendemail';
    return this.http.post(this.url, data);
  }

  public InsertNotificationsWebLatest(data: any) {
    this.url = this.host + '/Doctor/InsertNotificationsWebLatest';
    return this.http.post(this.url, data);
  }

  public GetDaysHomecare(date: any) {
    return this.http.get<any[]>(
      this.host + '/BookAppointment/GetDaysHomecare?Date=' + date
    );
  }

  public GetDayID(day: any) {
    return this.http.get<any[]>(this.host + '/Doctor/GetDayID?Day=' + day);
  }

  public GetBookAppointmentByDateWiseAppointmentCount(
    appdate: any,
    doctorid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetBookAppointmentByDateWiseAppointmentCount?AppointmentDate=' +
        appdate +
        '&DoctorID=' +
        doctorid
    );
  }
  public GetSlotsByIDPlanning(startid: any, endid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetSlotsByIDPlanning?StartID=' +
        startid +
        '&EndID=' +
        endid
    );
  }

  public GetBookAppointmentByDateWiseAndSlotWiseAppointmentCount(
    appdate: any,
    doctorid: any,
    slotid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetBookAppointmentByDateWiseAndSlotWiseAppointmentCount?AppointmentDate=' +
        appdate +
        '&DoctorID=' +
        doctorid +
        '&SlotID=' +
        slotid
    );
  }

  public InsertApplicationExceptions(data: any) {
    this.url = this.host + '/Doctor/InsertApplicationExceptions';
    return this.http.post(this.url, data);
  }

  public GetNurseHospitalDetailsNurses(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Admin/GetNurseHospitalDetailsNurses?LanguageID=' + lid
    );
  }
  public GetAllHospital_ClinicListByID(hosiptalid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Hospital/GetAllHospital_ClinicListByID?Hospital_ClinicID=' +
        hosiptalid
    );
  }

  public GetSlotMasterTimings(SlotTypeID: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetSlotMasterTimings?SlotTypeID=' + SlotTypeID
    );
  }

  public InsertNurseHospitalDetailsAdmin(data: any) {
    this.url = this.host + '/Admin/InsertNurseHospitalDetailsAdmin';
    return this.http.post(this.url, data);
  }

  public InsertNurseWorkingDetails(data: any) {
    this.url = this.host + '/Admin/InsertNurseWorkingDetails';
    return this.http.post(this.url, data);
  }

  public GetNurseWorkingDetils(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetNurseWorkingDetils?LanguageID=' + lid
    );
  }

  public GetNurseSlotsByNurseID(nurseid: any, slotypeid: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetNurseSlotsByNurseID?NurseID=' +
        nurseid +
        '&SlotTypeID=' +
        slotypeid +
        '&LanguageID=' +
        lid
    );
  }

  public UpdateNurseWorkingDetails(data: any) {
    this.url = this.host + '/Admin/UpdateNurseWorkingDetails';
    return this.http.post(this.url, data);
  }
  public InsertNurseWorkingDetailsSlots(data: any) {
    this.url = this.host + '/Admin/InsertNurseWorkingDetailsSlots';
    return this.http.post(this.url, data);
  }

  public DeleteNurseWorkingDetailsBySlot(id: any) {
    return this.http.get<any[]>(
      this.host + '/Admin/DeleteNurseWorkingDetailsBySlot?ID=' + id
    );
  }

  public InsertPhysiotherapyHospitalDetailsAdmin(data: any) {
    this.url = this.host + '/Admin/InsertPhysiotherapyHospitalDetailsAdmin';
    return this.http.post(this.url, data);
  }

  public InsertPhysiotherapistWorkingDetails(data: any) {
    this.url = this.host + '/Admin/InsertPhysiotherapistWorkingDetails';
    return this.http.post(this.url, data);
  }
  public InsertMidWifeHospitalDetails(data: any) {
    this.url = this.host + '/Admin/InsertMidWifeHospitalDetails';
    return this.http.post(this.url, data);
  }

  public InsertMidWifeWorkingDetails(data: any) {
    this.url = this.host + '/Admin/InsertMidWifeWorkingDetails';
    return this.http.post(this.url, data);
  }
  public InsertMidWifeServicesWeb(data: any) {
    this.url = this.host + '/Doctor/InsertMidWifeServicesWeb';
    return this.http.post(this.url, data);
  }

  public UpdateMidWifeServicesWeb(data: any) {
    this.url = this.host + '/Doctor/UpdateMidWifeServicesWeb';
    return this.http.post(this.url, data);
  }

  public GetPhysiotherapyRegistringLogins(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Admin/GetPhysiotherapyRegistringLogins?LanguageID=' + lid
    );
  }

  public InsertPhysioServicesMobileWeb(data: any) {
    this.url = this.host + '/Doctor/InsertPhysioServicesMobileWeb';
    return this.http.post(this.url, data);
  }

  public UpdatePhysioServicesMobileWeb(data: any) {
    this.url = this.host + '/Doctor/UpdatePhysioServicesMobileWeb';
    return this.http.post(this.url, data);
  }
  public GetNurseListForRegisteringLogin(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Admin/GetNurseListForRegisteringLogin?LanguageID=' + lid
    );
  }
  public InsertNurseServicesWeb(data: any) {
    this.url = this.host + '/Doctor/InsertNurseServicesWeb';
    return this.http.post(this.url, data);
  }

  public UpdateNurseServicesWeb(data: any) {
    this.url = this.host + '/Doctor/UpdateNurseServicesWeb';
    return this.http.post(this.url, data);
  }

  public GetPhysiotherapyHospitalDetails(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetPhysiotherapyHospitalDetails?LanguageID=' + lid
    );
  }

  public GetPhysioYearwiseCalender(nurseid: any, slotypeid: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetPhysioYearwiseCalender?PhysioID=' +
        nurseid +
        '&SlotTypeID=' +
        slotypeid +
        '&LanguageID=' +
        lid
    );
  }

  public InsertPhysiotherapistWorkingDetailsByYearWise(data: any) {
    this.url =
      this.host + '/Admin/InsertPhysiotherapistWorkingDetailsByYearWise';
    return this.http.post(this.url, data);
  }

  public DeletePhysiotherapistWorkingDetails(id: any) {
    return this.http.get<any[]>(
      this.host + '/Admin/DeletePhysiotherapistWorkingDetails?ID=' + id
    );
  }

  public GetMidWifeHospitalDetails(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetMidWifeHospitalDetails?LanguageID=' + lid
    );
  }
  public GetMidwifeYearwiseCalender(nurseid: any, slotypeid: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetMidwifeYearwiseCalender?MidwifeID=' +
        nurseid +
        '&SlotTypeID=' +
        slotypeid +
        '&LanguageID=' +
        lid
    );
  }
  public InsertMidWifeWorkingDetailsYearwise(data: any) {
    this.url = this.host + '/Admin/InsertMidWifeWorkingDetailsYearwise';
    return this.http.post(this.url, data);
  }

  public DeleteMidWifeWorkingDetails(id: any) {
    return this.http.get<any[]>(
      this.host + '/Admin/DeleteMidWifeWorkingDetails?ID=' + id
    );
  }

  public GetNurseWorkingDetailsDyWise(
    nurseid: any,
    slotypeid: any,
    sdate: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetNurseWorkingDetailsDyWise?NurseID=' +
        nurseid +
        '&SlotTypeID=' +
        slotypeid +
        '&StartDate=' +
        sdate +
        '&LanguageID=' +
        lid
    );
  }

  public GetNurseAppointmentdabySlot(nurseid: any, slot: any, appdtetime: any) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetNurseAppointmentdabySlot?NurseID=' +
        nurseid +
        '&DoctorSlotID=' +
        slot +
        '&ApptDatetime=' +
        appdtetime
    );
  }
  public GetNurseCancelledAppointmentByDateWise(
    nurseid: any,
    slot: any,
    appdtetime: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetNurseCancelledAppointmentByDateWise?NurseID=' +
        nurseid +
        '&DoctorSlotID=' +
        slot +
        '&ApptDatetime=' +
        appdtetime
    );
  }
  public InsertNurseWorkingDetails_DateWise(data: any) {
    this.url = this.host + '/Admin/InsertNurseWorkingDetails_DateWise';
    return this.http.post(this.url, data);
  }
  public GetPhysioWorkingDetailsDyWise(
    PhysioID: any,
    slotypeid: any,
    sdate: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetPhysioWorkingDetailsDyWise?PhysioID=' +
        PhysioID +
        '&SlotTypeID=' +
        slotypeid +
        '&StartDate=' +
        sdate +
        '&LanguageID=' +
        lid
    );
  }
  public GetPhysioAppointmentdabySlot(
    physioid: any,
    slotid: any,
    appdate: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetPhysioAppointmentdabySlot?PhysioID=' +
        physioid +
        '&DoctorSlotID=' +
        slotid +
        '&ApptDatetime=' +
        appdate
    );
  }

  public GetPhysioCancelledAppointmentByDateWise(
    physioid: any,
    slotid: any,
    appdate: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetPhysioCancelledAppointmentByDateWise?PhysioID=' +
        physioid +
        '&DoctorSlotID=' +
        slotid +
        '&ApptDatetime=' +
        appdate
    );
  }

  public InsertPhysioWorkingDetails_DateWise(data: any) {
    this.url = this.host + '/Admin/InsertPhysioWorkingDetails_DateWise';
    return this.http.post(this.url, data);
  }

  public GetBook_Physio_AppointmentCount(appdate: any, physioid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetBook_Physio_AppointmentCount?AppointmentDate=' +
        appdate +
        '&PhysioID=' +
        physioid
    );
  }

  public GetMidwifeWorkingDetailsDyWise(
    nurseid: any,
    slotypeid: any,
    StartDate: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetMidwifeWorkingDetailsDyWise?MidwifeID=' +
        nurseid +
        '&SlotTypeID=' +
        slotypeid +
        '&StartDate=' +
        StartDate +
        '&LanguageID=' +
        lid
    );
  }

  public GetMidwifeAppointmentdabySlot(
    midwifeid: any,
    slotid: any,
    appdate: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetMidwifeAppointmentdabySlot?MidWivesID=' +
        midwifeid +
        '&DoctorSlotID=' +
        slotid +
        '&ApptDatetime=' +
        appdate
    );
  }

  public GetMidwifeCancelledAppointmentByDateWise(
    midwifeid: any,
    slotid: any,
    appdate: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetMidwifeCancelledAppointmentByDateWise?MidwifeID=' +
        midwifeid +
        '&DoctorSlotID=' +
        slotid +
        '&ApptDatetime=' +
        appdate
    );
  }

  public InsertMidwifeWorkingDetails_DateWise(data: any) {
    this.url = this.host + '/Admin/InsertMidwifeWorkingDetails_DateWise';
    return this.http.post(this.url, data);
  }

  public GetBook_Midwives_AppointmentCount(appdate: any, MidwifeID: any) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetBook_Midwives_AppointmentCount?AppointmentDate=' +
        appdate +
        '&MidwifeID=' +
        MidwifeID
    );
  }

  public GetAllProvidersByPinAndUname(pino: any, uname: any, typeid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetAllProvidersByPinAndUname?Pinno=' +
        pino +
        '&UserName=' +
        uname +
        '&TypeID=' +
        typeid
    );
  }

  public GetRoleTypesMasterBYIDForgotpassword(lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetRoleTypesMasterBYIDForgotpassword?LanguageID=' +
        lid
    );
  }

  public UpdateForgotPsswords(data: any) {
    this.url = this.host + '/Doctor/UpdateForgotPsswords';
    return this.http.post(this.url, data);
  }

  public SendTwillioSMS(phoneno: any, msg: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/TelmaAPI?PhoneNumber=' + phoneno + '&Message=' + msg
    );
  }

  public UpdateRecpPsswords(data: any) {
    this.url = this.host + '/Doctor/UpdateRecpPsswords';
    return this.http.post(this.url, data);
  }
  public GetNotifications(cid: any, lid: any) {
    return this.http.get<any[]>(
      this.host2 +
        '/Master/GetNotifications?countrymangerID=' +
        cid +
        '&LanguageID=' +
        lid
    );
  }
  public updateseenbitcontrymanager(id: any) {
    return this.http.get<any[]>(
      this.host2 + '/Master/UpdateNotificationSeen?ID=' + id
    );
  }
  public GetChapterMaster(lid: any, typeid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetChapterMaster?LanguageID=' +
        lid +
        '&Typeid=' +
        typeid
    );
  }
  public GetQuickGuideByWeb(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetQuickGuideByWeb?LanguageID=' + lid
    );
  }

  public GetServerDateAndTime() {
    return this.http.get<any[]>(this.host + '/Doctor/GetServerDateAndTime');
  }

  public UpdateProvidersAuditReport(id: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/UpdateProvidersAuditReport?ID=' + id
    );
  }

  public GetAllHospitalSubscriptionRevenue(
    sdate: any,
    edate: any,
    hospitalid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/BookAppointment/GetAllHospitalSubscriptionRevenue?Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&HospitalID=' +
        hospitalid
    );
  }

  public GetDiagnosticCenterDetailsByID(id: any) {
    return this.http.get<any[]>(
      this.host + '/Diagnostic/GetDiagnosticCenterDetailsByID?ID=' + id
    );
  }

  public GetDiagnosticTestTypeMasterByLanguageID(lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetDiagnosticTestTypeMasterByLanguageID?LanguageID=' +
        lid
    );
  }

  public GetDiagnosticCenterListByLanguageID(lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetDiagnosticCenterListByLanguageID?LanguageID=' +
        lid
    );
  }

  public GetDiagnosticTestMasterByLanguageID(lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetDiagnosticTestMasterByLanguageID?LanguageID=' +
        lid
    );
  }

  public InsertDiagnosticCenterPackages(data: any) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticCenterPackages';
    return this.http.post(this.url, data);
  }

  public InsertDiagnosticPackageRelatedTests(data: any) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticPackageRelatedTests';
    return this.http.post(this.url, data);
  }

  public GetDiagnosticTestMasterTests(lid: any, DiagnosticID: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDiagnosticTestMasterTests?LanguageID=' +
        lid +
        '&DiagnosticID=' +
        DiagnosticID
    );
  }
  public InsertDiagnosticCenterTests(data: any) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticCenterTests';
    return this.http.post(this.url, data);
  }
  public UpdateDiagnosticCenterPackages(data: any) {
    this.url = this.host + '/Hospital/UpdateDiagnosticCenterPackages';
    return this.http.post(this.url, data);
  }

  public GetNurseRegistrationByIDAndLanguageID(did: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetNurseRegistrationByIDAndLanguageID?ID=' +
        did +
        '&LanguageID=' +
        lid
    );
  }

  public UpdateNurseRegistration(data: any) {
    this.url = this.host + '/Admin/UpdateNurseRegistration';
    return this.http.post(this.url, data);
  }
  public UpdateNurseRegistrationPhoto(data: any) {
    this.url = this.host + '/Master/UpdateNurseRegistrationPhoto';
    return this.http.post(this.url, data);
  }

  public GePhysiotherapyRegistrationByIDandLanguageID(did: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GePhysiotherapyRegistrationByIDandLanguageID?ID=' +
        did +
        '&LanguageID=' +
        lid
    );
  }

  public UpdatePhysiotherapyRegistrationPhoto(data: any) {
    this.url = this.host + '/Master/UpdatePhysiotherapyRegistrationPhoto';
    return this.http.post(this.url, data);
  }

  public UpdatephysiotherapyRegistration(data: any) {
    this.url = this.host + '/Admin/UpdatephysiotherapyRegistration';
    return this.http.post(this.url, data);
  }

  public GetMidWivesRegistrationByIDAndLanguageID(did: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetMidWivesRegistrationByIDAndLanguageID?ID=' +
        did +
        '&LanguageID=' +
        lid
    );
  }

  public UpdateMidWivesRegistration(data: any) {
    this.url = this.host + '/Admin/UpdateMidWivesRegistration';
    return this.http.post(this.url, data);
  }

  public UpdateMidWivesRegistrationPhoto(data: any) {
    this.url = this.host + '/Master/UpdateMidWivesRegistrationPhoto';
    return this.http.post(this.url, data);
  }
  public GetPhamacyDetailsForAdminByLanguageID(did: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetPhamacyDetailsForAdminByLanguageID?PharmacyID=' +
        did +
        '&LanguageID=' +
        lid
    );
  }

  public UpdatePharmacyProfile(data: any) {
    this.url = this.host + '/Pharmacy/UpdatePharmacyProfile';
    return this.http.post(this.url, data);
  }

  public UpdatePharmacyPhotos(data: any) {
    this.url = this.host + '/Pharmacy/UpdatePharmacyPhotos';
    return this.http.post(this.url, data);
  }

  public GetDiagnosticDetailsForAdminByLanguageID(did: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetDiagnosticDetailsForAdminByLanguageID?DiagnosticID=' +
        did +
        '&LanguageID=' +
        lid
    );
  }

  public UpdateDiagnosticCenterProfile(data: any) {
    this.url = this.host + '/Diagnostic/UpdateDiagnosticCenterProfile';
    return this.http.post(this.url, data);
  }

  public UpdateDiagnosticCenterPhotos(data: any) {
    this.url = this.host + '/Diagnostic/UpdateDiagnosticCenterPhotos';
    return this.http.post(this.url, data);
  }

  public UpdateHospitalClinicProfile(data: any) {
    this.url = this.host + '/Hospital/UpdateHospitalClinicProfile';
    return this.http.post(this.url, data);
  }

  public UpdateHospital_ClinicDetailsMasterPhoto(data: any) {
    this.url = this.host + '/Hospital/UpdateHospital_ClinicDetailsMasterPhoto';
    return this.http.post(this.url, data);
  }
  public GetDoctorDetailsForAdminByLanguageID(did: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetDoctorDetailsForAdminByLanguageID?DoctorID=' +
        did +
        '&LanguageID=' +
        lid
    );
  }
  public GetDoctorEducationWebByLanguageID(did: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetDoctorEducationWebByLanguageID?DoctorID=' +
        did +
        '&LanguageID=' +
        lid
    );
  }

  public UpdateDoctorPersonelInfo(data: any) {
    this.url = this.host + '/Doctor/UpdateDoctorPersonelInfo';
    return this.http.post(this.url, data);
  }
  public UpdateDoctorMedicalRegistration(data: any) {
    this.url = this.host + '/Doctor/UpdateDoctorMedicalRegistration';
    return this.http.post(this.url, data);
  }
  public UpdateDoctorRegistrationPhoto(data: any) {
    this.url = this.host + '/Doctor/UpdateDoctorRegistrationPhoto';
    return this.http.post(this.url, data);
  }
  public GetDiagnosticSlotMasterByTimeID(timeid: any) {
    return this.http.get<any[]>(
      this.host + '/Diagnostic/GetDiagnosticSlotMasterByTimeID?TimeID=' + timeid
    );
  }
  public InsertDiagnosticRelatedSlots(data: any) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticRelatedSlots';
    return this.http.post(this.url, data);
  }

  public GetDiagnosticSlots(did: any, lid: any, typeid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Diagnostic/GetDiagnosticSlots?DiagnosticCenterID=' +
        did +
        '&LanguageID=' +
        lid +
        '&TypeIDs=' +
        typeid
    );
  }

  public InsertDiagnosticRelatedSlotsWeb(data: any) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticRelatedSlotsWeb';
    return this.http.post(this.url, data);
  }
  public DeleteDiagnosticRelatedSlots(id: any) {
    return this.http.get<any[]>(
      this.host + '/Diagnostic/DeleteDiagnosticRelatedSlots?ID=' + id
    );
  }
  public UpdateDiagnosticRelatedSlotsWeb(data: any) {
    this.url = this.host + '/Diagnostic/UpdateDiagnosticRelatedSlotsWeb';
    return this.http.post(this.url, data);
  }
  public GetDiaGnosticSlotsByCalender(
    did: any,
    lid: any,
    appdate: any,
    typeids: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Diagnostic/GetDiaGnosticSlotsByCalender?DiagnosticCenterID=' +
        did +
        '&LanguageID=' +
        lid +
        '&AppointmentDate=' +
        appdate +
        '&TypeIDs=' +
        typeids
    );
  }

  public InsertDiagnosticRelatedSlotsByDateWise(data: any) {
    this.url = this.host + '/Diagnostic/InsertDiagnosticRelatedSlotsByDateWise';
    return this.http.post(this.url, data);
  }
  public GetDiagnosticCancelledAppointmentByDateWise(
    diagnosticid: any,
    slotid: any,
    appdate: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Diagnostic/GetDiagnosticCancelledAppointmentByDateWise?DiagnosticID=' +
        diagnosticid +
        '&DiagnosticSlotID=' +
        slotid +
        '&ApptDatetime=' +
        appdate
    );
  }

  public GetDiagnosticSlotsByIDPlanning(startid: any, endid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Diagnostic/GetDiagnosticSlotsByIDPlanning?StartID=' +
        startid +
        '&EndID=' +
        endid
    );
  }

  public GetRoleTypesMasterByAdminLogins(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetRoleTypesMasterByAdminLogins?LanguageID=' + lid
    );
  }

  public InsertUsers_RoleMapping(data: any) {
    this.url = this.host + '/Doctor/InsertUsers_RoleMapping';
    return this.http.post(this.url, data);
  }
  public GetUsers_RoleMapping(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetUsers_RoleMapping?LanguageID=' + lid
    );
  }
  public UpdateUsers_RoleMapping(data: any) {
    this.url = this.host + '/Doctor/UpdateUsers_RoleMapping';
    return this.http.post(this.url, data);
  }

  public InsertSponsoredHospitals(data: any) {
    this.url = this.host + '/Hospital/InsertSponsoredHospitals';
    return this.http.post(this.url, data);
  }
  public GetSponsoredHospitalsForAdmin() {
    return this.http.get<any[]>(
      this.host + '/Hospital/GetSponsoredHospitalsForAdmin'
    );
  }

  public DisableSponsoredHospitals(hosid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Hospital/DisableSponsoredHospitals?Hospital_ClinicID=' +
        hosid
    );
  }
  public EnableSponsoredHospitals(hosid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Hospital/EnableSponsoredHospitals?Hospital_ClinicID=' +
        hosid
    );
  }
  public UpdateSponsoredHospitals(data: any) {
    this.url = this.host + '/Hospital/UpdateSponsoredHospitals';
    return this.http.post(this.url, data);
  }

  public GetSponsoredDiagnosticCenterForAdmin() {
    return this.http.get<any[]>(
      this.host + '/Diagnostic/GetSponsoredDiagnosticCenterForAdmin'
    );
  }

  public DisableSponsoredDiagnosticCenter(id: any) {
    return this.http.get<any[]>(
      this.host +
        '/Diagnostic/DisableSponsoredDiagnosticCenter?DiagnosticID=' +
        id
    );
  }

  public EnableSponsoredDiagnosticCenter(id: any) {
    return this.http.get<any[]>(
      this.host +
        '/Diagnostic/EnableSponsoredDiagnosticCenter?DiagnosticID=' +
        id
    );
  }

  public InsertSponsoredDiagnosticCenter(data: any) {
    this.url = this.host + '/Diagnostic/InsertSponsoredDiagnosticCenter';
    return this.http.post(this.url, data);
  }

  public UpdateSponsoredDiagnosticCenter(data: any) {
    this.url = this.host + '/Diagnostic/UpdateSponsoredDiagnosticCenter';
    return this.http.post(this.url, data);
  }
  public InsertSponsoredPharmacy(data: any) {
    this.url = this.host + '/Pharmacy/InsertSponsoredPharmacy';
    return this.http.post(this.url, data);
  }

  public GetSponsoredPharmacyForAdmin() {
    return this.http.get<any[]>(
      this.host + '/Pharmacy/GetSponsoredPharmacyForAdmin'
    );
  }
  public UpdateSponsoredPharmacy(data: any) {
    this.url = this.host + '/Pharmacy/UpdateSponsoredPharmacy';
    return this.http.post(this.url, data);
  }

  public EnableSponsoredPharmacy(id: any) {
    return this.http.get<any[]>(
      this.host + '/Pharmacy/EnableSponsoredPharmacy?PharmacyID=' + id
    );
  }
  public DisableSponsoredPharmacy(id: any) {
    return this.http.get<any[]>(
      this.host + '/Pharmacy/DisableSponsoredPharmacy?PharmacyID=' + id
    );
  }

  public InsertSponcered_Adds(data: any) {
    this.url = this.host + '/BookAppointment/InsertSponcered_Adds';
    return this.http.post(this.url, data);
  }

  public UpdateSponcered_Adds(data: any) {
    this.url = this.host + '/BookAppointment/UpdateSponcered_Adds';
    return this.http.post(this.url, data);
  }

  public GetSponcered_AddsMobile(LanguageID: any) {
    return this.http.get<any[]>(
      this.host +
        '/BookAppointment/GetSponcered_AddsMobile?LanguageID=' +
        LanguageID
    );
  }

  public DeleteSponcered_Adds(lid: any) {
    return this.http.get<any[]>(
      this.host + '/BookAppointment/DeleteSponcered_Adds?ID=' + lid
    );
  }

  public GetAppPageSponsorship() {
    return this.http.get<any[]>(
      this.host + '/BookAppointment/GetAppPageSponsorship'
    );
  }

  public InsertAppPageSponsorship(data: any) {
    this.url = this.host + '/BookAppointment/InsertAppPageSponsorship';
    return this.http.post(this.url, data);
  }

  public UpdateAppPageSponsorship(data: any) {
    this.url = this.host + '/BookAppointment/UpdateAppPageSponsorship';
    return this.http.post(this.url, data);
  }

  public DeleteAppPageSponsorship(lid: any) {
    return this.http.get<any[]>(
      this.host + '/BookAppointment/DeleteAppPageSponsorship?ID=' + lid
    );
  }
  public GetDoctorCommissionFeesByAdminRevenue(
    sdate: any,
    edate: any,
    hospitalid: any,
    cityid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctorCommissionFeesByAdminRevenue?Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&HospitalID=' +
        hospitalid +
        '&CityID=' +
        cityid
    );
  }
  public GetNurseAllRevenueByAdmin(
    sdate: any,
    edate: any,
    hospitalid: any,
    cityid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetNurseAllRevenueByAdmin?Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&HospitalID=' +
        hospitalid +
        '&CityID=' +
        cityid
    );
  }

  public GetMidWifeCommissionDeatailsAdminRevenue(
    sdate: any,
    edate: any,
    hospitalid: any,
    cityid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetMidWifeCommissionDeatailsAdminRevenue?Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&HospitalID=' +
        hospitalid +
        '&CityID=' +
        cityid
    );
  }

  public GetPhsyioTherapistCommissionDeatailsAdminRevenue(
    sdate: any,
    edate: any,
    HospitalID: any,
    cityid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetPhsyioTherapistCommissionDeatailsAdminRevenue?Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&HospitalID=' +
        HospitalID +
        '&CityID=' +
        cityid
    );
  }

  public GetIndependentMidWifeRevenueByMidwifeID(
    sdate: any,
    edate: any,
    midwifeid: any,
    cityid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetIndependentMidWifeRevenueByMidwifeID?Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&MidWifeID=' +
        midwifeid +
        '&CityID=' +
        cityid
    );
  }
  public GetHospitalRevenue(
    sdate: any,
    edate: any,
    hospitalid: any,
    cityid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetHospitalRevenue?Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&HospitalID=' +
        hospitalid +
        '&CityID=' +
        cityid
    );
  }

  public GetDoctorCommissionFeesByAdminRevenueForIndependentDoctor(
    sdate: any,
    edate: any,
    hospitalid: any,
    cityid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctorCommissionFeesByAdminRevenueForIndependentDoctor?Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&HospitalID=' +
        hospitalid +
        '&CityID=' +
        cityid
    );
  }

  public GeIndependentnurserevenueByNurseID(
    sdate: any,
    edate: any,
    nurseid: any,
    cityid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GeIndependentnurserevenueByNurseID?Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&NurseID=' +
        nurseid +
        '&CityID=' +
        cityid
    );
  }

  public GetPhsyioTherapistindependentRevenueByphysioID(
    sdate: any,
    edate: any,
    physioid: any,
    cityid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetPhsyioTherapistindependentRevenueByphysioID?Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&PhysioID=' +
        physioid +
        '&CityID=' +
        cityid
    );
  }

  public GetDoctorForAdminByLanguageIDIndependentDoctors(lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctorForAdminByLanguageIDIndependentDoctors?LanguageID=' +
        lid
    );
  }

  public GetAllCountryManagerReports(
    sdate: any,
    edtae: any,
    typeid: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetAllCountryManagerReports?Sdate=' +
        sdate +
        '&Edate=' +
        edtae +
        '&TypeID=' +
        typeid +
        '&LanguageID=' +
        lid
    );
  }

  public GetPharmcyOrders_PaymentsReport(sdate: any, edate: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Pharmacy/GetPharmcyOrders_PaymentsReport?StartDate=' +
        sdate +
        '&EndDate=' +
        edate +
        '&LanguageID=' +
        lid
    );
  }
  public GetDianosticAppointments_PaymentsReport(
    sdate: any,
    edate: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Pharmacy/GetDianosticAppointments_PaymentsReport?StartDate=' +
        sdate +
        '&EndDate=' +
        edate +
        '&LanguageID=' +
        lid
    );
  }

  public GetDiagnosticDetailsForWeb(sdate: any, edate: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Master/GetDiagnosticDetailsForWeb?SDate=' +
        sdate +
        '&EDate=' +
        edate +
        '&LanguageID=' +
        lid
    );
    return this.http.get(this.url);
  }

  public GetVoiladocRegistrationsUsers(
    sdate: any,
    edate: any,
    typeid: any,
    langugeid: any
  ) {
    return this.http.get<any[]>(
      this.host2 +
        '/Master/GetVoiladocRegistrationsUsers?Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&TypeID=' +
        typeid +
        '&LanguageID=' +
        langugeid
    );
  }

  public GetAllRegisteredUsersCount(sdate: any, edate: any) {
    return this.http.get<any[]>(
      this.host2 +
        '/Master/GetAllRegisteredUsersCount?StartDate=' +
        sdate +
        '&Enddate=' +
        edate
    );
  }

  public GetLinkForRegistrations(sdate: any, edate: any, lid: any) {
    return this.http.get<any[]>(
      this.host2 +
        '/Master/GetVoiladocRegistrationEmails?Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&LanguageID=' +
        lid
    );
  }
  public sendemailsForLinkRegistrations(data: any) {
    this.url = this.host + '/Doctor/sendemailsForLinkRegistrations';
    return this.http.post(this.url, data);
  }

  public strongpassword(input: any) {
    var passworddetails = /^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,15})$/;
    return passworddetails.test(input);
  }

  public InsertLinkForRegistrations(data: any) {
    this.url = this.host2 + '/Master/insertVoiladocRegistrationEmails';
    return this.http.post(this.url, data);
  }
  public UpdateApprovedVoiladocRegisteredUsers(id: any, typeid: any) {
    return this.http.get<any[]>(
      this.host2 +
        '/Master/UpdateApprovedVoiladocRegisteredUsers?ID=' +
        id +
        '&TypeID=' +
        typeid
    );
  }

  public UpdateVoiladocRegistrationEmailsStatus(id: any) {
    return this.http.get<any[]>(
      this.host2 + '/Master/UpdateVoiladocRegistrationEmailsStatus?ID=' + id
    );
  }

  public UpdateApprovedVoiladocRegisteredUsersAndUnApprove(
    id: any,
    typeid: any
  ) {
    return this.http.get<any[]>(
      this.host2 +
        '/Master/UpdateApprovedVoiladocRegisteredUsersAndUnApprove?ID=' +
        id +
        '&TypeID=' +
        typeid
    );
  }
  public UpdateVoiladocRegistrationEmailsStatusBackNormal(id: any) {
    return this.http.get<any[]>(
      this.host2 +
        '/Master/UpdateVoiladocRegistrationEmailsStatusBackNormal?ID=' +
        id
    );
  }

  public InsertPhysiotherapistLogin(data: any) {
    this.url = this.host + '/Admin/InsertPhysiotherapistLogin';
    return this.http.post(this.url, data);
  }

  public InsertMidWivesLogin(data: any) {
    this.url = this.host + '/Admin/InsertMidWivesLogin';
    return this.http.post(this.url, data);
  }
  public InsertPharmacyAdminRegistration(data: any) {
    this.url = this.host + '/Pharmacy/InsertPharmacyAdminRegistration';
    return this.http.post(this.url, data);
  }

  public InsertDiagnosticCenterAdminRegistration(data: any) {
    this.url =
      this.host + '/Diagnostic/InsertDiagnosticCenterAdminRegistration';
    return this.http.post(this.url, data);
  }

  public UpdateRejectedVoiladocRegisteredUsers(id: any, typeid: any) {
    return this.http.get<any[]>(
      this.host2 +
        '/Master/UpdateRejectedVoiladocRegisteredUsers?ID=' +
        id +
        '&TypeID=' +
        typeid
    );
  }

  public GetAllIndepenedentSubscriptionRevenueByTypeID(
    sdate: any,
    edate: any,
    hospitalid: any,
    typeid: any,
    homecareid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/BookAppointment/GetAllIndepenedentSubscriptionRevenueByTypeID?Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&HospitalID=' +
        hospitalid +
        '&TypeID=' +
        typeid +
        '&HomeCarePersonID=' +
        homecareid
    );
  }

  public GetAllIndepenedentSubscriptionRevenue(
    sdate: any,
    edate: any,
    hospitalid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/BookAppointment/GetAllIndepenedentSubscriptionRevenue?Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&HospitalID=' +
        hospitalid
    );
  }

  public GetAllProvidersRevenueReports(
    hosid: any,
    sdate: any,
    edate: any,
    typeid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetAllProvidersRevenueReports?HospitalID=' +
        hosid +
        '&Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&TypeID=' +
        typeid
    );
  }

  public GetAllInClinicRevenueReports(
    hosid: any,
    sdate: any,
    edate: any,
    typeid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetAllInClinicRevenueReports?HospitalID=' +
        hosid +
        '&Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&TypeID=' +
        typeid
    );
  }

  public GetAllClinicSubscriptionRevenue(
    sdate: any,
    edate: any,
    hospitalid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetAllClinicSubscriptionRevenue?Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&HospitalID=' +
        hospitalid
    );
  }

  public GetPhamacyDetailsForWeb(sdate: any, edate: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Master/GetPhamacyDetailsForWeb?SDate=' +
        sdate +
        '&EDate=' +
        edate +
        '&LanguageID=' +
        lid
    );
    return this.http.get(this.url);
  }

  public GetDiaPharmacCounts(sdate: any, edate: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Pharmacy/GetDiaPharmacCounts?StartDate=' +
        sdate +
        '&EndDate=' +
        edate +
        '&LanguageID=' +
        lid
    );
  }

  public GetAllProvidersMontlySubscriptions(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetAllProvidersMontlySubscriptions?LanguageID=' + lid
    );
  }

  public GetAllAppointmentsForHosp(sdate: any, edate: any) {
    return this.http.get<any[]>(
      this.host +
        '/Master/GetAllAppointmentsForHosp?SDate=' +
        sdate +
        '&EDate=' +
        edate
    );
    return this.http.get(this.url);
  }

  public GetAllAppointmentsForClinics(sdate: any, edate: any) {
    return this.http.get<any[]>(
      this.host +
        '/Master/GetAllAppointmentsForClinics?SDate=' +
        sdate +
        '&EDate=' +
        edate
    );
    return this.http.get(this.url);
  }

  public GetNotifications_DoctorByDoctorIDTop1(did: any) {
    return this.http.get<any[]>(
      this.host +
        '/Diagnostic/GetNotifications_DoctorByDoctorIDTop1?DoctorID=' +
        did
    );
  }

  public GetNotifications_DoctorByDoctorIDShowNoti(did: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetNotifications_DoctorByDoctorIDShowNoti?DoctorID=' +
        did
    );
  }

  public UpdateNotifications_DoctorNotiSeen(did: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/UpdateNotifications_DoctorNotiSeen?ID=' + did
    );
  }

  public DisableDoctorLogin(id: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/DisableDoctorLogin?DoctorID=' + id
    );
  }

  public EnableDoctorLogin(docid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/EnableDoctorLogin?DoctorID=' + docid
    );
  }

  public GetBookAppointmentByDOctorss(lid: any, pid: any, typeid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetBookAppointmentByDOctorss?LanguageID=' +
        lid +
        '&DoctorID=' +
        pid +
        '&TypeID=' +
        typeid
    );
  }

  public DoctorPdfreports(files: any) {
    let formdata: FormData = new FormData();
    formdata.append('file_upload', files, files.name);
    return this.http.post(this.host + '/Doctor/DoctorPdfreports/', formdata);
  }

  public GetCancelledAppointmentReportsForDoctor(
    docid: any,
    sdate: any,
    edate: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetCancelledAppointmentReportsForDoctor?DoctorID=' +
        docid +
        '&StartDate=' +
        sdate +
        '&EndDate=' +
        edate +
        '&LanguageID=' +
        lid
    );
  }

  public GetCancelledAppointmentReportsForDoctorwEB(
    sdate: any,
    edate: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Master/GetCancelledAppointmentReportsForDoctorwEB?StartDate=' +
        sdate +
        '&EndDate=' +
        edate +
        '&LanguageID=' +
        lid
    );
    return this.http.get(this.url);
  }

  public GetCancelledAppointmentReportsForVideoAppts(
    sdate: any,
    edate: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Master/GetCancelledAppointmentReportsForVideoAppts?StartDate=' +
        sdate +
        '&EndDate=' +
        edate +
        '&LanguageID=' +
        lid
    );
    return this.http.get(this.url);
  }

  public GetAppointmentReportsForHomeAppts(sdate: any, edate: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Master/GetCancelledAppointmentReportsForDoctorwEBHomevisit?StartDate=' +
        sdate +
        '&EndDate=' +
        edate +
        '&LanguageID=' +
        lid
    );
    return this.http.get(this.url);
  }

  public GetDiagnosticAppointmentsByApprovedReportsWeb(
    sdate: any,
    edate: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Master/GetDiagnosticAppointmentsByApprovedReportsWeb?StartDate=' +
        sdate +
        '&EndDate=' +
        edate +
        '&LanguageID=' +
        lid
    );
    return this.http.get(this.url);
  }

  public GetDiagnosticAppointmentsByApprovedReports(
    diaid: any,
    sdate: any,
    enddate: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDiagnosticAppointmentsByApprovedReports?DiagnosticCenterID=' +
        diaid +
        '&StartDate=' +
        sdate +
        '&EndDate=' +
        enddate +
        '&LanguageID=' +
        lid
    );
  }

  public GetPatient_TextMedicineDetailsForWeb(
    sdate: any,
    edate: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Master/GetPatient_TextMedicineDetailsForWeb?SDate=' +
        sdate +
        '&EDate=' +
        edate +
        '&LanguageID=' +
        lid
    );
    return this.http.get(this.url);
  }

  public GetPatient_TextMedicineDetails(
    phaid: any,
    sdate: any,
    enddate: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetPatient_TextMedicineDetails?PharmacyID=' +
        phaid +
        '&SDate=' +
        sdate +
        '&EDate=' +
        enddate +
        '&LanguageID=' +
        lid
    );
  }

  public GetPatientOrderedMedicines(orderid: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Pharmacy/GetPatientOrderedMedicines?OrderID=' +
        orderid +
        '&LanguageID=' +
        lid
    );
  }

  public GetBook_Physio_AppointmentForWeb(sdate: any, edate: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Master/GetBook_Physio_AppointmentForWeb?SDate=' +
        sdate +
        '&EDate=' +
        edate +
        '&LanguageID=' +
        lid
    );
    return this.http.get(this.url);
  }

  public GetBook_Physio_AppointmentReports(
    physioid: any,
    sdate: any,
    edate: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetBook_Physio_AppointmentReports?PhysioID=' +
        physioid +
        '&SDate=' +
        sdate +
        '&EDate=' +
        edate +
        '&LanguageID=' +
        lid
    );
  }

  public GetBook_Book_Midwives_AppointmentReports(
    midwiveid: any,
    sdate: any,
    edate: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetBook_Book_Midwives_AppointmentReports?MidWivesID=' +
        midwiveid +
        '&SDate=' +
        sdate +
        '&EDate=' +
        edate +
        '&LanguageID=' +
        lid
    );
  }

  public GetBook_Book_Midwives_AppointmentForWeb(
    sdate: any,
    edate: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Master/GetBook_Book_Midwives_AppointmentForWeb?SDate=' +
        sdate +
        '&EDate=' +
        edate +
        '&LanguageID=' +
        lid
    );
    return this.http.get(this.url);
  }
  public GetBook_Nurse_AppointmentForWeb(sdate: any, edate: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Master/GetBook_Nurse_AppointmentForWeb?SDate=' +
        sdate +
        '&EDate=' +
        edate +
        '&LanguageID=' +
        lid
    );
    return this.http.get(this.url);
  }

  public GetBook_Nurse_AppointmentReports(
    nurseid: any,
    sdate: any,
    edate: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetBook_Nurse_AppointmentReports?NurseID=' +
        nurseid +
        '&SDate=' +
        sdate +
        '&EDate=' +
        edate +
        '&LanguageID=' +
        lid
    );
  }

  public GetSubscriptionPayTypeMaster() {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetSubscriptionPayTypeMaster'
    );
  }

  public GetDoctorLoginForDash(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetDoctorLoginForDash?LanguageID=' + lid
    );
  }

  generateRandomPassword() {
    var result = '';
    length = 8;
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public UpdateDiagnosticCenterTests(data: any) {
    this.url = this.host + '/Diagnostic/UpdateDiagnosticCenterTests';
    return this.http.post(this.url, data);
  }

  public GetNotification_Pharmacy(pharmacyid: any) {
    return this.http.get<any[]>(
      this.host + '/Pharmacy/GetNotification_Pharmacy?PharmacyID=' + pharmacyid
    );
  }

  public GetLocalDoctorRegistration(id: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetLocalDoctorRegistration?LanguageID=' + id
    );
  }

  public DeleteLocalDoctorRegistration(id: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/DeleteLocalDoctorRegistration?ID=' + id
    );
  }

  public InsertLocalDoctorRegistration(data: any) {
    this.url = this.host + '/Doctor/InsertLocalDoctorRegistration';
    return this.http.post(this.url, data);
  }

  public UpdateLocalDoctorRegistration(data: any) {
    this.url = this.host + '/Doctor/UpdateLocalDoctorRegistration';
    return this.http.post(this.url, data);
  }

  public InsertDeliveryCompany(data: any) {
    this.url = this.host + '/Admin/InsertDeliveryCompany';
    return this.http.post(this.url, data);
  }

  public GetDeliveryCompanyByIDAndLanguageID(did: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetDeliveryCompanyByIDAndLanguageID?ID=' +
        did +
        '&LanguageID=' +
        lid
    );
  }

  public UpdateDeliveryCompany(data: any) {
    this.url = this.host + '/Admin/UpdateDeliveryCompany';
    return this.http.post(this.url, data);
  }

  public GetArticleForAdminForWeb() {
    return this.http.get<any[]>(this.host + '/Doctor/GetArticleForAdminForWeb');
  }

  public GetAdmin_RegisterLogins_Label(lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/LanguageMaster/GetAdmin_RegisterLogins_Label?LanguageID=' +
        lid
    );
  }

  public GetDisableArticle(id: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetDisableArticle?ID=' + id
    );
  }

  public GetEnableArticle(id: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetEnableArticle?ID=' + id
    );
  }

  public InsertArticle(data: any) {
    this.url = this.host + '/Articles/InsertArticle';
    return this.http.post(this.url, data);
  }

  public GetArticleCategory(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Articles/GetArticleCategory?LanguageID=' + lid
    );
  }

  public UpdateArticle(data: any) {
    this.url = this.host + '/Articles/UpdateArticle';
    return this.http.post(this.url, data);
  }

  public GetPharmacyPhotos(pid: any) {
    return this.http.get<any[]>(
      this.host + '/Pharmacy/GetPharmacyPhotos?PharmacyID=' + pid
    );
  }
  public GetDiagnosticCenterPhotosByID(diaid: any) {
    return this.http.get<any[]>(
      this.host + '/Diagnostic/GetDiagnosticCenterPhotosByID?ID=' + diaid
    );
  }

  public GetHospital_ClinicPhotosByHospitalclinicID(id: any) {
    return this.http.get<any[]>(
      this.host +
        '/Hospital/GetHospital_ClinicPhotosByHospitalclinicID?Hospital_ClinicID=' +
        id
    );
  }

  public UpdateHospital_ClinicPhotos(data: any) {
    this.url = this.host + '/Hospital/UpdateHospital_ClinicPhotos';
    return this.http.post(this.url, data);
  }

  public GetDoctorIdentityProofs(docid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetDoctorIdentityProofs?DoctorID=' + docid
    );
  }

  public UpdateDoctorIdentityProofs(data: any) {
    this.url = this.host + '/Doctor/UpdateDoctorIdentityProofs';
    return this.http.post(this.url, data);
  }
  public DeleteAllPhotos(id: any, typeID: number) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/DeleteAllPhotos?ID=' +
        id +
        '&TypeID=' +
        typeID +
        '&EmailID=dsf'
    );
  }
  public DeleteArticle(lid: number) {
    return this.http.get<any[]>(
      this.host + '/Articles/DeleteArticle?ID=' + lid
    );
  }
  public UpdateSoundSeen(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/UpdateSoundSeen?ID=' + lid
    );
  }

  public GetMenuRoleMappingTableByRoleID(lid: any, roleid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetMenuRoleMappingTableByRoleID?LanguageID=' +
        lid +
        '&RoleID=' +
        roleid
    );
  }

  public InsertNotifications(data: any) {
    this.url = this.host + '/PatientRegistration/InsertNotifications';
    return this.http.post(this.url, data);
  }

  public UpdateWebSampleCollection(id: any) {
    return this.http.get<any[]>(
      this.host + '/Diagnostic/UpdateWebSampleCollection?ID=' + id
    );
  }

  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  setData(data: any) {
    this.dataSubject.next(data);
  }
  clearData() {
    this.dataSubject.next(null);
  }
}
