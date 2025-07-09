import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import Labels from '../../../Lables/countrymanager/countrylabels.json';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-edit-nurse',
  templateUrl: './edit-nurse.component.html',
  styleUrls: ['./edit-nurse.component.css'],
})
export class EditNurseComponent implements OnInit {
  constructor(
    private activatedroute: ActivatedRoute,
    private CommonService: CommonService,
    private SharedService: SharedService
  ) { }
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
  loader: boolean | undefined;
  description: any;
  vatPercentage: any;
  exonerationPeriodFromDate: any;
  exonerationPerioToDate: any;
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
  currentUrl: any;
  valid: boolean | undefined;
  cash: boolean | undefined;
  creditCard: boolean | undefined;
  wallet: boolean | undefined;
  typeOfPayment: any;


  accountNames: string | undefined;
  accountNumbers: any;
  paymentCompany: any;
  ProviderPay: boolean | undefined;
  MvolaPay: boolean | undefined;
  docNearestkm: any;
  docnearesNumber: any;

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.dummHospitalID = sessionStorage.getItem('hospitalid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.activatedroute.params.subscribe((params) => {
      this.id = atob(params['id']);
      this.getNurseDetails();
    });

    this.labels = this.languageID == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.region = this.labels.selectRegion;
    this.province = this.labels.selectProvince;
    this.city = this.labels.selectCity;
    this.insurance = this.labels.selectInsurance;
    this.fromdate = this.labels.fromDate;
    this.todate = this.labels.toDate;
    this.selecthospital = this.labels.selectHospital;
    this.selectspecialization = this.labels.selectSpecialization;
    this.hospitalClinicID = sessionStorage.getItem('hospitalid');
    this.getCountryMaster();
    this.getSpicilizationMaster();
  }

  numberOnly(event: { which: any; keyCode: any }): boolean {
    ;
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
      return false;
    }
    return true;
  }


  public isValidEmail(emailString: string): boolean {
    ;
    try {
      let pattern = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');
      this.valid = pattern.test(emailString);
      ;
      return this.valid;
    } catch (TypeError) {
      return false;
    }
  }

  getNurseDetails() {
    ;
    this.CommonService.GetNurseRegistrationByIDAndLanguageID(
      this.id,
      this.languageID
    ).subscribe(
      (data) => {
        this.nursedetails = data;
        this.name = this.nursedetails[0].nurseName;
        this.phoneNumber = this.nursedetails[0].phoneNo;
        this.email = this.nursedetails[0].email;
        this.gender = this.nursedetails[0].genderID;
        this.address = this.nursedetails[0].address;
        // this.dea = this.nursedetails[0].departementID;
        this.experience = this.nursedetails[0].experience;
        this.description = this.nursedetails[0].description;
        this.homeVisit = this.nursedetails[0].homeVisit;
        this.countryID = this.nursedetails[0].countryID;
        this.hospitalClinicID = this.nursedetails[0].hospitalClinicID;
        this.cityID = this.nursedetails[0].cityID;
        this.areaID = this.nursedetails[0].areaID;
        this.pinCode = this.nursedetails[0].pincode;
        this.photoUrl = this.nursedetails[0].photoURL;
        this.attchmentUrl[0] = this.nursedetails[0].photoUrlPath;
        this.hospitalName = this.nursedetails[0].hospital_ClinicName;
        (this.subscriptionTypeID = this.nursedetails[0].subscriptionTypeID),
          (this.montlySubscription = this.nursedetails[0].monthlySubscription);
        this.AppointmentPercentage = this.nursedetails[0].appointmentPercentage;
        this.taxIdentification = this.nursedetails[0].taxIdentification;
        this.businessID = this.nursedetails[0].businessID;
        this.commercialCity = this.nursedetails[0].commercialRegCity;
        this.taxProfessional = this.nursedetails[0].taxProfessional;
        this.socialSeccurityFundno = this.nursedetails[0].socialSeccurityNo;
        this.nameOfBank = this.nursedetails[0].nameofthebank;
        this.accountName = this.nursedetails[0].accountName;
        (this.accountNumber = this.nursedetails[0].accountNumber),
          (this.latitude = this.nursedetails[0].lattitude),
          (this.longitude = this.nursedetails[0].longitude),
          (this.formatAddress = this.nursedetails[0].formatedAddress);
        (this.regionID = this.nursedetails[0].regionMasterID),
          (this.exonerationPeriodFromDate =
            this.nursedetails[0].exonerationPeriodFromDate);
        (this.exonerationPerioToDate =
          this.nursedetails[0].exonerationPeriodFromDate),
          (this.vatCheck = this.nursedetails[0].vat),
          (this.vatPercentage = this.nursedetails[0].vatPercentage);
        this.professionalProfile = this.nursedetails[0].description;
        (this.cycleID = this.nursedetails[0].payTypeID),
          (this.typeOfPayment = this.nursedetails[0].typeofPayment),
          (this.cash = this.nursedetails[0].cash),
          (this.wallet = this.nursedetails[0].wallet),
          (this.creditCard = this.nursedetails[0].creditCard);
        this.slotDurationID = this.nursedetails[0].slotDurationID,
          this.accountNames = this.nursedetails[0].acountNames,
          this.accountNumbers = this.nursedetails[0].acountNumbers,
          this.paymentCompany = this.nursedetails[0].paymentCompany,
          this.ProviderPay = this.nursedetails[0].providerPay
        this.MvolaPay = this.nursedetails[0].mvolaPay,
          this.docnearesNumber = this.nursedetails[0].docNearestNumber,
          this.docNearestkm = this.nursedetails[0].docNearestLocDist,


          console.log(this.vatCheck);

        this.getCountryMaster();
        this.getRegionMaster();
        this.getCityMaster();
        this.getareamasterbyid();
        this.getSubscriptionMasetr();
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetNurseRegistrationByIDAndLanguageID',
          error
        );
      }
    );
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
        this.loader = false;
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
      (error) => { }
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
      (error) => { }
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
      (error) => { }
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

  getExonerationPerioddate(exonerationPeriodFromDate: any) {
    this.exonerationPeriodFromDate = this.CommonService.GetDates(
      exonerationPeriodFromDate
    );
    console.log('exoneration Period From Date', this.exonerationPeriodFromDate);
  }

  getexoneationPeriodToDate(exonerationPerioToDate: any) {
    this.exonerationPerioToDate = this.CommonService.GetDates(
      exonerationPerioToDate
    );
    console.log('exoneration Period To Date', this.exonerationPerioToDate);
  }

  public getHospitalID(item: any) {
    this.hospitalClinicID = item.id;
  }

  getSlotDurationID(even: any) {
    this.slotDurationID = even.target.value;
  }
  //Nurse Photo

  onSelect(event: any) {
    this.attchmentUrl.length = 0;
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
    this.folderName = 'Images/NursePhoto';
    this.CommonService.AllFilesUploads(this.files, this.folderName).subscribe(
      (res) => {
        this.attchmentUrl.push(res);
        this.showPopup = 1;
        this.messageID = 11;
        this.typeofPopUp = 1;
        console.log('hospitalPhoto', this.attchmentUrl);
        this.loader = false;
      }
    );
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
    this.folderName = 'Images/NurseIdentityPhotos';
    this.CommonService.AllFilesUploads(this.files1, this.folderName).subscribe(
      (res) => {
        this.identityAttchmentUrl.push(res);
        this.showPopup = 1;
        this.messageID = 11;
        this.typeofPopUp = 1;
        console.log('Identity', this.attchmentUrl);
        this.loader = false;
      }
    );
  }

  //Google Addreess

  geocode() {
    ;
    this.loader = true;
    this.showPopup = 0;
    this.CommonService.Getlocation(this.address).subscribe((data: any) => {
      ;
      console.log('google addressmain', data);
      if (data['results'].length != 0) {
        this.googleAddress = data['results'];
        console.log('google address', this.googleAddress);
        ;
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
    });
  }

  getSpicilizationMaster() {
    this.CommonService.GetSpecilaizationMasterByLanguageID(
      this.languageID
    ).subscribe(
      (data) => {
        this.loader = false;

        this.specilizationList = data.filter((x) => x.departmentID == 30);

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
      },
      (error) => { }
    );
  }

  public GetSpecilizationID(item: any) {
    this.specilizationID.push(item);
  }

  checkVatvalue(even: any) {
    ;
    if (even == 1) {
      this.vatPercentage = 0;
    } else {
      this.vatPercentage = 20;
    }
  }

  public updateDetails() {
    this.loader = true;
    this.showPopup = 0;
    ;
    if (this.latitude == undefined || this.longitude == undefined) {
      Swal.fire(this.labels.longiUpdateAlert);
      this.loader = false;
    }
    if (this.cash == false && this.creditCard == false && this.wallet == false) {
      Swal.fire(this.labels.selectPaymentType);
      this.loader = false;
    }
    else {
      var entity = {
        LanguageID: this.languageID,
        ID: this.id,
        NurseName: this.name,
        PhoneNo: this.phoneNumber,
        Email: this.email,
        GenderID: this.gender,
        Address: this.address,
        DepartementID: 0,
        Experience: this.experience,
        Description: this.description,
        HomeVisit: this.homeVisit,
        CityID: this.cityID,
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
          this.exonerationPeriodFromDate != null
            ? this.exonerationPeriodFromDate
            : new Date(),
        ExonerationPerioToDate:
          this.exonerationPerioToDate != null
            ? this.exonerationPerioToDate
            : new Date(),
            
        PayTypeID: this.cycleID,
        TypeofPayment: this.typeOfPayment,
        cash: this.cash,
        Wallet: this.wallet,
        CreditCard: this.creditCard,
        AcountNames: this.accountNames,
        AcountNumbers: this.accountNumbers,
        PaymentCompany: this.paymentCompany,
        ProviderPay: this.ProviderPay,
        DocNearestLocDist: this.docNearestkm,
        DocNearestNumber: this.docnearesNumber,
        MvolaPay:this.MvolaPay
      };
      this.CommonService.UpdateNurseRegistration(entity).subscribe(
        async (data) => {
          if (data != undefined) {
            await this.updatePhoto();
            this.showPopup = 1;
            this.messageID = 34;
            this.typeofPopUp = 1;
            location.href = '#/countrymanager/Nurse';
          }
        },
        (error) => { }
      );
    }
  }

  async updatePhoto() {
    var entity = {
      ID: this.id,
      PhotoUrl: this.attchmentUrl[0],
    };
    this.CommonService.UpdateNurseRegistrationPhoto(entity).subscribe(
      async (data) => { }
    );
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


  lattitudeValidation(event: { which: any; keyCode: any; }): boolean {
    
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 46 || charCode > 57)) {
      return false;
    }
    return true;

  }

  showEdit: any;

  editPhoto() {
    this.showEdit = 1;
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

}
