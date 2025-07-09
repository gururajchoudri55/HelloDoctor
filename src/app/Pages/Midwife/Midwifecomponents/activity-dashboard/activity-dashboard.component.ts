import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MidwifeService } from 'src/app/Pages/services/midwife.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Midwife/midwifelables.json';

@Component({
  selector: 'app-activity-dashboard',
  templateUrl: './activity-dashboard.component.html',
  styleUrls: ['./activity-dashboard.component.css']
})
export class ActivityDashboardComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();
  bsRangeValue: Date[] | undefined;
  loader:boolean | undefined;
  midwifeid:any;
  languageid:any;
  appointmentist:any;
  count:any;
  pendinglist:any;
  pendinglisttt:any;
  pendingcount:any;
  acceptlist:any;
  acceptlisttt:any;
  acceptcount:any;
  visistlist:any;
  visistlisttt:any;
  visitcount:any;
  notvisitlist:any;
  notvisitlisttt:any;
  notvisitcount:any;
  cancellist:any;
  cancellisttt:any;
  cancelcount:any;
  currentUrl:any;
  labels:any;
  

  constructor(private MidwifeService:MidwifeService,private SharedService:SharedService ) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.midwifeid = sessionStorage.getItem('midwifeid');
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

    sessionStorage.setItem('startdate',this.startdate);
    sessionStorage.setItem('enddate',this.enddate);

    this.bsRangeValue = [start, end];
    this.getmidwifeappointments();
  }

      //To Select Date
      selectDate(data: any) {
        this.loader = true;
        this.startdate = this.MidwifeService.GetDates(data[0]);
        this.enddate = this.MidwifeService.GetDates(data[1]);
        sessionStorage.setItem("startdate", this.startdate);
        sessionStorage.setItem("enddate", this.enddate);
        this.getmidwifeappointments();
      }

 

      public getmidwifeappointments() {
        this.MidwifeService.GetBook_Book_Midwives_Appointment(this.midwifeid, this.startdate, this.enddate, this.languageid).subscribe(
          data => {
            this.appointmentist = data;
            this.count = this.appointmentist.length; 
            this.pendinglist = this.appointmentist;
            this.pendinglisttt = this.pendinglist.filter((x: { isVisited: number; accepted: number; midwivesCancelled: number; notVisited: number; cancelled: number; }) => x.isVisited == 0 && x.accepted == 0 && x.midwivesCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
            this.pendingcount = this.pendinglisttt.length;  
            this.acceptlist = this.appointmentist;
            this.acceptlisttt = this.acceptlist.filter((x: { isVisited: number; accepted: number; midwivesCancelled: number; notVisited: number; cancelled: number; }) => x.isVisited == 0 && x.accepted == 1 && x.midwivesCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
            this.acceptcount = this.acceptlisttt.length;  
            this.visistlist = this.appointmentist;
            this.visistlisttt = this.visistlist.filter((x: { isVisited: number; accepted: number; midwivesCancelled: number; notVisited: number; cancelled: number; }) => x.isVisited == 1 && x.accepted == 1 && x.midwivesCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
            this.visitcount = this.visistlisttt.length;  
            this.notvisitlist = this.appointmentist;
            this.notvisitlisttt = this.notvisitlist.filter((x: { notVisited: number; }) =>x.notVisited == 1 );
            this.notvisitcount = this.notvisitlisttt.length;
            this.cancellist = this.appointmentist;
            this.cancellisttt = this.cancellist.filter((x: { midwivesCancelled: number; cancelled: number; }) =>x.midwivesCancelled == 1 ||x.cancelled==1);
            this.cancelcount = this.cancellisttt.length;
            this.loader=false;
          }, error => {
            this.SharedService.insertexceptions(this.currentUrl,"GetBook_Book_Midwives_Appointment",error);
          }
        )
      }

      appointment(id:any){
        location.href="#/midwife/ActivitityDashboardDetails/" +btoa(id);
      }




}
