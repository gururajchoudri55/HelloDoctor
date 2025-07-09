import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PhysioService } from 'src/app/Pages/services/physio.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/physiotherapist/physiolabels.json';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();
  bsRangeValue: Date[] | undefined;
  loader:boolean | undefined;
  languageid:any;
  physioid:any;
  appointmentreportlist:any;
  dummlist:any;
  count:any;
  currentUrl:any;
  p:any;
  search:any;
  showdrop:any;
  labels:any;
  location:any;

  constructor(private PhysioService:PhysioService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.physioid = sessionStorage.getItem('physioid');
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
     this.GetAppointmentReportsList();
  }

  public GetAppointmentReportsList() {

    this.PhysioService.GetBook_Physio_AppointmentReports(this.physioid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        this.loader=false;
        this.appointmentreportlist = data;
        this.dummlist = this.appointmentreportlist
        this.count = this.appointmentreportlist.length
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetBook_Physio_AppointmentReports",error);
        this.loader=false;
      }
    )
  }




       //To Select Date
       selectDate(data: any) {
        this.loader = true;
        this.startdate = this.PhysioService.GetDates(data[0]);
        this.enddate = this.PhysioService.GetDates(data[1]);
        sessionStorage.setItem("startdate", this.startdate);
        sessionStorage.setItem("enddate", this.enddate);
        this.GetAppointmentReportsList();

  }

  
       // Pagination

       public pageChanged(even: any) {

        let fgdgfgd = even;
        this.p = even;
      }



      getAddress(address:any){
        this.location=address;
      }

}
