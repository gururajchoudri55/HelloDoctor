import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { PharmacyService } from 'src/app/Pages/services/pharmacy.service';
import Labels from '../../../Lables/Prescriptions/prescriptionlabels.json'
declare var window: any;


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  showPopup:any;
  password:any;
  pp:any;
  id:any;
  username:any;
  messageID:any;
  typeofPopUp:any;
  oldpassword:any;
  mypinno:any;
  Showpassword:any;
  Enteredpinno:any;
  entercurrentpwd:any;
  pinno:any;
  currentpwd:any;
  firstname:any;
  lastname:any;
  phoneno:any;
  email:any;
  roleid:any;
  languageid:any;
  pharmacyid:any;
  dummpharmacylist:any;
  pharmacylist:any;
  currentUrl:any;
  loader:boolean | undefined;
  search:any;
  count:any;
  labels:any;
  errorModal1:any;
  constructor(private PharmacyService:PharmacyService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.pharmacyid = sessionStorage.getItem('pharmacyid');
    this.pinno = sessionStorage.getItem('Pinno');
    this.currentpwd = sessionStorage.getItem('Password');
    this.getpharmacyloginfordash();
    this.errorModal1 = new window.bootstrap.Modal(
      document.getElementById("errorModal1")
    )
  }



  //Get PharmacyList
  public getpharmacyloginfordash() {
    this.PharmacyService.GetPharmacyLoginForDash(this.languageid).subscribe(
      data => {
        this.dummpharmacylist = data;
        this.pharmacylist = this.dummpharmacylist.filter((x: { pharmacyID: any; }) => x.pharmacyID == this.pharmacyid);
        this.count=this.pharmacylist.length;
        this.loader=false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetPharmacyLoginForDash",error);
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
      var valpassword = this.PharmacyService.strongpassword(this.password);
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
        this.PharmacyService.UpdatePharmacyAdminRegistration(entity).subscribe(data => {
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


showPopUp() {
  var valpassword = this.PharmacyService.strongpassword(this.password);
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
