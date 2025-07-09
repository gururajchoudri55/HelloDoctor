import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DoctorService } from '../../services/Doctor/doctor.service';
import Labels from '../../../Pages/Lables/Doctors/AllLabels.json';
declare var window: any;
@Component({
  selector: 'app-doc-change-pwd',
  templateUrl: './doc-change-pwd.component.html',
  styleUrls: ['./doc-change-pwd.component.css']
})
export class DocChangePwdComponent implements OnInit {
  loader: boolean | undefined;
  languageid: any;
  doctorid: any;
  pinno: any;
  currentpwd: any;
  Enteredpinno: any;
  entercurrentpwd: any;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  Showpassword: any;
  id: any;
  firstname: any;
  lastname: any;
  phoneno: any;
  email: any;
  username: any;
  password: any;
  roleid: any;
  oldpassword: any;
  mypinno: any;
  dummdocloginlist: any;
  doctorloginlist: any;
  currentUrl: any;
  pp: any
  strongpassword: any;
  labels: any;
  errorModal1: any;
  
  showMsg:number=0;


  constructor(private DoctorService: DoctorService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.doctorid = sessionStorage.getItem('userid');
    this.pinno = sessionStorage.getItem('Pinno');
    this.currentpwd = sessionStorage.getItem('Password');
    this.getdoctorloginfordash();
    this.errorModal1 = new window.bootstrap.Modal(
      document.getElementById("errorModal1")
    )
  }



  //Get Login Doctor
  public getdoctorloginfordash() {
    this.DoctorService.GetDoctorLoginForDash(this.languageid).subscribe(
      data => {
        this.loader = false;
        this.dummdocloginlist = data;
        console.log(this.dummdocloginlist)
        this.doctorloginlist = this.dummdocloginlist.filter((x: { doctorID: any; }) => x.doctorID == this.doctorid)
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetDoctorLoginForDash", error);
      }
    )
  }

  //Get Details

  public GetDeatsils(details: any) {
    this.id = details.id,
      this.username = details.userName,
      this.oldpassword = details.password,
      this.mypinno = details.pinno
    this.Showpassword = 0;
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


  smsmobileno: any;
  doctorname: any;

  //Update Details

  public insertdetails() {
    
    this.showPopup = 0;
    if (this.password != undefined) {
      var valpassword = this.DoctorService.strongpassword(this.password);
      if (valpassword == false) {
        this.pp = 1;
      }
      else {
        var entity = {
          'ID': this.id,
          'UserName': this.username,
          'Password': this.password
        }
        this.username = '';
        this.password = '';
        this.DoctorService.UpdateDoctorLogins(entity).subscribe(data => {
          this.pp = 0;
          this.showPopup = 1;
          this.messageID = 25;
          this.typeofPopUp = 1;
          this.SharedService.SendEmailSmsToProvider(
            this.pinno,
            this.username,
            this.password,
            this.smsmobileno,
            this.email,
            this.doctorname
          );

          sessionStorage.clear();
          sessionStorage.clear();
          location.href = "#/login";
          location.reload();

        })
      }
    }
  }




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
    this.smsmobileno = details.smsmobileno,
      this.doctorname = details.doctorName

  }






  sendmail(details: any) {
    this.showPopup = 0;
    this.SharedService.SendEmailSmsToProvider(
      details.pinno,
      details.userName,
      details.password,
      details.smsmobileno,
      details.emailID,
      details.doctorName
    );

    this.showPopup = 1;
    this.typeofPopUp = 1
    this.messageID = 76;

  }


  removeHash(event: { which: any; keyCode: any; }): boolean {
    
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 35||charCode == 38) {
      this.showMsg=1;
 
      return false;

    }
    this.showMsg=0;
    return true;
  }


  showPopUp() {
    
    var valpassword = this.DoctorService.strongpassword(this.password);
    if (valpassword == false) {
      this.pp = 1;

    }
    else {
      document.getElementById('close')?.click();
      this.errorModal1.show();

    }

  }


  hidePopUp() {
    this.errorModal1.hide();
  }
}
