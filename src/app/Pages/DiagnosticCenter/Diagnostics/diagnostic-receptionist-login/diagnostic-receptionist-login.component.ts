import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { DiagnosticService } from 'src/app/Pages/services/diagnostic.service';
import Labels from '../../../Lables/diagnostic/diagnosticlabels.json';


@Component({
  selector: 'app-diagnostic-receptionist-login',
  templateUrl: './diagnostic-receptionist-login.component.html',
  styleUrls: ['./diagnostic-receptionist-login.component.css']
})
export class DiagnosticReceptionistLoginComponent implements OnInit {
  languageid: any;
  pinno: any;
  currentpwd: any;
  receptionistloginlist: any;
  count: any;
  search: any;
  p: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  loader: boolean | undefined;
  oldpassword: any;
  mypinno: any;
  id: any;
  firstname: any;
  lastname: any;
  phoneno: any;
  email: any;
  username: any;
  roleid: any;
  Showpassword: any
  Enteredpinno: any;
  entercurrentpwd: any;
  password: any;
  pp: any;
  name: any;
  address: any;
  currentUrl: any;
  labels: any;
  recpid: any;
  showenable: any;
  showHeaderLable: any;
  showAdd:any;
  constructor(private DiagnosticService: DiagnosticService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.pinno = sessionStorage.getItem('Pinno');
    this.currentpwd = sessionStorage.getItem('Password');
    this.recpid = sessionStorage.getItem("Receptionstid");
    this.showHeaderLable = this.recpid == undefined ? 0 : 1;
    this.showAdd=this.recpid==undefined?0:1;
    this.GetReceptionistlogin();
  }


  //To Get receptionistLogin List

  public GetReceptionistlogin() {
    if (this.recpid != undefined) {
      this.showenable = 0;
      this.DiagnosticService.GetDiagnosticReceptionistLogin(sessionStorage.getItem('diagnosticid')).subscribe(data => {
        this.receptionistloginlist = data.filter(x => x.id == this.recpid)
        this.count = this.receptionistloginlist.length;
      })
    }
    else {
      this.DiagnosticService.GetDiagnosticReceptionistLogin(sessionStorage.getItem('diagnosticid')).subscribe(data => {
        this.receptionistloginlist = data;
        this.count = this.receptionistloginlist.length;
        this.showenable = 1;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetDiagnosticReceptionistLogin", error);
      })
    }

  }

  //Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


  //Redirecting the Page 
  edit(id: any) {
    location.href = "#/Diagnostic/DiagnosticReceptionistLoginDetails/" + btoa(id);
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

  public UpdateDetailes() {

    var entity = {
      ID: this.id,
      DiagnosticID: sessionStorage.getItem('diagnosticid'),
      Name: this.name,
      PhoneNo: this.phoneno,
      EmailID: this.email,
      Address: this.address,
      UserName: this.username,
      Password: this.password
    }
    this.DiagnosticService.UpdateDiagnosticReceptionistLogin(entity).subscribe(res => {
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      this.GetReceptionistlogin();

    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "UpdateDiagnosticReceptionistLogin", error);
    })
  }


  //To Disable ReceptionistLogin
  public disable(id: any) {
    this.showPopup = 0;
    this.DiagnosticService.DeleteDiagnosticReceptionistLogin(id, 1).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 24;
        this.typeofPopUp = 1;
        this.GetReceptionistlogin();
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "DeleteDiagnosticReceptionistLogin", error);
      }
    )
  }

  //TO Enable ReceptionistLogin

  public enable(id: any) {
    this.showPopup = 0;
    this.DiagnosticService.DeleteDiagnosticReceptionistLogin(id, 2).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 23;
        this.typeofPopUp = 1;
        this.GetReceptionistlogin();
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "DeleteDiagnosticReceptionistLogin", error);
      }
    )
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
  }

  removeHash(event: { which: any; keyCode: any; }): boolean {
    
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 35) {
      return false;
    }
    return true;
  }




}
