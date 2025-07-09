import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MidwifeService } from 'src/app/Pages/services/midwife.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Midwife/midwifelables.json';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cancelled-appointments',
  templateUrl: './cancelled-appointments.component.html',
  styleUrls: ['./cancelled-appointments.component.css']
})
export class CancelledAppointmentsComponent implements OnInit {


  startdate: any;
  enddate: any;
  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();
  bsRangeValue: Date[] | undefined;
  loader:boolean | undefined;
  id:any;
  languageid:any;
  sdate:any;
  edate:any;
  dummlist:any;
  appointmentreportlist:any;
  count:any;
  search:any;
  currentUrl:any;
  labels:any;

  constructor(private MidwifeService:MidwifeService,private SharedService:SharedService ) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
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

    this.id = sessionStorage.getItem('midwifeid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];


    this.sdate = sessionStorage.getItem('StartDate');
    this.edate = sessionStorage.getItem('EndDate');

    this.bsRangeValue = [start, end];
    this.GetAppointmentReportsList();


  }



     //export to excel
     fileName = 'cancelledappointmnetlist.xlsx';
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
  

    
     //To Select Date
     selectDate(data: any) {
      this.startdate = this.MidwifeService.GetDates(data[0]);
      this.enddate = this.MidwifeService.GetDates(data[1]);
      sessionStorage.setItem("startdate", this.startdate);
      sessionStorage.setItem("enddate", this.enddate);
      this.GetAppointmentReportsList();
     }


     
     public GetAppointmentReportsList() {
       
      this.MidwifeService.GetBook_Book_Midwives_AppointmentReports(this.id, this.startdate, this.enddate, this.languageid).subscribe(
        data => {
          this.loader=false;
          this.dummlist = data;
          this.appointmentreportlist = this.dummlist.filter((x: { midwivesCancelled: number; cancelled: number; }) => x.midwivesCancelled == 1||x.cancelled==1)
          this.count=this.appointmentreportlist.length;
        
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl,"GetBook_Book_Midwives_AppointmentReports",error);
        }
      )
    }

    public getget(even:any) {
      // this.featurelist.find(item => item.featureID == fid).checkbox = true;
  
      if (even.target.value == 1) {
  
        let dfsfd = this.dummlist.filter((x: { isVisited: number; }) => x.isVisited == 1);
  
        this.appointmentreportlist = dfsfd;
  
      }
      if (even.target.value == 3) {
  
        let dfsfd = this.dummlist.filter((x: { midwivesCancelled: number; cancelled: number; }) => x.midwivesCancelled == 1 || x.cancelled == 1);
  
        this.appointmentreportlist = dfsfd;
  
      }
      if (even.target.value == 4) {
  
        let dfsfd = this.dummlist.filter((x: { notVisited: number; }) => x.notVisited == 1);
  
        this.appointmentreportlist = dfsfd;
  
      }
      if (even.target.value == 5) {
  
        this.GetAppointmentReportsList();
    }
}
    }

