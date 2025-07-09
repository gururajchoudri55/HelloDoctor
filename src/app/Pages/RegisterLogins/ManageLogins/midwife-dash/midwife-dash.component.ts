import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../RegisterService/register.service';
import Labels from '../../../Lables/managelogins/managelabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-midwife-dash',
  templateUrl: './midwife-dash.component.html',
  styleUrls: ['./midwife-dash.component.css']
})
export class MidwifeDashComponent implements OnInit {
  loader: boolean | undefined;
  pinno: any;
  languageid: any;
  hospitalclinicid: any;
  currentpwd: any
  countrymanaerid: any;
  showeditbutton: any;
  midwifeList: any;
  count: any;
  dummmidwifelist: any;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  p: any;
  id: any;
  username: any;
  oldpassword: any;
  mypinno: any;
  Showpassword: any;
  password: any;
  pp: any;
  Enteredpinno: any;
  entercurrentpwd: any;
  search: any;
  firstname: any;
  lastname: any;
  phoneno: any;
  email: any;
  roleid: any;
  labels: any;
  currentUrl: any;
  showMsg: number = 0;


  constructor(private RegisterService: RegisterService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.pinno = sessionStorage.getItem('Pinno');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    this.currentpwd = sessionStorage.getItem('Password');
    this.countrymanaerid = sessionStorage.getItem('countrymanagerid');
    if (this.countrymanaerid != undefined) {
      this.showeditbutton = 1
    }
    else {
      this.showeditbutton = 0;
    }
    this.GetMidWivesLoginAdmin();

  }

  public GetMidWivesLoginAdmin() {
    if (this.hospitalclinicid == undefined) {
      this.RegisterService.GetMidWivesLoginAdmin(this.languageid).subscribe(
        data => {
          this.midwifeList = data;
          this.count = this.midwifeList.length;
          this.loader = false;
        }, error => {
          this.loader = false;
          console.log("error with GetMidWivesLoginAdmin", error);
          this.SharedService.insertexceptions(this.currentUrl, "GetMidWivesLoginAdmin", error);
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.RegisterService.GetMidWivesLoginAdmin(this.languageid).subscribe(
        data => {
          this.dummmidwifelist = data;
          this.midwifeList = this.dummmidwifelist.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.midwifeList.length;
          this.loader = false;
        }, error => {
          this.loader = false;
          console.log("error with GetMidWivesLoginAdmin", error);
          this.SharedService.insertexceptions(this.currentUrl, "GetMidWivesLoginAdmin", error);
        }
      )
    }
  }


  public DisableMidWivesLogin(id: any) {
    this.showPopup = 0;
    this.RegisterService.DisableMidWivesLogin(id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 24;
        this.typeofPopUp = 1;
        this.GetMidWivesLoginAdmin();
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "DisableMidWivesLogin", error);
        console.log("Error with DisableMidWivesLogin", error);
      }
    )
  }


  public EnableMidWivesLogin(id: any) {
    this.showPopup = 0;
    this.RegisterService.EnableMidWivesLogin(id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 23;
        this.typeofPopUp = 1;
        this.GetMidWivesLoginAdmin();
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "EnableMidWivesLogin", error);
        console.log("Error with EnableMidWivesLogin", error);
      }
    )
  }

  public pageChanged(even: any) {
    this.p = even;
  }

  public GetDeatsils(details: any) {
    this.id = details.id,
      this.username = details.userName,
      this.oldpassword = details.password,
      this.mypinno = details.pinno
    this.Showpassword = 0;
  }


  public insertdetails() {
    this.showPopup = 0;
    this.loader = true;
    if (this.password != undefined) {
      var valpassword = this.RegisterService.strongpassword(this.password);
      if (valpassword == false) {
        this.pp = 1;
        this.loader = false;
      }
      else {
        var entity = {
          'ID': this.id,
          'UserName': this.username,
          'Password': this.password
        }

        this.username = '';
        this.password = '';
        this.RegisterService.UpdateMidWivesLogin(entity).subscribe(data => {
          this.pp = 0;
          this.showPopup = 1;
          this.messageID = 25;
          this.typeofPopUp = 1;
          document.getElementById('close')?.click();
          this.GetMidWivesLoginAdmin()
        }, error => {
          this.loader = false;
          this.SharedService.insertexceptions(this.currentUrl, "UpdateMidWivesLogin", error);
        })
      }
    }
  }

  // public CheckPasswordvalidate() {
  //     this.showPopup=0;
  //   if (this.Enteredpinno == "" || this.entercurrentpwd == "") {
  //     this.entercurrentpwd = "";
  //     this.Enteredpinno = "";

  //     this.showPopup = 1;
  //     this.messageID = 26;
  //     this.typeofPopUp = 2;
  //   }
  //   else {
  //     if (this.pinno == this.Enteredpinno && this.currentpwd == this.entercurrentpwd) {
  //       this.Showpassword = 1;
  //       this.Enteredpinno = ""
  //       this.entercurrentpwd = "";
  //     }

  //     else{
  //       this.showPopup = 1;
  //       this.messageID = 27;
  //       this.typeofPopUp = 1;
  //     }

  //   }
  // }


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










  //Update Details


  //Get Password
  public getpassword(details: any) {
    this.oldpassword = details.password,
      this.mypinno = details.pinno,
      this.id = details.id,
      this.firstname = details.firstName,
      this.lastname = details.lastName,
      this.phoneno = details.phoneNo,
      this.email = details.email,
      this.username = details.userName,
      this.roleid = details.roleID
    this.Showpassword = 0;
  }




  removeHash(event: { which: any; keyCode: any; }): boolean {
    
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 35 || charCode == 38) {
      this.showMsg = 1;

      return false;

    }
    this.showMsg = 0;
    return true;
  }
  sendmail(details: any) {
    this.showPopup = 0;
    this.SharedService.SendEmailSmsToProvider(
      details.pinno,
      details.userName,
      details.password,
      details.smsmobileno,
      details.email,
      details.name
    );

    this.showPopup = 1;
    this.typeofPopUp = 1
    this.messageID = 76;

  }


}
