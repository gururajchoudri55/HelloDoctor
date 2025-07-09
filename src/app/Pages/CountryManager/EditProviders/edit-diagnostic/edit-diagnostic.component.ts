import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import Labels from '../../../Lables/countrymanager/countrylabels.json';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-edit-diagnostic',
  templateUrl: './edit-diagnostic.component.html',
  styleUrls: ['./edit-diagnostic.component.css']
})
export class EditDiagnosticComponent implements OnInit {

  constructor(private activatedroute: ActivatedRoute, private CommonService: CommonService,
    private SharedService: SharedService) { }
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
  photoUrl: any;
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
  id: any;
  details: any;
  currentUrl: any;
  search: any;
  cash: boolean | undefined;
  creditCard: boolean | undefined;
  wallet: boolean | undefined;
  valid: boolean | undefined;
  mrngOpenIngHours: any;
  mrngClosedHours: any;
  evengingOpeningHours: any;
  eveningClosedHours: any;
  photoId: number | undefined;
  docNearestkm: any;
  docnearesNumber: any;
  accountNames: string | undefined;
  accountNumbers: any;
  paymentCompany: any;
  ProviderPay: boolean | undefined;
  MvolaPay: boolean | undefined;
  signaturePhoto1:any;
  stampPhoto1:any
  ngOnInit(): void {
    this.loader = true;
    this.photoId = 0;
    this.currentUrl = window.location.href;
    this.hospitalClinicID = sessionStorage.getItem('hospitalid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.search = this.labels.search;
    this.activatedroute.params.subscribe(params => {

      this.id = atob(params['id']);
      this.getdiagnosticdetailsforadmin()
      this.GetDiagnosticPhotos()
    }
    )
    this.cash = true;
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




  numberOnly(event: { which: any; keyCode: any }): boolean {
    ;
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
      return false;
    }
    return true;
  }





  public getdiagnosticdetailsforadmin() {
    ;
    this.CommonService.GetDiagnosticDetailsForAdminByLanguageID(this.id, this.languageID).subscribe(
      data => {

        this.details = data[0];
        
        this.diagnosticCenterName = this.details.diagnosticCenterName,
          this.businessPhoneNumber = this.details.phoneNo,
          this.contactPersonName = this.details.contactPerson,
          this.contactPersonPhoneNo = this.details.contactPersonPhNo,
          this.licenseNumber = this.details.licenseNo,
          // this.lic = this.details.licenseValidTill,
          this.email = this.details.emailID,
          this.address = this.details.address,
          this.cityID = this.details.cityID,
          this.zipCode = this.details.zipcode,
          this.website = this.details.website,
          this.morningOpeninghours = this.details.timings,
          this.description = this.details.description,
          // this.photoUrl = this.details.photoURL
          this.areaID = this.details.areaID,
          this.countryID = this.details.countryID,
          this.regionID = this.details.regionMasterID
        this.pinCode = this.details.pincode,
          // this.diagnosticappointmentperslot = this.details.diagnosticAppointmentPerSlot,
          // this.homesampleordersperslot = this.details.homeSampleOrdersPerSlot,
          this.homeSample = this.details.homeSample,
          this.afterNoonOpeningHours = this.details.eveningTimings,
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
          this.monthlySubscriptipon = this.details.monthlySubscription,
          this.contractStartDate = this.details.contractStartDate,
          this.ContractEndDate = this.details.contractEndDate,
          this.cash = this.details.cash,
          this.creditCard = this.details.creditCard,
          this.wallet = this.details.wallet,
          this.mrngOpenIngHours = this.details.mrngTimeOpen,
          this.mrngClosedHours = this.details.mrngTimeClosed,
          this.evengingOpeningHours = this.details.afternoonTimeOpen,
          this.eveningClosedHours = this.details.afternoonTimeClosed,
          this.docnearesNumber = this.details.docNearestNumber,
          this.docNearestkm = this.details.docNearestLocDist,
          this.accountNames = this.details.acountNames,
          this.accountNumbers = this.details.acountNumbers,
          this.paymentCompany = this.details.paymentCompany,
          this.ProviderPay = this.details.providerPay,
          this.MvolaPay = this.details.mvolaPay,
          this.Partner=this.details.partner,
          this.stampPhoto1=this.details.stamp1,
          this.signaturePhoto1=this.details.signatureURL1
        
        this.getCountryMaster();
        this.getRegionMaster()
        this.getCityMaster();
        this.getareamasterbyid();
        this.loader = false;
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetDiagnosticDetailsForAdminByLanguageID", error);
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
          closeDropDownOnSelection: true,

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

    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "Getlocation", error);
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
    })
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







  public updatedetails() {
    this.loader = true;
    this.showPopup = 0;

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
        'DiagnosticCenterName': this.diagnosticCenterName,
        'LanguageID': this.languageID,
        'DiagnosticCenterID': this.id,
        'PhoneNo': this.businessPhoneNumber,
        'ContactPerson': this.contactPersonName,
        'ContactPersonPhNo': this.contactPersonPhoneNo,
        'LicenseNo': 0,
        'LicenseValidTill': new Date(),
        'EmailID': this.email,
        'Address': this.address,
        'CityID': this.cityID,
        'Zipcode': this.zipCode,
        'Website': this.website,
        'Timings': this.morningOpeninghours,
        'Description': this.description,
        'AreaID': this.areaID,
        'Pincode': this.pinCode,
        'CountryID': this.countryID,
        'DiagnosticAppointmentPerSlot': 0,
        'HomeSampleOrdersPerSlot': 0,
        'HomeSample': this.homeSample,
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
        'Stamp':this.stampPhoto==undefined?this.details.stamp:this.stampPhoto,
        'SignatureURL' : this.signaturePhoto==undefined?this.details.signatureURL:this.signaturePhoto
      }
      this.CommonService.UpdateDiagnosticCenterProfile(entity).subscribe(async res => {
        let test = res;
        await this.updatePhotos()
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
        location.href = "#/countrymanager/Diagnosticdash"
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "UpdateDiagnosticCenterProfile", error);
      })

    }
  }



  async updatePhotos() {

    var entity = {
      'ID': this.singlePhotoId,
      'PhotoURL': this.attchmentUrl[0],
    }
    this.CommonService.UpdateDiagnosticCenterPhotos(entity).subscribe(async res => {
      let test = res;


    })

  }
  showEdit: any;

  editPhoto() {
    this.showEdit = 1;
  }









  photoslist: any;
  singlePhotoId: any;
  public GetDiagnosticPhotos() {
    this.showdrop = 0;
    this.CommonService.GetDiagnosticCenterPhotosByID(this.id).subscribe(
      (data) => {
        let data1 = data.slice(0)
        this.photoUrl = data1[0].photoURL
        this.singlePhotoId = data1[0].diasid
        this.photoslist = data.slice(1, 100);
      },
      (error) => { }
    );
  }



  showdrop: any;

  showAdd() {
    this.showdrop = 1
  }


  diagnosticid: any;

  public inserthspphotos() {
    if (this.attchmentUrl.length == 0) {
      this.attchmentUrl[0] = 'C:\\MarocAPI\\Images\\DiagnosticCenterPhotos\\Diagnostics.jpg'
    }

    var entity = {
      'DiagnosticCenterID': this.id,
      'PhotoURL': this.attchmentUrl[0]
    }
    this.CommonService.InsertInsertDiagnosticCenterPhotos(entity).subscribe(data => {

      if (data != 0) {
        this.GetDiagnosticPhotos()
      }
    })

  }


  editPhotos(id: number) {
    this.photoId = id;
  }



  public UpdateDiaPhotos() {
    this.showPopup = 0;
    var entity = {
      'ID': this.photoId,
      'PhotoURL': this.attchmentUrl[0],
    }
    this.CommonService.UpdateDiagnosticCenterPhotos(entity).subscribe(res => {
      let test = res;

      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      this.photoId = 0;
      this.showdrop = 0;
      this.attchmentUrl.length = 0;
      this.files.length = 0;

    })

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
      cancelButtonText: this.labels.cancelButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        this.CommonService.DeleteAllPhotos(id, 4).subscribe(res => {
          let test = res;
          this.ngOnInit()
        })
        this.showPopup = 1;
        this.messageID = 75,
          this.typeofPopUp = 1;
      }
    }, error => {
      this.loader = false;

    })
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

  
  files2: File[] = [];
  files1: File[] = [];
  signaturePhoto: any
  stampPhoto: any;
  onSelectdocSignature(event: any) {
    this.showPopup = 0;
    this.loader = true;
    console.log(event);
    ;
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

  files5: File[] = [];
  onSelectdocStamp(event: any) {
    this.showPopup = 0;
    this.loader = true;
    console.log(event);
    ;
    this.files5.push(...event.addedFiles);
    console.log("files5" + this.files5)
    this.getstamp();
  }



  public getstamp() {
    ;
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
    this.stampPhoto.splice(this.files1.indexOf(event), 1);
  }
}





