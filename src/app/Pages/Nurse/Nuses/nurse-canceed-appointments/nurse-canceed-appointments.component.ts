import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { NurseService } from 'src/app/Pages/services/nurse.service';
import { formatDate } from '@angular/common';
import Labels from '../../../Lables/Nurse/nurselabels.json';


@Component({
  selector: 'app-nurse-canceed-appointments',
  templateUrl: './nurse-canceed-appointments.component.html',
  styleUrls: ['./nurse-canceed-appointments.component.css']
})
export class NurseCanceedAppointmentsComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();
  bsRangeValue: Date[] | undefined;
  loader: boolean | undefined;
  public appointmentreportlist: any;
  public term: any;
  public dummlist: any;
  public languageid: any;
  public labels: any;
  public sdate: any;
  public edate: any;
  public id: any;
  public count: any;
  public notshowdrop: any;
  nurseid: any;
  roleid: any;
  currentUrl:any;

 
  constructor(private NurseService: NurseService, private SharedService: SharedService) { }

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

    sessionStorage.setItem('startdate', this.startdate);
    sessionStorage.setItem('enddate', this.enddate);

    this.bsRangeValue = [start, end];

    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.nurseid = sessionStorage.getItem('nurseid');
    this.roleid = sessionStorage.getItem('roleid');
    this.sdate = sessionStorage.getItem('StartDate');
    this.edate = sessionStorage.getItem('EndDate');
    this.GetAppointmentReportsList();
  }



  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.NurseService.GetDates(data[0]);
    this.enddate = this.NurseService.GetDates(data[1]);
    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);
    this.GetAppointmentReportsList()
  }


  public GetAppointmentReportsList() {

    this.NurseService.GetBook_Nurse_AppointmentReports(this.nurseid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        this.loader=false;
        this.dummlist = data;
        this.appointmentreportlist = this.dummlist.filter((x: { nurseCancelled: number; cancelled: number; }) => x.nurseCancelled == 1 || x.cancelled == 1)
        this.count = this.appointmentreportlist.length
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetBook_Nurse_AppointmentReports",error);
        this.loader=false;
      }
    )
  }

}
