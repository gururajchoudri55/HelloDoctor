import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonService } from '../../../Pages/services/common.service';
import Labels from '../../Lables/countrymanager/countrylabels.json';
import { DiagnosticService } from '../../services/diagnostic.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.css'],
})
export class DoctorRegistrationComponent implements OnInit {
  constructor(
    private CommonService: CommonService,
    private SharedService: SharedService,
    private DiagnosticService: DiagnosticService
  ) {}

  doctorName: any;
  phoneNo: any;
  hospitalNo: any;
  email: any;
  speakingLanguages: any;
  gender: any;
  address: any;
  experience: any;
  professionalProfile: any;
  refferedDoctor: boolean | undefined;
  languageID: any;
  doctorTypeList: any;
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
  countryList: any;
  hospitalClinicList: any;
  hospitadd = {};
  degreeList: any;
  categoryID: any;
  departmentList: any;
  departmentID: any;
  slotID: any;
  specilisationList: any;
  specilisatiodd = {};
  specilisationid: any = [];
  doctorTypeID: any;
  documentsVerified: boolean | undefined;
  mallPractise: any;
  isMedicalregistrationVerified: any;
  registrationNumber: any;
  registrationCounsil: any;
  registrationYear: any;
  typeOfDoctor: any;
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
  validTill: any;
  degreeID: any;
  degreeName: any;
  colleageName: any;
  yearOfPassing: any;
  tablecount: any;
  degreeArray: any = [];
  doctorid: any;
  otherExperience: any;
  membershipDetails: any;
  labels: any;
  specilization: any;
  region: any;
  city: any;
  province: any;
  hospital: any;
  search: any;
  currentUrl: any;
  cash: boolean | undefined;
  creditCard: boolean | undefined;
  wallet: boolean | undefined;
  typeOfPayment: any;
  accountNames: string | undefined;
  ProviderPay: boolean = true;
  accountNumbers: any;
  paymentCompany: any;
  showHospital: number | undefined;
  MvolaPay: boolean | undefined;
  docType: boolean = true;
  countryCodeList: any;
  countryCodeNew: any;
  filteredCountryCodeID: any;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    this.hospitalclinicid == undefined
      ? (this.showHospital = 1)
      : (this.showHospital = 0);
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.specilization = this.labels.selectSpecialization;
    this.region = this.labels.selectRegion;
    this.city = this.labels.selectCity;
    this.province = this.labels.selectProvince;
    this.hospital = this.labels.selectHospital;
    this.search = this.labels.search;
    this.GetDoctorType();
    this.getHosptilClinicForAdmin();
    this.getCountryMaster(true);
    this.getDegrreMaster();
    this.getSubscriptionMasetr();
    this.departmentID = 0;
    this.cycleID = 0;
    this.wallet = false;
    this.creditCard = false;
    this.cash = false;
    this.ProviderPay = true;
    this.MvolaPay = true;
    this.getCountryCodeNew();
    this.countryCodeNew = '5';
  }

  //GetDoctorType

  public GetDoctorType() {
    this.CommonService.GetDoctorTypeMasterByLanguageID(
      this.languageID
    ).subscribe(
      (data) => {
        this.doctorTypeList = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctorTypeMasterByLanguageID',
          error
        );
      }
    );
  }

  //getDegreeMaster

  public getDegrreMaster() {
    this.CommonService.GetDegreeMasterBylanguageID(this.languageID).subscribe(
      (data) => {
        this.degreeList = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDegreeMasterBylanguageID',
          error
        );
      }
    );
  }

  // getCountry

  public getCountryMaster(doctype: any) {
    this.CommonService.GetCountryMasterByLanguageID(this.languageID).subscribe(
      (data) => {
        if (doctype) {
          this.countryList = data.filter((x) => x.id == 8);
        } else {
          this.countryList = data.filter(
            (x) => x.id == this.filteredCountryCodeID
          );
        }
        //this.countryList = data;
        console.log('CountryList', this.countryList);
        this.countrydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
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
          searchPlaceholderText: this.search,
          noResultsFound: 'no data',
          closeDropDownOnSelection: true,
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

  GetRegionID(item: any) {
    this.regionID = item.id;

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
          searchPlaceholderText: this.search,
          noDataAvailablePlaceholderText: 'Nod data available',
          closeDropDownOnSelection: true,
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

  public GetCityID(item1: any) {
    this.cityID = item1.id;
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
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,
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
  public GetAreaID(item3: any) {
    this.areaID = item3.id;
    for (let i = 0; i < this.areaList.length; i++) {
      if (this.areaList[i].id == this.areaID) {
        this.pinCode = this.areaList[i].pincode;
      }
    }
  }

  //get Hospital

  public getHosptilClinicForAdmin() {
    this.CommonService.GetHospital_ClinicForAdminByAdmin(
      this.languageID
    ).subscribe(
      (data) => {
        this.hospitalClinicList = data.filter(
          (x) => x.id != 612 && x.id != 613 && x.id != 614
        );
        console.log('HospitalList', this.hospitalClinicList);
        this.hospitadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
        };
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetHospital_ClinicForAdminByAdmin',
          error
        );
      }
    );
  }

  getCategoryID(even: any) {
    this.categoryID = even.target.value;
    this.getDepartmentMaster();
  }

  public getDepartmentMaster() {
    this.CommonService.GetDepartmentMasterByLanguageID(
      this.languageID
    ).subscribe(
      (data) => {
        this.departmentList = data.filter(
          (x) => x.categoryID == this.categoryID
        );
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDepartmentMasterByLanguageID',
          error
        );
      }
    );
  }

  GetDepartmentID(even: any) {
    this.departmentID = even.target.value;
    this.getSPecilizationMaster();
  }

  //Getslottype

  public getSlotDurationID(even: any) {
    this.slotID = even.target.value;
  }

  //specilizations

  public getSPecilizationMaster() {
    this.CommonService.GetSpecilaizationMasterByLanguageID(
      this.languageID
    ).subscribe(
      (data) => {
        this.specilisationList = data.filter(
          (x) => x.departmentID == this.departmentID
        );
        this.specilisatiodd = {
          singleSelection: false,
          idField: 'id',
          textField: 'specilaizationName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          enableCheckAll: false,
          // allowSearchFilter: true,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,
        };
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetSpecilaizationMasterByLanguageID',
          error
        );
      }
    );
  }

  public GetSpecilizationID(item: any) {
    this.specilisationid.push(item);
  }
  getDoctortype(even: any) {
    this.doctorTypeID = even.target.value;
  }

  public GetTypeofdoctor(even: any) {
    this.typeOfDoctor = even.target.value;

    if (this.typeOfDoctor == '1') {
      this.hospitalclinicid = 0;
    } else if (this.typeOfDoctor == '2') {
      this.hospitalclinicid = 590;
    } else if (this.typeOfDoctor == '3') {
      this.hospitalclinicid = 778;
    }
  }

  public GetHospitalID(item: any) {
    this.hospitalclinicid = item.id;
  }

  getExonerationPerioddate(exonerationPeriodFromDate: any) {
    this.exonerationPeriodFromDate = exonerationPeriodFromDate;
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

  //Identity Prooof

  files: File[] = [];
  identityProofUrl: any = [];

  getIdentityProof(event: any) {
    this.showPopup = 0;
    this.loader = true;
    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadeIdentityProofs();
  }

  public uploadeIdentityProofs() {
    this.CommonService.DoctorIdentityProof(this.files).subscribe((res) => {
      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      this.identityProofUrl.push(res);
    });
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  //Doctor Photo

  files1: File[] = [];
  doctorPhotoUrl: any = [];
  onSelectDoctorPhoto(event: any) {
    this.showPopup = 0;
    this.loader = true;
    console.log(event);
    this.files1.push(...event.addedFiles);
    this.getDoctorPhoto();
  }

  public getDoctorPhoto() {
    this.CommonService.DoctorPhotoUpload(this.files1).subscribe((res) => {
      this.doctorPhotoUrl.push(res);
      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
    });
    // this.sendattachment();
  }

  ondoctorPhotoRemove(event: any) {
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
  }

  files2: File[] = [];
  signaturePhoto: any = [];
  stampPhoto: any = [];
  onSelectdocSignature(event: any) {
    this.showPopup = 0;
    this.loader = true;
    console.log(event);
    this.files2.push(...event.addedFiles);
    this.getsignature();
  }

  public getsignature() {
    this.CommonService.DoctorPhotoUpload(this.files2).subscribe((res) => {
      this.signaturePhoto.push(res);
      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
    });
    // this.sendattachment();
  }

  ondoctorsignatureRemove(event: any) {
    console.log(event);
    this.files2.splice(this.files2.indexOf(event), 1);
  }

  files5: File[] = [];
  onSelectdocStamp(event: any) {
    this.showPopup = 0;
    this.loader = true;
    console.log(event);
    this.files5.push(...event.addedFiles);
    console.log('files5' + this.files5);
    this.getstamp();
  }

  public getstamp() {
    this.CommonService.DoctorPhotoUpload(this.files5).subscribe((res) => {
      this.stampPhoto.push(res);
      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
    });
    // this.sendattachment();
  }

  ondoctorstampRemove(event: any) {
    console.log(event);
    this.files5.splice(this.files5.indexOf(event), 1);
  }

  //upload resume

  files4: File[] = [];
  uplodresume: any = [];
  uploadResume(event: any) {
    this.showPopup = 0;
    this.loader = true;
    console.log(event);
    this.files4.push(...event.addedFiles);
    this.getDoctorPhoto();
  }

  public getUploadRemme() {
    this.CommonService.DoctorPhotoUpload(this.files4).subscribe((res) => {
      this.uplodresume.push(res);
      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
    });
    // this.sendattachment();
  }

  onRemoveUploadResume(event: any) {
    console.log(event);
    this.files4.splice(this.files4.indexOf(event), 1);
  }

  //upload Medical registration form

  files3: File[] = [];
  medicalRegistarionUrl: any = [];
  onSelectregistrationProof(event: any) {
    this.showPopup = 0;
    this.loader = true;
    console.log(event);
    this.files3.push(...event.addedFiles);
    this.getDoctorPhoto();
  }

  public getMedicalRegistration() {
    this.CommonService.DoctorPhotoUpload(this.files3).subscribe((res) => {
      this.medicalRegistarionUrl.push(res);

      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
    });
    // this.sendattachment();
  }

  onRemoveMedicalRegistartion(event: any) {
    console.log(event);
    this.files3.splice(this.files3.indexOf(event), 1);
  }

  public GetDegreeID(even: any) {
    this.degreeID = even.target.value;

    for (let i = 0; i < this.degreeList.length; i++) {
      if (this.degreeList[i].id == this.degreeID) {
        this.degreeName = this.degreeList[i].short;
      }
    }
  }

  docNearestkm: any;
  docnearesNumber: any;
  //doctorsave

  public insertDoctorregistration() {
    debugger;
    this.showPopup = 0;
    console.log('123' + this.exonerationPerioToDate);
    if (this.countryID == undefined || this.countryID.length == 0) {
      this.showPopup = 1;
      this.messageID = 5;
      this.typeofPopUp = 2;
    } /*  else if (this.cityID == undefined || this.cityID.length == 0) {
      this.showPopup = 1;
      this.messageID = 6;
      this.typeofPopUp = 2;
    } else if (this.areaID == undefined || this.areaID.length == 0) {
      this.showPopup = 1;
      this.messageID = 7;
      this.typeofPopUp = 2;
    }  */ else if (
      this.departmentID == undefined ||
      this.departmentID.length == 0
    ) {
      this.showPopup = 1;
      this.messageID = 28;
      this.typeofPopUp = 2;
    } else if (this.slotID == undefined || this.slotID == 0) {
      this.showPopup = 1;
      this.messageID = 29;
      this.typeofPopUp = 2;
    } else if (
      this.hospitalclinicid == undefined ||
      this.hospitalclinicid == 0
    ) {
      this.showPopup = 1;
      this.messageID = 14;
      this.typeofPopUp = 2;
    } else if (this.doctorTypeID == undefined || this.doctorTypeID == 0) {
      this.showPopup = 1;
      this.messageID = 30;
      this.typeofPopUp = 2;
    } else if (this.latitude == undefined || this.longitude == undefined) {
      //Swal.fire(this.labels.longitudeAlert);
      this.latitude = '1.0000';
      this.longitude = '2.0000';
    } else {
      if (this.doctorPhotoUrl.length == 0) {
        this.doctorPhotoUrl[0] = 'C:\\MarocAPI\\Images\\DocPhoto\\doc1.png';
      }
      this.loader = true;

      if (
        this.exonerationPerioToDate == undefined ||
        this.exonerationPerioToDate == null ||
        this.exonerationPerioToDate == false
      ) {
        this.exonerationPerioToDate = new Date();
        this.exonerationPeriodFromDate = new Date();
      }
      // var doc = 'Dr.' + '' + this.doctorname
      var entity = {
        DoctorName: this.doctorName,
        MobileNumber: this.phoneNo,
        EmailID: this.email,
        Password: '123',
        DepartmentID: this.departmentID,
        Experience: this.experience,
        Address: this.address,
        PhotoURL: this.doctorPhotoUrl[0],
        Description: this.professionalProfile ? this.professionalProfile : 'NA',
        MedicalRegistration: this.isMedicalregistrationVerified,
        Preffered: 0,
        GenderID: Number(this.gender),
        CityID: this.cityID,
        LanguageID: this.languageID,
        IsChatEnabled: 0,
        HomeVisit: 0,
        AreaID: this.areaID,
        Pincode: this.pinCode,
        CountryID: this.countryID,
        DoctorType: this.doctorTypeID,
        DocumentsVerified: this.documentsVerified,
        MallPractise: Number(this.mallPractise),
        ReferealBit: this.refferedDoctor,
        HospitalClinicID: this.hospitalclinicid,
        SpokenLanguages: this.speakingLanguages,
        SignatureURL: this.signaturePhoto[0]
          ? this.signaturePhoto[0]
          : 'NoImage',
        SlotDurationID: this.slotID,
        CategoryID: this.categoryID,
        SubscriptionTypeID: this.subscriptionTypeID,
        MonthlySubscription: this.montlySubscription,
        AppointmentPercentage: this.AppointmentPercentage
          ? this.AppointmentPercentage
          : 0,
        TaxIdentification: this.taxIdentification,
        BusinessID: this.businessID,
        CommercialRegCity: this.commercialCity,
        TaxProfessional: this.taxProfessional,
        SocialSeccurityNo: this.socialSeccurityFundno,
        Nameofthebank: this.nameOfBank,
        AccountName: this.accountName,
        AccountNumber: this.accountNumber,
        VAT: this.vatCheck,
        VatPercentage: this.vatPercentage,
        ExonerationPeriodFromDate:
          this.exonerationPeriodFromDate == undefined
            ? new Date()
            : this.exonerationPeriodFromDate,
        ExonerationPerioToDate:
          this.exonerationPerioToDate == undefined
            ? new Date()
            : this.exonerationPerioToDate,
        Lattitude: this.latitude,
        Longitude: this.longitude,
        FormatedAddress: this.formatAddress,
        ClinicNumber: this.hospitalNo,
        PayTypeID: this.cycleID,
        TypeofPayment: this.typeOfPayment,
        cash: this.cash,
        Wallet: this.wallet,
        CreditCard: this.creditCard,
        DocNearestLocDist: this.docNearestkm,
        DocNearestNumber: this.docnearesNumber,
        AcountNames: this.accountNames,
        AcountNumbers: this.accountNumbers,
        PaymentCompany: this.paymentCompany,
        MvolaPay: this.MvolaPay,
        ProviderPay: this.ProviderPay,
        CountryCodeNew: this.countryCodeNew,
        StampURL: this.stampPhoto[0],
      };
      this.CommonService.InsertDoctorRegistration(entity).subscribe(
        (data) => {
          console.log('entity', entity);
          if (data != 0 && data != 1) {
            this.doctorid = data;
            this.insertdoctorspecilisation();
            this.insertdoctormedicalregistration();
            this.insertidentityProof();
            this.InsertMedicalProof();
            this.insertdoctoreducation();
            this.insertdoctorexperience();
            this.insertdoctormembership();
            this.showPopup = 1;
            this.messageID = 1;
            this.typeofPopUp = 1;
            this.loader = false;
            location.href = '#/countrymanager/Doctordash';
          } else {
            if (data == 0) {
              this.showPopup = 1;
              this.messageID = 8;
              this.typeofPopUp = 2;
              this.loader = false;
            } else {
              this.showPopup = 1;
              this.messageID = 9;
              this.typeofPopUp = 2;
              this.loader = false;
            }
          }
        },
        (error) => {
          this.showPopup = 1;
          this.messageID = 10;
          this.typeofPopUp = 2;
          this.loader = false;
          console.log('Doctor registration', error);
          this.SharedService.insertexceptions(
            this.currentUrl,
            'InsertDoctorRegistration',
            error
          );
        }
      );
    }
  }

  //specilization

  public insertdoctorspecilisation() {
    for (let i = 0; i < this.specilisationid.length; i++) {
      var entity = {
        SpecializationID: this.specilisationid[i].id,
        DoctorID: this.doctorid,
      };
      this.CommonService.InsertDoctorSpecialization(entity).subscribe(
        (data) => {
          if (data != 0) {
          }
        }
      );
    }
  }

  //Doctor Education

  public InsertDocDetsils() {
    this.tablecount = 1;
    var entity = {
      DegreeID: this.degreeID,
      CollegeName: this.colleageName,
      YearOfPassing: this.yearOfPassing,
      DegreeName: this.degreeName,
    };
    this.degreeArray.push(entity);
    this.colleageName = '';
    this.degreeName = '';
    this.yearOfPassing = '';
  }

  public insertdoctoreducation() {
    for (let i = 0; i < this.degreeArray.length; i++) {
      var entity = {
        DoctorID: this.doctorid,
        CollegeName: this.degreeArray[i].CollegeName,
        YearOfPassing: this.degreeArray[i].YearOfPassing,
        DegreeID: this.degreeArray[i].DegreeID,
        Experience: this.doctorid,
        Resume: this.uplodresume[0],
      };
      this.CommonService.InsertDoctorEducation(entity).subscribe(
        (data) => {
          if (data != 0) {
          }
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'InsertDoctorEducation',
            error
          );
        }
      );
    }
  }

  public insertdoctorexperience() {
    var entity = {
      ExperienceDescription: this.otherExperience,
      DoctorID: this.doctorid,
    };
    this.CommonService.InsertDoctorExperience(entity).subscribe(
      (data) => {
        if (data != 0) {
        }
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'InsertDoctorExperience',
          error
        );
      }
    );
  }

  public insertdoctormembership() {
    var entity = {
      MembershipDescription: this.membershipDetails,
      DoctorID: this.doctorid,
      LanguageID: '1',
    };
    this.CommonService.InsertDoctorMembership(entity).subscribe(
      (data) => {
        if (data != 0) {
        }
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'InsertDoctorMembership',
          error
        );
      }
    );
  }

  public InsertMedicalProof() {
    if (this.medicalRegistarionUrl.length == 0) {
      this.medicalRegistarionUrl[0] =
        'C:\\MarocAPI\\Images\\DocMedicalProofProof\\medical.jpg';
    } else {
      for (let i = 0; i < this.medicalRegistarionUrl.length; i++) {
        var entity = {
          DoctorID: this.doctorid,
          PhotoURL: this.medicalRegistarionUrl[i],
        };
        this.CommonService.InsertDoctorMedicalProofs(entity).subscribe(
          (data) => {
            if (data != 0) {
            }
          }
        );
      }
    }
  }

  public insertidentityProof() {
    if (this.identityProofUrl.length == 0) {
      this.identityProofUrl[0] =
        'C:\\MarocAPI\\Images\\DocIdentityProof\\identity.jpg';
    }
    for (let i = 0; i < this.identityProofUrl.length; i++) {
      var entity = {
        DoctorID: this.doctorid,
        PhotoURL: this.identityProofUrl[i],
      };
      this.CommonService.InsertDoctorIdentityProofs(entity).subscribe(
        (data) => {
          if (data != 0) {
          }
        }
      );
    }
  }

  public insertdoctormedicalregistration() {
    if (this.registrationNumber == '') {
      this.registrationNumber = 0;
    }
    if (this.registrationCounsil == '') {
      this.registrationCounsil = 'none';
    }
    var entity = {
      DoctorID: this.doctorid,
      RegistrationNo: this.registrationNumber,
      RegistrationCouncil: this.registrationCounsil,
      RegistrationYear: this.registrationYear,
      LanguageID: '1',
      ValidTill: new Date(),
    };
    this.CommonService.InsertDoctorMedicalRegistration(entity).subscribe(
      (data) => {
        if (data != 0) {
        }
      }
    );
  }

  numberOnly(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
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

  lattitudeValidation(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 46 || charCode > 57)) {
      return false;
    }
    return true;
  }

  preventZero(even: any) {
    this.showPopup = 0;
    var no = even.split();
    if (no.length >= 1) {
      if (no[0] == '0') {
        this.phoneNo = '';
        this.typeofPopUp = 2;
        this.messageID = 84;
        this.showPopup = 1;
      }
    }
  }

  preventHospitalnoZero(even: any) {
    this.showPopup = 0;
    var no = even.split();
    if (no.length >= 1) {
      if (no[0] == '0') {
        this.hospitalNo = '';
        this.typeofPopUp = 2;
        this.messageID = 84;
        this.showPopup = 1;
      }
    }
  }
  getDoctortypes(even: any) {
    debugger;
    this.doctorTypeID = even.target.value;
    console.log('getDoctortype' + this.doctorTypeID);
    if (this.doctorTypeID == 1) {
      this.docType = true;
    } else {
      this.docType = false;
    }
    this.getCountryMaster(this.docType);
  }
  getCountryCodeNew() {
    this.DiagnosticService.GetCountryCodeMasterWeb().subscribe(
      (data) => {
        this.countryCodeList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCountryCode(event: any) {
    this.countryCodeNew = event.target.value;
    this.filteredCountryCodeID = this.countryCodeList.filter(
      (x: { countryID: any }) => x.countryID == event.target.value
    )[0].countryID;
    this.GetDoctorType();
    this.getCountryMaster(true);
  }
}
