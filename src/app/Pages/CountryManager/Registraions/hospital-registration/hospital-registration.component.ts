import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import Labels from '../../../Lables/countrymanager/countrylabels.json';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-hospital-registration',
  templateUrl: './hospital-registration.component.html',
  styleUrls: ['./hospital-registration.component.css']
})
export class HospitalRegistrationComponent implements OnInit {

  constructor(private CommonService: CommonService, private SharedService: SharedService) { }

  languageID: any;
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
  insuranceList: any;
  insurancedd = {};
  insuranceArray: any = [];
  hospitalPhotoUrl: any = [];
  hospitalClinic: any;
  hospitalName: any;
  hospitalNumber: any;
  contactPersonName: any;
  contactPersonNumber: any;
  email: any;
  address: any;
  zipCode: any;
  website: any;
  yearEstabilished: any;
  noOfbeds: any;
  emergency: any;

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
  loader: boolean | undefined;
  description: any;
  vatPercentage: any;
  exonerationPeriodFromDate: any;
  exonerationPerioToDate: any;
  hospitalclinicid: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  labels: any;
  region: any;
  province: any;
  city: any;
  insurance: any;
  fromdate: any;
  todate: any;
  search: any;
  currentUrl: any;

  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();


  docNearestkm: any;
  docnearesNumber: any;

  clinicTimings: any;
  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.search = this.labels.search
    this.region = this.labels.selectRegion;
    this.province = this.labels.selectProvince;
    this.city = this.labels.selectCity;
    this.search = this.labels.search;
    this.insurance = this.labels.selectInsurance;
    this.fromdate = this.labels.fromDate;
    this.todate = this.labels.toDate;
    this.getCountryMaster();
    this.getinsurancemaster();

