import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import Labels from '../../../../Lables/WorkingDetails/workinglabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-nurse-service',
  templateUrl: './nurse-service.component.html',
  styleUrls: ['./nurse-service.component.css']
})
export class NurseServiceComponent implements OnInit {
  loader: boolean | undefined;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  languageid: any;
  nurseid: any;
  hospitalclinicid: any;
  showdropdown: any;
  nurseServicesList: any;
  p: any;
  search: any;
  labels: any;
  currentUrl: any;


  constructor(private CommonService: CommonService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.nurseid = sessionStorage.getItem('nurseid');
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');

    if (this.nurseid == undefined) {
      this.showdropdown = 1;
    }
    else {
      this.showdropdown = 0;
    }
    
    this.GetNurseServices();
  }


  public disablenurse(docid: any) {
    this.showPopup = 0;
    this.CommonService.DisableNurseService(docid).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 24;
        this.typeofPopUp = 1;
        this.GetNurseServices();
      }, error => {
        this.loader = false;
        console.log("Error with DisableNurseService", error);
        this.SharedService.insertexceptions(this.currentUrl, "DisableNurseService", error);
      }
    )
  }


  public enablenurse(id: any) {
    this.showPopup = 0;
    this.CommonService.EnableNurseService(id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 23;
        this.typeofPopUp = 1;
        this.GetNurseServices();
      }, error => {
        this.loader = false;
        console.log("Error With EnableNurseService", error);
        this.SharedService.insertexceptions(this.currentUrl, "EnableNurseService", error);
      }
    )
  }


  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


  public GetNurseServices() {

    
    if (this.nurseid != undefined) {
      
      this.CommonService.GetNurseServicesByIDWeb(this.languageid, 0).subscribe(
        data => {

          this.loader = false;
          this.nurseServicesList = data.filter(x => x.nurseID == this.nurseid);
        }, error => {
          this.loader = false;
          this.SharedService.insertexceptions(this.currentUrl, "GetNurseServicesByIDWeb", error);
          console.log("Error with GetNurseServicesByIDWeb", error);
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      
      this.CommonService.GetNurseServicesByIDWeb(this.languageid, 0).subscribe(
        data => {
          this.loader = false;
          this.nurseServicesList = data.filter(x => x.hospitalClinicID == this.hospitalclinicid);
          this.loader = false;
        }, error => {
          this.loader = false;
          this.SharedService.insertexceptions(this.currentUrl, "GetNurseServicesByIDWeb", error);
          console.log("Error with GetNurseServicesByIDWeb", error);
        }
      )
    }
    else {
      
      this.CommonService.GetNurseServicesByIDWeb(this.languageid, 0).subscribe(
        data => {
          this.loader = false;
          this.nurseServicesList = data;
          this.loader = false;
        }, error => {
          this.loader = false;
          this.SharedService.insertexceptions(this.currentUrl, "GetNurseServicesByIDWeb", error);
          console.log("Error with GetNurseServicesByIDWeb", error);
        }
      )

    }

  }



  edit(id: any) {

    location.href = "#/countrymanager/NurseServiceDetails/" + btoa(id);
  }
}
