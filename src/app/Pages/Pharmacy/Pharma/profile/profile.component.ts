import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { CommonService } from 'src/app/Pages/services/common.service';
import Labels from '../../../Lables/countrymanager/countrylabels.json';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  pharmacyName: any;
  contactPersonName: any;
  licenseNumber: any;
  phoneNumber: any;
  email: any;
  address: any;
  zipCode: any;
  monthlySubscription: any;
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
  contractEndDate: any;
  labels: any;
  region: any;
  province: any;
  city: any;
  insurance: any;
  fromdate: any;
  todate: any;
  id: any;
  details: any;
  photoUrl: any;
  cash: boolean | undefined;
  creditCard: boolean | undefined;
  wallet: boolean | undefined;
  currentUrl: any;
  valid: boolean | undefined;
  mrngOpenIngHours:any;
  mrngClosedHours:any;
  evengingOpeningHours:any;
  eveningClosedHours:any;

  acountNames:any;
  acountNumbers:any;
  paymentCompany:any;




  constructor(private CommonService: CommonService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.hospitalClinicID = sessionStorage.getItem('hospitalid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.region = this.labels.selectRegion;

    // this.activatedroute.params.subscribe(params => {

    //   this.id = atob(params['id']);

    // }
    // )

    this.id = sessionStorage.getItem('pharmacyid');
    this.getpharmacydetailsforadmin()
    this.province = this.labels.selectProvince;
    this.city = this.labels.selectCity;
    this.insurance = this.labels.selectInsurance;
    this.fromdate = this.labels.fromDate;
    this.todate = this.labels.toDate;

    this.cash = true;
  }


  numberOnly(event: { which: any; keyCode: any; }): boolean {
    
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }




  public getpharmacydetailsforadmin() {
    this.CommonService.GetPhamacyDetailsForAdminByLanguageID(this.id, this.languageID).subscribe(
      data => {

        this.details = data[0];

        this.pharmacyName = this.details.pharmacyName,
          this.contactPersonName = this.details.contactName,
          this.licenseNumber = this.details.licenseNo,
          // this.lic = this.details.licenseValidTill,
          this.phoneNumber = this.details.mobileNumber,
          this.email = this.details.email,
          this.address = this.details.address,
          this.cityID = this.details.cityID,
          this.zipCode = this.details.zipcode,
          this.website = this.details.website,
          this.morningOpeninghours = this.details.timings,
          this.decsription = this.details.description,
          this.photoUrl = this.details.photoURL,
          this.areaID = this.details.areaID,
          this.pinCode = this.details.pincode,
          this.countryID = this.details.countryID,
          this.regionID = this.details.regionMasterID
        this.homeDelivery = this.details.homeDelivery,
          this.nightPharmacy = this.details.nightPharmacy,
          this.afterNoonOpeningHours = this.details.eveningTimings,
          this.taxIdentification = this.details.taxIdentification
        this.businessID = this.details.businessID
        this.commercialRegCity = this.details.commercialRegCity
        this.taxProfessional = this.details.taxProfessional
        this.socialSeccurityNo = this.details.socialSeccurityNo
        this.nameOfTheBank = this.details.nameofthebank
        this.accountName = this.details.accountName
        this.accountNumber = this.details.accountNumber,
          this.latitude = this.details.lattitude,
          this.longitude = this.details.longitude,
          this.formatAddress = this.details.formatedAddress,
          this.contractStartDate = this.details.contractEndDate,
          this.contractEndDate = this.details.contractEndDate,
          this.cash = this.details.cash,
          this.creditCard = this.details.creditCard,
          this.wallet = this.details.wallet,
          this.mrngOpenIngHours=this.details.mrngTimeOpen,
          this.mrngClosedHours=this.details.mrngTimeClosed,
          this.evengingOpeningHours=this.details.afternoonTimeOpen,
          this.eveningClosedHours=this.details.afternoonTimeClosed,


          this.acountNames=this.details.acountNames,
          this.acountNumbers=this.details.acountNumbers,
          this.paymentCompany=this.details.paymentCompany,
          this.monthlySubscription=this.details.monthlySubscription




        this.getCountryMaster();
        this.getRegionMaster()
        this.getCityMaster();
        this.getareamasterbyid();
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetPhamacyDetailsForAdminByLanguageID", error);
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
        this.SharedService.insertexceptions(this.currentUrl, "GetCountryMasterByLanguageID", error);
      }
    )
  }

  //getRegion

  public getCountryID(even: any) {

    this.countryID = even.target.value;

    this.getRegionMaster()
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
    })
  }







  getContractStratDate(contractStratDate: any) {
    this.contractStartDate = this.CommonService.GetDates(contractStratDate);
    console.log("Contract Start Date", this.contractStartDate);
  }



  getContractEndDate(contractEndDate: any) {
    this.contractEndDate = this.CommonService.GetDates(contractEndDate);
    console.log("Contract Start Date", this.contractStartDate);
  }





  public updatedetails() {
    

    this.loader = true;

    if (this.latitude == undefined || this.longitude == undefined) {
      Swal.fire(this.labels.longiUpdateAlert);
      this.loader = false;
    } else {


      var entity = {
        'PharmacyName': this.pharmacyName,
        'LanguageID': this.languageID,
        'PharmacyID': this.id,
        'MobileNumber': this.phoneNumber,
        'ContactName': this.contactPersonName,
        'LicenseNo': this.licenseNumber,
        'LicenseValidTill': new Date(),
        'Email': this.email,
        'Address': this.address,
        'CityID': this.cityID,
        'Zipcode': this.zipCode,
        'Timings': this.morningOpeninghours,
        'Website': this.website,
        'Description': this.decsription,
        'AreaID': this.areaID,
        'Pincode': this.zipCode,
        'CountryID': this.countryID,
        'NightPharmacy': this.nightPharmacy,
        'HomeDelivery': 0,
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
        'MrngTimeOpen':this.mrngOpenIngHours,
        'MrngTimeClosed':this.mrngClosedHours,
        'AfternoonTimeOpen':this.evengingOpeningHours,
        'AfternoonTimeClosed':this.eveningClosedHours
      }
      this.CommonService.UpdatePharmacyProfile(entity).subscribe(res => {
        
        let test = res;
        this.updatephotos()
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
        this.loader = false;

      })

    }
  }




  public updatephotos() {

    var entity = {
      'ID': this.id,
      'PhotoURL': this.attachmentUrl[0]
    }
    this.CommonService.UpdatePharmacyPhotos(entity).subscribe(res => {


    })

  }

}
