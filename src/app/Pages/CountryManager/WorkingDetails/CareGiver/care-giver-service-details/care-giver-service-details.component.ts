import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../../../Pages/Lables/WorkingDetails/workinglabels.json'

@Component({
  selector: 'app-care-giver-service-details',
  templateUrl: './care-giver-service-details.component.html',
  styleUrls: ['./care-giver-service-details.component.css']
})
export class CareGiverServiceDetailsComponent implements OnInit {
  loader: boolean | undefined;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  constructor(private CommonService: CommonService, private SharedService: SharedService, private activatedroute: ActivatedRoute) { }
  public languageid: any;
  public countryname: any;
  public id: any;
  public countrylist: any;
  public showbit: any;
  dummnurselist: any;
  nurselist: any;
  physiolist: any;
  term: any;
  user: any;
  dummid: any;
  showDropdown: any;
  physioid: any;
  servicename: any;
  charges: any;
  description: any;
  qwerty: any = [];
  idcount: any;
  tablecount: any;
  currentUrl:any;
  labels:any;


  ngOnInit(): void {
    this.physioid=""
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.physioid = sessionStorage.getItem('physioid');
    this.dummid = sessionStorage.getItem('physioid');

    if (this.dummid == undefined) {
      this.showDropdown = 1;
    }
    else {
      this.showDropdown = 2;
    }
    this.user = sessionStorage.getItem('user');
   this.showbit = 0;
    this.activatedroute.params.subscribe(params => {

      this.id = atob(params['id']);

      if (this.id == undefined) {
        
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        
        this.showbit = 1;
        this.GetPhysioServices()
      }
    }
    )

    this.CommonService.GetPhysiotherapyRegistringLogins(this.languageid).subscribe(
      data => {
        this.physiolist = data;

        this.loader = false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetPhysiotherapyRegistringLogins", error);
      }
    )
    this.physioid="";
  }
  public GetPhysioID(even: any) {
    this.physioid = even.target.value;
  }





  public GetPhysioServices() {
    
    this.CommonService.GetPhysioServicesByIDWeb(this.languageid, 1).subscribe(
      data => {
        
        var list = data.filter(x => x.id == this.id);
        this.physioid = list[0].physioID,
          this.servicename = list[0].serviceName,
          this.description = list[0].serviceDescription,
          this.charges = list[0].serviceCharges
        
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetPhysioServicesByIDWeb", error);
      }
    )
  }


  public insertdetails() {
    this.showPopup = 0
    var entity = {
      'Sno': this.idcount,
      'PhysioID': this.physioid,
      'ServiceName': this.servicename,
      'ServiceDescription': this.description,
      'ServiceCharges': this.charges,
      'LanguageID': this.languageid
    }
    this.qwerty.push(entity);
    this.idcount = this.idcount + 1;
    this.tablecount = 1;
    this.servicename = "";
    this.description = "";
    this.charges = "";
  }


  public SaveDetails() {
    this.showPopup = 0
    for (let i = 0; i < this.qwerty.length; i++) {
      var entity = {
        'PhysioID': this.physioid,
        'ServiceName': this.qwerty[i].ServiceName,
        'ServiceDescription': this.qwerty[i].ServiceDescription,
        'ServiceCharges': this.qwerty[i].ServiceCharges,
        'LanguageID': this.languageid
      }
      this.CommonService.InsertPhysioServicesMobileWeb(entity).subscribe(data => {
        if (data != 0) {

          this.showPopup = 1;
          this.messageID = 1;
          this.typeofPopUp = 1;
          location.href = "#/countrymanager/CareGiverServices";


        }

      },error=>{
        this.SharedService.insertexceptions(this.currentUrl, "InsertPhysioServicesMobileWeb", error);
      })
    }

  }

  public delete(Sno: any) {

    for (let i = 0; i < this.qwerty.length; i++) {
      if (Sno == this.qwerty[i].Sno) {
        this.qwerty.splice(i, 1);
      }
    }
    if (this.qwerty.length == 0) {
      this.tablecount = 0;
    }

  }

  public updatedetails() {
    this.showPopup = 0;
    
    var entity = {
      'ID': this.id,
      'PhysioID': this.physioid,
      'ServiceName': this.servicename,
      'ServiceDescription': this.description,
      'ServiceCharges': this.charges,
      'LanguageID': this.languageid
    }
    this.CommonService.UpdatePhysioServicesMobileWeb(entity).subscribe(data => {
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      location.href = "#/countrymanager/CareGiverServices"

    },error=>{
      this.SharedService.insertexceptions(this.currentUrl, "UpdatePhysioServicesMobileWeb", error);
    })


  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
