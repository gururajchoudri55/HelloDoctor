import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DoctorService } from '../../services/Doctor/doctor.service';
import Labels from '../../Lables/Hospital/hospitallabels.json'
@Component({
  selector: 'app-change-recp-pwd',
  templateUrl: './change-recp-pwd.component.html',
  styleUrls: ['./change-recp-pwd.component.css']
})
export class ChangeRecpPwdComponent implements OnInit {
  hospitalclinicid:any;
  pinno:any;
  languageID:any;
  receptionid:any;
  currentpwd:any;
  id:any;
  username:any;
  oldpassword:any;
  mypinno:any;
  Showpassword:any;
  password:any;
  pp:any;
  showPopup:any;
  entercurrentpwd:any;
  Enteredpinno:any;
  messageID:any;
  typeofPopUp:any;
  dummreceptionistlogins:any;
  receptionistlogins:any;
  count:any;
  search:any;
  currentUrl:any;
  loader:boolean | undefined;
  
  labels:any;

  constructor(private DoctorService:DoctorService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    this.pinno = sessionStorage.getItem('Pinno');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.receptionid = sessionStorage.getItem('Receptionstid');
    this.currentpwd = sessionStorage.getItem('Password');
    this.getreceptionlogin();
  }


  public getreceptionlogin() {
    this.DoctorService.GetReceiptionistLoginDash(this.hospitalclinicid).subscribe(
      data => {
        this.dummreceptionistlogins = data;
        this.receptionistlogins = this.dummreceptionistlogins.filter((x: { id: any; }) => x.id == this.receptionid)
        this.count = this.receptionistlogins.length;
        this.loader=false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetReceiptionistLoginDash",error);
        this.loader=false;
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
    
    this.showPopup = 0;
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
        this.DoctorService.UpdateReceiptionistLogin(entity).subscribe(data => {
          this.pp = 0;
          this.showPopup = 1;
          this.messageID = 25;
          this.typeofPopUp = 1;
        })
      }
    }
  }





}
