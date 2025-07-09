import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/Pages/services/common.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../../Lables/WorkingDetails/workinglabels.json';

@Component({
  selector: 'app-nurse-service-details',
  templateUrl: './nurse-service-details.component.html',
  styleUrls: ['./nurse-service-details.component.css']
})
export class NurseServiceDetailsComponent implements OnInit {

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
  showdropdown: any;
  hospitalclinicid: any;
  currentUrl: any;
  labels:any;
  

  ngOnInit(): void {

    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.physioid = sessionStorage.getItem('nurseid');
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    if (this.physioid == undefined) {
      this.showdropdown = 1;
      this.physioid="";
    }
    else {
      this.showdropdown = 0;
    }
    this.user = sessionStorage.getItem('user');
    this.showbit = 0;
    this.activatedroute.params.subscribe(params => {
      this.loader = true;;
      this.id = params['id'];

      if (this.id == undefined) {
        
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        
        this.id=atob(this.id)
        this.showbit = 1;
        this.GetPhysioServices()
      }
    }
    )


    if (this.hospitalclinicid != undefined) {
      this.CommonService.GetNurseListForRegisteringLogin(this.languageid).subscribe(
        data => {

          this.nurselist = data.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.loader = false;
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetNurseListForRegisteringLogin", error);
        }
      )
    }
    else {
      this.CommonService.GetNurseListForRegisteringLogin(this.languageid).subscribe(
        data => {
          this.loader = false;
          this.nurselist = data;

        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetNurseListForRegisteringLogin", error);
        }
      )
    }

  
  }




  public GetPhysioID(even: any) {
    this.physioid = even.target.value;
  }



  public GetPhysioServices() {
    
    this.CommonService.GetNurseServicesByIDWeb(this.languageid, 1).subscribe(
      data => {
        
        this.loader = false;
        var list = data.filter(x => x.id == this.id);
        this.physioid = list[0].nurseID,
          this.servicename = list[0].serviceName,
          this.description = list[0].serviceDescription,
          this.charges = list[0].serviceCharges
        
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetNurseServicesByIDWeb", error);
      }
    )
  }
  physioid: any;
  servicename: any;
  charges: any;
  description: any;
  qwerty: any = [];
  idcount: any;
  tablecount: any;

  public insertdetails() {
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
    this.showPopup = 0;
    for (let i = 0; i < this.qwerty.length; i++) {
      var entity = {
        'NurseID': this.physioid,
        'ServiceName': this.qwerty[i].ServiceName,
        'ServiceDescription': this.qwerty[i].ServiceDescription,
        'ServiceCharges': this.qwerty[i].ServiceCharges,
        'LanguageID': this.languageid
      }
      this.CommonService.InsertNurseServicesWeb(entity).subscribe(data => {
        if (data != 0) {
          this.showPopup = 1;
          this.messageID = 1;
          this.typeofPopUp = 1;
          location.href = "#/countrymanager/NurseService"
        }

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "InsertNurseServicesWeb", error);
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
      'NurseID': this.physioid,
      'ServiceName': this.servicename,
      'ServiceDescription': this.description,
      'ServiceCharges': this.charges,
      'LanguageID': this.languageid
    }
    this.CommonService.UpdateNurseServicesWeb(entity).subscribe(data => {
      this.showPopup = 1;
      this.messageID = 1;
      this.typeofPopUp = 1;
      location.href = "#/countrymanager/NurseService"
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "UpdateNurseServicesWeb", error);
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
