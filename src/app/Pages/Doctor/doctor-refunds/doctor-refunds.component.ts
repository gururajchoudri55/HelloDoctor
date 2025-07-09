import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/Doctor/doctor.service';
import { SharedService } from '../../services/shared.service';
import * as XLSX from 'xlsx';
import Labels from '../../../Pages/Lables/Doctors/AllLabels.json';


@Component({
  selector: 'app-doctor-refunds',
  templateUrl: './doctor-refunds.component.html',
  styleUrls: ['./doctor-refunds.component.css']
})
export class DoctorRefundsComponent implements OnInit {
  p: any;

  constructor(private DoctorService: DoctorService, private SharedService: SharedService) { }
  loader: boolean | undefined;
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  languageid: any;
  doctorid: any;
  Notificationslist: any;
  count: any;
  currentUrl: any;
  search: any;
  refundList: any;
  term: any;
  labels:any;

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.doctorid = sessionStorage.getItem('userid');

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


    this.bsRangeValue = [start, end];
    this.getRefundAmountReports();
  }




  public getRefundAmountReports() {
    this.DoctorService.GetCancelledAppointmentReportsForDoctor(this.doctorid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        this.loader = false;

        this.refundList = data.filter(x => x.refundBit == 1);
        this.count = this.refundList.length;

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetCancelledAppointmentReportsForDoctor", error);
      }
    )
  }


  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.DoctorService.GetDates(data[0]);
    this.enddate = this.DoctorService.GetDates(data[1]);
    this.getRefundAmountReports();

  }

    // Pagination
    public pageChanged(even: any) {

      let fgdgfgd = even;
      this.p = even;
    }
  


    
  //export to excel
  fileName = 'DoctorRefund.xlsx';
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
