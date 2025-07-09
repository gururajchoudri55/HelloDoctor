import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../../Lables/WorkingDetails/workinglabels.json';

@Component({
  selector: 'app-midwife-service-details',
  templateUrl: './midwife-service-details.component.html',
  styleUrls: ['./midwife-service-details.component.css']
})
export class MidwifeServiceDetailsComponent implements OnInit {

  constructor(private CommonService: CommonService, private SharedService: SharedService, private activatedroute: ActivatedRoute) { }
  loader: boolean | undefined;

  showPopup: any;
  typeofPopUp: any;
  messageID: any;
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
  midwifeid: any;
  showDropdown: any;
  hospitalclinicid: any;
  servicename: any;
  charges: any;
  description: any;
  qwerty: any = [];
  idcount: any;
  tablecount: any;
  currentUrl: any;
  labels: any;



  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.midwifeid = sessionStorage.getItem('midwifeid');
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    
    this.user = sessionStorage.getItem('user');
    if (this.midwifeid == undefined) {
      this.showDropdown = 1;
      this.midwifeid = 0;
    }
    else {
      this.showDropdown = 0;
    }

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


    if (this.hospitalclinicid != undefined) {
      this.CommonService.GetMidWivesRegistrationByLanguageID(this.languageid).subscribe(
        data => {
          this.loader = false;
          this.nurselist = data.filter(x => x.hospitalClinicID == this.hospitalclinicid);

        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetNurseHospitalDetailsNurses", error);
        }
      )
    }
    else {
      this.CommonService.GetMidWivesRegistrationByLanguageID(this.languageid).subscribe(
        data => {

          this.nurselist = data;
          this.loader = false;
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetNurseHospitalDetailsNurses", error);
        }
      )
    }



  }


  public GetPhysioID(even: any) {
    this.midwifeid = even.target.value;
  }



  public GetPhysioServices() {
    
    this.CommonService.GetMidWifeServicesWeb(this.midwifeid, 1).subscribe(
      data => {
        
        var list = data.filter(x => x.id == this.id);
          this.midwifeid= list[0].midWifeID,
          this.servicename = list[0].serviceName,
          this.description = list[0].serviceDescription,
          this.charges = list[0].serviceCharges
        
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetMidWifeServicesWeb", error);
      }
    )
  }



  public insertdetails() {
    var entity = {
      'Sno': this.idcount,
      'PhysioID': this.midwifeid,
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
    this.showPopup = 0;
    for (let i = 0; i < this.qwerty.length; i++) {
      var entity = {
        'MidWifeID': this.midwifeid,
        'ServiceName': this.qwerty[i].ServiceName,
        'ServiceDescription': this.qwerty[i].ServiceDescription,
        'ServiceCharges': this.qwerty[i].ServiceCharges,
        'LanguageID': this.languageid
      }
      this.CommonService.InsertMidWifeServicesWeb(entity).subscribe(data => {
        if (data != 0) {
          this.showPopup = 1;
          this.messageID = 1;
          this.typeofPopUp = 1;
          location.href = "#/countrymanager/MidwifeService";
        }

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "InsertMidWifeServicesWeb", error);
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
      'MidWifeID': this.midwifeid,
      'ServiceName': this.servicename,
      'ServiceDescription': this.description,
      'ServiceCharges': this.charges,
      'LanguageID': this.languageid
    }
    this.CommonService.UpdateMidWifeServicesWeb(entity).subscribe(data => {
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      location.href = "#/countrymanager/MidwifeService"

    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"UpdateMidWifeServicesWeb",error);
    })
  }
}
