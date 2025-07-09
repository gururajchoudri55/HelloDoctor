import { Component, OnInit } from '@angular/core';
import { TotalPhysiotherapistReportsComponent } from 'src/app/Pages/Reports/Reportlogins/total-physiotherapist-reports/total-physiotherapist-reports.component';
import { CommonService } from 'src/app/Pages/services/common.service';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Report/reportlabels.json';
declare var window: any;

@Component({
  selector: 'app-merge-patient-data',
  templateUrl: './merge-patient-data.component.html',
  styleUrls: ['./merge-patient-data.component.css']
})
export class MergePatientDataComponent implements OnInit {
  languageid: any;
  patientdetails: any;
  loader: boolean | undefined;
  currentUrl: any;
  p: any;
  patientid: any;
  oldmobilenumber: any;
  searchon: any;
  patientname: any;
  patientpinno: any;
  search: any;
  pinno: any;
  newmobilenumber: any;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  labels: any;
  otp: any;
  enteredOtp: any
  formModal:any;
  constructor(private MenuService: MenuService, private SharedService: SharedService, private CommonService: CommonService) { }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("staticBackdrop")
    )

    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.GetPatientDetails();
    this.showotp = 0;
    this.countryCode = "";
    this.otp=""
    this.enteredOtp="";
  }



  //getpatientdetails

  public GetPatientDetails() {
    this.MenuService.GetPatientRegistrationDetails().subscribe(
      data => {
        this.loader = false;
        this.patientdetails = data;
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetPatientRegistrationDetails", error);
      }
    )
  }

  //Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  public GetPatientID(id: any, mobileNumber: any, patientName: any, pinno: any) {
    this.patientid = id
    this.oldmobilenumber = mobileNumber
    this.searchon = 0
    this.patientname = patientName;
    this.patientpinno = pinno
    this.showotp = 0;
    this.newmobilenumber = "";
    this.otp=""
    this.enteredOtp="";
  
  }

  //Search Patient
  public Searchpatient(patientname: any) {
    if (patientname == "") {
      this.searchon = 0
    }
    else {
      this.searchon = 1
    }

  }

  countryCode: any;

  getCountryCode(even: any) {
    this.countryCode = even.target.value;
  }


  showotp: any;

  generateOtp() {
    this.showotp = 1;
    var minm = 100000;
    var maxm = 999999;
    this.otp = Math.floor(Math.random() * (maxm - minm + 1)) + minm;

    console.log("otp", this.otp)
    this.smsMobileNo = this.countryCode + this.newmobilenumber

    console.log(this.smsMobileNo)
    this.sendingSMS()
  }

  smsMobileNo: any;


  async sendingSMS() {
    

    if (this.languageid == 1) {
      var smsdesc = "Your Voiladoc OTP to authenticate the phone number transfer : " + this.otp
    }
    else {
      var smsdesc = "Votre OTP Voiladoc pour authentifier le transfert de numéro de téléphone : " + this.otp
    }

    this.CommonService.SendTwillioSMS(this.smsMobileNo, smsdesc).subscribe(async data => {
      console.log("Sms success", data)


    }, error => {
      console.log("sms failure", error)
    })

  }







  //Update Mobile Number
  public updatemobilenmber() {
    this.showPopup = 0;
    if (this.otp == this.enteredOtp) {
      var entity = {
        'ID': this.patientid,
        'MobileNumber': this.newmobilenumber,
        'NewmobileNumber': this.newmobilenumber,
        'OldmobileNumber': this.oldmobilenumber
      }
      this.MenuService.UpdatePatientRegistrationMobileNumber(entity).subscribe(data => {

        if (data == 0) {
          this.GetPatientDetails()
          this.showPopup = 1;
          this.messageID = 15;
          this.typeofPopUp = 2;
        
        
        }
        if (data != 0) {
          this.GetPatientDetails()
          this.showPopup = 1;
          this.messageID = 34;
          this.typeofPopUp = 1;
          this.newmobilenumber = "";
          this.patientname = "";
          this.formModal.hide()
        }
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "UpdatePatientRegistrationMobileNumber", error);
      })
    }
    else {
      this.showPopup = 1;
      this.messageID = 38;
      this.typeofPopUp = 2;
      this.pinno = "";
    }


  }



}
