import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/countrymanager/countrylabels.json';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/Pages/services/shared.service';


@Component({
  selector: 'app-edit-pharmacy',
  templateUrl: './edit-pharmacy.component.html',
  styleUrls: ['./edit-pharmacy.component.css']
})
export class EditPharmacyComponent implements OnInit {
  sigPhoto: any;

  constructor(private CommonService: CommonService, private activatedroute: ActivatedRoute, private SharedService: SharedService) { }
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
  id: any;
  details: any;
  photoUrl: any;
  cash: boolean | undefined;
  creditCard: boolean | undefined;
  wallet: boolean | undefined;
  valid: boolean | undefined;
  currentUrl: any;
  MvolaPay: boolean = true;
  mrngOpenIngHours: any;
  mrngClosedHours: any;
  evengingOpeningHours: any;
  eveningClosedHours: any;
  docNearestkm: any;
  docnearesNumber: any;
  accountNames: string | undefined;
  accountNumbers: any;
  paymentCompany: any;
  ProviderPay: boolean | undefined;
  file1: File[] = [];
  file2: File[] = [];
  signaturePhoto: any = [];
  stampPhoto: any = [];
  Partner:any;
  stpPhoto:any;
  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.hospitalClinicID = sessionStorage.getItem('hospitalid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.region = this.labels.selectRegion;
    this.activatedroute.params.subscribe(params => {
      this.id = atob(params['id']);
      console.log(this.id)
      this.getpharmacydetailsforadmin()
      this.GetPhotos()
    })
    this.province = this.labels.selectProvince;
    this.city = this.labels.selectCity;
    this.insurance = this.labels.selectInsurance;
    this.fromdate = this.labels.fromDate;
    this.todate = this.labels.toDate;
  }

  numberOnly(event: { which: any; keyCode: any }): boolean {
    ;
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
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
          // this.photoUrl = this.details.photoURL,
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
          this.contractStartDate = this.details.contartStartDate,
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
          this.MvolaPay = this.details.mvolapay,
          this.stpPhoto = this.details.stamp,
          this.sigPhoto = this.details.sigPhoto,
          this.Partner=this.details.partner

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
    this.ContractEndDate = this.CommonService.GetDates(contractEndDate);
    console.log("Contract Start Date", this.contractStartDate);
  }





  public updatedetails() {
    

    this.loader = true;

    if (this.latitude == undefined || this.longitude == undefined) {
      Swal.fire(this.labels.longiUpdateAlert);
      this.loader = false;
    }
    if (this.cash == false && this.creditCard == false && this.wallet == false) {
      Swal.fire(this.labels.selectPaymentType);
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
        'signatureURL': this.signaturePhoto.length==0?this.details.signatureURL:this.signaturePhoto,
        'stampURL':this.stampPhoto.length==0?this.details.stampURL:this.stampPhoto
      }
      this.CommonService.UpdatePharmacyProfile(entity).subscribe(res => {
        
        let test = res;
        this.updatephotos()
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
        location.href = "#/countrymanager/Pharmacy"

      })

    }
  }




  public updatephotos() {

    var entity = {
      'ID': this.singlePhotoID,
      'PhotoURL': this.attachmentUrl[0]
    }
    this.CommonService.UpdatePharmacyPhotos(entity).subscribe(res => {


    })

  }

  showEdit: any;

  editPhoto() {
    this.showEdit = 1;
  }








  //Pharmacy Photo

  // files: File[] = [];

  // onSelect(event: any) {
  //   this.loader = true;
  //   console.log(event);
  //   this.files.push(...event.addedFiles);
  //   this.uploadattachments()
  // }

  // onRemove(event: any) {
  //   console.log(event);
  //   this.files.splice(this.files.indexOf(event), 1);
  //   this.attachmentUrl.splice(this.files.indexOf(event), 1);

  // }
  // public uploadattachments() {
  //   this.CommonService.pharmacyphoto(this.files).subscribe((res: any) => {
  //     this.loader = false;
  //     this.attachmentUrl.push(res);
  //   }, error => {
  //     console.log("Error with pharmacyphoto", error);
  //     this.loader = false;
  //     this.SharedService.insertexceptions(this.currentUrl, "pharmacyphoto", error);
  //   })
  // }




  photos: any;
  singlePhotoID: any;

  public GetPhotos() {
    // this.pharmacyID = id;
    this.showMul = false;
    this.showMultiple = 0;
    this.attachmentUrl.length = 0;
    this.files.length = 0;
    this.CommonService.GetPharmacyPhotos(this.id).subscribe(
      (data) => {

        let data1 = data.slice(0);
        this.photoUrl = data1[0].photoUrl;
        this.singlePhotoID = data1[0].id;

        this.photos = data.slice(1, 20);
      },
      (error) => { }
    );
  }








  // attachmentUrl: any = []

  public InsertPharmcyPhotos() {
    this.showPopup = 0;
    if (this.attachmentUrl.length == 0) {
      this.attachmentUrl[0] = 'C:\\MarocAPI\\Images\\PharmacyPhotos\\Pharmacy.jpg'
    }
    for (let i = 0; i < this.attachmentUrl.length; i++) {

      var entity = {
        'PharmacyID': this.id,
        'PhotoURL': this.attachmentUrl[i]
      }
      this.CommonService.InsertPharmacyPhotos(entity).subscribe(data => {

        if (data != 0) {
          this.getpharmacydetailsforadmin()

        }
        this.showPopup = 1;
        this.messageID = 1;
        this.typeofPopUp = 1
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "InsertPharmacyPhotos", error);
      })
    }

  }
  showMul: boolean | undefined

  addPhotos() {
    this.showMul = true
  }
  showMultiple: number | undefined;

  editMultipPhoto(id: any) {
    this.photoid = id
    this.showMultiple = 1;
  }



  photoid: any;

  public UpdateMultiplePhotos() {
    
    var entity = {
      'ID': this.photoid,
      'PhotoURL': this.attachmentUrl[0]
    }
    this.CommonService.UpdatePharmacyPhotos(entity).subscribe(res => {
      let test = res;
      
      this.messageID = 1;
      this.typeofPopUp = 1;
      this.showPopup = 1


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
        this.CommonService.DeleteAllPhotos(id, 3).subscribe(res => {
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
        this.phoneNumber = ""
        this.typeofPopUp = 2;
        this.messageID = 84;
        this.showPopup = 1;
      }

    }


  }


  onSelectSignature(event: any) {
    this.loader = true;
    console.log(event);
    this.file1.push(...event.addedFiles);
    this.getsignature()
  }
  onSelectStamp(event: any) {
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
      this.signaturePhoto = res;
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
      this.stampPhoto = res;
      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
    });
    // this.sendattachment();
  }
}
