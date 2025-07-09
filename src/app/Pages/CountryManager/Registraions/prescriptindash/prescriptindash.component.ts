import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import Labels from '../../../Lables/countrymanager/countrylabels.json';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/Pages/services/shared.service';
@Component({
  selector: 'app-prescriptindash',
  templateUrl: './prescriptindash.component.html',
  styleUrls: ['./prescriptindash.component.css']
})
export class PrescriptindashComponent implements OnInit {

  constructor(private CommonService:CommonService,private SharedService:SharedService) { }

  public languageid: any;
  public labels: any;
  public localdoclist: any;
  public term: any;
  p: number = 1;
  public count: any;
  public labels1: any;

  public countryid: any;
  public citylist: any;
  public cityid: any;
  public dummlist: any;
  public arealist: any;
  public areaid: any;
  public countrylist: any;
  public countrymanaerid: any;
  public showexportbutton: any;
  loader:boolean | undefined
  messageID:any;
  typeofPopUp:any;
  showPopup:any;
  meridionalid: any;
  showdelete:any;
  currentURL:any
  ngOnInit(): void {
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.currentURL = window.location.href;

    this.countrymanaerid = sessionStorage.getItem('countrymanagerid');
    this.meridionalid = sessionStorage.getItem('meridionalid');

    if (this.countrymanaerid != undefined) {
      this.showexportbutton = 1;
    }
   
    if(this.meridionalid==undefined)
    {
      this.showdelete=0;
    }
    else
    {
      this.showdelete=1;
    }


  
    this.getlocaldoctors();

    this.countryid = 0;
    this.cityid = 0
    this.getlocaldoctors()
  }




  public getlocaldoctors() {
    this.CommonService.GetLocalDoctorRegistration(this.languageid).subscribe(
      data => {

        this.localdoclist = data;
        this.dummlist = this.localdoclist
        this.count = this.localdoclist.length
      }, error => {
      }
    )
  }



   //export to excel
   fileName = 'doctorlist.xlsx';
   exportexcel(): void {
     /* table id is passed over here */
     let element = document.getElementById('download');
     
     const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
     
 
     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
     /* save to file */
     XLSX.writeFile(wb, this.fileName, { password: "S3cret!" });
   }
 


   
  //delete doctor
  public deletedoctorregistration(id: any) {
    
    Swal.fire({
      title: this.labels.title,
      text: this.labels.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.labels.confirmButtonText,
      cancelButtonText: this.labels.cancelButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        this.CommonService.DeleteLocalDoctorRegistration(id).subscribe(res => {
          let test = res;
          this.ngOnInit()
        })
        this.showPopup = 1;
        this.messageID = 75,
          this.typeofPopUp = 1;
      }
    },error=>{
      this.loader=false;
      this.SharedService.insertexceptions(this.currentURL,"DeleteDoctorRegistration",error);
    })
  }

  edit(id:any){
    location.href="#/countrymanager/addprescriptionverifier/" + btoa(id);
  }



}
