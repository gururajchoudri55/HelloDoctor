import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import Labels from '../../Lables/countrymanager/countrylabels.json';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {

  constructor(private CommonService: CommonService,private SharedService:SharedService) { }
  hospitalClinicID: any;
  countryManaerID: any;
  salesRepresntiveID: any;
  meridionalID: any;
  languageID: any;
  loader: boolean | undefined
  nurseList: any;
  count: any;
  filteredNurseList: any;
  term: any;
  p: number | undefined;
  labels:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  currentUrl:any;
  





  ngOnInit(): void {
    this.loader = true;
    this.currentUrl=window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.hospitalClinicID = sessionStorage.getItem('hospitalid');
    this.countryManaerID = sessionStorage.getItem('countrymanagerid');
    this.salesRepresntiveID = sessionStorage.getItem('salesrepresntativeid');
    this.meridionalID = sessionStorage.getItem('meridionalid');

    if (this.hospitalClinicID == undefined) {
      this.getnurselist();
      
    }
    if (this.hospitalClinicID != undefined) {
      this.CommonService.GetNurseRegistrationAdminByLanguageID(this.languageID).subscribe(
        data => {
          
          this.loader = false;
          this.nurseList = data.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.hospitalClinicID);
          this.filteredNurseList = data;
          this.count = this.nurseList.length
        }, error => {
          this.loader = false;
          this.SharedService.insertexceptions(this.currentUrl,"GetNurseRegistrationAdminByLanguageID",error);
        }
      )
    }
  }

  //export to excel
  fileName = 'Nurselist.xlsx';
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('download');
    
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }


  public getnurselist() {
    this.CommonService.GetNurseRegistrationAdminByLanguageID(this.languageID).subscribe(
      data => {
        this.loader = false;
        this.nurseList = data;
        this.count = this.nurseList.length
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl,"GetNurseRegistrationAdminByLanguageID",error);
      }
    )
  }



  typeid: any;

  getTypeID(even: any) {
    this.typeid = even.target.value;
    
    if (even.target.value != '612' && even.target.value != '0') {
      this.nurseList = this.filteredNurseList.filter((x: { typeID: any; hospitalClinicID: string; }) => x.typeID == this.typeid && x.hospitalClinicID != '612');
      this.count=this.nurseList.length;
      
    }
    else if (even.target.value == '612') {
      this.nurseList = this.filteredNurseList.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.typeid);
      this.count=this.nurseList.length;
      
    }
    else {
      this.getnurselist()
    }
  }


  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  //Delete Nurse

  public deletenurse(id: any) {
    
    Swal.fire({
      title:this.labels.title,
      text:this.labels.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText:this.labels.confirmButtonText,
      cancelButtonText:this.labels.cancelButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        this.CommonService.DeleteNurseRegistration(id).subscribe(res => {
          let test = res;
          this.ngOnInit()
        })
           this.showPopup=1;
           this.messageID=75;
           this.typeofPopUp=1;
      }
    },error=>{
      this.loader=false;
      this.SharedService.insertexceptions(this.currentUrl,"DeleteNurseRegistration",error);
    })


  }




  edit(id: any) {
    location.href = "#/countrymanager/EditNurse/" + btoa(id)
  }

}
