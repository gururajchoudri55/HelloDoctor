import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private host: any = environment.API_URL;

  public hotsurl_check: any = this.host;

  private url: string = '';

  constructor(private http: HttpClient) {}

  public GetDoctors_PersonalFolder(doctorid: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctors_PersonalFolder?DoctorID=' +
        doctorid +
        '&LanguageID=' +
        lid
    );
  }

  public GetBookAppointmentByHospital_ClinicID(
    hospitalid: any,
    sdate: any,
    edate: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/BookAppointment/GetBookAppointmentByHospital_ClinicID?Hospital_ClinicID=' +
        hospitalid +
        '&Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&LanguageID=' +
        lid
    );
  }

  public GetDoctorCommissionFeesByAdminRevenueByVedoevenueByDocID(
    sdate: any,
    edate: any,
    docid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctorCommissionFeesByAdminRevenueByVedoevenueByDocID?Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&DoctorID=' +
        docid
    );
  }

  public GetBookAppointmentByDocID(
    sdate: any,
    edate: any,
    docid: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Master/GetBookAppointmentByDocID?SDate=' +
        sdate +
        '&EDate=' +
        edate +
        '&DoctorID=' +
        docid +
        '&LanguageID=' +
        lid
    );
    return this.http.get(this.url);
  }

  public GetDoctorReferalsCount(lid: any, sdate: any, edate: any, langid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctorReferalsCount?AssignDoctorID=' +
        lid +
        '&Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&LanguageID=' +
        langid
    );
  }

  public UpdateUsers_RoleMapping(data: any) {
    this.url = this.host + '/Doctor/UpdateUsers_RoleMapping';
    return this.http.post(this.url, data);
  }

  public GetDoctorLoginForDash(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetDoctorLoginForDash?LanguageID=' + lid
    );
  }

  public UpdateDoctorLogins(data: any) {
    this.url = this.host + '/Doctor/UpdateDoctorLogins';
    return this.http.post(this.url, data);
  }

  public strongpassword(input: any) {
    var passworddetails = /^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,15})$/;
    return passworddetails.test(input);
  }

  public GetNotifications_DoctorByDoctorIDWeb(
    doctorid: any,
    sdate: any,
    edate: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetNotifications_DoctorByDoctorIDWeb?DoctorID=' +
        doctorid +
        '&Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&LanguageID=' +
        lid
    );
  }

  public GetIndependentDoctors_Receptionist(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetIndependentDoctors_Receptionist?LanguageID=' + lid
    );
  }

  public EnableIndependentDoctors_Receptionist(id: any) {
    return this.http.get(
      this.host + '/Doctor/EnableIndependentDoctors_Receptionist?ID=' + id
    );
  }

  public DisableIndependentDoctors_Receptionist(id: any) {
    return this.http.get(
      this.host + '/Doctor/DisableIndependentDoctors_Receptionist?ID=' + id
    );
  }

  public UpdateIndependentDoctors_Receptionist(data: any) {
    this.url = this.host + '/Doctor/UpdateIndependentDoctors_Receptionist';
    return this.http.post(this.url, data);
  }

  public InsertDoctors_PersonalFolder(data: any) {
    this.url = this.host + '/Doctor/InsertDoctors_PersonalFolder';
    return this.http.post(this.url, data);
  }

  public GetFolders_Attchments(folderid: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetFolders_Attchments?FolderID=' +
        folderid +
        '&LanguageID=' +
        lid
    );
  }

  public InsertFolders_Attchments(data: any) {
    this.url = this.host + '/Doctor/InsertFolders_Attchments';
    return this.http.post(this.url, data);
  }

  public DoctorsPersonalUploads(files: any, foldername: any) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    this.url =
      this.host + '/Doctor/DoctorsPersonalUploads?FolderName=' + foldername;
    return this.http.post(this.url, formdata);
  }

  public GetSubFolder_Attachments(folderid: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetSubFolder_Attachments?SubfolderID=' +
        folderid +
        '&LanguageID=' +
        lid
    );
  }

  public InsertSubFolder_Attachments(data: any) {
    this.url = this.host + '/Doctor/InsertSubFolder_Attachments';
    return this.http.post(this.url, data);
  }

  public GetSub_Folders_Attachemnts(folderid: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetSub_Folders_Attachemnts?SubFolders_ID=' +
        folderid +
        '&LanguageID=' +
        lid
    );
  }

  public InsertSub_Folders_Attachemnts(data: any) {
    this.url = this.host + '/Doctor/InsertSub_Folders_Attachemnts';
    return this.http.post(this.url, data);
  }

  public GetSupportForWeb(
    lid: any,
    userid: any,
    typeid: any,
    sdate: any,
    edate: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetSupportForWeb?LanguageID=' +
        lid +
        '&UserID=' +
        userid +
        '&TypeID=' +
        typeid +
        '&Sdate=' +
        sdate +
        '&Edate=' +
        edate
    );
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

  public GetDoctorCommissionFeesByAdminRevenueByInclinRevenueByDocID(
    sdate: any,
    edate: any,
    docid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctorCommissionFeesByAdminRevenueByInclinRevenueByDocID?Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&DoctorID=' +
        docid
    );
  }

  public GetBookAppointmentByDoctorID(
    doctorid: any,
    sdate: any,
    edate: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetBookAppointmentByDoctorID?DoctorID=' +
        doctorid +
        '&SDate=' +
        sdate +
        '&EDate=' +
        edate +
        '&LanguageID=' +
        lid
    );
  }

  public InsertIndependentDoctors_Receptionist(data: any) {
    this.url = this.host + '/Doctor/InsertIndependentDoctors_Receptionist';
    return this.http.post(this.url, data);
  }

  public AllFilesUploads(files: any, foldername: any) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    this.url = this.host + '/Doctor/AllFilesUploads?FolderName=' + foldername;
    return this.http.post(this.url, formdata);
  }

  public InsertSupportForWeb(data: any) {
    this.url = this.host + '/Doctor/InsertSupportForWeb';
    return this.http.post(this.url, data);
  }

  public GetBookAppointmentByDistinictDoctorID(doctorid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetBookAppointmentByDistinictDoctorID?DoctorID=' +
        doctorid
    );
  }

  public GetSoapNotesByPatientID(PatientID: any, lid: any, doctorid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetSoapNotesByPatientID?PatientID=' +
        PatientID +
        '&LanguageID=' +
        lid +
        '&DoctorID=' +
        doctorid
    );
  }

  public GetPatientDetails(id: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/PatientRegistration/GetPatientDetails?ID=' +
        id +
        '&LanguageID=' +
        lid
    );
  }

  public GetDoctor_PatientPrescriptionbyPatientDeatails(
    patientid: any,
    lid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetDoctor_PatientPrescriptionbyPatientDeatails?PateintID=' +
        patientid +
        '&LanguageID=' +
        lid
    );
  }

  public GetDoctor_PatientDiagosticApps(patientid: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctor_PatientDiagosticApps?PateintID=' +
        patientid +
        '&LanguageID=' +
        lid
    );
  }

  public GetAllHomeCareSoap(pid: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Pharmacy/GetAllHomeCareSoap?PatientID=' +
        pid +
        '&LanguageID=' +
        lid
    );
  }
  public GetBook_DoctorPatientBookedVideoConferenceByPatientID(patientid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetBook_DoctorPatientBookedVideoConferenceByPatientID?PatientID=' +
        patientid
    );
  }
  public GetDiagnostic_SoapNotesAttachmentsWeb(id: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDiagnostic_SoapNotesAttachmentsWeb?PatientID=' +
        id +
        '&LanguageID=' +
        lid
    );
  }

  public GetBookApptbyPatientID(id: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetBookApptbyPatientID?PatientID=' +
        id +
        '&LanguageID=' +
        lid
    );
  }
  public GetPatient_VaccinationDetails(PatientID: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetPatient_VaccinationDetails?PatientID=' +
        PatientID +
        '&LanguageID=' +
        lid
    );
  }

  public GetDoctor_PatientPrescriptionByID(id: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetDoctor_PatientPrescriptionByID?ID=' +
        id +
        '&LanguageID=' +
        lid
    );
  }

  public GetDoctor_PatientDiagnosticsbypatientdeatils(
    patientid: any,
    lid: any,
    doctorid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetDoctor_PatientDiagnosticsbypatientdeatils?PateintID=' +
        patientid +
        '&LanguageID=' +
        lid +
        '&DoctorID=' +
        doctorid
    );
  }
  public GetSoapNotesByID(id: any, lid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetSoapNotesByID?ID=' + id + '&LanguageID=' + lid
    );
  }

  public GetHomeCaeeSoapNotesByID(id: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Pharmacy/GetHomeCaeeSoapNotesByID?ID=' +
        id +
        '&LanguageID=' +
        lid
    );
  }
  public GetPatient_VitalDetailsByPatientID(appid: any, typeid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetPatient_VitalDetailsByPatientID?PatientID=' +
        appid +
        '&TypeID=' +
        typeid
    );
  }

  public GetAdmin_DoctorMyAppointments_Label(lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/LanguageMaster/GetAdmin_DoctorMyAppointments_Label?LanguageID=' +
        lid
    );
  }

  public GetNotifications_NPMWebCOunt(userid: any, typeid: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetNotifications_NPMWebCOunt?UserID=' +
        userid +
        '&TypeID=' +
        typeid +
        '&LanguageID=' +
        lid
    );
  }

  public GetSupportForWebNotifications(id: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetSupportForWebNotifications?LanguageID=' + id
    );
  }

  public GetNotificationssss(id: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetNotificationssss?DiagnosticID=' + id
    );
  }

  public GetNotifications_DoctorByDoctorID(did: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetNotifications_DoctorByDoctorID?DoctorID=' + did
    );
  }

  public GetBookAppointmentByHospitalPatients(
    hospitalid: any,
    startdtae: any,
    endate: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetBookAppointmentByHospitalPatients?HospitalID=' +
        hospitalid +
        '&Startdate=' +
        startdtae +
        '&Enddate=' +
        endate
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

  public GetPatientRegistration(sdate: any, edate: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Master/GetPatientRegistration?Sdate=' +
        sdate +
        '&Edate=' +
        edate +
        '&LanguageID=' +
        lid
    );
  }

  public InsertPatientRegistration(data: any) {
    this.url = this.host + '/PatientRegistration/InsertPatientRegistration';
    return this.http.post(this.url, data);
  }

  public InsertPatientWalletDetails(data: any) {
    this.url = this.host + '/Doctor/InsertPatientWalletDetails';
    return this.http.post(this.url, data);
  }
  public InsertPatientRelation_FamilyTree_Web(data: any) {
    this.url =
      this.host + '/PatientRegistration/InsertPatientRelation_FamilyTree_Web';
    return this.http.post(this.url, data);
  }

  public UpdatePatientRegistrationForWeb(data: any) {
    this.url =
      this.host + '/PatientRegistration/UpdatePatientRegistrationForWeb';
    return this.http.post(this.url, data);
  }

  public GetReceiptionistLoginDash(hosid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetReceiptionistLoginDash?HospitalID=' + hosid
    );
  }

  public UpdateReceiptionistLogin(data: any) {
    this.url = this.host + '/Admin/UpdateReceiptionistLogin';
    return this.http.post(this.url, data);
  }

  public DisableReceiptionistLogin(id: any) {
    return this.http.get(
      this.host + '/Doctor/DisableReceiptionistLogin?ID=' + id
    );
  }

  public EnableReceiptionistLogin(id: any) {
    return this.http.get(
      this.host + '/Doctor/EnableReceiptionistLogin?ID=' + id
    );
  }

  public InsertReceiptionistLogin(data: any) {
    this.url = this.host + '/Doctor/InsertReceiptionistLogin';
    return this.http.post(this.url, data);
  }

  public GetHomecareRevenueByHospitalID(
    hospitalid: any,
    sdate: any,
    edate: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/BookAppointment/GetHomecareRevenueByHospitalID?HospitalID=' +
        hospitalid +
        '&Sdate=' +
        sdate +
        '&Edate=' +
        edate
    );
  }

  public GetHospitalHomevisitAppointmentDetails(
    hospitalid: any,
    sdate: any,
    edate: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetHospitalHomevisitAppointmentDetails?HospitalID=' +
        hospitalid +
        '&Sdate=' +
        sdate +
        '&Edate=' +
        edate
    );
  }

  public GetNurse_PatientPaymentDetails(HospitalID: any) {
    return this.http.get<any[]>(
      this.host +
        '/BookAppointment/GetNurse_PatientPaymentDetails?HospitalID=' +
        HospitalID
    );
  }
  public GetNurse_AppointmentCounts(HospitalID: any) {
    return this.http.get<any[]>(
      this.host +
        '/BookAppointment/GetNurse_AppointmentCounts?HospitalID=' +
        HospitalID
    );
  }

  public GetPhysio_AppointmentCounts(HospitalID: any) {
    return this.http.get<any[]>(
      this.host +
        '/BookAppointment/GetPhysio_AppointmentCounts?HospitalID=' +
        HospitalID
    );
  }

  public GetPhysiotherapist_PatientPaymentDetails(HospitalID: any) {
    return this.http.get<any[]>(
      this.host +
        '/BookAppointment/GetPhysiotherapist_PatientPaymentDetails?HospitalID=' +
        HospitalID
    );
  }

  public GetHospitalRevenueandCounts(hsid: any, sdate: any, edate: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetHospitalRevenueandCounts?HospitalID=' +
        hsid +
        '&Sdate=' +
        sdate +
        '&Edate=' +
        edate
    );
  }

  public GetDepartmentMasterByLanguageID(lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetDepartmentMasterByLanguageID?LanguageID=' +
        lid
    );
  }

  public GetHospitalDoctorsForAdmin(hospitalid: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Hospital/GetHospitalDoctorsForAdmin?Hospital_ClinicID=' +
        hospitalid +
        '&LanguageID=' +
        lid
    );
  }

  public UpdateAcceptedBitByDoctor(id: any) {
    return this.http.get<any[]>(
      this.host +
        '/BookAppointment/UpdateAcceptedBitByDoctor?AppointmentID=' +
        id
    );
  }
  public UpdateBookAppointmentReasonForCancel(data: any) {
    this.url = this.host + '/Pharmacy/UpdateBookAppointmentReasonForCancel';
    return this.http.post(this.url, data);
  }

  public GetDoctorPrescrptionTemplates() {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetDoctorPrescrptionTemplates'
    );
  }
  public GetDrugNameMaster(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetDrugNameMaster?LanguageID=' + lid
    );
  }

  public InsertDoctor_PatientPrescription(data: any) {
    this.url = this.host + '/Doctor/InsertDoctor_PatientPrescription';
    return this.http.post(this.url, data);
  }

  public InsertDoctorPrescrptionTemplates(data: any) {
    this.url = this.host + '/Doctor/InsertDoctorPrescrptionTemplates';
    return this.http.post(this.url, data);
  }
  public GetDoctorSoapNotesTemplates() {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetDoctorSoapNotesTemplates'
    );
  }

  public InsertDoctorSoapNotesTemplates(data: any) {
    this.url = this.host + '/Doctor/InsertDoctorSoapNotesTemplates';
    return this.http.post(this.url, data);
  }
  public GetICDCodeMaster(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetICDCodeMaster?LanguageID=' + lid
    );
  }

  public UploadPatientDocuments(files: any, foldername: any) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    this.url =
      this.host + '/Doctor/UploadPatientDocuments?FolderName=' + foldername;
    return this.http.post(this.url, formdata);
  }

  public InsertDoctor_PatientSoapNotes1(data: any) {
    this.url = this.host + '/Doctor/InsertDoctor_PatientSoapNotes1';
    return this.http.post(this.url, data);
  }

  public GetBookAppointmentEarlyCallbit(appointmentid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Diagnostic/GetBookAppointmentEarlyCallbit?ID=' +
        appointmentid
    );
  }

  public UpdateBookAppointmentRefund(data: any) {
    this.url = this.host + '/Doctor/UpdateBookAppointmentRefund';
    return this.http.post(this.url, data);
  }

  public UpdatePatientWalletAmountDetailsLoadWallet(data: any) {
    this.url =
      this.host + '/Diagnostic/UpdatePatientWalletAmountDetailsLoadWallet';
    return this.http.post(this.url, data);
  }

  public UpdateBookVideoCallRejoinbit(appid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/UpdateBookVideoCallRejoinbit?ID=' + appid
    );
  }

  public UpdateBookAppointmentFollowupVisit(
    appointmentid: any,
    followappid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/UpdateBookAppointmentFollowupVisit?AppointmentID=' +
        appointmentid +
        '&FollowUpAppointmentTypeID=' +
        followappid
    );
  }
  public GetDoctor_PatientPrescriptionByDoctorIDandPatientID(
    patientid: any,
    lid: any,
    doctorid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctor_PatientPrescriptionByDoctorIDandPatientID?PateintID=' +
        patientid +
        '&LanguageID=' +
        lid +
        '&DoctorID=' +
        doctorid
    );
  }
  public GetDoctor_PatientDiagnosticsByPatient(
    patientid: any,
    lid: any,
    doctorid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctor_PatientDiagnosticsByPatient?PateintID=' +
        patientid +
        '&LanguageID=' +
        lid +
        '&DoctorID=' +
        doctorid
    );
  }
  public GetSoapNotesByApointmentID(patientid: any, lid: any, doctorid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetSoapNotesByApointmentID?ID=' +
        patientid +
        '&LanguageID=' +
        lid +
        '&DoctorID=' +
        doctorid
    );
  }

  public GetSickSlipGenaratorByPatientIDWeb(pid: any, lid: any, doctorid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetSickSlipGenaratorByPatientIDWeb?PatientID=' +
        pid +
        '&LanguageID=' +
        lid +
        '&DoctorID=' +
        doctorid
    );
  }

  public GetDiagnosticTestMasterByTestIDByLanguageID(tid: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetDiagnosticTestMasterByTestIDByLanguageID?TestTypeID=' +
        tid +
        '&LanguageID=' +
        lid
    );
  }

  public InsertDoctor_PatientDiagnostics(data: any) {
    this.url = this.host + '/Doctor/InsertDoctor_PatientDiagnostics';
    return this.http.post(this.url, data);
  }

  public InsertSickSlipGenarator(data: any) {
    this.url = this.host + '/Doctor/InsertSickSlipGenarator';
    return this.http.post(this.url, data);
  }

  public GetDoctorForAdminByLanguageID(did: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetDoctorForAdminByLanguageID?LanguageID=' +
        did
    );
  }

  public UpdateBookAppointmentNoShow(id: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/UpdateBookAppointmentNoShow?ID=' + id
    );
  }

  public InsertDoctor_PatientPrescriptionPhotoUrl(data: any) {
    this.url = this.host + '/Doctor/InsertDoctor_PatientPrescriptionPhotoUrl';
    return this.http.post(this.url, data);
  }

  public InsertDiagnostic_SoapNotesAttachments(data: any) {
    this.url = this.host + '/Doctor/InsertDiagnostic_SoapNotesAttachments';
    return this.http.post(this.url, data);
  }

  public GetPatient_Illnessphotos(appid: any) {
    return this.http.get<any[]>(
      this.host + '/Admin/GetPatient_Illnessphotos?AppoitmentID=' + appid
    );
  }

  public GetPatient_IllnessVedioes(mid: any) {
    return this.http.get<any[]>(
      this.host + '/Admin/GetPatient_IllnessVedioes?AppointmentID=' + mid
    );
  }

  public GetBookAppointmentByAppID(lid: any, pid: any, typeid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetBookAppointmentByAppID?LanguageID=' +
        lid +
        '&AppointmentID=' +
        pid +
        '&TypeID=' +
        typeid
    );
  }

  public DoctorReports(files: any, foldername: any) {
    let formdata: FormData = new FormData();
    formdata.append('file_upload', files, files.name);

    this.url =
      this.host + '/Doctor/UploadPatientDocuments?FolderName=' + foldername;
    return this.http.post(this.url, formdata);
  }

  public UpdateBookAppoinmentReceiptUrl(data: any) {
    this.url = this.host + '/Doctor/UpdateBookAppoinmentReceiptUrl';
    return this.http.post(this.url, data);
  }
  public UpdateBookAppointmentReportPdfsUrl(data: any) {
    this.url = this.host + '/Doctor/UpdateBookAppointmentReportPdfsUrl';
    return this.http.post(this.url, data);
  }

  public sendemail(data: any) {
    this.url = this.host + '/Doctor/sendemail';
    return this.http.post(this.url, data);
  }

  public GetDoctor_ChatDetailsMobileWeb(chatid: any) {
    return this.http.get<any[]>(
      this.host + '/Admin/GetDoctor_ChatDetailsMobileWeb?ChatID=' + chatid
    );
  }

  public InsertChatMaster(data: any) {
    this.url = this.host + '/Admin/InsertChatMaster';
    return this.http.post(this.url, data);
  }

  public InsertChatDetails(data: any) {
    this.url = this.host + '/Admin/InsertChatDetails';

    return this.http.post(this.url, data);
  }

  public GetServerDateAndTime() {
    return this.http.get<any[]>(this.host + '/Doctor/GetServerDateAndTime');
  }

  public UpdateNotifications_DoctorSeenBit(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Admin/UpdateNotifications_DoctorSeenBit?ID=' + lid
    );
  }

  public GetDoctorCommissionFeesByDoctorID(
    doctorid: any,
    appointmentypeid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctorCommissionFeesByDoctorID?DoctorID=' +
        doctorid +
        '&AppointmentTypeID=' +
        appointmentypeid
    );
  }

  public InsertPatientPaymentDetailsWeb(data: any) {
    this.url = this.host + '/Doctor/InsertPatientPaymentDetailsWeb';
    return this.http.post(this.url, data);
  }

  public GetDoctorDetails_ForVideoConferenceForWeb1(
    did: any,
    doctype: any,
    daid: any,
    aidd: any,
    lid: any,
    hospitalid: any,
    dayid: any,
    appdate: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctorDetails_ForVideoConferenceForWeb1?DepartmentID=' +
        did +
        '&DoctorType=' +
        doctype +
        '&AppointmentTypeID=' +
        daid +
        '&BookingTypeID=' +
        aidd +
        '&LanguageID=' +
        lid +
        '&HospitalID=' +
        hospitalid +
        '&DayID=' +
        dayid +
        '&AppointmentDate=' +
        appdate
    );
  }

  public GetDoctorDetails_ForVideoConferenceForWeb(
    did: any,
    daid: any,
    aidd: any,
    lid: any,
    hospitalid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctorDetails_ForVideoConferenceForWeb?DepartmentID=' +
        did +
        '&AppointmentTypeID=' +
        daid +
        '&BookingTypeID=' +
        aidd +
        '&LanguageID=' +
        lid +
        '&HospitalID=' +
        hospitalid
    );
  }

  public GetDayID(day: any) {
    return this.http.get<any[]>(this.host + '/Doctor/GetDayID?Day=' + day);
  }

  public GetDoctorSlotsss(
    docid: any,
    dayid: any,
    hospitalid: any,
    timeid: any,
    appdatetime: any,
    dhid: any,
    slottypeid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctorSlotsss?DoctorID=' +
        docid +
        '&DayID=' +
        dayid +
        '&Hospital_ClinicID=' +
        hospitalid +
        '&TimeID=' +
        timeid +
        '&ApptDatetime=' +
        appdatetime +
        '&DoctorHospitalDetailsID=' +
        dhid +
        '&SlotTypeID=' +
        slottypeid
    );
  }
  public GetDoctorSlotsForWeb(
    docid: any,
    dayid: any,
    hospitalid: any,
    timeid: any,
    appdatetime: any,
    dhid: any,
    slottypeid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctorSlotsForWebLatestt?DoctorID=' +
        docid +
        '&DayID=' +
        dayid +
        '&Hospital_ClinicID=' +
        hospitalid +
        '&TimeID=' +
        timeid +
        '&ApptDatetime=' +
        appdatetime +
        '&DoctorHospitalDetailsID=' +
        dhid +
        '&SlotTypeID=' +
        slottypeid
    );
  }

  public GetPatientRegistrationDetails() {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetPatientRegistrationDetails'
    );
  }

  public InsertBookAppointmentForWeb(data: any) {
    this.url = this.host + '/BookAppointment/InsertBookAppointmentForWeb';
    return this.http.post(this.url, data);
  }
  public GetHospitalAppointmentDetails(hsid: any, sdate: any, edate: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetHospitalAppointmentDetails?HospitalID=' +
        hsid +
        '&Sdate=' +
        sdate +
        '&Edate=' +
        edate
    );
  }

  public GetHospitalVideocallAppointmentDetails(
    hsid: any,
    sdate: any,
    edate: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetHospitalVideocallAppointmentDetails?HospitalID=' +
        hsid +
        '&Sdate=' +
        sdate +
        '&Edate=' +
        edate
    );
  }

  public GetHomecareRevenue(hsid: any, sdate: any, edate: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetHomecareRevenue?HospitalID=' +
        hsid +
        '&Sdate=' +
        sdate +
        '&Edate=' +
        edate
    );
  }
  public InsertDoctorReferals(data: any) {
    this.url = this.host + '/Doctor/InsertDoctorReferals';
    return this.http.post(this.url, data);
  }
  public InsertDoctorReferalAttachments(data: any) {
    this.url = this.host + '/Doctor/InsertDoctorReferalAttachments';
    return this.http.post(this.url, data);
  }

  public InsertPatient_VaccinationDetails(data: any) {
    this.url = this.host + '/Doctor/InsertPatient_VaccinationDetails';
    return this.http.post(this.url, data);
  }

  public UpdateBookAppointmentKnownAllergies(data: any) {
    this.url = this.host + '/Doctor/UpdateBookAppointmentKnownAllergies';
    return this.http.post(this.url, data);
  }

  public GetDoctorReferals(lid: any, TypeID: any, sdate: any, edate: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctorReferals?DoctorID=' +
        lid +
        '&TypeID=' +
        TypeID +
        '&Sdate=' +
        sdate +
        '&Edate=' +
        edate
    );
  }
  public GetBookAppointmentByPatientID(patientid: any, appid: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/PatientRegistration/GetBookAppointmentByPatientID?PatientID=' +
        patientid +
        '&AppointmentID=' +
        appid +
        '&LanguageID=' +
        lid
    );
  }

  public UpdateDoctorReferals(data: any) {
    this.url = this.host + '/BookAppointment/UpdateDoctorReferals';
    return this.http.post(this.url, data);
  }

  public GetDoctorReferalAttachments(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetDoctorReferalAttachments?AppointmentID=' + lid
    );
  }

  public Delete_DoctorReferalAttachments(lid: any) {
    return this.http.get<any[]>(
      this.host + '/BookAppointment/Delete_DoctorReferalAttachments?ID=' + lid
    );
  }

  public GetSoapNotesByPatientRefereal(id: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetSoapNotesByPatientRefereal?ID=' +
        id +
        '&LanguageID=' +
        lid
    );
  }

  public SendMailPrescription(data: any) {
    this.url = this.host + '/Doctor/SendMailPrescription';
    return this.http.post(this.url, data);
  }

  public UpdateDoctors_PersonalFolder(data: any) {
    this.url = this.host + '/Doctor/UpdateDoctors_PersonalFolder';
    return this.http.post(this.url, data);
  }

  public DeleteDoctors_PersonalFolder(id: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/DeleteDoctors_PersonalFolder?ID=' + id
    );
  }

  public SendTwillioSMS(phoneno: any, msg: any) {
    // return this.http.get<any[]>(this.host + '/Doctor/SendTwillioSMS?PhoneNumber=' + phoneno + '&Message=' + msg);
    return this.http.get<any[]>(
      this.host + '/Doctor/TelmaAPI?PhoneNumber=' + phoneno + '&Message=' + msg
    );
  }

  public UpdateVisitedBitByDoctor(id: any) {
    return this.http.get<any[]>(
      this.host +
        '/BookAppointment/UpdateVisitedBitByDoctor?AppointmentID=' +
        id
    );
  }

  public UpdateAmountReceived(id: any, typeid: number) {
    return this.http.get<any[]>(
      this.host + '/Doctor/UpdateAmountReceived?ID=' + id + '&TypeID=' + typeid
    );
  }

  public GetCountryCodeMasterWeb() {
    return this.http.get<any[]>(this.host + '/Doctor/GetCountryCodeMasterWeb');
  }
  public InsertPatient_WalletLogWeb(data: any) {
    this.url = this.host + '/Doctor/InsertPatient_WalletLogWeb';
    return this.http.post(this.url, data);
  }
  public GetPatientVitalsByAppID(id: any) {
    return this.http.get<any[]>(
      this.host + '/Admin/GetPatientVitalsByAppID?AppointmentID=' + id
    );
  }

  public GetPatientReferalHistory(PatientId: any, LanguageID: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctorReferalsWeb?PatientId=' +
        PatientId +
        '&LanguageID=' +
        LanguageID
    );
  }

  public UpdatePatientmedicalevaluationByDoctor(data: any) {
    this.url = this.host + '/Doctor/UpdatePatientmedicalevaluationByDoctor';
    return this.http.post(this.url, data);
  }

  public GetDoctor_PatientPrescriptionbyPatientDeatailsWeb(
    PateintID: any,
    LanguageID: any,
    doctorid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctor_PatientPrescriptionbyPatientDeatailsWeb?PatientId=' +
        PateintID +
        '&LanguageID=' +
        LanguageID +
        '&DoctorID=' +
        doctorid
    );
  }
  public GetDoctor_PatientDiagosticAppsWeb(
    PatientId: any,
    LanguageID: any,
    doctorid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctor_PatientDiagosticAppsWeb?PatientId=' +
        PatientId +
        '&LanguageID=' +
        LanguageID +
        '&DoctorID=' +
        doctorid
    );
  }
  public GetDoctorReferalsWebByDoctorID(
    PatientId: any,
    LanguageID: any,
    doctorid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDoctorReferalsWebByDoctorID?PatientId=' +
        PatientId +
        '&LanguageID=' +
        LanguageID +
        '&DoctorID=' +
        doctorid
    );
  }
  public GetDiagnostic_SoapNotesAttachmentsWebByDoctorID(
    PatientId: any,
    LanguageID: any,
    doctorid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetDiagnostic_SoapNotesAttachmentsWebByDoctorID?PatientId=' +
        PatientId +
        '&LanguageID=' +
        LanguageID +
        '&DoctorID=' +
        doctorid
    );
  }
  public GetSoapNotesByPatientIDandDoctorID(
    PatientId: any,
    LanguageID: any,
    doctorid: any
  ) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetSoapNotesByPatientIDandDoctorID?PatientId=' +
        PatientId +
        '&LanguageID=' +
        LanguageID +
        '&DoctorID=' +
        doctorid
    );
  }

  public GetPatientVaccinationByID(PatientId: any, LanguageID: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetPatientVaccinationByID?PatientId=' +
        PatientId +
        '&LanguageID=' +
        LanguageID
    );
  }

  public UpdateBookAppointmentPaidStatusBit(appointmentID: any) {
    return this.http.get<any[]>(
      this.host +
        '/BookAppointment/UpdateBookAppointmentPaidStatusBit?AppointmentID=' +
        appointmentID
    );
  }
  public GetPatientAllergiesByID(PatientId: any, LanguageID: any) {
    return this.http.get<any[]>(
      this.host +
        '/Doctor/GetPatientAllergiesByID?PatientId=' +
        PatientId +
        '&LanguageID=' +
        LanguageID
    );
  }

  public DeleteImportPatientsExceptions(MobileNumber: any, EmailID: any) {
    return this.http.get<any[]>(
      this.host +
        '/PatientRegistration/DeleteImportPatients_Exceptions?MobileNumber=' +
        MobileNumber +
        '&EmailID=' +
        EmailID
    );
  }

  public DeleteAllImportPatientsExceptions() {
    return this.http.get<any[]>(
      this.host + '/PatientRegistration/DeleteAllImportPatients_Exceptions'
    );
  }
}
