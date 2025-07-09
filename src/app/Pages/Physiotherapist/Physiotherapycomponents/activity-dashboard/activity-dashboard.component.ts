import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PhysioService } from 'src/app/Pages/services/physio.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/physiotherapist/physiolabels.json'

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
  languageid:any;
  physioid:any;
  currentUrl:any;
  appointmentist:any;
  count:any;
  pendinglist:any;
  pendinglisttt:any;
  pendingingcount:any;
  acceptlist:any
  acceptlisttt:any;
  acceptcount:any;
  vistedlist:any;
  vistedlistt:any;
  visitcount:any;
  cancellist:any;
  cancellistttt:any;
  cancelcount:any;
  notvisitlist:any;
  notvisitlisttt:any;
  notvisitcount:any;
  labels:any;

  constructor(private PhysioService:PhysioService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
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
    this.getphysiolist();

  }


  
  public getphysiolist() {
    this.PhysioService.GetBook_Physio_Appointment(this.physioid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        this.loader=false;
        this.appointmentist = data;
        this.count = this.appointmentist.length;

        this.pendinglist = this.appointmentist;
        this.pendinglisttt = this.pendinglist.filter((x: { isVisited: number; accepted: number; physioCancelled: number; notVisited: number; cancelled: number; }) => x.isVisited == 0 && x.accepted == 0 && x.physioCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
        this.pendingingcount = this.pendinglisttt.length;

        this.acceptlist = this.appointmentist;
        this.acceptlisttt = this.acceptlist.filter((x: { isVisited: number; accepted: number; physioCancelled: number; notVisited: number; cancelled: number; }) => x.isVisited == 0 && x.accepted == 1 && x.physioCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
        this.acceptcount = this.acceptlisttt.length;

        this.vistedlist = this.appointmentist;
        this.vistedlistt = this.vistedlist.filter((x: { isVisited: number; accepted: number; physioCancelled: number; notVisited: number; cancelled: number; }) => x.isVisited == 1 && x.accepted == 1 && x.physioCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
        this.visitcount = this.vistedlistt.length;

        this.cancellist = this.appointmentist;
        this.cancellistttt = this.cancellist.filter((x: { physioCancelled: number; cancelled: number; }) => x.physioCancelled == 1 || x.cancelled == 1);
        this.cancelcount = this.cancellistttt.length;

        this.notvisitlist = this.appointmentist;
        this.notvisitlisttt = this.notvisitlist.filter((x: { notVisited: number; }) => x.notVisited == 1);
        this.notvisitcount = this.notvisitlisttt.length;

      }, error => {
          this.SharedService.insertexceptions(this.currentUrl,"GetBook_Physio_Appointment",error);
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
      this.getphysiolist()
    }


    Dashboard(id: any) {
      location.href = "#/Physiotherapist/Physiodashdetails/" + btoa(id)
    }

}
