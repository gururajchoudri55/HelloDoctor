import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { DiagnosticService } from 'src/app/Pages/services/diagnostic.service';
import Labels from '../../../Lables/diagnostic/diagnosticlabels.json';
declare var window: any;

@Component({
  selector: 'app-diagnostic-change-password',
  templateUrl: './diagnostic-change-password.component.html',
  styleUrls: ['./diagnostic-change-password.component.css']
})
export class DiagnosticChangePasswordComponent implements OnInit {
  languageid:any;
  pinno:any;
  diagnosticid:any;
  currentpwd:any;
  id:any;
  username:any;
  oldpassword:any;
  mypinno:any;
  Showpassword:any;
  Enteredpinno:any;
  entercurrentpwd:any;
  showPopup:any;
  messageID:any;
  typeofPopUp:any;
  password:any;
  pp:any;
  firstname:any;
  lastname:any;
  phoneno:any;
  email:any;
  roleid:any;
  search:any;
  loader:boolean | undefined;
  dummdiagnoticloginlist:any;
  diagnoticloginlist:any;
  currentUrl:any;
  count:any;
  labels:any;
  errorModal1:any;

  constructor(private DiagnosticService:DiagnosticService,private  SharedService:SharedService ) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.pinno = sessionStorage.getItem('Pinno');
    this.diagnosticid = sessionStorage.getItem('diagnosticid');
    this.currentpwd = sessionStorage.getItem('Password');
    this.getdiagnosticloginfordash();
    this.errorModal1 = new window.bootstrap.Modal(
      document.getElementById("errorModal1")
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
      else{      
        this.showPopup = 1;
        this.messageID = 27;
        this.typeofPopUp = 2;
      }
    }
  }
  
  //Get DiagnosticLogin Details

  public getdiagnosticloginfordash() {
    this.DiagnosticService.GetDiagnosticLoginForDash(this.languageid).subscribe(
      data => {
        this.dummdiagnoticloginlist = data;
        this.diagnoticloginlist = this.dummdiagnoticloginlist.filter((x: { diagnosticCenterID: any; }) => x.diagnosticCenterID == this.diagnosticid);
        this.count=this.diagnoticloginlist.length;
        this.loader=false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticLoginForDash",error);
      }
    )
  }

  
  
  
    //Update Details
  
    public insertdetails() {
      
      this.showPopup = 0;
      if (this.password != undefined) {
        var valpassword = this.DiagnosticService.strongpassword(this.password);
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
          this.DiagnosticService.UpdateDiagnosticCenterAdminRegistrationWeb(entity).subscribe(data => {
            this.pp = 0;
            this.showPopup = 1;
            this.messageID = 25;
            this.typeofPopUp = 1;

            sessionStorage.clear();
            sessionStorage.clear();
            location.href = "#/login";
            location.reload();
          })
        }
      }
    }
  
 

  //Get Password
  public getpassword(details:any) {
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

  showPopUp() {
    var valpassword = this.DiagnosticService.strongpassword(this.password);
    if (valpassword == false) {
      this.pp = 1;

    }
    else {
      document.getElementById('close')?.click();
      this.errorModal1.show();

    }
  }


  hidePopUp()
  {
    this.errorModal1.hide();
  }



}
