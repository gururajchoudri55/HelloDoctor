import { Component, OnInit } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Report/reportlabels.json';

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.css']
})
export class SendSmsComponent implements OnInit {

  sendemailpatients: any=[];
  Patientlist: any;
  languageid: any;
  user: any;
  count: any;
  dummpatientPatientlist: any;
  currentUrl: any;
  loader: boolean | undefined;
  p: any;
  search: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  labels:any;
  

  constructor(private MenuService: MenuService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem("LanguageID");
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.user = sessionStorage.getItem('user');
    this.GetPatientlist();
  }


  public GetPatientlist() {
    this.MenuService.GetPatientRegistrationForSendEmails(this.languageid).subscribe(
      data => {
        this.Patientlist = data;
        this.count = this.Patientlist.length
        this.dummpatientPatientlist = data;
        for (let i = 0; i < this.Patientlist.length; i++) {
          this.Patientlist[i]['checked'] = false;
        }


        this.loader = false;
      },
      error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetPatientRegistrationForSendEmails", error);
      }
    );
  }



  public GetPatientSelectAll(even: any) {

    var chkboxes = document.getElementsByClassName('chk_sendmailcheck')
    if (even.target.checked == true) {

      this.sendemailpatients = this.Patientlist;
      this.Patientlist.checked = true;
      console.log('sendsms', this.sendemailpatients)
      for (let i = 0; i < this.Patientlist.length; i++) {
        this.Patientlist[i]['checked'] = true;
      }

    }
    else if (even.target.checked == false) {

      this.sendemailpatients = []
      for (let i = 0; i < this.Patientlist.length; i++) {
        this.Patientlist[i]['checked'] = false;
      }
    }
  }

  public GetPatientSendemailslist(even:any, list:any) {
    
    if (even.target.checked == true) {
      this.sendemailpatients.push(list)
    }
    else if (even.target.checked == false) {
      
      this.sendemailpatients.splice(this.sendemailpatients.indexOf(list), 1)
    }

  }


  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  message: any;


  public sendsms() {
    this.loader = true;
    
    for (let i = 0; i < this.sendemailpatients.length; i++) {

      
      this.MenuService.SendTwillioSMS(this.sendemailpatients[i].smsmobileno, this.message).subscribe(data => {
        console.log("data",data);
        
        var entity = {
          'PatientID': this.sendemailpatients[i].id,
          'Message': this.message,
          'Sendername': this.user
        }
        this.MenuService.insertPatient_Sms(entity).subscribe(data => {
          console.log(data);
          // 
        },error=>{
          console.log("error",error);
          this.SharedService.insertexceptions(this.currentUrl,"insertPatient_Sms",error);
        })
      },error=>{
        console.log("error",error);
      })
    }
    this.showPopup = 1;
    this.messageID = 39;
    this.typeofPopUp = 1;

    location.href = "#/menus/SmsDashboard"

  }

}
