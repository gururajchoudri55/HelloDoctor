import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../RegisterService/register.service';
import Labels from '../../../Lables/managelogins/managelabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-delivery-company-dash',
  templateUrl: './delivery-company-dash.component.html',
  styleUrls: ['./delivery-company-dash.component.css']
})
export class DeliveryCompanyDashComponent implements OnInit {
  
  loader:boolean | undefined;
  languageid:any;
  pinno:any;
  currentpwd:any;
  countrymanaerid:any;
  showeditbutton:any;
  physiologinList:any;
  showPopup:any;
  messageID:any;
  typeofPopUp:any;
  p:any;
  id:any;
  username:any;
  oldpassword:any;
  mypinno:any;
  Showpassword:any;
  password:any;
  pp:any;
  entercurrentpwd:any;
  Enteredpinno:any;
  term:any;
  firstname:any;
  lastname:any;
  phoneno:any;
  email:any;
  roleid:any;
  labels:any;
  currentUrl:any;


  constructor(private RegisterService:RegisterService,private SharedService:SharedService ) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.pinno = sessionStorage.getItem('Pinno');
    this.currentpwd = sessionStorage.getItem('Password');
    this.countrymanaerid = sessionStorage.getItem('countrymanagerid');
    if (this.countrymanaerid != undefined) {
      this.showeditbutton = 1
    }
    else {
      this.showeditbutton = 0;
    }
    this.GetDeliveryCompanyLoginAdmin();
  }

  public GetDeliveryCompanyLoginAdmin() {
    this.RegisterService.GetDeliveryCompanyLoginAdmin(this.languageid).subscribe(
      data => {
       this.loader=false;
        this.physiologinList = data;
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetDeliveryCompanyLoginAdmin",error);
        console.log("Error with GetDeliveryCompanyLoginAdmin",error);
      }
    )
  }

  public DisableDeliveryCompanyLogin(id:any) {
    this.showPopup=0;
    this.RegisterService.DisableDeliveryCompanyLogin(id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 24;
        this.typeofPopUp = 1;    
          this.GetDeliveryCompanyLoginAdmin();
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"DisableDeliveryCompanyLogin",error);
         console.log("Error with DisableDeliveryCompanyLogin",error);
      }
    )
  }
  
  public EnableDeliveryCompanyLogin(id:any) {
    this.showPopup=0;
    this.RegisterService.EnableDeliveryCompanyLogin(id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 23;
        this.typeofPopUp = 1; 
          this.GetDeliveryCompanyLoginAdmin();
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"EnableDeliveryCompanyLogin",error);
        console.log("Error with EnableDeliveryCompanyLogin",error);
      }
    )
  }

  public pageChanged(even:any) {

    this.p = even;
  }

  public GetDeatsils(details:any) {
      this.id = details.id,
      this.username = details.userName,
      this.oldpassword = details.password,
      this.mypinno = details.pinno,
      this.Showpassword = 0;
  }

  public insertdetails() {
    
    this.showPopup = 0;
    this.loader=true;
    if (this.password != undefined) {
      var valpassword = this.RegisterService.strongpassword(this.password);
      if (valpassword == false) {
        this.pp = 1;
        this.loader=false;
      }
      else {
        var entity = {
          'ID': this.id,
          'UserName': this.username,
          'Password': this.password
        }

        this.username = '';
        this.password = '';
        this.RegisterService.UpdateDeliveryCompanyLogin(entity).subscribe(data => {
          this.pp = 0;
          this.showPopup = 1;
          this.messageID = 25;
          this.typeofPopUp = 1;
        this.GetDeliveryCompanyLoginAdmin()
        },error=>{
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl,"UpdateDeliveryCompanyLogin",error);
        })
      }
    }
  }

  public CheckPasswordvalidate() {

    if (this.Enteredpinno == "" || this.entercurrentpwd == "") {
      this.entercurrentpwd = "";
      this.Enteredpinno = "";
      this.showPopup = 1;
      this.messageID = 26;
      this.typeofPopUp = 1;
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
        this.typeofPopUp = 1;
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




}
