import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DoctorService } from '../../services/Doctor/doctor.service';
import Labels from '../../../Pages/Lables/Doctors/AllLabels.json';


@Component({
  selector: 'app-independent-recp-dash',
  templateUrl: './independent-recp-dash.component.html',
  styleUrls: ['./independent-recp-dash.component.css']
})
export class IndependentRecpDashComponent implements OnInit {
  doctorid: any;
  recpid: any;
  notshow: any;
  hospitalclinicid: any;
  pinno: any;
  languageID: any;
  currentpwd: any;
  dummrecplogins: any;
  receptionistlogins: any;
  count: any;
  loader: any;
  currentUrl: any;
  search: any;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  password: any;
  pp: any;
  id: any;
  username: any;
  oldpassword: any;
  mypinno: any;
  Showpassword: any;
  firstname: any;
  lastname: any;
  phoneno: any;
  email: any;
  roleid: any;
  Enteredpinno: any;
  entercurrentpwd: any;
  name: any;
  mobileno: any;
  address: any;
  labels: any;

  constructor(private DoctorService: DoctorService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.currentUrl = window.location.href;
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
    this.currentpwd = sessionStorage.getItem('Password');
    this.getreceptionlogin();
  }


  //get Reception Login 
  public getreceptionlogin() {
    
    if (this.recpid == undefined) {
      
      this.DoctorService.GetIndependentDoctors_Receptionist(this.languageID).subscribe(
        data => {
          this.loader = false;
          this.dummrecplogins = data;
          
          this.receptionistlogins = this.dummrecplogins.filter((x: { doctorID: any; }) => x.doctorID == this.doctorid)
          this.count = this.receptionistlogins.length;
          
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetIndependentDoctors_Receptionist", error);
        }
      )
    }
    else {
      
      this.DoctorService.GetIndependentDoctors_Receptionist(this.languageID).subscribe(
        data => {
          this.loader = false;
          this.dummrecplogins = data;
          this.receptionistlogins = this.dummrecplogins.filter((x: { id: any; }) => x.id == this.recpid)
          this.count = this.receptionistlogins.length;
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetIndependentDoctors_Receptionist", error);
        }
      )
    }
  }



  //To Disable Receptionist

  public GetDisablerecp(docid: any) {
    this.showPopup = 0;
    this.DoctorService.DisableIndependentDoctors_Receptionist(docid).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 24;
        this.typeofPopUp = 1;
        this.getreceptionlogin();
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "DisableIndependentDoctors_Receptionist", error);
      }
    )
  }
  
  //TO Enable Receptionist

  public GetRecpEnable(id: any) {
    this.showPopup = 0;
    this.DoctorService.EnableIndependentDoctors_Receptionist(id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 23;
        this.typeofPopUp = 1;
        this.getreceptionlogin();
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "EnableIndependentDoctors_Receptionist", error);
      }
    )
  }



  //Get Details

  public GetDeatsils(details: any) {
    this.id = details.id,
      this.username = details.userName,
      this.oldpassword = details.password,
      this.mypinno = details.pinno,
      this.name = details.name,
      this.mobileno = details.mobileNo,
      this.email = details.email,
      this.address = details.address,
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




  //Update Details
  public updatedetails() {
    this.showPopup = 0;
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
      this.DoctorService.UpdateIndependentDoctors_Receptionist(entity).subscribe(data => {
        this.getreceptionlogin();
        this.password = ""
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
        document.getElementById('close')?.click()
      })
    }

  }




}
