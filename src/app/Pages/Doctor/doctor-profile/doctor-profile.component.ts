import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import Labels from '../../Lables/countrymanager/countrylabels.json';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {

  constructor(private CommonService:CommonService,private SharedService:SharedService) { }
  doctorName: any;
  phoneNo: any;
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
  currentUrl:any;



  ngOnInit(): void {
    this.loader = true;
    this.currentUrl=window.location.href;
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    // this.activatedroute.params.subscribe(params => {

    //   this.id = atob(params['id']);

    
    // }
    // )
    this.id=sessionStorage.getItem('userid');
    this.getdoctoreducationweb();
    this.getDegrreMaster()
    this.getdoctordetailsbyid()

   
    this.departmentID = 0;
  }

  details: any;
  photoUrl: any;
  hospitalName: any;
  clinicNumber: any;


  public getdoctordetailsbyid() {

    this.CommonService.GetDoctorDetailsForAdminByLanguageID(this.id, this.languageID).subscribe(
      async data => {

        this.details = data[0];

        this.doctorName = this.details.doctorName,
          this.phoneNo = this.details.mobileNumber,
          this.email = this.details.emailID,
          this.departmentID = this.details.departmentID,
          this.address = this.details.address,
          this.description = this.details.description,
          this.registrationNumber = this.details.registrationNo,
          this.experience = this.details.experience,
          this.registrationCounsil = this.details.registrationCouncil,
          this.registrationYear = this.details.registrationYear,
          this.photoUrl = this.details.photoURL,
          // this.home = this.details.homeVisit,
          this.areaID = this.details.areaID,
          this.pinCode = this.details.pincode,
          this.documentsVerified = this.details.documentsVerified,
          this.mallPractise = this.details.mallPractise,
          this.countryID = this.details.countryID,
          this.cityID = this.details.cityID,
          this.areaID = this.details.areaID,
          this.pinCode = this.details.pincode,
          this.docmedicalid = this.details.docmedicalid,
          this.speakingLanguages = this.details.spokenLanguages,
          this.slotID = this.details.slotDurationID,
          this.gender = this.details.genderID,
          this.doctorTypeID = this.details.doctorType,
          this.hospitalclinicid = this.details.hospitalClinicID,
          // this.si = this.details.signatureURL,
          this.refferedDoctor = this.details.referealBit,
          this.categoryID = this.details.categoryID,
          this.hospitalName = this.details.hospital_ClinicName,
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
          this.latitude = this.details.lattitude,
          this.longitude = this.details.longitude,
          this.formatAddress = this.details.formatedAddress,
          this.regionID = this.details.regionMasterID,
          this.vatPercentage = this.details.vatPercentage,
          this.exonerationPeriodFromDate = this.details.exonerationPeriodFromDate
        this.exonerationPerioToDate = this.details.exonerationPeriodFromDate,
          this.vatCheck = this.details.vat,
          this.clinicNumber = this.details.clinicNumber


        console.log(this.isMedicalregistrationVerified)

        await this.getCountryMaster()
        await this.getRegionMaster()
        await this.getCityMaster();
        await this.getareamasterbyid();

        await this.GetDoctorType()
        await this.getDepartmentMaster()
        this.loader = false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDoctorDetailsForAdminByLanguageID",error);
      }
    )
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












  //GetDoctorType

  public GetDoctorType() {
    this.CommonService.GetDoctorTypeMasterByLanguageID(this.languageID).subscribe(data => {
      this.doctorTypeList = data;

    }, error => {
    })
  }

  //getDegreeMaster

  public getDegrreMaster() {

    this.CommonService.GetDegreeMasterBylanguageID(this.languageID).subscribe(
      data => {

        this.degreeList = data;
      }, error => {
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
    this.CommonService.DoctorIdentityProof(this.files).subscribe(res => {
      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      this.identityProofUrl.push(res);


    })

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
    this.getDoctorPhoto()

  }


  public getDoctorPhoto() {
    this.CommonService.DoctorPhotoUpload(this.files1).subscribe(res => {

      this.doctorPhotoUrl.push(res);
      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;


    })
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
    this.getDoctorPhoto()

  }


  public getUploadRemme() {
    this.CommonService.DoctorPhotoUpload(this.files4).subscribe(res => {
      this.uplodresume.push(res);
      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
    })
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
    this.getDoctorPhoto()


  }


  public getMedicalRegistration() {
    this.CommonService.DoctorPhotoUpload(this.files3).subscribe(res => {
      this.medicalRegistarionUrl.push(res);

      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
    })
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
        this.degreeName = this.degreeList[i].short
      }
    }
  }


  getExonerationPerioddate(exonerationPeriodFromDate: any) {
    this.exonerationPeriodFromDate = exonerationPeriodFromDate;
  }



  //get Hospital


  public getHosptilClinicForAdmin() {

    this.CommonService.GetHospital_ClinicForAdminByAdmin(this.languageID).subscribe(
      data => {

        this.hospitalClinicList = data.filter(x => x.id != 612 && x.id != 613 && x.id != 614);
        console.log("HospitalList", this.hospitalClinicList)
        this.hospitadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }






  getCategoryID(even: any) {
    this.categoryID = even.target.value;
    this.getDepartmentMaster()
  }


  public getDepartmentMaster() {

    this.CommonService.GetDepartmentMasterByLanguageID(this.languageID).subscribe(
      data => {

        this.departmentList = data.filter(x => x.categoryID == this.categoryID);

      }, error => {
      }
    )
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

    this.CommonService.GetSpecilaizationMasterByLanguageID(this.languageID).subscribe(
      data => {


        this.specilisationList = data.filter(x => x.departmentID == this.departmentID)
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

      }, error => {
      }
    )
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
    }
    else if (this.typeOfDoctor == '2') {
      this.hospitalclinicid = 590;

    }
    else if (this.typeOfDoctor == '3') {
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
      'DegreeID': this.degreeID,
      'CollegeName': this.colleageName,
      'YearOfPassing': this.yearOfPassing,
      'DegreeName': this.degreeName
    }
    this.degreeArray.push(entity);
    this.colleageName = "";
    this.degreeName = "";
    this.yearOfPassing = "";
  }



  public insertdoctoreducation() {
    var entity = {
      'DoctorID': this.id,
      'CollegeName': this.colleageName,
      'YearOfPassing': this.yearOfPassing,
      'DegreeID': this.degreeID,
      'Experience': this.doctorid,
      'Resume': this.uplodresume[0]
    }
    this.CommonService.InsertDoctorEducation(entity).subscribe(data => {

      if (data != 0) {
      }

    })


  }


  educationList: any;

  public getdoctoreducationweb() {
    this.CommonService.GetDoctorEducationWebByLanguageID(this.id, this.languageID).subscribe(
      data => {

        this.educationList = data;

      }, error => {
      }
    )
  }






  public updatedetails() {
    this.showPopup = 0;
    this.loader = true;

    var entity = {
      'LanguageID': this.languageID,
      'DoctorID': this.id,
      'MobileNumber': this.phoneNo,
      'EmailID': this.email,
      'Address': this.address,
      'CityID': this.cityID,
      'DepartmentID': this.departmentID,
      'Experience': this.experience,
      'Description': this.description,
      'HomeVisit': 1,
      'AreaID': this.areaID,
      'Pincode': this.pinCode,
      'DocumentsVerified': this.documentsVerified,
      'MallPractise': this.mallPractise,
      'CountryID': this.countryID,
      'SpokenLanguages': this.speakingLanguages,
      'SlotDurationID': this.slotID,
      'DoctorName': this.doctorName,
      'GenderID': this.gender,
      'DoctorType': this.doctorTypeID,
      'HospitalClinicID': this.hospitalclinicid,
      'SignatureURL': '',
      'ReferealBit': this.refferedDoctor,
      'CategoryID': this.categoryID,
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
      'ClinicNumber': this.clinicNumber
    }
    this.CommonService.UpdateDoctorPersonelInfo(entity).subscribe(async res => {
      let test = res;
      await this.updatemedicalregistration()
      await this.updatedocphoto()
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      location.href = "#/countrymanager/Doctordash"

    })

  }


  async updatemedicalregistration() {
    
    var entity = {
      'LanguageID': this.languageID,
      'DoctorID': this.docmedicalid,
      'RegistrationNo': this.registrationNumber,
      'RegistrationCouncil': this.registrationCounsil,
      'RegistrationYear': this.registrationYear

    }
    this.CommonService.UpdateDoctorMedicalRegistration(entity).subscribe(async res => {
      let test = res;
      


    })

  }




  public updatedocphoto() {

    var entity = {
      'ID': this.id,
      'PhotoURL': this.doctorPhotoUrl[0]
    }
    this.CommonService.UpdateDoctorRegistrationPhoto(entity).subscribe(async res => {
      let test = res;

    })

  }

}
