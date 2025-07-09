import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import Labels from '../../../Lables/Doctors/myAppointments.json';
declare var window: any;
@Component({
  selector: 'app-recpchangepwd',
  templateUrl: './recpchangepwd.component.html',
  styleUrls: ['./recpchangepwd.component.css']
})
export class RecpchangepwdComponent implements OnInit {
  loader:boolean | undefined;
  doctorid:any;
  recpid:any;
  notshow:any;
  hospitalclinicid:any;
  pinno:any;
  languageID:any;
  currentpwd:any;
  dummrecplogins:any;
  receptionistlogins:any;
  count:any;
  currentUrl:any;
  showPopup:any;
  password:any;
  pp:any;
  id:any;
  name:any;
  mobileno:any;
  email:any;
  address:any;
  username:any;
  messageID:any;
  typeofPopUp:any;
  oldpassword:any;
  mypinno:any;
  Showpassword:any;
  firstname:any;
  lastname:any;
  phoneno:any;
  roleid:any;
  Enteredpinno:any;
  entercurrentpwd:any;
  p:any;
  search:any;
  labels:any;
  errorModal1:any;
  

  constructor(private DoctorService:DoctorService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.doctorid = sessionStorage.getItem('userid');
    this.recpid = sessionStorage.getItem('recpid');
    if (this.recpid != undefined) {
      this.notshow = 0;
    }
    else {
      this.notshow = 1;
    }
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    this.pinno = sessionStorage.getItem('Pinno');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.currentpwd = sessionStorage.getItem('Password');
    this.getreceptionlogin();

    this.errorModal1 = new window.bootstrap.Modal(
      document.getElementById("errorModal1")
    )

  }




  public getreceptionlogin() {

    if (this.recpid == undefined) {
      this.DoctorService.GetIndependentDoctors_Receptionist(this.languageID).subscribe(
        data => {
          this.dummrecplogins = data;
          this.receptionistlogins = this.dummrecplogins.filter((x: { doctorID: any; }) => x.doctorID == this.doctorid)
          this.count = this.receptionistlogins.length;
          this.loader=false;
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl,"GetIndependentDoctors_Receptionist",error);
          this.loader=false;
        }
      )
    }
    else {
      this.DoctorService.GetIndependentDoctors_Receptionist(this.languageID).subscribe(
        data => {
          this.dummrecplogins = data;
          this.receptionistlogins = this.dummrecplogins.filter((x: { id: any; }) => x.id == this.recpid)
          this.count = this.receptionistlogins.length;
          this.loader=false;
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl,"GetIndependentDoctors_Receptionist",error);
          this.loader=false;
        }
      )
    }

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
        var valpassword = this.DoctorService.strongpassword(this.password);
        if (valpassword == false) {
          this.pp = 1;
        }
        else {
          var entity = {
            'ID': this.id,
            'DoctorID': this.doctorid,
            'Name': this.name,
            'MobileNo': this.mobileno,
            'Email': this.email,
            'Address': this.address,
            'UserName': this.username,
            'Password': this.password
          }
          this.username = '';
          this.password = '';
          this.DoctorService.UpdateIndependentDoctors_Receptionist(entity).subscribe(data => {
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
  

    //TO  EnableFess

    public GetRecpEnable(id: any) {
      this.showPopup = 0;
      this.DoctorService.EnableIndependentDoctors_Receptionist(id).subscribe(
        data => {
          this.showPopup = 1;
          this.messageID = 23;
          this.typeofPopUp = 1;
          this.getreceptionlogin();
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl,"UpdateEnableDisableHomeVisitDeliveryChargesMaster",error);
        }
      )
    }
  
     
    //GetDisableFess
  
    public GetDisablerecp(docid: any) {
      this.showPopup = 0;
      this.DoctorService.DisableIndependentDoctors_Receptionist(docid).subscribe(
        data => {
          this.showPopup = 1;
          this.messageID = 24;
          this.typeofPopUp = 1;
          this.getreceptionlogin();
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl,"DisableIndependentDoctors_Receptionist",error);
        }
      )
    }

    removeHash(event: { which: any; keyCode: any; }): boolean {
      
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode == 35) {
        return false;
      }
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
  
  
    hidePopUp()
    {
      this.errorModal1.hide();
    }
  


}
