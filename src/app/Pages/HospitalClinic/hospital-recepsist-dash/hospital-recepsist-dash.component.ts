import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DoctorService } from '../../services/Doctor/doctor.service';
import Labels from '../../Lables/WorkingDetails/workinglabels.json';

@Component({
  selector: 'app-hospital-recepsist-dash',
  templateUrl: './hospital-recepsist-dash.component.html',
  styleUrls: ['./hospital-recepsist-dash.component.css']
})
export class HospitalRecepsistDashComponent implements OnInit {
  hospitalclinicid: any;
  pinno: any;
  languageID: any;
  currentpwd: any;
  receptionistlogins: any;
  count: any;
  loader: boolean | undefined;
  currentUrl: any;
  id: any;
  username: any;
  oldpassword: any;
  mypinno: any;
  Showpassword: any;
  p: any;
  Enteredpinno: any;
  entercurrentpwd: any;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  password: any;
  pp: any;
  search: any;
  labels: any;


  constructor(private DoctorService: DoctorService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    this.pinno = sessionStorage.getItem('Pinno');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.currentpwd = sessionStorage.getItem('Password');
    this.getreceptionlogin();
  }

  public getreceptionlogin() {
    this.DoctorService.GetReceiptionistLoginDash(this.hospitalclinicid).subscribe(
      data => {
        this.receptionistlogins = data;
        this.count = this.receptionistlogins.length;
        this.loader = false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetReceiptionistLoginDash", error);
        this.loader = false;
      }
    )
  }

  name: any;
  email: any;
  phoneNo: any;


  //Get Details

  public GetDeatsils(details: any) {
    this.id = details.id,
      this.username = details.userName,
      this.oldpassword = details.password,
      this.mypinno = details.pinno,
      this.name = details.name,
      this.email = details.email,
      this.phoneNo = details.phoneNo

    this.Showpassword = 0;

  }


  //Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  //Checkpassword

  public CheckPasswordvalidate() {
    if (this.Enteredpinno == "" || this.entercurrentpwd == "") {
      this.entercurrentpwd = "";
      this.Enteredpinno = "";
      this.showPopup = 1;
      this.messageID = 26;
      this.typeofPopUp = 2;
    }
    else {
      if (this.pinno == this.Enteredpinno && this.currentpwd == this.entercurrentpwd) {
        this.Showpassword = 1;
        this.Enteredpinno = ""
        this.entercurrentpwd = "";
      }
      else {
        this.showPopup = 1;
        this.messageID = 27;
        this.typeofPopUp = 2;
      }
    }
  }

  public UpdateDetailes() {
    var entity = {
      'ID': this.id,
      'UserName': this.username,
      'Password': this.password,
      'Name': this.name,
      'Email': this.email,
      'PhoneNo': this.phoneNo
    }
    this.DoctorService.UpdateReceiptionistLogin(entity).subscribe(res => {
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      this.getreceptionlogin();
    })
  }


  //To Disable ReceptionistLogin
  public GetDisablerecp(docid: any) {
    this.showPopup = 0;
    this.DoctorService.DisableReceiptionistLogin(docid).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 24;
        this.typeofPopUp = 1;
        this.getreceptionlogin();
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "DisableReceiptionistLogin", error);
      }
    )
  }

  //TO Enable ReceptionistLogin

  public GetRecpEnable(id: any) {
    this.showPopup = 0;
    this.DoctorService.EnableReceiptionistLogin(id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 23;
        this.typeofPopUp = 1;
        this.getreceptionlogin();
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "EnableReceiptionistLogin", error);
      }
    )
  }

}
