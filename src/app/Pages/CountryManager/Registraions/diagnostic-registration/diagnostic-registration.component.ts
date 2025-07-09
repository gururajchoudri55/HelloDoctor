import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import Labels from '../../../Lables/countrymanager/countrylabels.json';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-diagnostic-registration',
  templateUrl: './diagnostic-registration.component.html',
  styleUrls: ['./diagnostic-registration.component.css']
})
export class DiagnosticRegistrationComponent implements OnInit {

  constructor(private CommonService: CommonService, private SharedService: SharedService) { }

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
  Partner:any;
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
  search: any;
  currentUrl: any;
  cash: boolean | undefined;
  creditCard: boolean | undefined;
  wallet: boolean | undefined;
  mrngOpenIngHours: any;
  mrngClosedHours: any;
  evengingOpeningHours: any;
  eveningClosedHours: any;
  docNearestkm: any;
  docnearesNumber: any;
  accountNames: string | undefined;
  accountNumbers: any;
  paymentCompany: any;
  ProviderPay: boolean = true;
  MvolaPay: boolean = true;
  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.hospitalClinicID = sessionStorage.getItem('hospitalid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.region = this.labels.selectRegion;
    this.province = this.labels.selectProvince;
    this.city = this.labels.selectCity;
    this.insurance = this.labels.selectInsurance;
    this.fromdate = this.labels.fromDate;
    this.search = this.labels.search;
    this.todate = this.labels.toDate;
    this.getCountryMaster();
    this.getInsuranceMaster();
    this.wallet = false;
    this.creditCard = false;
    this.cash = false;
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
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true

        };
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetCountryMasterByLanguageID", error);
      }
    )
  }

  //getRegion

  public getCountryID(even: any) {

    this.countryID = even.target.value;
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
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true
        };
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetRegionMasterWeb", error);
      }
    )






  }

  //GetProvince

  GetRegionID(item: any) {
    this.regionID = item.id
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
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true

        };
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetCityMasterBYIDandLanguageID", error);
      }
    )
  }


  //GetAreaMaster

  public GetCityID(item1: any) {

    this.cityID = item1.id;
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
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true

        };
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetAreaMasterByCityIDAndLanguageID", error);
      }
    )
  }
  public GetAreaID(item3: any) {

    this.areaID = item3.id;
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


  public getInsuranceMaster() {
    this.CommonService.GetInsuranceMasterByLanguageID(this.languageID).subscribe(
      data => {

        this.insuranceList = data;

        this.insurancedd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true

        };

      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetInsuranceMasterByLanguageID", error);
      }
    )
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
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "AllFilesUploads", error);
    })
  }




  public GetInuranceID(item: any) {

    this.insuranceID.push(item);

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





  public insertdetails() {
    this.showPopup = 0;
    if (this.countryID == undefined || this.countryID.length == 0) {

      this.showPopup = 1;
      this.messageID = 5;
      this.typeofPopUp = 2;
    }
    else if (this.cityID == undefined || this.cityID.length == 0) {
      this.showPopup = 1;
      this.messageID = 6;
      this.typeofPopUp = 2;
    }
    else if (this.areaID == undefined || this.areaID.length == 0) {
      this.showPopup = 1;
      this.messageID = 7;
      this.typeofPopUp = 2;
    }
    else if (this.latitude == undefined || this.longitude == undefined) {
      Swal.fire(this.labels.longitudeAlert);
    }
    else {

      this.loader = true;

      var entity = {
        'DiagnosticCenterName': this.diagnosticCenterName,
        'Description': this.description,
        'Address': this.address,
        'PhoneNo': this.businessPhoneNumber,
        'EmailID': this.email,
        'Timings': this.morningOpeninghours,
        'LanguageID': '1',
        'Zipcode': this.zipCode,
        'ContactPerson': this.contactPersonName,
        'ContactPersonPhNo': this.contactPersonPhoneNo,
        'LicenseNo': this.licenseNumber,
        'LicenseValidTill': new Date(),
        'HomeSample': this.homeSample,
        'Preffered': 0,
        'Website': this.website,
        'Awards': this.awards,
        'CityID': this.cityID,
        'AreaID': this.areaID,
        'Pincode': this.pinCode,
        'CountryID': this.countryID,
        'MonthlySubscription': this.monthlySubscriptipon,
        'HospitalClinicID': this.hospitalClinicID,
        'Hospitalfulltimebit': 0,
        'ContractStartDate': this.contractStartDate,
        'ContractEndDate': this.ContractEndDate,
        'DiagnosticAppointmentPerSlot': 0,
        'HomeSampleOrdersPerSlot': 0,
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
        'cash': this.cash,
        'Wallet': this.wallet,
        'CreditCard': this.creditCard,
        'MrngTimeOpen': this.mrngOpenIngHours,
        'MrngTimeClosed': this.mrngClosedHours,
        'AfternoonTimeOpen': this.evengingOpeningHours,
        'AfternoonTimeClosed': this.eveningClosedHours,
        'DocNearestLocDist': this.docNearestkm,
        'DocNearestNumber': this.docnearesNumber,
        'AcountNames': this.accountNames,
        'AcountNumbers': this.accountNumbers,
        'PaymentCompany': this.paymentCompany,
        'ProviderPay': this.ProviderPay,
        'MvolaPay': this.MvolaPay,
        'Partner':this.Partner,
        'Stamp':this.stampPhoto,
        'SignatureURL' : this.signaturePhoto
      }
      this.CommonService.InsertDiagnosticCenterRegistration(entity).subscribe(data => {

        if (data != 0 && data != 1) {
          this.diagnosticID = data;
          this.inserthspphotos();
          this.insertinsurance();

          this.showPopup = 1;
          this.messageID = 1;
          this.typeofPopUp = 1;
          this.loader = false;
          location.href = "#/countrymanager/Diagnosticdash"

        }
        else {
          if (data == 0) {
            this.showPopup = 1;
            this.messageID = 8;
            this.typeofPopUp = 2;
            this.loader = false;

          }
          else {
            this.showPopup = 1;
            this.messageID = 9;
            this.typeofPopUp = 2;
            this.loader = false;
          }

        }
      }, error => {
        this.showPopup = 1;
        this.typeofPopUp = 1;
        this.messageID = 10;
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "InsertDiagnosticCenterRegistration", error);
      })

    }
  }






  public inserthspphotos() {
    if (this.attchmentUrl.length == 0) {
      this.attchmentUrl[0] = 'C:\\MarocAPI\\Images\\DiagnosticCenterPhotos\\Diagnostics.jpg'
    }

    for (let i = 0; i < this.attchmentUrl.length; i++) {
      var entity = {
        'DiagnosticCenterID': this.diagnosticID,
        'PhotoURL': this.attchmentUrl[i]
      }
      this.CommonService.InsertInsertDiagnosticCenterPhotos(entity).subscribe(data => {

        if (data != 0) {
        }
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "InsertInsertDiagnosticCenterPhotos", error);
      })
    }
  }


  public insertinsurance() {
    for (let i = 0; i < this.insuranceID.length; i++) {
      var entity = {
        'DiagnosticCenterID': this.diagnosticID,
        'InsuranceID': this.insuranceID[i].id
      }
      this.CommonService.InsertDiagnosticCenterInsurances(entity).subscribe(data => {

        if (data != 0) {
        }
      }, error => {
        console.log("error with", error);
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "InsertDiagnosticCenterInsurances", error);
      })
    }
  }

  numberOnly(event: { which: any; keyCode: any }): boolean {
    ;
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
      return false;
    }
    return true;
  }




  valid: boolean | undefined

  public isValidEmail(emailString: string): boolean {
    
    try {
      let pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
      this.valid = pattern.test(emailString);
      
      return this.valid;


    } catch (TypeError) {
      return false;
    }
  }


  preventZero(even: any) {
    
    this.showPopup = 0;
    var no = even.split();
    if (no.length >= 1) {
      if (no[0] == '0') {
        this.businessPhoneNumber = ""
        this.typeofPopUp = 2;
        this.messageID = 84;
        this.showPopup = 1;
      }

    }


  }


  preventZero1(even: any) {
    
    this.showPopup = 0;
    var no = even.split();
    if (no.length >= 1) {
      if (no[0] == '0') {
        this.contactPersonPhoneNo = ""
        this.typeofPopUp = 2;
        this.messageID = 84;
        this.showPopup = 1;
      }

    }


  }


  file1: File[] = [];
  file2: File[] = [];
  signaturePhoto: any = [];
  stampPhoto: any = [];
  onSelectSignature(event: any) {
    this.loader = true;
    console.log(event);
    this.file1.push(...event.addedFiles);
    this.getsignature()
  }
  onSelectStamp(event: any) {
    this.loader = true;
    console.log(event);
    this.file2.push(...event.addedFiles);
    this.getstamp()
  }
  onRemoveSignature(event: any) {
    console.log(event);
    this.file1.splice(this.file1.indexOf(event), 1);
    this.signaturePhoto.splice(this.file1.indexOf(event), 1);

  }
  onRemoveStamp(event: any) {
    console.log(event);
    this.file2.splice(this.file1.indexOf(event), 1);
    this.stampPhoto.splice(this.file1.indexOf(event), 1);

  }

  public getsignature() {
    this.CommonService.pharmacyphoto(this.file1).subscribe((res) => {
      this.signaturePhoto=res;
      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
    });
    // this.sendattachment();
  }
  public getstamp() {
    ;
    this.CommonService.pharmacyphoto(this.file2).subscribe((res) => {
      this.stampPhoto=res;
      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
    });
    // this.sendattachment();
  }

}
