import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../RegisterService/register.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/managelogins/managelabels.json';

@Component({
  selector: 'app-hospital-dash-details',
  templateUrl: './hospital-dash-details.component.html',
  styleUrls: ['./hospital-dash-details.component.css']
})
export class HospitalDashDetailsComponent implements OnInit {

  constructor(private RegisterService: RegisterService, private SharedService: SharedService) { }

  languageid: any;
  hospitallist: any;
  hospdd: any;
  search: any;
  hospitalID: any;
  userName: any;
  password: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  currentUrl: any;
  labels:any;
  selecthospital:any;
  loader:boolean | undefined;
  
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.selecthospital=this.labels.selectHospital;
    this.search=this.labels.search;
    this.RegisterService.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {
        this.hospitallist = data;
        this.hospdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true
        };
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl, "GetHospital_ClinicForAdminByAdmin", error);
      }
    )

  }
  smsmobileno:any;

  public GetHospitalID(item2: any) {
    this.hospitalID = item2.id;
  }

  public insertDetails() {
    this.showPopup = 0;
    
    this.password=  this.RegisterService.generateRandomPassword();
    console.log("password",this.password);

    if (this.hospitalID == undefined) {
      this.showPopup = 1;
      this.messageID = 14;
      this.typeofPopUp = 2;
    }
    else {
      var entity = {
        'Hospital_ClinicID': this.hospitalID,
        'UserName': this.userName,
        'Password': this.password
      }
      this.RegisterService.InsertHospitalClinicAdminRegistration(entity).subscribe(data => {

        if (data != 0) {

          this.showPopup = 1;
          this.messageID = 1;
          this.typeofPopUp = 1;
          this.gethospitalclinicfordash();
        }
        else {
          this.showPopup = 1;
          this.messageID = 1;
          this.typeofPopUp = 1;

        }
      },error=>{
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"InsertHospitalClinicAdminRegistration",error);
      })

    }
  }
  pinno:any;
  email:any;
  hospitalname:any;

  public gethospitalclinicfordash() {
    this.RegisterService.GetHospital_ClinicLoginForDash(this.languageid).subscribe(
      data => {
        var list = data.filter(x => x.hospital_ClinicID == this.hospitalID)
        this.pinno = list[0].pinno,
          this.email = list[0].emailID,
          this.hospitalname = list[0].hospital_ClinicName
          this.SharedService.SendEmailSmsToProvider(
            this.pinno,
            this.userName,
            this.password,
            this.smsmobileno,
            this.email,
            this.hospitalname
          );

      }, error => {
      }
    )
  }

}
