import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import Labels from '../../../../Lables/WorkingDetails/workinglabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';


@Component({
  selector: 'app-care-giver-services',
  templateUrl: './care-giver-services.component.html',
  styleUrls: ['./care-giver-services.component.css']
})
export class CareGiverServicesComponent implements OnInit {
  loader:boolean | undefined;
  showPopup:any;
  messageID:any;
  typeofPopUp:any;
  languageid:any;
  physioid:any;
  servicesList:any;
  p:any;
  search:any;
  labels:any;
  
  constructor(private CommonService:CommonService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.physioid = sessionStorage.getItem('physioid');
    this.getPhysioServices();
  }

  public Disable(id: any) {
    this.showPopup = 0;
    this.CommonService.UpdateMidWifeServicesRegistrationEnableDisable(1,id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 24;
        this.typeofPopUp = 1;
        this.getPhysioServices();
      }, error => {
        this.loader=false;
        console.log("Error with UpdateMidWifeServicesRegistrationEnableDisable",error);
      }
    )
  }


  public Enable(id: any) {
    this.showPopup = 0;
    this.CommonService.UpdateMidWifeServicesRegistrationEnableDisable(2,id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 23;
        this.typeofPopUp = 1;
        this.getPhysioServices();
      }, error => {
        console.log("Error With UpdateMidWifeServicesRegistrationEnableDisable",error);
      }
    )
  }












  public getPhysioServices() {
    if (this.physioid == undefined) {
      this.CommonService.GetPhysioServicesByIDWeb(this.languageid, 0).subscribe(
        data => {
         this.loader=false;
          this.servicesList = data;
        }, error => {
          console.log("Error With GetPhysioServicesByIDWeb",error);
        }
      )
    }
    else {
      this.CommonService.GetPhysioServicesByIDWeb(this.languageid, 0).subscribe(
        data => {
          this.loader=false;
          this.servicesList = data.filter(x => x.physioID == this.physioid);
        }, error => {
          console.log("Error With GetPhysioServicesByIDWeb",error);
        }
      )
    }
  }

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }



  edit(id: any) {

    location.href = "#/countrymanager/CareGiverServiceDetails/" + btoa(id);
  }



}
