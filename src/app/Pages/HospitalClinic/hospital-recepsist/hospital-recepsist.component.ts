import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DoctorService } from '../../services/Doctor/doctor.service';
import Labels from '../../Lables/WorkingDetails/workinglabels.json';


@Component({
  selector: 'app-hospital-recepsist',
  templateUrl: './hospital-recepsist.component.html',
  styleUrls: ['./hospital-recepsist.component.css']
})
export class HospitalRecepsistComponent implements OnInit {
  hospitalclinicid: any;
  languageID: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  password: any;
  username: any;
  name: any;
  email: any;
  phoneno: any;
  pinno: any;
  loader: boolean | undefined;
  currentUrl: any;
  labels: any;
  countryCodeList: any = [];
  countryCode: any = 0;


  constructor(private DoctorService: DoctorService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.loader = false;
    this.getCountryCodeNew();
  }

  getCountryCodeNew() {
    this.DoctorService.GetCountryCodeMasterWeb().subscribe(data => {
      this.countryCodeList = data;
    }, error => {
      console.log(error)
    })
  }

  public insertdetails() {
    this.showPopup = 0
    this.password = Math.random().toString(36).slice(-8);
    var entity = {
      'HospitalID': this.hospitalclinicid,
      'UserName': this.username,
      'Password': this.password,
      'Name': this.name,
      'Email': this.email,
      'PhoneNo': this.phoneno
    }
    this.DoctorService.InsertReceiptionistLogin(entity).subscribe(data => {

      if (data != 0) {
        this.pinno = data;
        this.sendmail();
        this.showPopup = 1;
        this.messageID = 11;
        this.typeofPopUp = 1;
        location.href = "#/HospitalClinic/HospitalRecepsistDash";
      }
      else {
        this.showPopup = 1;
        this.messageID = 15;
        this.typeofPopUp = 2;

      }

    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "InsertReceiptionistLogin", error);
    })
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

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;



  }


  getCountryCode(even: any) {
    this.countryCode = even.target.value;
  }



  preventHospitalnoZero(even: any) {
    
    this.showPopup = 0;
    var no = even.split();
    if (no.length >= 1) {
      if (no[0] == '0') {
        this.phoneno = ""
        this.typeofPopUp = 2;
        this.messageID = 84;
        this.showPopup = 1;
      }

    }


  }



  sendmail() {
    this.showPopup = 0;
    let smsNumber = this.countryCode + '' + this.phoneno;
    console.log(smsNumber);
    this.SharedService.SendEmailSmsToProvider(
      this.pinno,
      this.username,
      this.password,
      smsNumber,
      this.email,
      this.name
    );

  }

}
