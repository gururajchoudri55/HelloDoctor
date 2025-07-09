import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import Labels from '../../../Lables/countrymanager/countrylabels.json';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-pharmacy-registration',
  templateUrl: './pharmacy-registration.component.html',
  styleUrls: ['./pharmacy-registration.component.css']
})
export class PharmacyRegistrationComponent implements OnInit {
  

  constructor(private CommonService: CommonService, private SharedService: SharedService) { }

  pharmacyName: any;
  contactPersonName: any;
  licenseNumber: any;
  phoneNumber: any;
  email: any;
  address: any;
  zipCode: any;
  monthlySubscriptipon: any;
  homeDelivery: any;
  nightPharmacy: any;
  teleOrdering: any;
  decsription: any;
  taxIdentification: any;
  businessID: any;
  commercialRegCity: any;
  socialSeccurityNo: any;
  nameOfTheBank: any;
  accountName: any;
  accountNumber: any;
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
  morningOpeninghours: any;
  afterNoonOpeningHours: any;
  loader: boolean | undefined;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  attachmentUrl: any = [];
  website: any;
  taxProfessional: any;
  hospitalClinicID: any;
  pharmacyID: any;
  contractStartDate: any;
  ContractEndDate: any;
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
  MvolaPay: boolean=true;
  file1: File[] = [];
  file2: File[] = [];
  signaturePhoto: any = [];
  stampPhoto: any = [];
  Partner:any;
  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.hospitalClinicID = sessionStorage.getItem('hospitalid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.region = this.labels.selectRegion;
    this.province = this.labels.selectProvince;
    this.city = this.labels.selectCity;
    this.search = this.labels.search;
    this.insurance = this.labels.selectInsurance;
    this.fromdate = this.labels.fromDate;
    this.todate = this.labels.toDate;
    this.countryID = "";
    this.getCountryMaster();
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
          allowSearchFilter: true

        };
      }, error => {
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
          searchPlaceholderText: this.search

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
          searchPlaceholderText: this.search

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
          searchPlaceholderText: this.search

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


  //Pharmacy Photo

  files: File[] = [];

  onSelect(event: any) {
    this.loader = true;
    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadattachments()
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.attachmentUrl.splice(this.files.indexOf(event), 1);

  }
  public uploadattachments() {
    this.CommonService.pharmacyphoto(this.files).subscribe((res: any) => {
      this.loader = false;
      this.attachmentUrl.push(res);
    }, error => {
      console.log("Error with pharmacyphoto", error);
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "pharmacyphoto", error);
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






  public insertPhramcyRegistration() {
    this, this.showPopup = 0;
    
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
      this.showPopup = 0;
      this.loader = true;
      
      var entity = {
        'PharmacyName': this.pharmacyName,
        'MobileNumber': this.phoneNumber,
        'Email': this.email,
        'Password': '123',
        'ContactName': this.contactPersonName,
        'Address': this.address,
        'Zipcode': this.zipCode,
        'Timings': this.morningOpeninghours,
        'LanguageID': '1',
        'LicenseNo': this.licenseNumber,
        'LicenseValidTill': new Date(),
        'HomeDelivery': 0,
        'Website': this.website,
        'NightPharmacy': this.nightPharmacy,
        'TeleOrdering': this.teleOrdering,
        'Preffered': 0,
        'CityID': this.cityID,
        'Description': this.decsription,
        'AreaID': this.areaID,
        'Pincode': this.zipCode,
        'CountryID': this.countryID,
        'MonthlySubscription': this.monthlySubscriptipon,
        'HospitalClinicID': this.hospitalClinicID,
        'Hospitalfulltimebit': 0,
        'ContartStartDate': this.contractStartDate == undefined ? new Date() : this.contractStartDate,
        'ContractEndDate': this.ContractEndDate,
        'EveningTimings': this.afterNoonOpeningHours,
        'TaxIdentification': this.taxIdentification,
        'BusinessID': this.businessID,
        'CommercialRegCity': this.commercialRegCity,
        'TaxProfessional': this.taxProfessional,
        'SocialSeccurityNo': this.socialSeccurityNo,
        'Nameofthebank': this.nameOfTheBank,
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
        'MvolaPay':this.MvolaPay,
        'StampURL':this.stampPhoto[0],
        'signatureURL':this.signaturePhoto[0],
        'Partner':this.Partner
      }
      this.CommonService.InsertPharmacyRegistration(entity).subscribe(data => {
        
        if (data != 0) {
          this.pharmacyID = data;
          this.InsertPharmcyPhotos();
          location.href = "#/countrymanager/Pharmacy";
          this.showPopup = 1;
          this.messageID = 1;
          this.typeofPopUp = 1;
          this.loader = false;
        }
      }, error => {
        
        this.showPopup = 1;
        this.messageID = 10;
        this.typeofPopUp = 2;
        this.loader = false;
        console.log("Pharmcy registration", error);
        this.SharedService.insertexceptions(this.currentUrl, "InsertPharmacyRegistration", error);
      })

    }
  }







  public InsertPharmcyPhotos() {
    if (this.attachmentUrl.length == 0) {
      this.attachmentUrl[0] = 'C:\\MarocAPI\\Images\\PharmacyPhotos\\Pharmacy.jpg'
    }
    for (let i = 0; i < this.attachmentUrl.length; i++) {

      var entity = {
        'PharmacyID': this.pharmacyID,
        'PhotoURL': this.attachmentUrl[i]
      }
      this.CommonService.InsertPharmacyPhotos(entity).subscribe(data => {

        if (data != 0) {
        }
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "InsertPharmacyPhotos", error);
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
        this.phoneNumber = ""
        this.typeofPopUp = 2;
        this.messageID = 84;
        this.showPopup = 1;
      }

    }


  }


  onSelectSignature(event: any){
    this.loader = true;
    console.log(event);
    this.file1.push(...event.addedFiles);
    this.getsignature()
  }
  onSelectStamp(event: any){
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
      this.signaturePhoto.push(res);
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
      this.stampPhoto.push(res);
      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
    });
    // this.sendattachment();
  }

}
