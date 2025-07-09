import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import Labels from '../../../Lables/Report/reportlabels.json';

@Component({
  selector: 'app-patient-invitations',
  templateUrl: './patient-invitations.component.html',
  styleUrls: ['./patient-invitations.component.css']
})
export class PatientInvitationsComponent implements OnInit {
  languageid:any;
  currentUrl:any;
  invitationslist:any;
  count:any;
  loader:boolean | undefined;
  smsmobileno:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  search:any;
  p:any;
  labels:any;
  
  
  constructor(private MenuService:MenuService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.currentUrl=window.location.href;
    this.loader=true;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.getpatientinvitations();
  }

  //Get Patient Invitations
  public getpatientinvitations() {
    this.MenuService.GetPatient_Referal_InvitationsWeb(this.languageid).subscribe(
      data => {
        this.loader=false;
        this.invitationslist = data;
        this.count = this.invitationslist.length;

      },
      error => { 
        this.SharedService.insertexceptions(this.currentUrl,"GetPatient_Referal_InvitationsWeb",error);
      }
    );
  }
 
  // //Get SMS

  // public GetSmsmobileno(smsmobileno:any) {
  //   this.smsmobileno = smsmobileno;
  // }
  

  // //Send Sms
  
  // public SendTwiliSms() {
  // this.showPopup=0;
  //   this.MenuService.SendTwillioSMS(this.smsmobileno, this.message).subscribe(data => {
  //     this.showPopup=1;
  //     this.messageID=39;
  //     this.typeofPopUp
       

  //   })
  // }

         //Pagination
     public pageChanged(even:any) {

    let fgdgfgd = even;
    this.p = even;
  }



}
