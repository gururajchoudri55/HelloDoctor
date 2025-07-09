import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Masters/Masterlabels.json';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {
  categoryid: any;
  loader: boolean | undefined;
  attachmentsurl: any = [];
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  departmentname: any;
  description: any;
  folderName: any;
  languageid: any;
  id: any;
  showbit: any;
  departmentlist: any;
  departmentimage: any;
  currentUrl: any;
  labels:any;
  homescreenName:any;
  HSNOrder:any;
  constructor(private SharedService: SharedService, private MasterService: MasterService,
    private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.showbit = 0;
    this.ActivatedRoute.params.subscribe(params => {
      this.id =params['id'];
      
      if (this.id == undefined||null) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.id=atob(this.id);
        this.showbit = 1;
        this.getdepartmentmaster();
      }
    }
    )

  }




  public getdepartmentmaster() {
    this.MasterService.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {
        this.departmentlist = data;
        console.log("departmnet",this.departmentlist)
        var list = this.departmentlist.filter((x: { id: any; }) => x.id == this.id)
        this.departmentname = list[0].departmentname,
          this.description = list[0].description,
          this.attachmentsurl[0]  = list[0].departmentImage,
          this.departmentimage = list[0].deptphoto,
          this.categoryid = list[0].categoryID,
          this.homescreenName=list[0].homescreenName,
          this.HSNOrder=list[0].hsnOrder
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetDepartmentMasterByLanguageID", error);
      }
    )
  }


  files: File[] = [];
  onSelect(event: any) {
    this.attachmentsurl.length = 0;
    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadsAttchments();
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.attachmentsurl.splice(this.files.indexOf(event), 1);

  }

  //Get Category ID
  GetCategoryID(even: any) {
    this.categoryid = even.target.value;
  }


  //To Upload Attachments 
  uploadsAttchments() {
    this.folderName = "Images/Department"
    this.MasterService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
      this.attachmentsurl.push(res);
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("Department", this.attachmentsurl);
      this.loader = false;
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"AllFilesUploads",error);
    })
  }


  //Insert Details
  public insertdetails() {
    if (this.attachmentsurl == null && this.attachmentsurl.length == 0 && this.attachmentsurl == undefined) {
      this.showPopup = 1;
      this.messageID = 41;
      this.typeofPopUp = 2;
    }
    else {
      var entity = {
        'Departmentname': this.departmentname,
        'Description': this.description,
        'DepartmentImage': this.attachmentsurl[0],
        'CategoryID': this.categoryid,
        "HomescreenName":this.homescreenName,
        'HSNOrder':this.HSNOrder
      }
      this.MasterService.InsertDepartmentMasterWeb(entity).subscribe(data => {
        this.showPopup = 1;
        this.messageID = 1;
        this.typeofPopUp = 1;

        location.href = "#/Masters/DepartmentMaster";
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"InsertDepartmentMasterWeb",error);
      })
    }
  }


  //Update Details
  public updatedetails() {
    
    var entity = {
      'ID': this.id,
      'Departmentname': this.departmentname,
      'Description': this.description,
      'DepartmentImage': this.attachmentsurl[0],
      'LanguageID': this.languageid,
      'CategoryID': this.categoryid,
      "HomescreenName":this.homescreenName,
      'HSNOrder':this.HSNOrder
    }
    this.MasterService.UpdateDepartmentMaster_Web(entity).subscribe(data => {
      let res = data;
      if(res==0){
        this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      location.href = "#/Masters/DepartmentMaster";
      }
      else{
        this.showPopup = 1;
        this.messageID = 93;
        this.typeofPopUp = 2;
      }
      
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"UpdateDepartmentMaster_Web",error);
    })
  }

  cancel(){
    location.href = "#/Masters/DepartmentMaster";
  }




}
