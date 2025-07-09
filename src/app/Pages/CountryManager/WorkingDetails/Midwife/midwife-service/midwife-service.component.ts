import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import Labels from '../../../../Lables/WorkingDetails/workinglabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-midwife-service',
  templateUrl: './midwife-service.component.html',
  styleUrls: ['./midwife-service.component.css']
})
export class MidwifeServiceComponent implements OnInit {
  loader: boolean | undefined;
  languageid: any;
  midwifeid: any;
  hospitalclinicid: any;
  showDropdown: any;
  showPopup: any;
  nurseServicesList: any;
  messageID: any;
  typeofPopUp: any;
  p: any;
  search: any;
  labels:any;
  currentUrl:any;

  
  constructor(private CommonService: CommonService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.midwifeid = sessionStorage.getItem('midwifeid');
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    if (this.midwifeid == undefined) {
      this.showDropdown = 1;
    }
    else {
      this.showDropdown = 0;
    }
    this.GetNurseServices()
  }


  public GetNurseServices() {
    
    if (this.midwifeid != undefined) {
      this.CommonService.GetMidWifeServicesWeb(this.midwifeid, this.languageid).subscribe(
        data => {
          
          this.loader = false;
          this.nurseServicesList = data.filter(x => x.midWifeID == this.midwifeid);
        }, error => {
          console.log("Error With GetMidWifeServicesWeb", error);
          this.SharedService.insertexceptions(this.currentUrl,"GetMidWifeServicesWeb",error);
        }
      )

    }
    else if (this.hospitalclinicid != undefined) {
      this.CommonService.GetMidWifeServicesWeb(this.midwifeid, this.languageid).subscribe(
        data => {
          
          this.loader = false;
          this.nurseServicesList = data.filter(x => x.hospitalClinicID == this.hospitalclinicid);
        }, error => {
          console.log("Error With GetMidWifeServicesWeb", error);
          this.SharedService.insertexceptions(this.currentUrl,"GetMidWifeServicesWeb",error);
        }
      )

    }

    else {
      this.CommonService.GetMidWifeServicesWeb(this.midwifeid, this.languageid).subscribe(
        data => {
          
          this.loader = false;
          this.nurseServicesList = data;
        }, error => {
          console.log("Error with GetMidWifeServicesWeb", error);
          this.SharedService.insertexceptions(this.currentUrl,"GetMidWifeServicesWeb",error);
        }
      )
    }

  }



  public DeleteMidwife(id: any) {
    this.showPopup = 0;
    this.CommonService.DisableMidWifeService(id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 24;
        this.typeofPopUp = 1;
        this.GetNurseServices();
      }, error => {
        console.log("Error with DisableMidWifeService", error);
        this.SharedService.insertexceptions(this.currentUrl,"DisableMidWifeService",error);
      }
    )
  }


  public EnableMidwife(id: any) {
    this.showPopup = 0;
    this.CommonService.EnableMidWifeService(id).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 23;
        this.typeofPopUp = 1;
        this.GetNurseServices();
      }, error => {
        console.log("Error With EnableMidWifeService", error);
        this.SharedService.insertexceptions(this.currentUrl,"EnableMidWifeService",error);
      }
    )
  }

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


  edit(id: any) {

    location.href = "#/countrymanager/MidwifeServiceDetails/" + btoa(id);
  }



}
