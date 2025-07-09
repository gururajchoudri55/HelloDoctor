import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonService } from '../../../../Pages/services/common.service';
import Labels from '../../../Lables/countrymanager/countrylabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css'],
})
export class EditDoctorComponent implements OnInit {
  educationid: any;
  countryCodeList: any;
  stampPhoto: any;
  constructor(
    private CommonService: CommonService,
    private activatedroute: ActivatedRoute,
    private SharedService: SharedService,
    private DoctorService: DoctorService
  ) {}
  doctorName: any;
  phoneNo: any;
  countryCodeNew: any;
  hospitalNo: any;
  email: any;
  speakingLanguages: any;
  gender: any;
  address: any;
  experience: any;
  professionalProfile: any;
  refferedDoctor: any;
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
  documentsVerified: any;
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
  id: any;
  docmedicalid: any;
  currentUrl: any;
  valid: boolean | undefined;
  cash: boolean | undefined;
  creditCard: boolean | undefined;
  wallet: boolean | undefined;
  typeOfPayment: any;
  docNearestkm: any;
  docnearesNumber: any;
  sigPhoto: any;
  accountNames: string | undefined;
  accountNumbers: any;
  paymentCompany: any;
  ProviderPay: boolean | undefined;
  MvolaPay: boolean | undefined;
  doctorEduction: boolean = true;

  docType: any;
  stpPhoto: any;
  roleid: any;
  ngOnInit(): void {
    this.loader = true;
    this.degreeID = '';
    this.currentUrl = window.location.href;
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    this.roleid = sessionStorage.getItem('roleid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.activatedroute.params.subscribe((params) => {
      this.id = atob(params['id']);
      this.updatePhotoId = 0;
      this.getdoctoreducationweb();
      this.getDegrreMaster();
      this.getdoctordetailsbyid();
      this.GetDoctorIdentityProof();
    });

