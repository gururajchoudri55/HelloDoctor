import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MidwifeService } from 'src/app/Pages/services/midwife.service';
import Labels from '../../../Lables/Midwife/midwifelables.json';
declare var window: any;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
 loader:boolean | undefined;
 id:any;
 username:any;
 oldpassword:any;
 mypinno:any;
 Showpassword:any;
 entercurrentpwd:any;
Enteredpinno:any;
showPopup:any;
messageID:any;
typeofPopUp:any;
pinno:any;
currentpwd:any;
password:any;
pp:any;
firstname:any;
lastname:any;
phoneno:any;
email:any;
roleid:any;
search:any;
languageid:any;
midwifeid:any;
dummmidwifelist:any;
midwifelist:any;
currentUrl:any;
labels:any;
errorModal1:any;


  constructor(private MidwifeService:MidwifeService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.pinno = sessionStorage.getItem('Pinno');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.midwifeid = sessionStorage.getItem('midwifeid');
    this.GetMidWivesLoginAdmin();
    this.currentpwd = sessionStorage.getItem('Password');

    this.errorModal1 = new window.bootstrap.Modal(
      document.getElementById("errorModal1")
    )
  }


  public GetMidWivesLoginAdmin() {

    this.MidwifeService.GetMidWivesLoginAdmin(this.languageid).subscribe(
      data => {
        this.loader=false;
        this.dummmidwifelist = data;
        this.midwifelist = this.dummmidwifelist.filter((x: { midWiveID: any; }) => x.midWiveID == this.midwifeid)

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetMidWivesLoginAdmin",error);
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
    else{      
      this.showPopup = 1;
      this.messageID = 27;
      this.typeofPopUp = 2;
    }
  }
}




  //Update Details

  public insertdetails() {
    
    this.showPopup = 0;
    if (this.password != undefined) {
      var valpassword = this.MidwifeService.strongpassword(this.password);
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
        this.MidwifeService.UpdateMidWivesLogin(entity).subscribe(data => {
          this.pp = 0;
          this.showPopup = 1;
          this.messageID = 25;
          this.typeofPopUp = 1;
          sessionStorage.clear();
          sessionStorage.clear();
          location.href = "#/login";
          location.reload();
        },error=>{
          this.SharedService.insertexceptions(this.currentUrl,"UpdateMidWivesLogin",error);
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



showPopUp1() {
  var valpassword = this.MidwifeService.strongpassword(this.password);
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
