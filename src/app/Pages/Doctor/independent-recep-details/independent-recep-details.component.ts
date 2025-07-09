import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DoctorService } from '../../services/Doctor/doctor.service';
import Labels from '../../../Pages/Lables/Doctors/AllLabels.json'

@Component({
  selector: 'app-independent-recep-details',
  templateUrl: './independent-recep-details.component.html',
  styleUrls: ['./independent-recep-details.component.css']
})

export class IndependentRecepDetailsComponent implements OnInit {
  loader: boolean | undefined;
  hospitalclinicid: any;
  languageID: any;
  doctorid: any;
  address: any;
  password: any;
  name: any;
  phoneno: any;
  email: any;
  username: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  pinno: any;
  Labels: any;
  labels: any;
  currentUrl: any;
  countryCodeList: any = [];
  countryCode: number=0;


  constructor(private DoctorService: DoctorService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.doctorid = sessionStorage.getItem('userid');
    this.getCountryCodeNew();
  }


  //Insert Details
  public insertdetails() {
    this.password = Math.random().toString(36).slice(-8);
    var entity = {
      'DoctorID': this.doctorid,
      'Name': this.name,
      'MobileNo': this.phoneno,
      'Email': this.email,
      'Address': this.address,
      'UserName': this.username,
      'Password': this.password,
    }
    this.DoctorService.InsertIndependentDoctors_Receptionist(entity).subscribe(data => {

      if (data != 0) {
        this.pinno = data;
        this.typeofPopUp = 1;
        this.showPopup = 1;
        this.messageID = 1;
        this.sendmail();
        location.href = "#/Doctor/IndependentRecpDash"
      }
      else if(data==0){
        this.showPopup = 1;
        this.messageID = 85;
        this.typeofPopUp = 2;
    
      }
      else if(data==0){
        this.showPopup = 1;
        this.messageID = 86;
        this.typeofPopUp = 2;

      }
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "InsertIndependentDoctors_Receptionist", error);
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

  getCountryCodeNew() {
    this.DoctorService.GetCountryCodeMasterWeb().subscribe(data => {
      this.countryCodeList = data;
    }, error => {
      console.log(error)
    })
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