    // this.GetDoctorType();
    // this.getHosptilClinicForAdmin();
    // this.getCountryMaster();
    // this.getDegrreMaster();
    this.departmentID = 0;
    this.editSlot = 0;
    this.getCountryCodeNew();
  }
  getCountryCode(even: any) {
    this.countryCodeNew = even.target.value;
  }
  details: any;
  photoUrl: any;
  hospitalName: any;
  clinicNumber: any;

  public getdoctordetailsbyid() {
    this.CommonService.GetDoctorDetailsForAdminByLanguageID(
      this.id,
      this.languageID
    ).subscribe(
      async (data) => {
        this.details = data[0];
        console.log(this.details);

        (this.doctorName = this.details.doctorName),
          (this.phoneNo = this.details.mobileNumber),
          (this.email = this.details.emailID),
          (this.departmentID = this.details.departmentID),
          (this.address = this.details.address),
          (this.professionalProfile = this.details.description),
          (this.registrationNumber = this.details.registrationNo),
          (this.experience = this.details.experience),
          (this.registrationCounsil = this.details.registrationCouncil),
          (this.registrationYear = this.details.registrationYear),
          (this.photoUrl = this.details.photoURL),
          // this.home = this.details.homeVisit,
          (this.areaID = this.details.areaID),
          (this.pinCode = this.details.pincode),
          (this.documentsVerified = this.details.documentsVerified),
          (this.mallPractise = this.details.mallPractise),
          (this.countryID = this.details.countryID),
          (this.cityID = this.details.cityID),
          (this.areaID = this.details.areaID),
          (this.pinCode = this.details.pincode),
          (this.docmedicalid = this.details.docmedicalid),
          (this.speakingLanguages = this.details.spokenLanguages),
          (this.slotID = this.details.slotDurationID),
          (this.gender = this.details.genderID),
          (this.doctorTypeID = this.details.doctorType),
          (this.hospitalclinicid = this.details.hospitalClinicID),
          // this.si = this.details.signatureURL,
          (this.refferedDoctor = this.details.referealBit),
          (this.categoryID = this.details.categoryID),
          (this.hospitalName = this.details.hospital_ClinicName),
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
          (this.regionID = this.details.regionMasterID),
          (this.vatPercentage = this.details.vatPercentage),
          (this.exonerationPeriodFromDate =
            this.details.exonerationPeriodFromDate);
        (this.exonerationPerioToDate = this.details.exonerationPeriodFromDate),
          (this.vatCheck = this.details.vat),
          (this.clinicNumber = this.details.clinicNumber);
        (this.cycleID = this.details.payTypeID),
          (this.typeOfPayment = this.details.typeofPayment),
          (this.cash = this.details.cash),
          (this.wallet = this.details.wallet),
          (this.creditCard = this.details.creditCard);
        console.log(this.isMedicalregistrationVerified);
        this.hospitalclinicid == this.details.hospitalClinicID,
          (this.docnearesNumber = this.details.docNearestNumber),
          (this.docNearestkm = this.details.docNearestLocDist),
          (this.signaturePhoto = this.details.signatureURL),
          (this.sigPhoto = this.details.sigPhoto),
          (this.accountNames = this.details.acountNames),
          (this.accountNumbers = this.details.acountNumbers),
          (this.paymentCompany = this.details.paymentCompany),
          (this.ProviderPay = this.details.providerPay),
          (this.MvolaPay = this.details.mvolaPay),
          (this.countryCodeNew = this.details.countryCodeNew),
          (this.stpPhoto = this.details.stamp);
        console.log('this.photoUrl', this.photoUrl);
        if (this.doctorTypeID == 1) {
          this.docType = true;
        } else {
          this.docType = false;
        }
        await this.getCountryMaster(this.docType);
        await this.getRegionMaster();
        await this.getCityMaster();
        await this.getareamasterbyid();

        await this.GetDoctorType();
        await this.getDepartmentMaster();
        this.getSubscriptionMasetr();
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctorDetailsForAdminByLanguageID',
          error
        );
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

  public isValidEmail(emailString: string): boolean {
    try {
      let pattern = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');
      this.valid = pattern.test(emailString);
      return this.valid;
    } catch (TypeError) {
      return false;
    }
  }

  //GetDoctorType

  public GetDoctorType() {
    this.CommonService.GetDoctorTypeMasterByLanguageID(
      this.languageID
    ).subscribe(
      (data) => {
        this.doctorTypeList = data;
      },
      (error) => {}
    );
  }

  //getDegreeMaster

  public getDegrreMaster() {
    this.CommonService.GetDegreeMasterBylanguageID(this.languageID).subscribe(
      (data) => {
        this.degreeList = data;
      },
      (error) => {}
    );
  }

  // getCountry

  public getCountryMaster(doctype: any) {
    this.CommonService.GetCountryMasterByLanguageID(this.languageID).subscribe(
      (data) => {
        if (doctype) {
          this.countryList = data.filter((x) => x.id == 8);
        } else {
          this.countryList = data;
        }
        // this.countryList = data;
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
      (error) => {}
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
      (error) => {}
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
      (error) => {}
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
      (error) => {}
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
  //Google Addreess

  formatAddress: any;
  latitude: any;
  longitude: any;
  googleAddress: any;
  geocode() {
    this.loader = true;
    this.showPopup = 0;
    this.CommonService.Getlocation(this.address).subscribe((data: any) => {
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
    });
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
    this.doctorPhotoUrl.splice(this.files1.indexOf(event), 1);
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
    this.uplodresume.splice(this.files4.indexOf(event), 1);
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
    this.uplodresume.splice(this.files3.indexOf(event), 1);
  }

  public GetDegreeID(even: any) {
    this.degreeID = even.target.value;

    for (let i = 0; i < this.degreeList.length; i++) {
      if (this.degreeList[i].id == this.degreeID) {
        this.degreeName = this.degreeList[i].short;
      }
    }
  }

  getExonerationPerioddate(exonerationPeriodFromDate: any) {
    this.exonerationPeriodFromDate = exonerationPeriodFromDate;
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
        };
      },
      (error) => {}
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
      (error) => {}
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
          // allowSearchFilter: true
        };
      },
      (error) => {}
    );
  }

  public GetSpecilizationID(item: any) {
    this.specilisationid.push(item);
  }
  getDoctortype(even: any) {
    this.doctorTypeID = even.target.value;
    console.log('getDoctortype' + this.doctorTypeID);
    if (this.doctorTypeID == 1) {
      this.docType = true;
    } else {
      this.docType = false;
    }
    this.getCountryMaster(this.docType);
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
    var entity = {
      DoctorID: this.id,
      CollegeName: this.colleageName,
      YearOfPassing: this.yearOfPassing,
      DegreeID: this.degreeID,
      Experience: this.doctorid,
      Resume: this.uplodresume[0],
    };
    this.CommonService.InsertDoctorEducation(entity).subscribe((data) => {
      this.ngOnInit();
      if (data != 0) {
      }
    });
  }

  educationList: any;

  public getdoctoreducationweb() {
    this.CommonService.GetDoctorEducationWebByLanguageID(
      this.id,
      this.languageID
    ).subscribe(
      (data) => {
        this.educationList = data;

        console.log(this.educationList);
      },
      (error) => {}
    );
  }
  getCountryCodeNew() {
    this.DoctorService.GetCountryCodeMasterWeb().subscribe(
      (data) => {
        this.countryCodeList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public updatedetails() {
    this.showPopup = 0;
    this.loader = true;
    if (this.latitude == undefined || this.longitude == undefined) {
      Swal.fire(this.labels.longiUpdateAlert);
      this.loader = false;
    }
    // if (this.cash == false && this.creditCard == false && this.wallet == false) {
    //   Swal.fire(this.labels.selectPaymentType);
    //   this.loader = false;
    // }
    else {
      var entity = {
        LanguageID: this.languageID,
        DoctorID: this.id,
        MobileNumber: this.phoneNo,
        EmailID: this.email,
        Address: this.address,
        CityID: this.cityID,
        DepartmentID: this.departmentID,
        Experience: this.experience,
        Description: this.professionalProfile,
        HomeVisit: 1,
        AreaID: this.areaID,
        Pincode: this.pinCode,
        DocumentsVerified: this.documentsVerified,
        MallPractise: this.mallPractise,
        CountryID: this.countryID,
        SpokenLanguages: this.speakingLanguages,
        SlotDurationID: this.slotID,
        DoctorName: this.doctorName,
        GenderID: this.gender,
        DoctorType: this.doctorTypeID,
        HospitalClinicID: this.hospitalclinicid,
        SignatureURL: this.signaturePhoto,
        ReferealBit: this.refferedDoctor,
        CategoryID: this.categoryID,
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
        ClinicNumber: this.clinicNumber,
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
        ProviderPay: this.ProviderPay,
        MvolaPay: this.MvolaPay,
        CountryCodeNew: this.countryCodeNew,
        StampURL: this.stampPhoto,
      };
      this.CommonService.UpdateDoctorPersonelInfo(entity).subscribe(
        async (res) => {
          let test = res;
          await this.updatemedicalregistration();
          await this.updatedocphoto();
          this.showPopup = 1;
          this.messageID = 34;
          this.typeofPopUp = 1;
          location.href = '#/countrymanager/Doctordash';
        }
      );
    }
  }

  async updatemedicalregistration() {
    var entity = {
      LanguageID: this.languageID,
      DoctorID: this.docmedicalid,
      RegistrationNo: this.registrationNumber,
      RegistrationCouncil: this.registrationCounsil,
      RegistrationYear: this.registrationYear,
    };
    this.CommonService.UpdateDoctorMedicalRegistration(entity).subscribe(
      async (res) => {
        let test = res;
      }
    );
  }

  public updatedocphoto() {
    var entity = {
      ID: this.id,
      PhotoURL: this.doctorPhotoUrl[0],
    };
    this.CommonService.UpdateDoctorRegistrationPhoto(entity).subscribe(
      async (res) => {
        let test = res;
      }
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

  lattitudeValidation(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 46 || charCode > 57)) {
      return false;
    }
    return true;
  }

  editSlot: any;

  Accept() {
    this.editSlot = 1;
  }
  Reject() {
    this.editSlot = 0;
  }

  showEdit: any;

  editPhoto() {
    this.showEdit = 1;
  }

  identityphoto: any;

  public GetDoctorIdentityProof() {
    this.CommonService.GetDoctorIdentityProofs(this.id).subscribe(
      (data) => {
        this.identityphoto = data;

        // this.mid = this.details1.id,
        //   this.mphoto = this.details1.photoUrl
      },
      (error) => {}
    );
  }

  EditPhotoMultiple(id: number) {
    this.updatePhotoId = id;
  }

  public insertidentityProof() {
    this.showPopup = 0;
    // if (this.identityProofUrl.length == 0) {
    //   this.identityProofUrl[0] =
    //     'C:\\MarocAPI\\Images\\DocIdentityProof\\identity.jpg';
    // }

    var entity = {
      DoctorID: this.id,
      PhotoURL: this.identityProofUrl[0],
    };
    this.CommonService.InsertDoctorIdentityProofs(entity).subscribe((data) => {
      // if (data != 0) {
      // }
      this.showPopup = 1;
      this.messageID = 1;
      this.typeofPopUp = 1;

      this.GetDoctorIdentityProof();
    });
  }

  updatePhotoId: any;
  showadPhotos: any;

  showAdd() {
    this.showadPhotos = 1;
    this.updatePhotoId = 0;
  }

  public UpdateIdentityproof() {
    var entity = {
      ID: this.updatePhotoId,
      PhotoURL: this.identityProofUrl[0],
    };
    this.CommonService.UpdateDoctorIdentityProofs(entity).subscribe((res) => {
      let test = res;
      this.GetDoctorIdentityProof();
      this.showadPhotos = 0;
      this.updatePhotoId = 0;
    });
  }

  public deletePhotos(id: any) {
    Swal.fire({
      title: this.labels.title,
      text: this.labels.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.labels.confirmButtonText,
      cancelButtonText: this.labels.cancelButtonText,
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.CommonService.DeleteAllPhotos(id, 2).subscribe((res) => {
            let test = res;
            this.ngOnInit();
          });
          this.showPopup = 1;
          (this.messageID = 75), (this.typeofPopUp = 1);
        }
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  files2: File[] = [];
  signaturePhoto: any;
  onSelectdocSignature(event: any) {
    this.showPopup = 0;
    this.loader = true;
    console.log(event);
    this.files1.push(...event.addedFiles);
    this.getsignature();
  }

  public getsignature() {
    this.CommonService.DoctorPhotoUpload(this.files1).subscribe((res) => {
      this.signaturePhoto = res;
      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
    });
    // this.sendattachment();
  }

  ondoctorsignatureRemove(event: any) {
    console.log(event);
    this.signaturePhoto.splice(this.files1.indexOf(event), 1);
  }

  preventZero(even: any) {
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

  preventZero1(even: any) {
    this.showPopup = 0;
    var no = even.split();
    if (no.length >= 1) {
      if (no[0] == '0') {
        this.clinicNumber = '';
        this.typeofPopUp = 2;
        this.messageID = 84;
        this.showPopup = 1;
      }
    }
  }
  public deleteEducation(id: any) {
    Swal.fire({
      title: this.labels.title,
      text: this.labels.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.labels.confirmButtonText,
      cancelButtonText: this.labels.cancelButtonText,
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.CommonService.DeleteDoctorEducation(id).subscribe((res) => {
            let test = res;
            this.ngOnInit();
          });
          this.showPopup = 1;
          (this.messageID = 75), (this.typeofPopUp = 1);
        }
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  editEducationpre(data: any) {
    this.doctorEduction = false;
    this.educationid = data.id;
    this.degreeID = data.degreeID;
    this.colleageName = data.collegeName;
    this.yearOfPassing = data.yearOfPassing;
  }
  editEducation() {
    let entity = {
      ID: this.educationid,
      CollegeName: this.colleageName,
      YearOfPassing: this.yearOfPassing,
      DegreeID: this.degreeID,
    };
    Swal.fire({
      title: this.labels.title,
      text: this.labels.editText,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.labels.confirmEditButtonText,
      cancelButtonText: this.labels.cancelButtonText,
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.CommonService.UpdateDoctorEducationByID(entity).subscribe(
            (res) => {
              let test = res;
              this.getdoctoreducationweb();
              this.showPopup = 1;
              (this.messageID = 34), (this.typeofPopUp = 1);
            }
          );
        }
      },
      (error) => {
        this.loader = false;
      }
    );
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
      this.stampPhoto = res;
      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
    });
    // this.sendattachment();
  }
  ondoctorstampRemove(event: any) {
    console.log(event);
    this.files1.splice(this.files5.indexOf(event), 1);
  }
}
