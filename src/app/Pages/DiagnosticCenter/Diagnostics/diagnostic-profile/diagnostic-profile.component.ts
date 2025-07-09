import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import Labels from '../../../Lables/countrymanager/countrylabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-diagnostic-profile',
  templateUrl: './diagnostic-profile.component.html',
  styleUrls: ['./diagnostic-profile.component.css']
})
export class DiagnosticProfileComponent implements OnInit {
  countryList: any;
  countrydd = {}
  countryID: any;
  regionList: any;
  regiondd: any;
  regionID: any;
  cityList: any;
  citydd = {};
  cityID: any;
  areaList: any;
  areadd = {}
  areaID: any;
  pinCode: any;
  loader: boolean | undefined;
  hospitalClinicID: any;
  languageID: any;
  address: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  photoUrl: any;

  contactPersonName: any;
  businessPhoneNumber: any;
  diagnosticCenterName: any;
  email: any;
  licenseNumber: any;
  zipCode: any;
  website: any;
  contractStartDate: any;
  ContractEndDate: any;
  monthlySubscriptipon: any;
  morningOpeninghours: any;
  afterNoonOpeningHours: any;
  homeSample: any;
  description: any;
  folderName: any;
  insuranceList: any;
  insurancedd = {};
  insuranceID: any = [];
  awards: any;
  taxIdentification: any;
  businessID: any;
  commercialCity: any;
  taxProfessional: any;
  socialSeccurityFundno: any;
  nameOfBank: any;
  accountName: any;
  accountNumber: any;
  vatCheck: any;
  subscriptionTypeID: any;
  montlySubscription: any;
  AppointmentPercentage: any;
  vatPercentage: any;
  exonerationPeriodFromDate: any;
  exonerationPerioToDate: any;
  contactPersonPhoneNo: any;
  diagnosticID: any;
  labels: any;
  region: any;
  province: any;
  city: any;
  insurance: any;
  fromdate: any;
  todate: any;
  id: any;
  details: any;
  cash: boolean | undefined;
  creditCard: boolean | undefined;
  wallet: boolean | undefined;
  currentUrl:any;
  mrngOpenIngHours:any;
  mrngClosedHours:any;
  evengingOpeningHours:any;
  eveningClosedHours:any;
  valid:any

