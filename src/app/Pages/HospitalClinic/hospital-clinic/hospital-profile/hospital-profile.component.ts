import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import Labels from '../../../Lables/countrymanager/countrylabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-hospital-profile',
  templateUrl: './hospital-profile.component.html',
  styleUrls: ['./hospital-profile.component.css'],
})
export class HospitalProfileComponent implements OnInit {
  languageID: any;
  countryList: any;
  countrydd = {};
  countryID: any;
  regionList: any;
  regiondd: any;
  regionID: any;
  cityList: any;
  citydd = {};
  cityID: any;
  areaList: any;
  areadd = {};
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

  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();
  id: any;
  details: any;
  photoUrl: any;
  isDisabled: boolean = false;

  currentUrl: any;

  constructor(
    private CommonService: CommonService,
    private SharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.isDisabled = true;

    // this.activatedroute.params.subscribe(params => {

    //   this.id = atob(params['id']);
    //   this.gethospitalclinicdetailsbyid()

    // }
    // )
    this.id = sessionStorage.getItem('hospitalid');
    this.gethospitalclinicdetailsbyid();
  }

  numberOnly(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  valid: boolean | undefined;

  public isValidEmail(emailString: string): boolean {
    try {
      let pattern = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');
      this.valid = pattern.test(emailString);

      return this.valid;
    } catch (TypeError) {
      return false;
    }
  }

  // getCountry

  public getCountryMaster() {
    this.CommonService.GetCountryMasterByLanguageID(this.languageID).subscribe(
      (data) => {
        this.countryList = data;
        this.loader = false;
        console.log('CountryList', this.countryList);
        this.countrydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
        };
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetCountryMasterByLanguageID',
          error
        );
      }
    );
  }

  //getRegion

  public getCountryID(even: any) {
    this.countryID = even.target.value;

    this.getRegionMaster();
  }

  getRegionMaster() {
    this.CommonService.GetRegionMasterWeb(this.countryID).subscribe(
      (data) => {
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
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetRegionMasterWeb',
          error
        );
      }
    );
  }

  //GetProvince

  GetRegionID(even: any) {
    this.regionID = even.target.value;
    this.getCityMaster();
  }

  getCityMaster() {
    this.CommonService.GetCityMasterBYIDandLanguageID(
      this.regionID,
      this.languageID
    ).subscribe(
      (data) => {
        this.cityList = data;

        this.citydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
        };
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetCityMasterBYIDandLanguageID',
          error
        );
      }
    );
  }

  //GetAreaMaster

  public GetCityID(even: any) {
    this.cityID = even.target.value;
    this.getareamasterbyid();
  }

  public getareamasterbyid() {
    this.CommonService.GetAreaMasterByCityIDAndLanguageID(
      this.cityID,
      this.languageID
    ).subscribe(
      (data) => {
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
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetAreaMasterByCityIDAndLanguageID',
          error
        );
      }
    );
  }
  public GetAreaID(even: any) {
    this.areaID = even.target.value;
    for (let i = 0; i < this.areaList.length; i++) {
      if (this.areaList[i].id == this.areaID) {
        this.pinCode = this.areaList[i].pincode;
      }
    }
  }

  public gethospitalclinicdetailsbyid() {
    this.CommonService.GetHospital_ClinicDetailsForAdminByLanguageID(
      this.id,
      this.languageID
    ).subscribe(
      (data) => {
        this.details = data[0];
        console.log('Hospital Data', this.details);

        (this.hospitalName = this.details.hospital_ClinicName),
          (this.hospitalNumber = this.details.phoneNo),
          (this.contactPersonName = this.details.contactPersonName),
          (this.contactPersonNumber = this.details.contactPersonPhNo),
          (this.address = this.details.address),
          (this.email = this.details.emailID),
          (this.regionID = this.details.regionMasterID);
        (this.cityID = this.details.cityID),
          (this.zipCode = this.details.zipCode),
          // this. = this.details.timings
          (this.website = this.details.website),
          (this.yearEstabilished = this.details.yearEstablished),
          (this.noOfbeds = this.details.noOfBeds),
          (this.description = this.details.description),
          (this.photoUrl = this.details.photoURL),
          (this.areaID = this.details.areaID),
          (this.pinCode = this.details.pincode),
          (this.countryID = this.details.countryID),
          (this.areaID = this.details.areaID),
          (this.pinCode = this.details.pincode),
          (this.subscriptionTypeID = this.details.subscriptionTypeID),
          (this.montlySubscription = this.details.monthlySubscription);
        this.AppointmentPercentage = this.details.appointmentPercentage;
        this.taxIdentification = this.details.taxIdentification;
        this.businessID = this.details.businessID;
        this.commercialCity = this.details.commercialRegCity;
        this.taxProfessional = this.details.taxProfessional;

        this.socialSeccurityFundno = this.details.socialSeccurityNo;
        this.nameOfBank = this.details.nameofthebank;
        this.accountName = this.details.accountName;
        (this.accountNumber = this.details.accountNumber),
          (this.latitude = this.details.lattitude),
          (this.longitude = this.details.longitude),
          (this.formatAddress = this.details.formatedAddress),
          (this.vatPercentage = this.details.vatPercentage),
          (this.exonerationPeriodFromDate =
            this.details.exonerationPeriodFromDate);
        (this.exonerationPeriodFromDate =
          this.details.exonerationPeriodFromDate),
          (this.vatCheck = this.details.vat);
        console.log('vat', this.vatCheck);
        this.getCountryMaster();
        this.getRegionMaster();
        this.getCityMaster();
        this.getareamasterbyid();
        this.loader = false;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetHospital_ClinicDetailsForAdminByLanguageID',
          error
        );
      }
    );
  }

  //Google Addreess

  formatAddress: any;
  latitude: any;
  longitude: any;
  googleAddress: any;
  geocode() {
    this.loader = true;
    this.showPopup = 0;
    this.CommonService.Getlocation(this.address).subscribe(
      (data: any) => {
        console.log('google addressmain', data);
        if (data['results'].length != 0) {
          this.googleAddress = data['results'];
          console.log('google address', this.googleAddress);

          this.formatAddress = this.googleAddress[0]['formatted_address'];
          (this.latitude = this.googleAddress[0].geometry.location['lat']),
            (this.longitude = this.googleAddress[0].geometry.location['lng']);
          this.loader = false;
          this.showPopup = 1;
          this.typeofPopUp = 1;
          this.messageID = 12;
        } else {
          this.loader = false;
          this.showPopup = 1;
          this.typeofPopUp = 2;
          this.messageID = 13;
        }
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'Getlocation',
          error
        );
      }
    );
  }

  files: File[] = [];

  onSelect(event: any) {
    this.loader = true;
    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadHospitalPhotos();
  }

  public uploadHospitalPhotos() {
    this.showPopup = 0;
    this.CommonService.HospitalClinicPhotos(this.files).subscribe(
      (res) => {
        this.hospitalPhotoUrl.push(res);
        this.loader = false;
        this.showPopup = 1;
        this.messageID = 11;
        this.typeofPopUp = 1;
        console.log('hospitalPhoto', this.hospitalPhotoUrl);
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'HospitalClinicPhotos',
          error
        );
      }
    );
    // this.sendattachment();
  }

  onRemove(event: any) {
    console.log(event);
    this.hospitalPhotoUrl.splice(this.files.indexOf(event), 1);
    this.files.splice(this.files.indexOf(event), 1);
    console.log('hospitalPhoto', this.hospitalPhotoUrl);
  }

  getExonerationPerioddate(exonerationPeriodFromDate: any) {
    this.exonerationPeriodFromDate = exonerationPeriodFromDate;

    console.log('Date', this.exonerationPerioToDate);
  }

  public updatedetails() {
    var entity = {
      Hospital_ClinicName: this.hospitalName,
      LanguageID: this.languageID,
      Hospital_ClinicID: this.id,
      PhoneNo: this.hospitalNumber,
      ContactPersonName: this.contactPersonName,
      ContactPersonPhNo: this.contactPersonNumber,
      EmailID: this.email,
      Address: this.address,
      CityID: this.cityID,
      ZipCode: this.zipCode,
      Timings: 0,
      Website: this.website,
      YearEstablished: this.yearEstabilished,
      NoOfBeds: this.noOfbeds,
      Description: this.description,
      AreaID: this.areaID,
      Pincode: this.pinCode,
      CountryID: this.countryID,
      SubscriptionTypeID: this.subscriptionTypeID,
      MonthlySubscription: this.montlySubscription,
      AppointmentPercentage: this.AppointmentPercentage,
      TaxIdentification: this.taxIdentification,
      BusinessID: this.businessID,
      CommercialRegCity: this.commercialCity,
      TaxProfessional: this.taxProfessional,
      SocialSeccurityNo: this.socialSeccurityFundno,
      Nameofthebank: this.nameOfBank,
      AccountName: this.accountName,
      AccountNumber: this.accountNumber,
      VAT: this.vatCheck,
      Lattitude: this.latitude,
      Longitude: this.longitude,
      FormatedAddress: this.formatAddress,
      VatPercentage: this.vatPercentage,
      ExonerationPeriodFromDate:
        this.exonerationPeriodFromDate != null || undefined
          ? this.exonerationPeriodFromDate
          : new Date(),
      ExonerationPerioToDate:
        this.exonerationPerioToDate != null || undefined
          ? this.exonerationPerioToDate
          : new Date(),
    };

    this.CommonService.UpdateHospitalClinicProfile(entity).subscribe(
      (res) => {
        let test = res;

        this.updatephoto();
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
        location.href = '#/countrymanager/Hospitaldash';
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'UpdateHospitalClinicProfile',
          error
        );
      }
    );
  }

  public updatephoto() {
    var entity = {
      ID: this.id,
      HospitalLogoUrl: this.hospitalPhotoUrl[0],
    };
    this.CommonService.UpdateHospital_ClinicDetailsMasterPhoto(
      entity
    ).subscribe(
      (res) => {
        let test = res;

        // Swal.fire(' Updated Successfully');
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'UpdateHospital_ClinicDetailsMasterPhoto',
          error
        );
      }
    );
  }
}
