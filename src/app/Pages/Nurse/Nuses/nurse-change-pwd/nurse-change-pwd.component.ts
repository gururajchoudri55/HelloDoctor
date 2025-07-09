import { Component, OnInit } from '@angular/core';
import { NurseService } from 'src/app/Pages/services/nurse.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Nurse/nurselabels.json';
declare var window: any;
@Component({
  selector: 'app-nurse-change-pwd',
  templateUrl: './nurse-change-pwd.component.html',
  styleUrls: ['./nurse-change-pwd.component.css']
})
export class NurseChangePwdComponent implements OnInit {
  
 loader:boolean | undefined;
 languageid:any;
 pinno:any;
 nurseid:any;
 currentpwd:any;
 dummnurseloginlist:any;
 nurseloginlist:any;
 count:any;
 currentUrl:any;
 search:any;
 p:any;
 id:any;
 username:any;
 oldpassword:any;
 mypinno:any;
 Showpassword:any;
 firstname:any;
 phoneno:any;
 lastname:any;
 email:any;
 roleid:any;
 showPopup:any;
Enteredpinno:any;
entercurrentpwd:any;
messageID:any;
typeofPopUp:any;
password:any;
pp:any
labels:any;
errorModal1:any;
  constructor(private NurseService:NurseService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.pinno = sessionStorage.getItem('Pinno');
    this.nurseid = sessionStorage.getItem('nurseid');
    this.currentpwd = sessionStorage.getItem('Password');
    this.GetNurseLoginAdmin();
    
    this.errorModal1 = new window.bootstrap.Modal(
      document.getElementById("errorModal1")
    )
  }

  public GetNurseLoginAdmin() {

    this.NurseService.GetNurseLoginAdmin(this.languageid).subscribe(
      data => {
        this.loader=false;
        this.dummnurseloginlist = data;
        this.nurseloginlist = this.dummnurseloginlist.filter((x: { nurseID: any; }) => x.nurseID == this.nurseid)
        this.count = this.nurseloginlist.length;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetNurseLoginAdmin",error);
        this.loader=false;
      }
    )
  }

  
    // Pagination

    public pageChanged(even: any) {

      let fgdgfgd = even;
      this.p = even;
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
    
    this.showPopup=0;
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
      var valpassword = this.NurseService.strongpassword(this.password);
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
        this.NurseService.UpdateNurseLogin(entity).subscribe(data => {
          this.pp = 0;
          this.showPopup = 1;
          this.messageID = 25;
          this.typeofPopUp = 1;
          sessionStorage.clear();
          sessionStorage.clear();
          location.href = "#/login";
          location.reload();
        },error=>{
          this.SharedService.insertexceptions(this.currentUrl,"UpdateNurseLogin",error);
          this.loader=false;
        })
      }
    }
  }



  //Get password
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
    var valpassword = this.NurseService.strongpassword(this.password);
    if (valpassword == false) {
      this.pp = 1;
    }
    else{
     
      document.getElementById('close')?.click();
      this.errorModal1.show();
    }
    
   
  }


  hidePopUp()
  {
    this.errorModal1.hide();
  }
}
