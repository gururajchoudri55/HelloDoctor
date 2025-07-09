import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private host = environment.API_URL;
  private url: string = '';

  constructor(private http: HttpClient) { }

  public GetCancellationTimings(lid: any) {

    return this.http.get<any[]>(this.host + '/Hospital/GetCancellationTimings?LanguageID=' + lid);
  }
  public UpdateCancellationTimings(data: any) {
    this.url = this.host + '/Hospital/UpdateCancellationTimings';
    return this.http.post(this.url, data)
  }
  public GetHomeVisitDeliveryChargesMaster(lid: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetHomeVisitDeliveryChargesMaster?LanguageID=' + lid);
  }


  public UpdateEnableDisableHomeVisitDeliveryChargesMaster(id: any, typeid: any) {

    return this.http.get<any[]>(this.host + '/Pharmacy/UpdateEnableDisableHomeVisitDeliveryChargesMaster?ID=' + id + '&TypeID=' + typeid);
  }

  public DeletePatientRegistration(id: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeletePatientRegistration?ID=" + id
    );
  }

  public GetCreditCardChargesMaster(lid: any) {
    
    return this.http.get<any[]>(this.host + '/Doctor/GetCreditCardChargesMaster?LanguageID=' + lid);
  }

  public GetHomeCountryVisitDeliveryChargesMaster(lid: any) {
    
    return this.http.get<any[]>(this.host + '/Doctor/GetHomeCountryVisitDeliveryChargesMaster?LanguageID=' + lid);
  }

  public GetCountryMasterByLanguageID(lid: any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetCountryMasterByLanguageID?LanguageID=' + lid);
  }

  public DeleteCountryMaster(lid: any) {
    return this.http.get<any[]>(this.host + '/Master/DeleteCountryMaster?ID=' + lid);
  }


  public GetRegionMasterWebDash(lid: any) {
    
    return this.http.get<any[]>(this.host + '/Master/GetRegionMasterWebDash?LanguageID=' + lid);
  }

  public DeleteRegionMaster(lid: any) {
    
    return this.http.get<any[]>(this.host + '/Master/DeleteRegionMaster?ID=' + lid);
  }


  public GetCityMasterBYIDandLanguageID(did: any, lid: any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetCityMasterBYIDandLanguageID?CountryID=' + did + '&LanguageID=' + lid);
  }

  public GetCityMasterByLangID(lid: any) {

    return this.http.get<any[]>(this.host + '/Master/GetCityMasterByLangID?LanguageID=' + lid);
  }


  public DeleteCityMaster(lid: any) {

    return this.http.get<any[]>(this.host + '/Master/DeleteCityMaster?ID=' + lid);
  }


  public GetAreaMasterByLangID(lid: any) {

    return this.http.get<any[]>(this.host + '/Master/GetAreaMasterByLangID?LanguageID=' + lid);
  }


  public DeleteAreaMaster(lid: any) {

    return this.http.get<any[]>(this.host + '/Master/DeleteAreaMaster?ID=' + lid);
  }

  public GetDepartmentMasterByLanguageID(lid: any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDepartmentMasterByLanguageID?LanguageID=' + lid);
  }

  public DeleteDepartmentMaster(lid: any) {

    return this.http.get<any[]>(this.host + '/Master/DeleteDepartmentMaster?ID=' + lid);
  }

  public GetCompalintMasterLangID(lid: any) {

    return this.http.get<any[]>(this.host + '/Master/GetCompalintMasterLangID?LanguageID=' + lid);
  }

  public DeleteComplaintMaster(lid: any) {

    return this.http.get<any[]>(this.host + '/Master/DeleteComplaintMaster?ID=' + lid);
  }

  public GetSpecilaizationMasterByLanguageID(lid: any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetSpecilaizationMasterByLanguageID?LanguageID=' + lid);
  }

  public DeleteSpecilaizationMaster(lid: any) {

    return this.http.get<any[]>(this.host + '/Master/DeleteSpecilaizationMaster?ID=' + lid);
  }

  public GetServiceMasterWeb(lid: any) {

    return this.http.get<any[]>(this.host + '/Master/GetServiceMasterWeb?LanguageID=' + lid);
  }

  public DeleteServiceMaster(lid: any) {

    return this.http.get<any[]>(this.host + '/Master/DeleteServiceMaster?ID=' + lid);
  }

  public GetDiagnosticTestTypeMasterByLanguageID(lid: any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDiagnosticTestTypeMasterByLanguageID?LanguageID=' + lid);
  }

  public DeleteDiagnosticTestTypeMaster(lid: any,TypeID:any) {

    return this.http.get<any[]>(this.host + '/Master/DeleteDiagnosticTestTypeMaster?ID=' + lid +'&TypeID='+TypeID);
  }

  public GetPharmacyForAdminByLanguageID(did: any) {
    return this.http.get<any[]>(this.host + '/ServiceMaster/GetPharmacyForAdminByLanguageID?LanguageID=' + did);
  }
  public GetDiagnosticCenterListByLanguageID(lid: any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDiagnosticCenterListByLanguageID?LanguageID=' + lid);
  }

  public InsertHomeVisitDeliveryChargesMaster(data: any) {
    this.url = this.host + '/Doctor/InsertHomeVisitDeliveryChargesMaster';
    return this.http.post(this.url, data)
  }

  public InsertCountryMaster(data: any) {
    this.url = this.host + '/Master/InsertCountryMaster';
    return this.http.post(this.url, data)
  }

  public InsertRegionMaster(data: any) {
    this.url = this.host + '/Master/InsertRegionMaster';
    return this.http.post(this.url, data)
  }
  public InsertCityMaster(data: any) {
    this.url = this.host + '/Master/InsertCityMaster';
    return this.http.post(this.url, data)
  }


  public InsertAreaMaster(data: any) {
    this.url = this.host + '/Master/InsertAreaMaster';
    return this.http.post(this.url, data)
  }


  public InsertComplaintMaster(data: any) {
    this.url = this.host + '/Master/InsertComplaintMaster';
    return this.http.post(this.url, data)
  }

  public InsertSpecilaizationMaster(data: any) {
    this.url = this.host + '/Master/InsertSpecilaizationMaster';
    return this.http.post(this.url, data)
  }


  public InsertServiceMasterWeb(data: any) {
    this.url = this.host + '/Master/InsertServiceMasterWeb';
    return this.http.post(this.url, data)
  }

  public InsertDiagnosticTestTypeMaster(data: any) {
    this.url = this.host + '/Master/InsertDiagnosticTestTypeMaster';
    return this.http.post(this.url, data)
  }

  public GetDiagnosticTestMasterByLangID(lid: any) {

    return this.http.get<any[]>(this.host + '/Master/GetDiagnosticTestMasterByLangID?LanguageID=' + lid);
  }


  public DeleteDiagnosticTestMaster(lid: any) {

    return this.http.get<any[]>(this.host + '/Master/DeleteDiagnosticTestMaster?ID=' + lid);
  }

  public InsertDiagnosticTestMaster(data: any) {
    this.url = this.host + '/Master/InsertDiagnosticTestMaster';
    return this.http.post(this.url, data)
  }

  public UpdateCountryMaster_Web(data: any) {
    this.url = this.host + '/Master/UpdateCountryMaster_Web';
    return this.http.post(this.url, data)
  }


  public UpdateRegionMaster(data: any) {
    this.url = this.host + '/Master/UpdateRegionMaster';
    return this.http.post(this.url, data)
  }

  public UpdateCityMaster_Web(data: any) {
    this.url = this.host + '/Master/UpdateCityMaster_Web';
    return this.http.post(this.url, data)
  }

  public UpdateAreaMaster_Web(data: any) {
    this.url = this.host + '/Master/UpdateAreaMaster_Web';
    return this.http.post(this.url, data)
  }

  public InsertDepartmentMasterWeb(data: any) {
    this.url = this.host + '/Master/InsertDepartmentMasterWeb';
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

  public UpdateDepartmentMaster_Web(data: any) {
    this.url = this.host + '/Master/UpdateDepartmentMaster_Web';
    return this.http.post(this.url, data)
  }

  public UpdateComplaintMaster(data: any) {
    this.url = this.host + '/Master/UpdateComplaintMaster';
    return this.http.post(this.url, data)
  }

  public UpdateSpecilaizationMaster_Web(data: any) {
    this.url = this.host + '/Master/UpdateSpecilaizationMaster_Web';
    return this.http.post(this.url, data)
  }


  public UpdateServiceMaster_Web(data: any) {
    this.url = this.host + '/Master/UpdateServiceMaster_Web';
    return this.http.post(this.url, data)
  }

  public UpdateDiagnosticTestTypeMaster(data: any) {
    this.url = this.host + '/Master/UpdateDiagnosticTestTypeMaster';
    return this.http.post(this.url, data)
  }

  public UpdateDiagnosticTestMaster(data: any) {
    this.url = this.host + '/Master/UpdateDiagnosticTestMaster';
    return this.http.post(this.url, data)
  }

  public UpdateHomeVisitDeliveryChargesMaster(data: any) {
    this.url = this.host + '/Doctor/UpdateHomeVisitDeliveryChargesMaster';
    return this.http.post(this.url, data)
  }

  public UpdateCreditCardChargesMaster(id: any, charges: any) {
    
    return this.http.get<any[]>(this.host + '/Doctor/UpdateCreditCardChargesMaster?ID=' + id + '&Charges=' + charges);
  }

  public UpdateHomeCountryVisitDeliveryChargesMaster(data: any) {
    this.url = this.host + '/Doctor/UpdateHomeCountryVisitDeliveryChargesMaster';
    return this.http.post(this.url, data)
  }

  public InsertImportCityMaster(data: any) {
    this.url = this.host + '/Master/InsertImportCityMaster';
    return this.http.post(this.url, data)
  }
  public GetDegreeMasterBylanguageID(lid: any) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetDegreeMasterBylanguageID?LanguageID=' + lid);
  }

  public DeleteDegreeMaster(lid: any) {

    return this.http.get<any[]>(this.host + '/Master/DeleteDegreeMaster?ID=' + lid);
  }

  public InsertDegreeMaster(data: any) {

    this.url = this.host + '/Master/InsertDegreeMaster';
    return this.http.post(this.url, data)
  }

  public UpdateDegreeMaster_Web(data: any) {
    this.url = this.host + '/Master/UpdateDegreeMaster_Web';
    return this.http.post(this.url, data)
  }
  public GetDrugNameMaster(lid: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetDrugNameMaster?LanguageID=' + lid);
  }
  public GetICDCodeMaster(lid: any) {

    return this.http.get<any[]>(this.host + '/Doctor/GetICDCodeMaster?LanguageID=' + lid);
  }


  public UpdateDepartmentMasterEnable(typeid: number, id: number) {
    return this.http.get(this.host + '/Hospital/UpdateDepartmentMasterEnable?TypeID=' + typeid + '&ID=' + id);
  }

  public DeleteDrugNametMaster(lid: any) {
    return this.http.get<any[]>(this.host + '/Doctor/DeleteDrugNametMaster?ID=' + lid);
  }

  public DeleteSOAPMaster(lid: any) {
    return this.http.get<any[]>(this.host + '/Doctor/DeleteSOAPMaster?ID=' + lid);
  }

  public UpdateDepartmentHomescreenEnable(typeid: number, id: number) {
    return this.http.get(this.host + '/Hospital/UpdateDepartmentHomescreenEnable?TypeID=' + typeid + '&ID=' + id);
  }
  public InsertVitalsPromoCode(data: any) {
    this.url = this.host + '/Admin/InsertVitalsPromoCode';
    return this.http.post(this.url, data)
  }

  public UpdateVitalsPromoCode(data: any) {
    this.url = this.host + '/Admin/UpdateVitalsPromoCode';
    return this.http.post(this.url, data)
  }
  public GetVitalsPromoCode() {
    return this.http.get<any[]>(this.host + '/Admin/GetVitalsPromoCode');
  }

  public GetVitalsPackage() {
    return this.http.get<any[]>(this.host + '/Admin/GetVitalsPackage');
  }

  public InsertVitalsPackage(data: any) {
    this.url = this.host + '/Admin/InsertVitalsPackage';
    return this.http.post(this.url, data)
  }
  public UpdateVitalsPackage(data: any) {
    this.url = this.host + '/Admin/UpdateVitalsPackage';
    return this.http.post(this.url, data)
  }


  public GetVitalsPackageByID(id: any) {

    return this.http.get<any[]>(this.host + '/Admin/GetVitalsPackageByID?ID=' + id);
  }
  public GetVitalsPromoCodeByID(id: any) {

    return this.http.get<any[]>(this.host + '/Admin/GetVitalsPromoCodeByID?ID=' + id);
  }
  public UpdateDisabledVitalsPromoCode(id: any) {
    return this.http.get<any[]>(this.host + '/Admin/UpdateDisabledVitalsPromoCode?ID=' + id);
  }
  public UpdateEnabledVitalsPromoCode(id: any) {
    return this.http.get<any[]>(this.host + '/Admin/UpdateEnabledVitalsPromoCode?ID=' + id);
  }
  public UpdateDisabledPackage(id: any) {
    return this.http.get<any[]>(this.host + '/Admin/UpdateDisabledPackage?ID=' + id);
  }
  public UpdateEnabledPackage(id: any) {
    return this.http.get<any[]>(this.host + '/Admin/UpdateEnabledPackage?ID=' + id);
  }
  public GetVitalsPromoCodeFilterBydate(sdate: any, edate: any) {
    return this.http.get<any[]>(this.host  + '/Admin/GetVitalsPromoCodeFilterBydate?SDate=' + sdate + '&EDate=' + edate );
  }
  public GetVitalsPackageByMobDate(sdate: any, edate: any) {
    return this.http.get<any[]>(this.host  + '/Admin/GetVitalsPackageByMobDate?SDate=' + sdate + '&EDate=' + edate );
  }
  public GetVitalsNarratives(LanguageID: any) {
    return this.http.get<any[]>(this.host  + '/Admin/GetVitalsNarratives?LanguageID=' + LanguageID);
  }
  public UpdateVitalsNarratives(data: any) {
    this.url = this.host + '/Admin/UpdateVitalsNarratives';
    return this.http.post(this.url, data)
  }
  public InsertVitalsNarratives(data: any) {
    this.url = this.host + '/Admin/InsertVitalsNarratives';
    return this.http.post(this.url, data)
  }

  public UpdateVitalsPromoCodePublish(id: any) {
    return this.http.get<any[]>(this.host + '/Admin/UpdateVitalsPromoCodePublish?ID=' + id);
  }

  public UpdateVitalsPackagePublish(id: any) {
    return this.http.get<any[]>(this.host + '/Admin/UpdateVitalsPackagePublish?ID=' + id);
  }
  public GetPaymentAccounts() {
    
    return this.http.get<any[]>(this.host + '/Admin/GetPaymentAccounts');
  }


  public UpdatePaymentAccounts(data: any) {
    this.url = this.host + '/Admin/UpdatePaymentAccounts';
    return this.http.post(this.url, data)
  }

  public GetVitalNarrativeMaster(LanguageID:any) {
    
    return this.http.get<any[]>(this.host + '/Master/GetVitalNarrativeMaster?LanguageID=' + LanguageID);
  }
  public EnableVitalNarrative(id:any) {
    
    return this.http.get<any[]>(this.host + '/Admin/EnableVitalNarrative?ID=' + id);
  }
  public DisableVitalNarrative(id:any) {
    
    return this.http.get<any[]>(this.host + '/Admin/DisableVitalNarrative?ID=' + id);
  }
}
