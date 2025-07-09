import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import Labels from '../../Lables/countrymanager/countrylabels.json';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-physiotherapist',
  templateUrl: './physiotherapist.component.html',
  styleUrls: ['./physiotherapist.component.css']
})
export class PhysiotherapistComponent implements OnInit {

  constructor(private CommonService: CommonService,private SharedService:SharedService) { }

  term: any;
  hospitalClinicID: any;
  countryManagerID: any;
  salesRepresentativeID: any;
  meridionalID: any;
  languageID: any;
  pshysioList: any;
  count: any;
  filterdList: any;
  p: number | undefined;
  loader:boolean | undefined;
  labels:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  currentUrl:any;
  showdelete:any;
 


  ngOnInit(): void {
    this.loader = true;
    this.currentUrl=window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.hospitalClinicID = sessionStorage.getItem('hospitalid');
    this.countryManagerID = sessionStorage.getItem('countrymanagerid');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.salesRepresentativeID = sessionStorage.getItem('salesrepresntativeid');
    this.meridionalID = sessionStorage.getItem('meridionalid');
 
    if (this.meridionalID == undefined) {
      this.showdelete = 0;
    }
    else {
      this.showdelete = 1;
    }

    if (this.hospitalClinicID != undefined) {
      this.CommonService.GetPhysiotherapyRegistrationAdminByLanguageID(this.languageID).subscribe(
        data => {
          this.loader = false;
          this.pshysioList = data.filter(x => x.hospitalClinicID == this.hospitalClinicID)
          this.filterdList = data;
          this.count = this.pshysioList.length
        }, error => {
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl,"GetPhysiotherapyRegistrationAdminByLanguageID",error);
        }
      )
    }
    else {
      this.getPhysioList()
    }
  }

  getPhysioList() {
    this.CommonService.GetPhysiotherapyRegistrationAdminByLanguageID(this.languageID).subscribe(
      data => {
        this.loader = false;
        this.pshysioList = data;
        this.filterdList = data;
        this.count = this.pshysioList.length
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetPhysiotherapyRegistrationAdminByLanguageID",error);
      }
    )
  }

  //export to excel
  fileName = 'Physiotherapist List.xlsx';
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


  typeid: any;

  getTypeID(even: any) {
    this.typeid = even.target.value;
    
    if (even.target.value != '613' && even.target.value != '0') {
      this.pshysioList = this.filterdList.filter((x: { typeID: any; hospitalClinicID: string; }) => x.typeID == this.typeid && x.hospitalClinicID != '613');
      this.count=this.pshysioList.length;
      
    }
    else if (even.target.value == '613') {
      this.pshysioList = this.filterdList.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.typeid);
      this.count=this.pshysioList.length;
      
    }
    else {
      this.getPhysioList();
    }
  }



  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  //Delete Physiotherapist
  public deletephysio(id: any) {
    
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
        this.CommonService.DeletePhysiotherapyRegistrationAdmin(id).subscribe(res => {
          let test = res;
          this.ngOnInit()
        })
      this.showPopup=1;
      this.messageID=75;
      this.typeofPopUp=1;
      }
    },error=>{
      this.loader=false
      this.SharedService.insertexceptions(this.currentUrl,"DeletePhysiotherapyRegistrationAdmin",error);
    })


  }


  edit(id: any) {
    location.href = "#/countrymanager/EditPhysio/" + btoa(id)
  }




}
