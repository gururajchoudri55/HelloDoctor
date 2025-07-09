import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/countrymanager/countrylabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';



@Component({
  selector: 'app-diagnosticdash',
  templateUrl: './diagnosticdash.component.html',
  styleUrls: ['./diagnosticdash.component.css']
})
export class DiagnosticdashComponent implements OnInit {


  constructor(private CommonService: CommonService,private SharedService:SharedService) { }
  term: any;
  hospitalClinicID: any;
  languageID: any;
  conutryManagerID: any;
  salesReperesntativeID: any;
  count: any;
  diagnosticList: any;
  p: number | undefined;
  loader: boolean | undefined;
  res: any;
  labels: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  currentUrl:any;
  meridionalid:any;
  showdelete:any;

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl=window.location.href;
    this.hospitalClinicID = sessionStorage.getItem('hospitalid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.conutryManagerID = sessionStorage.getItem('countrymanagerid');
    this.salesReperesntativeID = sessionStorage.getItem('salesrepresntativeid');
    this.meridionalid = sessionStorage.getItem('meridionalid');
    if (this.meridionalid == undefined) {
      this.showdelete = 0;
    }
    else {
      this.showdelete = 1;
    }
    this.getDiagnosticAdmin()
  }


  //export to excel
  fileName = 'Diagnostic List.xlsx';
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



  public getDiagnosticAdmin() {

    this.CommonService.GetDiagnosticForAdminByLanguageID(this.languageID).subscribe(
      data => {
        this.loader = false;
        this.diagnosticList = data;
        this.count = this.diagnosticList.length;
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticForAdminByLanguageID",error);
      }
    )
  }

  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  //Delete Diagnsotic Center

  public deletediagnosticcenter(id: any) {
    
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
        this.CommonService.DeleteDiagnosticCenter(id).subscribe(res => {
          let test = res;
          this.ngOnInit()
        },error=>{
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl,"DeleteDiagnosticCenter",error);
        })
     
      }
    })


  }


  edit(id: any) {
    location.href = "#/countrymanager/EditDiagnostic/" + btoa(id)
  }

  photoslist:any;

  public GetDiagnosticPhotos(id:number) {
    this.CommonService.GetDiagnosticCenterPhotosByID(id).subscribe(
      (data) => {
        this.photoslist = data;
      },
      (error) => {}
    );
  }
}
