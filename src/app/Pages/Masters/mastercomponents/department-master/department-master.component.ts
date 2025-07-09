import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/Masters/Masterlabels.json';

@Component({
  selector: 'app-department-master',
  templateUrl: './department-master.component.html',
  styleUrls: ['./department-master.component.css']
})
export class DepartmentMasterComponent implements OnInit {
  languageid:any;
  loader:boolean | undefined;
  currentUrl:any;
  departmentList:any;
  search:any;
  count:any;
  p:any;
  labels:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;

  
  constructor(private MasterService:MasterService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.currentUrl=window.location.href;
    this.loader=true;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.getdepartmentmaster();
  }

  public getdepartmentmaster() {
    this.MasterService.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {
        this.loader=false;
        this.departmentList = data;
        this.count=this.departmentList.length;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDepartmentMasterByLanguageID",error);
      }
    )
  }

     //Delete Department
     public DeleteDepartmentMaster(id: any) {
       this.showPopup=0;
      
      Swal.fire({
        title:this.labels.title,
        text:this.labels.text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.labels.confirmButtonText,
        cancelButtonText:this.labels.cancelButtonText
      }).then((result) => {
        if (result.isConfirmed) {
          this.MasterService.DeleteDepartmentMaster(id).subscribe(res => {
            let test = res;
            this.ngOnInit();
          })
            this.showPopup=1;
            this.messageID=75;
            this.typeofPopUp=1;
        }
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"DeleteDepartmentMaster",error);
      })
    }

      //Pagination
  public pageChanged(even:any) {

    let fgdgfgd = even;
    this.p = even;
  }
 

  //Edit 
  edit(id:any){
    location.href="#/Masters/DepartmentDetails/" + btoa(id);
  }

  public UpdateEnable(list:any) {
    
    this.showPopup=0;

    if (list.enabled == 0) {
      
      this.MasterService.UpdateDepartmentMasterEnable(1, list.id).subscribe(data => {
        this.showPopup=1;
       this.messageID=34;
       this.typeofPopUp=1
        this.getdepartmentmaster()
      })
    }
    else if (list.enabled == 1) {
      
      this.MasterService.UpdateDepartmentMasterEnable(2, list.id).subscribe(data => {
        this.showPopup=1;
        this.messageID=34;
        this.typeofPopUp=1
        this.getdepartmentmaster()
      })
    }
    else
    {
      Swal.fire("Can Not Check More Than 8")
      this.getdepartmentmaster()
    }

  }


  disable(id:any){
    ;
    this.MasterService.UpdateDepartmentHomescreenEnable(2, id).subscribe(data => {
      this.showPopup=1;
     this.messageID=34;
     this.typeofPopUp=1
      this.getdepartmentmaster()
    })
  }
  enable(id:any){      
    this.MasterService.UpdateDepartmentHomescreenEnable(1, id).subscribe(data => {
      this.showPopup=1;
      this.messageID=34;
      this.typeofPopUp=1
      this.getdepartmentmaster()
    })
  }

}
