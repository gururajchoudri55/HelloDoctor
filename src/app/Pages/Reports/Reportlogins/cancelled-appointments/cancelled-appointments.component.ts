import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { CommonService } from 'src/app/Pages/services/common.service';
import { formatDate } from '@angular/common';
import Labels from '../../../Lables/managelogins/managelabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-cancelled-appointments',
  templateUrl: './cancelled-appointments.component.html',
  styleUrls: ['./cancelled-appointments.component.css']
})
export class CancelledAppointmentsComponent implements OnInit {

  loader: boolean | undefined;
  term: any;
  count: any;
  languageid: any;
  typeid: any;
  paidamount: any;
  startdate: any;
  enddate: any;
  appointmentreportList: any;
  bsRangeValue: Date[] | undefined;
  bsValue = new Date();
  maxDate = new Date();
  p: any;
  labels:any;
  location:any;
  currentUrl:any;


  constructor(private CommonService: CommonService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.typeid = 1;
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
    this.GetAppointmentReportsList();
  }

  public Gettypeid(even: any) {
    this.loader = true;
    this.typeid = even.target.value;
    this.GetAppointmentReportsList()
  }


  public GetAppointmentReportsList() {
    this.CommonService.GetAllCancelledAppoentmentReport(this.typeid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        this.paidamount = 0
        this.appointmentreportList = data;
        this.count = this.appointmentreportList.length;
        this.loader = false;

        // this.paidamount = this.appointmentreportList.map((a: { paidAmount: any; }) => a.paidAmount).reduce(function (a: any, b: any) {
        //   return a + b;
        // });
      }, error => {
        console.log("Error with GetAllCancelledAppoentmentReport", error);
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetAllCancelledAppoentmentReport",error);
      }
    )
  }



//To Select Date

  selectDate(data: any) {
    
    this.loader = true;
    this.startdate = this.CommonService.GetDates(data[0]);
    this.enddate = this.CommonService.GetDates(data[1]);
    this.GetAppointmentReportsList()
    
  }



  //Export to Excel
  
  fileName = 'Cancelled Appointment List.xlsx';
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

//Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


  GetAddress(address:any){
    this.location=address;

  }





}
