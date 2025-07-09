import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PharmacyService {
  private host = environment.API_URL;
  private url: string = '';
  constructor(private http: HttpClient) {}

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
  public InsertSupportForWeb1(data: any) {
    this.url = this.host + '/Doctor/InsertSupportForWeb1';
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

  public UpdatePharmacyAdminRegistration(data: any) {
    this.url = this.host + '/Pharmacy/UpdatePharmacyAdminRegistration';
    return this.http.post(this.url, data);
  }

  public strongpassword(input: any) {
    var passworddetails = /^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,15})$/;
    return passworddetails.test(input);
  }

  public GetPharmacyLoginForDash(lid: any) {
    return this.http.get<any[]>(
      this.host + '/Pharmacy/GetPharmacyLoginForDash?LanguageID=' + lid
    );
  }

  public GetPharmacyOfferByPharmacyID(pharmacyid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Pharmacy/GetPharmacyOfferByPharmacyID?PharmacyID=' +
        pharmacyid
    );
  }
  public DeletePharmacyOffer(id: any) {
    return this.http.get<any[]>(
      this.host + '/Pharmacy/DeletePharmacyOffer?OfferID=' + id
    );
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

  public ApprovedPatientMedicineDetails(id: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/ApprovedPatientMedicineDetails?ID=' + id
    );
  }
  public PharCancelledPatientMedicineDetails(id: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/PharCancelledPatientMedicineDetails?ID=' + id
    );
  }

  public UpdateOrderReadyBit(id: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/UpdateOrderReadyBit?ID=' + id
    );
  }

  public DeliveredPatientMedicineDetails(id: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/DeliveredPatientMedicineDetails?ID=' + id
    );
  }

  public UpdateOrderOrderPaidBit(id: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/UpdateOrderOrderPaidBit?ID=' + id
    );
  }

  public GetDeliveredPatnerAssignReadyForAvailable(id: any) {
    return this.http.get<any[]>(
      this.host + '/Doctor/GetDeliveredPatnerAssignReadyForAvailable?ID=' + id
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
  public UpdatePatientOrderedMedicinesAvailableMedicines(data: any) {
    this.url =
      this.host + '/Pharmacy/UpdatePatientOrderedMedicinesAvailableMedicines';
    return this.http.post(this.url, data);
  }
  public UpdatePatient_TextMedicineDetails(id: any, MedicineRemarks: any) {
    return this.http.get<any[]>(
      this.host +
        '/Pharmacy/UpdatePatient_TextMedicineDetails?ID=' +
        id +
        '&MedicineRemarks=' +
        MedicineRemarks
    );
  }

  public GetPharmacyAppointmentPhotos(orderid: any) {
    return this.http.get<any[]>(
      this.host + '/Pharmacy/GetPharmacyAppointmentPhotos?OrderID=' + orderid
    );
  }
  public UpdatePatient_TextMedicineDetailsPhotoAmount(data: any) {
    this.url =
      this.host + '/Pharmacy/UpdatePatient_TextMedicineDetailsPhotoAmount';
    return this.http.post(this.url, data);
  }

  public InsertPharmacyOffers(data: any) {
    this.url = this.host + '/Pharmacy/InsertPharmacyOffers';
    return this.http.post(this.url, data);
  }

  public InsertPharmacyOfferPhotos(data: any) {
    this.url = this.host + '/Pharmacy/InsertPharmacyOfferPhotos';
    return this.http.post(this.url, data);
  }

  public UpdatePharmacyOffers(data: any) {
    this.url = this.host + '/Pharmacy/UpdatePharmacyOffers';
    return this.http.post(this.url, data);
  }

  public GetPharmacyOffersPhotos(id: any) {
    return this.http.get<any[]>(
      this.host + '/Pharmacy/GetPharmacyOffersPhotos?ID=' + id
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

  public GetPhamacyDetailsForAdminByLanguageID(did: any, lid: any) {
    return this.http.get<any[]>(
      this.host +
        '/ServiceMaster/GetPhamacyDetailsForAdminByLanguageID?PharmacyID=' +
        did +
        '&LanguageID=' +
        lid
    );
  }

  public GetPharmacyChatID(nid: any, pid: any, appid: any) {
    return this.http.get<any[]>(
      this.host +
        '/Admin/GetPharmacyChatID?PharmacyID=' +
        nid +
        '&PatientID=' +
        pid +
        '&AppointmentID=' +
        appid
    );
  }

  public InserPharmacy_ChatMaster(data: any) {
    this.url = this.host + '/Admin/InserPharmacy_ChatMaster';
    return this.http.post(this.url, data);
  }

  public GetPharmacy_ChatDetails(cid: any) {
    return this.http.get<any[]>(
      this.host + '/Admin/GetPharmacy_ChatDetails?ChatID=' + cid
    );
  }

  public InsertPharmacy_ChatDetails(data: any) {
    this.url = this.host + '/Admin/InsertPharmacy_ChatDetails';
    return this.http.post(this.url, data);
  }

  public GetServerDateAndTime() {
    return this.http.get<any[]>(this.host + '/Doctor/GetServerDateAndTime');
  }

  public GetReferenceNumberByID(ID: any) {
    return this.http.get<any[]>(
      this.host + '/Pharmacy/GetReferenceNumberByID?ID=' + ID
    );
  }

  public SendTwillioSMS(phoneno: any, msg: any) {
    // return this.http.get<any[]>(this.host + '/Doctor/SendTwillioSMS?PhoneNumber=' + phoneno + '&Message=' + msg);
    return this.http.get<any[]>(
      this.host + '/Doctor/TelmaAPI?PhoneNumber=' + phoneno + '&Message=' + msg
    );
  }
}
