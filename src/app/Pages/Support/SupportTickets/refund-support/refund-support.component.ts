import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SupportService } from 'src/app/Pages/services/support.service';
import Labels from '../../../Lables/Support/Supportlabels.json';
import * as XLSX from 'xlsx';
import { SharedService } from 'src/app/Pages/services/shared.service';



@Component({
  selector: 'app-refund-support',
  templateUrl: './refund-support.component.html',
  styleUrls: ['./refund-support.component.css']
})


export class RefundSupportComponent implements OnInit {

  startdate: any;
  enddate: any;
  bsRangeValue: any;
  p: any;
  loader: boolean | undefined;
  countrymanaerid: any;
  supportid: any;
  showexportbutton: any;
  languageid: any;
  dummrefundlist: any;
  refundlist: any;
  count: any;
  term: any;
  labels: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  currentUrl: any;


  constructor(private SupportService: SupportService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.countrymanaerid = sessionStorage.getItem('countrymanagerid');
    this.supportid = sessionStorage.getItem('supportid');
    if (this.countrymanaerid != undefined || this.supportid != undefined) {
      this.showexportbutton = 1;
    }


    var date = new Date();
    this.startdate = new Date(date.getFullYear(), date.getMonth() - 6, 1);
    this.enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var start = new Date(date.getFullYear(), date.getMonth() - 6, 1);
    var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);

    const format1 = 'yyyy-MM-dd';
    const locale1 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale1);

    this.bsRangeValue = [start, end];
    this.GetRefunfSupport();

  }



  public GetRefunfSupport() {

    this.SupportService.GetPatientRefundStatusWeb(this.languageid, this.startdate, this.enddate).subscribe(res => {

      this.dummrefundlist = res;
      this.refundlist = this.dummrefundlist.filter((x: { completed: number; }) => x.completed == 0);
      this.loader = false;
      this.count = this.refundlist.length;
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "GetPatientRefundStatusWeb", error);
    })
  }


  //To Select Date
  selectDate(data: any) {
    this.startdate = this.SupportService.GetDates(data[0]);
    this.enddate = this.SupportService.GetDates(data[1]);
    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);
  }


  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }




  fileName = 'Refund Support List.xlsx';
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

}