  constructor(private CommonService:CommonService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl=window.location.href;
    this.hospitalClinicID = sessionStorage.getItem('hospitalid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];

    // this.activatedroute.params.subscribe(params => {

    //   this.id = atob(params['id']);
    
    // }
    // )
    this.id= sessionStorage.getItem('diagnosticid');
    this.getdiagnosticdetailsforadmin();
  }


  
  public getdiagnosticdetailsforadmin() {
    this.CommonService.GetDiagnosticDetailsForAdminByLanguageID(this.id, this.languageID).subscribe(
      data => {

        this.details = data[0];
        
        this.diagnosticCenterName = this.details.diagnosticCenterName,
          this.businessPhoneNumber = this.details.phoneNo,
          this.contactPersonName = this.details.contactPerson,
          this.contactPersonPhoneNo = this.details.contactPersonPhNo,
          this.licenseNumber = this.details.licenseNo,
          // this.lic = this.details.licenseValidTill,
          this.email = this.details.emailID,
          this.address = this.details.address,
          this.cityID = this.details.cityID,
          this.zipCode = this.details.zipcode,
          this.website = this.details.website,
          this.morningOpeninghours = this.details.timings,
          this.description = this.details.description,
          this.photoUrl = this.details.photoURL
        this.areaID = this.details.areaID,
          this.countryID = this.details.countryID,
          this.regionID = this.details.regionMasterID
        this.pinCode = this.details.pincode,
          // this.diagnosticappointmentperslot = this.details.diagnosticAppointmentPerSlot,
          // this.homesampleordersperslot = this.details.homeSampleOrdersPerSlot,
          this.homeSample = this.details.homeSample,
          this.afterNoonOpeningHours = this.details.eveningTimings,
          this.taxIdentification = this.details.taxIdentification
        this.businessID = this.details.businessID
        this.commercialCity = this.details.commercialRegCity
        this.taxProfessional = this.details.taxProfessional

        this.socialSeccurityFundno = this.details.socialSeccurityNo
        this.nameOfBank = this.details.paymentCompany
        this.accountName = this.details.acountNames
        this.accountNumber = this.details.acountNumbers,
          this.latitude = this.details.lattitude,
          this.longitude = this.details.longitude,
          this.formatAddress = this.details.formatedAddress,
          this.monthlySubscriptipon = this.details.monthlySubscription,
          this.contractStartDate = this.details.contractStartDate,
          this.ContractEndDate = this.details.contractEndDate,
          this.cash = this.details.cash,
          this.creditCard = this.details.creditCard,
          this.wallet = this.details.wallet,
          this.mrngOpenIngHours=this.details.mrngTimeOpen,
          this.mrngClosedHours=this.details.mrngTimeClosed,
          this.evengingOpeningHours=this.details.afternoonTimeOpen,
          this.eveningClosedHours=this.details.afternoonTimeClosed

        
        this.getCountryMaster();
        this.getRegionMaster()
        this.getCityMaster();
        this.getareamasterbyid();
        this.loader = false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticDetailsForAdminByLanguageID",error);
      }
    )
  }



  // getCountry 

  public getCountryMaster() {
    this.CommonService.GetCountryMasterByLanguageID(this.languageID).subscribe(
      data => {

        this.countryList = data;
        this.loader = false;
        console.log("CountryList", this.countryList)
        this.countrydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true

        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetCountryMasterByLanguageID",error);
      }
    )
  }

  //getRegion

  public getCountryID(even: any) {

    this.countryID = even.target.value;

    this.getRegionMaster()
  }


  getRegionMaster() {
    this.CommonService.GetRegionMasterWeb(this.countryID).subscribe(
      data => {

        this.regionList = data;

        this.regiondd = {
          singleSelection: true,
          idField: 'id',
          textField: 'regionName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,

        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetRegionMasterWeb",error);
      }
    )

  }

  //GetProvince

  GetRegionID(even: any) {
    this.regionID = even.target.value
    this.getCityMaster()

  }


  getCityMaster() {
    this.CommonService.GetCityMasterBYIDandLanguageID(this.regionID, this.languageID).subscribe(
      data => {

        this.cityList = data;

        this.citydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true

        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetCityMasterBYIDandLanguageID",error);
      }
    )
  }

  //GetAreaMaster

  public GetCityID(even: any) {

    this.cityID = even.target.value;
    this.getareamasterbyid();
  }


  public getareamasterbyid() {

    this.CommonService.GetAreaMasterByCityIDAndLanguageID(this.cityID, this.languageID).subscribe(
      data => {

        this.areaList = data;
        this.areadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'areaName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,

        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetAreaMasterByCityIDAndLanguageID",error);
      }
    )
  }
  public GetAreaID(even: any) {

    this.areaID = even.target.value;
    for (let i = 0; i < this.areaList.length; i++) {

      if (this.areaList[i].id == this.areaID) {

        this.pinCode = this.areaList[i].pincode
      }
    }
  }



  //Google Addreess

  formatAddress: any;
  latitude: any;
  longitude: any;
  googleAddress: any;
  geocode() {
    
    this.loader = true
    this.showPopup = 0;
    this.CommonService.Getlocation(this.address).subscribe((data: any) => {
      
      console.log("google addressmain", data);
      if (data["results"].length != 0) {
        this.googleAddress = data["results"];
        console.log("google address", this.googleAddress)
        
        this.formatAddress = this.googleAddress[0]["formatted_address"];
        this.latitude = this.googleAddress[0].geometry.location["lat"],
          this.longitude = this.googleAddress[0].geometry.location["lng"];
        this.loader = false;
        this.showPopup = 1;
        this.typeofPopUp = 1;
        this.messageID = 12

      }
      else {
        this.loader = false;
        this.showPopup = 1
        this.typeofPopUp = 2;
        this.messageID = 13
      }

    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"Getlocation",error);
    })
  }


  getContractStratDate(contractStratDate: any) {
    this.contractStartDate = this.CommonService.GetDates(contractStratDate);
    console.log("Contract Start Date", this.contractStartDate);
  }



  getContractEndDate(contractEndDate: any) {
    this.ContractEndDate = this.CommonService.GetDates(contractEndDate);
    console.log("Contract Start Date", this.contractStartDate);
  }



  //Diagnostic Photo

  files: any = [];
  attchmentUrl: any = [];

  onSelect(event: any) {
    this.loader = true;
    this.showPopup = 0;
    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadsAttchments();
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.attchmentUrl.splice(this.files.indexOf(event), 1);
  }


  uploadsAttchments() {
    this.folderName = "Images/DiagnosticPhotos"
    this.CommonService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
      this.attchmentUrl.push(res);
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("hospitalPhoto", this.attchmentUrl);
      this.loader = false;
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"AllFilesUploads",error);
    })
  }

  checkVatvalue(even: any) {
    
    if (even == 1) {
      this.vatPercentage = 0;
    }
    else {
      this.vatPercentage = 20;
    }
  }

  getExonerationPerioddate(exonerationPeriodFromDate: any) {
    this.exonerationPeriodFromDate = this.CommonService.GetDates(exonerationPeriodFromDate);
    console.log("exoneration Period From Date", this.exonerationPeriodFromDate);
  }

  getexoneationPeriodToDate(exonerationPerioToDate: any) {
    this.exonerationPerioToDate = this.CommonService.GetDates(exonerationPerioToDate);
    console.log("exoneration Period To Date", this.exonerationPerioToDate);
  }







  public updatedetails() {
    this.loader = true;
    this.showPopup = 0;
    var entity = {
      'DiagnosticCenterName': this.diagnosticCenterName,
      'LanguageID': this.languageID,
      'DiagnosticCenterID': this.id,
      'PhoneNo': this.businessPhoneNumber,
      'ContactPerson': this.contactPersonName,
      'ContactPersonPhNo': this.contactPersonPhoneNo,
      'LicenseNo': 0,
      'LicenseValidTill': new Date(),
      'EmailID': this.email,
      'Address': this.address,
      'CityID': this.cityID,
      'Zipcode': this.zipCode,
      'Website': this.website,
      'Timings': this.morningOpeninghours,
      'Description': this.description,
      'AreaID': this.areaID,
      'Pincode': this.pinCode,
      'CountryID': this.countryID,
      'DiagnosticAppointmentPerSlot': 0,
      'HomeSampleOrdersPerSlot': 0,
      'HomeSample': this.homeSample,
      'EveningTimings': this.afterNoonOpeningHours,
      'TaxIdentification': this.taxIdentification,
      'BusinessID': this.businessID,
      'CommercialRegCity': this.commercialCity,
      'TaxProfessional': this.taxProfessional,
      'SocialSeccurityNo': this.socialSeccurityFundno,
      'Nameofthebank': this.nameOfBank,
      'AccountName': this.accountName,
      'AccountNumber': this.accountNumber,
      'VAT': 0,
      'Lattitude': this.latitude,
      'Longitude': this.longitude,
      'FormatedAddress': this.formatAddress,
      'MrngTimeOpen':this.mrngOpenIngHours,
      'MrngTimeClosed':this.mrngClosedHours,
      'AfternoonTimeOpen':this.evengingOpeningHours,
      'AfternoonTimeClosed':this.eveningClosedHours
    }
    this.CommonService.UpdateDiagnosticCenterProfile(entity).subscribe(async res => {
      let test = res;
      await this.updatePhotos()
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      this.loader=false;
      // location.href = "#/countrymanager/Diagnosticdash"


    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"UpdateDiagnosticCenterProfile",error);
    })

  }



  async updatePhotos() {

    var entity = {
      'ID': this.id,
      'PhotoURL': this.attchmentUrl[0],
    }
    this.CommonService.UpdateDiagnosticCenterPhotos(entity).subscribe(async res => {
      let test = res;


    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"UpdateDiagnosticCenterPhotos",error);
    })

  }

    
  numberOnly(event: { which: any; keyCode: any; }): boolean {
    
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  public isValidEmail(emailString: string): boolean {
    
    try {
      let pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
      this.valid = pattern.test(emailString);
      
      return this.valid;


    } catch (TypeError) {
      return false;
    }
  }

}
