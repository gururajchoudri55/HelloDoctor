import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { CommonService } from 'src/app/Pages/services/common.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Report/reportlabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-total-diagnostic-reports',
  templateUrl: './total-diagnostic-reports.component.html',
  styleUrls: ['./total-diagnostic-reports.component.css']
})
export class TotalDiagnosticReportsComponent implements OnInit {
  diagnosticcenterid:any;
  Approvelist:any;
  dummlist:any;
  startdate:any;
  enddate:any;
  bsRangeValue:any;
  diagnosticid:any;
  languageid:any;
  diagnosticlist:any;
  showdrop:any;
  search:any;
  p:any;
  diffid:any;
  labels:any;
  loader:boolean | undefined;
  currentUrl:any;

  constructor(private CommonService:CommonService,private ActivatedRoute:ActivatedRoute,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.diagnosticid = sessionStorage.getItem('diagnosticid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.startdate=    sessionStorage.getItem("startdate");
    this.enddate=sessionStorage.getItem("enddate")

    this.ActivatedRoute.params.subscribe(params => {
      this.diffid = params['id']
      if(this.diffid==undefined)
      {
        this.showdrop=0;
      }
      else
      {
        this.showdrop=1;
      }   
    }
    )
    // if (this.diffid == undefined) {
    //   this.GetApprovelist()
    // }
    // else {

      this.CommonService.GetDiagnosticAppointmentsByApprovedReportsWeb(this.startdate, this.enddate, this.languageid).subscribe(
        data => {
          this.Approvelist = data;
          this.dummlist = this.Approvelist
          this.count = this.Approvelist.length
        }, error => {
           this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticAppointmentsByApprovedReportsWeb",error);
        }
      )
    // }
    var date = new Date();
    this.startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var start = new Date(date.getFullYear(), date.getMonth(), 1);
    var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);

    const format1 = 'yyyy-MM-dd';
    const locale1 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale1);

    sessionStorage.setItem('startdate',this.startdate);
    sessionStorage.setItem('enddate',this.enddate);

    this.bsRangeValue = [start, end];
    this.getdiagnosticforadmin()
        
  }


  public GetDiagnosticcenterID(even:any) {   
    this.diagnosticcenterid = even.target.value;
    this.Approvelist=this.dummlist.filter((x: { diagnosticCenterID: any; })=>x.diagnosticCenterID==this.diagnosticcenterid)
  }
  

  //Export Excel
  fileName = 'Doctor Report List.xlsx';
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


  count:any;
  
  public getget(even:any) {
    // this.featurelist.find(item => item.featureID == fid).checkbox = true;
    if (even.target.value == 2) {
      let dfsfd = this.dummlist.filter((x: { approved: number; }) => x.approved == 1);
      this.Approvelist = dfsfd;
      this.count = this.Approvelist.length

    }
    if (even.target.value == 3) {

      let dfsfd = this.dummlist.filter((x: { notVisited: number; }) => x.notVisited == 1);

      this.Approvelist = dfsfd;
      this.count = this.Approvelist.length

    }
    if (even.target.value == 4) {

      let dfsfd = this.dummlist.filter((x: { cancelled: number; diagnosticCancelled: number; }) => x.cancelled == 1 || x.diagnosticCancelled == 1);

      this.Approvelist = dfsfd;
      this.count = this.Approvelist.length

    }
    if (even.target.value == 1) {
      this.GetApprovelist();
      this.CommonService.GetDiagnosticAppointmentsByApprovedReportsWeb(this.startdate, this.enddate, this.languageid).subscribe(
        data => {

          this.Approvelist = data;
          this.dummlist = this.Approvelist;
          this.count = this.Approvelist.length;
          this.loader=false;
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticAppointmentsByApprovedReportsWeb",error);
          this.loader=false;
        }
      )
    }
  }

  
  public getdiagnosticforadmin() {
    this.CommonService.GetDiagnosticForAdminByLanguageID(this.languageid).subscribe(
      data => {
        this.diagnosticlist = data;
        this.loader=false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticForAdminByLanguageID",error);
        this.loader=false;
      }
    )
  }



  public GetApprovelist() {

    this.CommonService.GetDiagnosticAppointmentsByApprovedReports(this.diagnosticid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        this.Approvelist = data;
        this.dummlist = this.Approvelist;
        this.count = this.Approvelist.length;
        this.loader=false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticAppointmentsByApprovedReports",error);
        this.loader=false;
      }
    )
  }

  selectDate(data: any) {
    this.startdate = this.CommonService.GetDates(data[0]);
    this.enddate = this.CommonService.GetDates(data[1]);
    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);
  }


   // Pagination

   public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  


}
