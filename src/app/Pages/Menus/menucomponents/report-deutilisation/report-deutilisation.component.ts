import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Report/reportlabels.json';

@Component({
  selector: 'app-report-deutilisation',
  templateUrl: './report-deutilisation.component.html',
  styleUrls: ['./report-deutilisation.component.css']
})
export class ReportDeutilisationComponent implements OnInit {

  loader: boolean | undefined;
  typeid: any;
  auditReportList: any;
  dummauditReportList: any;
  startdate: any;
  enddate: any;
  languageid: any;
  p: any;
  bsRangeValue: any;
  search: any;
  count: any;
  currentUrl: any;
   ShowSms:boolean | undefined;
   labels:any;

  constructor(private MenuService: MenuService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
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

    this.GetProvidersAuditReport();
    this.bsRangeValue = [start, end];


  }

  //GetAuditReport

  GetProvidersAuditReport() {
    this.MenuService.GetProvidersAuditReport(1, this.startdate, this.enddate).subscribe(async data => {
      this.loader = false;
      this.auditReportList = data;
      this.dummauditReportList = data;
      this.count = this.auditReportList.length;
    }, error => {
      this.loader=false;
      this.SharedService.insertexceptions(this.currentUrl, "GetProvidersAuditReport", error);
    })

  }

  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }




  //export to excel
  fileName = 'Auditreport.xlsx';
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


  //GetTypeID

  gettypeID(even: any) {
    this.typeid = even.target.value;
    if (this.typeid != 0) {
      this.auditReportList = this.dummauditReportList.filter((x: { typeID: any; }) => x.typeID == this.typeid)
    }
    else {
      this.GetProvidersAuditReport();
    }
  }


  //To Select Date
  selectDate(data: any) {
    
    this.loader = true;
    this.startdate = this.MenuService.GetDates(data[0]);
    this.enddate = this.MenuService.GetDates(data[1]);
    this.GetProvidersAuditReport();
    
  }


}
