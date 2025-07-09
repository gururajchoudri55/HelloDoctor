import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/countrymanager/countrylabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-midwife',
  templateUrl: './midwife.component.html',
  styleUrls: ['./midwife.component.css']
})
export class MidwifeComponent implements OnInit {

  constructor(private CommonService: CommonService,private SharedService:SharedService) { }
  hospitalClinicID: any;
  countryManaerID: any;
  salesRepresntiveID: any;
  meridionalID: any;
  languageID: any;
  midWifeList: any;
  count: any;
  filteredMidwifeList: any;
  term: any;
  p: number | undefined;
  loader: boolean | undefined;
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
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];

    this.hospitalClinicID = sessionStorage.getItem('hospitalid');
    this.countryManaerID = sessionStorage.getItem('countrymanagerid');

    this.salesRepresntiveID = sessionStorage.getItem('salesrepresntativeid');
    this.meridionalID = sessionStorage.getItem('meridionalid');
    if (this.meridionalID == undefined) {
      this.showdelete = 0;
    }
    else {
      this.showdelete = 1;
    }

    if (this.hospitalClinicID == undefined) {
      this.GetMidWivesRegistration();

    }
    if (this.hospitalClinicID != undefined) {
      this.CommonService.GetMidWivesRegistrationByLanguageID(this.languageID).subscribe(
        data => {
          this.loader = false;
          this.midWifeList = data.filter(x => x.hospitalClinicID == this.hospitalClinicID);
          this.filteredMidwifeList = data;
          this.count = this.midWifeList.length;
        }, error => {
          this.loader = false;
          this.SharedService.insertexceptions(this.currentUrl,"GetMidWivesRegistrationByLanguageID",error);
        }
      )
    }
  }

  //export to excel
  fileName = 'Midwife List.xlsx';
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




  public GetMidWivesRegistration() {
    this.CommonService.GetMidWivesRegistrationByLanguageID(this.languageID).subscribe(
      data => {
        this.loader = false;
        this.midWifeList = data;
        this.filteredMidwifeList = data;

        this.count = this.midWifeList.length;
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl,"GetMidWivesRegistrationByLanguageID",error);
      }
    )
  }




  typeid: any;

  getTypeID(even: any) {
    this.typeid = even.target.value;
    
    if (even.target.value != '614' && even.target.value != '0') {
      this.midWifeList = this.filteredMidwifeList.filter((x: { typeID: any; hospitalClinicID: string; }) => x.typeID == this.typeid && x.hospitalClinicID != '614')
      
    }
    else if (even.target.value == '614') {
      this.midWifeList = this.filteredMidwifeList.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.typeid)
      
    }
    else {
      this.GetMidWivesRegistration()
    }
  }


  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


  //Delete Midwife
  public DeleteMidWivesRegistration(id: any) {
    
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
        this.CommonService.DeleteMidWivesRegistration(id).subscribe(res => {
          let test = res;
          this.ngOnInit()
        })
         this.messageID=74;
         this.typeofPopUp=1;
         this.showPopup=1;
      }
    },error=>{
      this.loader=false;
      this.SharedService.insertexceptions(this.currentUrl,"DeleteMidWivesRegistration",error);
    })


  }

  edit(id: any) {
    location.href = "#/countrymanager/EditMidwife/" + btoa(id)
  }

}
