import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { DiagnosticService } from 'src/app/Pages/services/diagnostic.service';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import Labels from '../../../Lables/diagnostic/diagnosticlabels.json';


@Component({
  selector: 'app-diagnostic-reports',
  templateUrl: './diagnostic-reports.component.html',
  styleUrls: ['./diagnostic-reports.component.css']
})
export class DiagnosticReportsComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  loader: boolean | undefined;
  sdate: any;
  edate: any;
  languageid: any;
  count: any;
  diagnosticcenterid: any;
  Approvelist: any;
  dummlist: any;
  diagnosticid: any;
  diagnosticlist: any;
  showdrop: any;
  labels: any;
  currentUrl: any;
  term: any;


  constructor(private DiagnosticService: DiagnosticService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
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
    this.diagnosticid = sessionStorage.getItem('diagnosticid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.bsRangeValue = [start, end];


    this.GetApprovelist()

  }

  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.DiagnosticService.GetDates(data[0]);
    this.enddate = this.DiagnosticService.GetDates(data[1]);
    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);
    this.GetApprovelist()
  }


  //export to excel
  fileName = 'AppointmentList.xlsx';
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

  public getget(even: any) {
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
      this.DiagnosticService.GetDiagnosticAppointmentsByApprovedReportsWeb(this.sdate, this.edate, this.languageid).subscribe(
        data => {
          this.Approvelist = data;
          this.dummlist = this.Approvelist
          this.count = this.Approvelist.length
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetDiagnosticAppointmentsByApprovedReportsWeb", error);
        }
      )
    }
  }

  public GetApprovelist() {

    this.DiagnosticService.GetDiagnosticAppointmentsByApprovedReports(this.diagnosticid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        this.loader = false;
        this.Approvelist = data;
        this.dummlist = this.Approvelist
        this.count = this.Approvelist.length
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetDiagnosticAppointmentsByApprovedReports", error);
      }
    )
  }

  public getdiagnosticforadmin() {

    this.DiagnosticService.GetDiagnosticForAdminByLanguageID(this.languageid).subscribe(
      data => {

        this.diagnosticlist = data;

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetDiagnosticForAdminByLanguageID", error);
      }
    )
  }


  public GetDiagnosticcenterID(even: any) {

    this.diagnosticcenterid = even.target.value;

    this.Approvelist = this.dummlist.filter((x: { diagnosticCenterID: any; }) => x.diagnosticCenterID == this.diagnosticcenterid)
  }



  selectedOrder: any;
  typeID: any;

  getTypeID(details: any, typeID: any) {
    this.selectedOrder = details;
    this.typeID = typeID;


    this.doSomething()
  }


  doSomething() {
    if (this.typeID == 6) {
      //tests
      this.GetDiaTests()
    }
    else if (this.typeID == 7) {
      this.GetPackageTests()
    }
  }
  packageList: any;


  public GetPackageTests() {
    this.DiagnosticService.GetDiagnosticPackagesByAppointmentIDWeb(this.languageid, this.selectedOrder.id).subscribe(
      data => {

        this.packageList = data;
      }, error => {
      }
    )
  }


  testList: any;

  public GetDiaTests() {
    
    this.DiagnosticService.GetDiagnosticTestsByAppointmentIDWeb(this.languageid, this.selectedOrder.id).subscribe(
      data => {
        
        this.testList = data;
      }, error => {
      }
    )
  }
  reportid: any

  public GetReportID(id: any) {

    this.reportid = id;
    this.getreportid()
  }
  reports: any
  reportimage: any;

  public getreportid() {
    this.DiagnosticService.GetPatientDiagnosticsReportsByAppointmentID(this.reportid).subscribe(
      data => {

        this.reports = data[0];
        this.reportimage = this.reports.fileURL

        location.href = "#/Shared/view/" + btoa(this.reportimage)


      }, error => {
      }
    )
  }
}


