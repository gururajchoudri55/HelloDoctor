import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Masters/Masterlabels.json';

@Component({
  selector: 'app-complaint-master-details',
  templateUrl: './complaint-master-details.component.html',
  styleUrls: ['./complaint-master-details.component.css']
})
export class ComplaintMasterDetailsComponent implements OnInit {
  languageid:any;
  departmentlist:any;
  departmentid:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  currentUrl:any;
  complaints:any;
  complaint:any;
  description:any;
  id:any;
  loader:boolean | undefined;
  showbit:any;
  labels:any;
  

  constructor(private MasterService:MasterService,private SharedService:SharedService, 
    private  ActivatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.showbit = 0;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.ActivatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.id=atob(this.id);
        this.showbit = 1;
        this.getcomplaintmaster();
      }
    }
    )

    this.getdepartmentmaster();
    this.departmentid="";

  }

  public getdepartmentmaster() {
    this.MasterService.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {
        this.loader=false;
        this.departmentlist = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDepartmentMasterByLanguageID",error);
      }
    )
  }

 //Get Complaint list

  public getcomplaintmaster() {
    this.MasterService.GetCompalintMasterLangID(this.languageid).subscribe(
      data => {
        this.complaints = data;
        var list = this.complaints.filter((x: { id: any; }) => x.id == this.id)
          this.departmentid=list[0].departmentID,
          this.complaint = list[0].name,
          this.description = list[0].description
         
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetCompalintMasterLangID",error);
      }
    )
  }

//To Get Department Details
  
  public GetDepartmentID(even:any) {
    this.departmentid = even.target.value;
  }

  //To Insert Details
  public insertdetails() {
    var entity = {
      'Name': this.complaint,
      'Description': this.description,
      'DepartmentID':this.departmentid
    }
    this.MasterService.InsertComplaintMaster(entity).subscribe(data => {
      this.showPopup=1;
      this.typeofPopUp=1;
      this.messageID=1;
        location.href = "#/Masters/ComplaintMaster";
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"InsertComplaintMaster",error);
    })
  }
   
   
  //Redirecting the Page
  cancel(){
    location.href = "#/Masters/ComplaintMaster";
  }

  

  //Update details 

  public updatedetails() {
    var entity = {
      'ID': this.id,
      'Name': this.complaint,
      'Description': this.description,
      'LanguageID': this.languageid,
      'DepartmentID':this.departmentid
    }
    this.MasterService.UpdateComplaintMaster(entity).subscribe(data => {
      let res = data;
        this.showPopup=1;
        this.messageID=34;
        this.typeofPopUp=1;
       location.href = "#/Masters/ComplaintMaster";
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"UpdateComplaintMaster",error);
    })
  }


}