    this.loader = false;


  }



  // getCountry 

  public getCountryMaster() {
    this.CommonService.GetCountryMasterByLanguageID(this.languageID).subscribe(
      data => {

        this.countryList = data;
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
          closeDropDownOnSelection: true,

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
          closeDropDownOnSelection: true,

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
          closeDropDownOnSelection: true,
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
          closeDropDownOnSelection: true,
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


  // GetInsuranceMaster


  public getinsurancemaster() {

    this.CommonService.GetInsuranceMasterByLanguageID(this.languageID).subscribe(
      data => {

        this.insuranceList = data;
        this.insurancedd = {
          singleSelection: false,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          enableCheckAll: false,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,

        };

      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetInsuranceMasterByLanguageID", error);
      }
    )
  }



  files: File[] = [];

  onSelect(event: any) {
    this.loader = true;
    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadHospitalPhotos()
  }

  public uploadHospitalPhotos() {
    this.showPopup = 0;
    this.CommonService.HospitalClinicPhotos(this.files).subscribe(res => {
      
      this.hospitalPhotoUrl.push(res);
      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("hospitalPhoto", this.hospitalPhotoUrl);
    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "HospitalClinicPhotos", error);
    })
    // this.sendattachment();
  }



  onRemove(event: any) {
    console.log(event);
    this.hospitalPhotoUrl.splice(this.files.indexOf(event), 1);
    this.files.splice(this.files.indexOf(event), 1);
    console.log("hospitalPhoto", this.hospitalPhotoUrl);
  }



  public getInuranceID(item: any) {

    this.insuranceArray.push(item)
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



  public insertHopsitalDetails() {
    this.showPopup = 0
    ;
    if (this.latitude == undefined || this.longitude == undefined) {
      Swal.fire(this.labels.longitudeAlert);
    }
    else if (this.countryID == undefined || this.countryID.length == 0) {
      this.showPopup = 1
      this.messageID = 5
      this.typeofPopUp = 2
    }
    // else if (this.cityID == undefined || this.cityID.length == 0) {
    //   this.showPopup = 1
    //   this.messageID = 6
    //   this.typeofPopUp = 2
    // }
    // else if (this.areaID == undefined || this.areaID.length == 0) {
    //   this.showPopup = 1
    //   this.messageID = 7
    //   this.typeofPopUp = 2
    // }

    else {
      if (this.hospitalPhotoUrl.length == 0) {
        ;
        this.hospitalPhotoUrl[0] = 'C:\\MadagascarWebAPI\\Images\\HospitalPhotos\\Hospital.jpg';
      }
      this.loader = true;
      
      var entity = {
        'Hospital_ClinicID': this.hospitalClinic,
        'Hospital_ClinicName': this.hospitalName,
        'Address': this.address,
        'PhoneNo': this.hospitalNumber,
        'EmailID': this.email,
        'ZipCode': this.zipCode,
        'LanguageID': '1',
        'Timings': '06:00 TO 20:00',
        'Description': this.description,
        'AvailabilityID': '1',
        'ContactPersonName': this.contactPersonName,
        'ContactPersonPhNo': this.contactPersonNumber,
        'Website': this.website,
        'YearEstablished': this.yearEstabilished,
        'NoOfBeds': this.noOfbeds,
        'Emergency': this.emergency,
        'CityID': this.cityID,
        'Preffered': 0,
        'HospitalLogoUrl': this.hospitalPhotoUrl[0],
        'AreaID': this.areaID,
        'Pincode': this.pinCode,
        'CountryID': this.countryID,
        'MonthlySubscription': this.montlySubscription,
        'Hospitalfulltimebit': 0,
        'SubscriptionTypeID': this.subscriptionTypeID,
        'AppointmentPercentage': this.AppointmentPercentage,
        'TaxIdentification': this.taxIdentification,
        'BusinessID': this.businessID,
        'CommercialRegCity': this.commercialCity,
        'TaxProfessional': this.taxProfessional,
        'SocialSeccurityNo': this.socialSeccurityFundno,
        'Nameofthebank': this.nameOfBank,
        'AccountName': this.accountName,
        'AccountNumber': this.accountNumber,
        'VAT': this.vatCheck,
        'VatPercentage': this.vatPercentage,
        'ExonerationPeriodFromDate': this.exonerationPeriodFromDate == undefined ? new Date() : this.exonerationPeriodFromDate,
        'ExonerationPerioToDate': this.exonerationPerioToDate == undefined ? new Date() : this.exonerationPerioToDate,
        'Lattitude': this.latitude,
        'Longitude': this.longitude,
        'FormatedAddress': this.formatAddress,
        'CLinicTimings': this.clinicTimings,
        'DocNearestLocDist': this.docNearestkm,
        'DocNearestNumber': this.docnearesNumber
      }
      this.CommonService.InsertHospitalClinicDetailsMaster(entity).subscribe(data => {
        
        if (data != 0 && data != 1) {
          console.log(data)
          this.hospitalclinicid = data;
          this.insertPhotos();
          this.insertInsurance();
          this.showPopup = 1;
          this.messageID = 1;
          this.typeofPopUp = 1;

          if (this.hospitalClinic == 1) {
            location.href = "#/countrymanager/Hospitaldash"
          }
          else if (this.hospitalClinic == 2) {
            location.href = "#/countrymanager/Clinicsdash"
          }
          else if (this.hospitalClinic == 3) {
            location.href = "#/countrymanager/GroupofDoctor"
          }
        }
        else {
          if (data == 0) {
            
            this.showPopup = 1
            this.messageID = 8
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
        
        console.log(error)
        this.loader = false;
        this.showPopup = 1
        this.messageID = 10
        this.typeofPopUp = 2
      })
    }

  }


  //Multiple Photos


  public insertPhotos() {
    for (let i = 1; i < this.hospitalPhotoUrl.length; i++) {
      var entity = {
        'Hospital_ClinicID': this.hospitalclinicid,
        'PhotoURL': this.hospitalPhotoUrl[i]
      }
      this.CommonService.InsertHospital_ClinicPhotos(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }



  // Insurances


  public insertInsurance() {
    for (let i = 0; i < this.insuranceArray.length; i++) {
      var entity2 = {
        'Hospital_ClinicID': this.hospitalclinicid,
        'InsuranceID': this.insuranceArray[i].id
      }
      this.CommonService.InsertHospital_ClinicInsurance(entity2).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }



  getExonerationPerioddate(exonerationPeriodFromDate: any) {
    this.exonerationPeriodFromDate = this.CommonService.GetDates(exonerationPeriodFromDate)
    
    console.log("Date", this.exonerationPerioToDate)
  }


  getToDate(exonerationPerioToDate: any) {
    this.exonerationPerioToDate = this.CommonService.GetDates(exonerationPerioToDate);
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




  numberOnly(event: { which: any; keyCode: any }): boolean {
    ;
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
      return false;
    }
    return true;
  }



  preventZero(even: any) {
    
    this.showPopup = 0;
    var no = even.split();
    if (no.length >= 1) {
      if (no[0] == '0') {
        this.hospitalNumber = ""
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
        this.contactPersonNumber = ""
        this.typeofPopUp = 2;
        this.messageID = 84;
        this.showPopup = 1;
      }

    }


  }
}


