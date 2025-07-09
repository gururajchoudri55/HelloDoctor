import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Masters/Masterlabels.json';

@Component({
  selector: 'app-service-master-details',
  templateUrl: './service-master-details.component.html',
  styleUrls: ['./service-master-details.component.css']
})
export class ServiceMasterDetailsComponent implements OnInit {
 
  languageid:any;
  departmentlist:any;
  departmentid:any;
  servicetypeid:any;
  servicelist:any;
  id:any;
  servicename:any;
  description:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  loader:boolean | undefined;
  currentUrl:any;
  showbit:any;
  labels:any;



  constructor(private SharedService:SharedService,private MasterService:MasterService,
    private ActivatedRoute:ActivatedRoute) { }

   ngOnInit(): void {
    this.currentUrl=window.location.href;
    this.showbit = 0;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.ActivatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id == undefined||null) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.id=atob(this.id);
        this.showbit = 1;
        this.GetServicemaster();
      }
    }
    )
    this.getdepartmentmaster();
    this.GetServicemaster();
    this.departmentid=0;;
    this.servicetypeid=0;
  }

  public getdepartmentmaster() {
   
    this.MasterService.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {    
        this.departmentlist = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDepartmentMasterByLanguageID",error);
      }
    )
  }


  public GetDepartmentID(even:any) {
    this.departmentid = even.target.value;
  }


  public GetServicetypeID(even:any) {  
    this.servicetypeid = even.target.value;
  }

  public GetServicemaster() {
    this.MasterService.GetServiceMasterWeb(this.languageid).subscribe(
      data => {   
        this.servicelist = data;
        var list = this.servicelist.filter((x: { id: any; }) => x.id == this.id)
        this.departmentid = list[0].departmentID,
        this.servicetypeid = list[0].typeID,
          this.servicename = list[0].serviceName
        this.description = list[0].description
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetServiceMasterWeb",error);
      }
    )
  }



  public insertdetails() {
    this.showPopup=0;
    if(this.departmentid==0||this.departmentid==undefined ||this.servicetypeid==0||this.servicetypeid==undefined)
    { 
      this.showPopup=1;
      this.typeofPopUp=2;
      this.messageID=5;   
    }
    else{
      var entity = {
        'DepartmentID': this.departmentid,
        'ServiceName': this.servicename,
        'Description': this.description,
        'LanguageID': 1,
        'TypeID':this.servicetypeid
      }
      this.MasterService.InsertServiceMasterWeb(entity).subscribe(data => {
        this.showPopup=1;
        this.typeofPopUp=1;
        this.messageID=1;
          location.href = "#/Masters/ServiceMaster"; 
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"InsertServiceMasterWeb",error);
      })
    }
  }
  
  public updatedetails() { 
    this.showPopup=0;
    var entity = {
      'ID': this.id,
      'DepartmentID': this.departmentid,
      'ServiceName': this.servicename,
      'Description': this.description,
      'LanguageID': this.languageid,
      'TypeID':this.servicetypeid
    }
    this.MasterService.UpdateServiceMaster_Web(entity).subscribe(data => {
      let res = data;
     this.showPopup=1;
     this.messageID=34;
     this.typeofPopUp=1;
     location.href = "#/Masters/ServiceMaster"; 
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"UpdateServiceMaster_Web",error);
    })
  }





}
