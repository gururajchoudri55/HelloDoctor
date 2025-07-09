import { Component, OnInit } from '@angular/core';
import Labels from '../../../Lables/countrymanager/countrylabels.json';
import { CommonService } from 'src/app/Pages/services/common.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loader: boolean | undefined;
  id: any;
  languageID: any;
  files: File[] = [];
  name: any;
  phoneNumber: any;
  email: any;
  gender: any;
  address: any;
  slotDurationID: any;
  experience: any;
  education: any;
  spokenLanguages: any;
  professionalProfile: any;
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
  description: any;
  vatPercentage: any;
  exonerationPeriodFromDate: any;
  exonerationPerioToDate: any;
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
  hospitalClinicID: any;
  hospitalClinicList: any;
  hospitadd = {};
  dummHospitalID: any;
  attchmentUrl: any = [];
  folderName: any;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  files1: File[] = [];
  identityAttchmentUrl: any = [];

  formatAddress: any;
  latitude: any;
  longitude: any;
  googleAddress: any;
  nurseID: any;
  specilizationList: any;
  specilisatiodd = {};
  specilizationID: any = [];
  labels: any;
  region: any;
  province: any;
  city: any;
  insurance: any;
  fromdate: any;
  todate: any;
  selecthospital: any;
  selectspecialization: any;
  nursedetails: any;
  photoUrl: any;
  hospitalName: any;
  homeVisit: any;
  details: any;
  currentUrl: any;
  cash: boolean | undefined;
  creditCard: boolean | undefined;
  wallet: boolean | undefined;
  typeOfPayment: any;
  search: any;
  constructor(private CommonService: CommonService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.dummHospitalID = sessionStorage.getItem('hospitalid');
    this.languageID = sessionStorage.getItem('LanguageID');
    // this.activatedroute.params.subscribe(params => {

    //   this.id = atob(params['id']);
    //   this.Getmidwifedetails()
    // }
    // )
    this.id = sessionStorage.getItem('midwifeid');
    this.Getmidwifedetails()

    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.region = this.labels.selectRegion;
    this.province = this.labels.selectProvince;
    this.city = this.labels.selectCity;
    this.insurance = this.labels.selectInsurance;
    this.fromdate = this.labels.fromDate;
    this.todate = this.labels.toDate;
    this.selecthospital = this.labels.selectHospital;
    this.selectspecialization = this.labels.selectSpecialization;
    this.hospitalClinicID = sessionStorage.getItem('hospitalid');
  }




  public Getmidwifedetails() {
    this.CommonService.GetMidWivesRegistrationByIDAndLanguageID(this.id, this.languageID).subscribe(data => {
      this.details = data[0];
      console.log(this.details)
      
      this.name = this.details.name,
        this.phoneNumber = this.details.phoneNo,
        this.email = this.details.email,
        this.gender = this.details.genderID,
        this.address = this.details.address,
        // this.deptid = this.details.departementID,
        this.experience = this.details.experience,
        this.description = this.details.description,
        this.homeVisit = this.details.homeVisit,
        this.countryID = this.details.countryID,
        this.cityID = this.details.cityID,
        this.areaID = this.details.areaID,
        this.pinCode = this.details.pincode
      this.photoUrl = this.details.photoURL;
      this.attchmentUrl[0] = this.details.photoUrlPath;
      this.hospitalName = this.details.hospital_ClinicName;
      this.subscriptionTypeID = this.details.subscriptionTypeID,
        this.montlySubscription = this.details.monthlySubscription
      this.AppointmentPercentage = this.details.appointmentPercentage
      this.taxIdentification = this.details.taxIdentification
      this.businessID = this.details.businessID
      this.commercialCity = this.details.commercialRegCity
      this.taxProfessional = this.details.taxProfessional
      this.socialSeccurityFundno = this.details.socialSeccurityNo
      this.nameOfBank = this.details.nameofthebank
      this.accountName = this.details.accountName
      this.accountNumber = this.details.accountNumber,
        this.hospitalClinicID = this.details.hospitalClinicID,
        this.latitude = this.details.lattitude,
        this.longitude = this.details.longitude,
        this.formatAddress = this.details.formatedAddress
      this.regionID = this.details.regionMasterID,
        this.exonerationPeriodFromDate = this.details.exonerationPeriodFromDate
      this.exonerationPerioToDate = this.details.exonerationPeriodFromDate,
        this.vatCheck = this.details.vat,
        this.vatPercentage = this.details.vatPercentage,
        (this.cycleID = this.details.payTypeID),
        (this.typeOfPayment = this.details.typeofPayment),
        (this.cash = this.details.cash),
        (this.wallet = this.details.wallet),
        (this.creditCard = this.details.creditCard);
      this.slotDurationID = this.details.slotDurationID


      this.getCountryMaster();
      this.getRegionMaster()
      this.getCityMaster();
      this.getareamasterbyid();
      this.getSubscriptionMasetr()


    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "GetMidWivesRegistrationByIDAndLanguageID", error);
    })
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
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true

        };
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetAreaMasterByCityIDAndLanguageID", error);
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


  getExonerationPerioddate(exonerationPeriodFromDate: any) {
    this.exonerationPeriodFromDate = this.CommonService.GetDates(exonerationPeriodFromDate);
    console.log("exoneration Period From Date", this.exonerationPeriodFromDate);
  }

  getexoneationPeriodToDate(exonerationPerioToDate: any) {
    this.exonerationPerioToDate = this.CommonService.GetDates(exonerationPerioToDate);
    console.log("exoneration Period To Date", this.exonerationPerioToDate);
  }

  public getHospitalID(item: any) {
    this.hospitalClinicID = item.id;
  }


  getSlotDurationID(even: any) {
    this.slotDurationID = even.target.value;
  }
  //Nurse Photo

  onSelect(event: any) {
    this.attchmentUrl.length = 0
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
    this.folderName = "Images/NursePhoto"
    this.CommonService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
      this.attchmentUrl.push(res);
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("hospitalPhoto", this.attchmentUrl);
      this.loader = false;
    })
  }





  // Identity Photos



  onSelectIdentityPhotos(event: any) {
    this.showPopup = 0;
    this.loader = true;
    console.log(event);
    this.files1.push(...event.addedFiles);
    this.uploadsAttchmentsIdentity();
  }

  onIdentityRemove(event: any) {
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
    this.identityAttchmentUrl.splice(this.files1.indexOf(event), 1);
  }


  uploadsAttchmentsIdentity() {

    this.folderName = "Images/NurseIdentityPhotos"
    this.CommonService.AllFilesUploads(this.files1, this.folderName).subscribe(res => {
      this.identityAttchmentUrl.push(res);
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("Identity", this.attchmentUrl);
      this.loader = false;
    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "AllFilesUploads", error);
    })
  }







  //Google Addreess


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

    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "Getlocation", error);
    })
  }




  getSpicilizationMaster() {
    this.CommonService.GetSpecilaizationMasterByLanguageID(this.languageID).subscribe(
      data => {

        this.loader = false;

        this.specilizationList = data.filter(x => x.departmentID == 30)

        this.specilisatiodd = {
          singleSelection: false,
          idField: 'id',
          textField: 'specilaizationName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          enableCheckAll: false,

        };

      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetSpecilaizationMasterByLanguageID", error);
      }
    )
  }



  public GetSpecilizationID(item: any) {

    this.specilizationID.push(item);

  }

  checkVatvalue(even: any) {
    
    if (even == 1) {
      this.vatPercentage = 0;
    }
    else {
      this.vatPercentage = 20;
    }
  }




  public updateDetails() {
    this.showPopup=0
    if (this.latitude == undefined || this.longitude == undefined) {
      Swal.fire(this.labels.longiUpdateAlert);
      this.loader = false;
    }
    else {
      var entity = {
        'LanguageID': this.languageID,
        'ID': this.id,
        'Name': this.name,
        'PhoneNo': this.phoneNumber,
        'Email': this.email,
        'GenderID': this.gender,
        'Address': this.address,
        'CityID': this.cityID,
        'AreaID': this.areaID,
        'DepartementID': 0,
        'Experience': this.experience,
        'Description': this.description,
        'HomeVisit': Number(this.homeVisit),
        'Pincode': this.pinCode,
        'CountryID': this.countryID,
        'SubscriptionTypeID': this.subscriptionTypeID,
        'MonthlySubscription': this.montlySubscription,
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
        'Lattitude': this.latitude,
        'Longitude': this.longitude,
        'FormatedAddress': this.formatAddress,
        'VatPercentage': this.vatPercentage,
        'ExonerationPeriodFromDate': this.exonerationPeriodFromDate != null ? this.exonerationPeriodFromDate : new Date(),
        'ExonerationPerioToDate': this.exonerationPerioToDate != null ? this.exonerationPerioToDate : new Date(),
        'PayTypeID': this.cycleID,
        'TypeofPayment': this.typeOfPayment,
        'cash': this.cash,
        'Wallet': this.wallet,
        'CreditCard': this.creditCard,
      }
      this.CommonService.UpdateMidWivesRegistration(entity).subscribe(async data => {
        if (data != undefined) {
          await this.updatePhoto()
          this.showPopup = 1;
          this.messageID = 34;
          this.typeofPopUp = 1;
          this.loader = false;

        }
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "UpdateMidWivesRegistration", error);
      })
    }
  }




  paymenyCycleList: any;

  getSubscriptionMasetr() {
    this.CommonService.GetSubscriptionPayTypeMaster().subscribe((data) => {
      this.paymenyCycleList = data;
    });
  }

  cycleID: any;

  getMonthCycleID(even: any) {
    this.cycleID = even.target.value;
  }


  public updatePhoto() {
    
    var entity = {
      'ID': this.id,
      'PhotoUrl': this.attchmentUrl[0]
    }
    this.CommonService.UpdateMidWivesRegistrationPhoto(entity).subscribe(data => {

    })
  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
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


}
