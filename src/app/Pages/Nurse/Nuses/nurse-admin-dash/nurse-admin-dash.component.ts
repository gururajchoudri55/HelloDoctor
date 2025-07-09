import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NurseService } from 'src/app/Pages/services/nurse.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Nurse/nurselabels.json';


@Component({
  selector: 'app-nurse-admin-dash',
  templateUrl: './nurse-admin-dash.component.html',
  styleUrls: ['./nurse-admin-dash.component.css']
})
export class NurseAdminDashComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();
  bsRangeValue: Date[] | undefined;
  loader: boolean | undefined;


  public appointmentreportlist: any;
  public nurseid: any;
  public languageid: any;
  public count: any;
  public dummlist: any;
  SDate = new Date();
  EDate = new Date();
  value: any;
  public todaydate: any;
  public appointmentacceptlistttt: any;


  public appointmentacceptlist: any;
  public acceptcount: any;
  public labels: any;
  public pendingacceptence: any;
  public acceptlist: any;
  public acceptapplist: any;
  public patientvisit: any;
  public patientvisittt: any;
  public patientvisitcount: any;
  public patientnotvisit: any;
  public patientnotvisitt: any;
  public patientnotvisitcount: any;
  public patientcalncellist: any;
  public patientcalncellisttt: any;
  public cancelcount: any;
  currentUrl:any;


  constructor(private NurseService: NurseService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl=window.location.href;
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

    
    this.nurseid = sessionStorage.getItem('nurseid');

    sessionStorage.setItem('startdate', this.startdate);
    sessionStorage.setItem('enddate', this.enddate);

    this.bsRangeValue = [start, end];
    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);
    this.GetAppointmentReportsList();
  }



    //To Select Date
    selectDate(data: any) {
      this.loader = true;
      this.startdate = this.NurseService.GetDates(data[0]);
      this.enddate = this.NurseService.GetDates(data[1]);
      sessionStorage.setItem("startdate", this.startdate);
      sessionStorage.setItem("enddate", this.enddate);
      this.GetAppointmentReportsList();
    }

  

  public GetAppointmentReportsList() {

    this.NurseService.GetBook_Nurse_AppointmentReports(this.nurseid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {

        this.appointmentreportlist = data;
        this.dummlist = this.appointmentreportlist
        this.count = this.appointmentreportlist.length;

        this.appointmentacceptlist = this.appointmentreportlist;
        this.appointmentacceptlistttt = this.appointmentacceptlist.filter((x: { isVisited: number; accepted: number; nurseCancelled: number; notVisited: number; cancelled: number; }) => x.isVisited == 0 && x.accepted == 0 && x.nurseCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
        this.pendingacceptence = this.appointmentacceptlistttt.length;

        this.acceptlist = this.appointmentreportlist;
        this.acceptapplist = this.acceptlist.filter((x: { isVisited: number; accepted: number; nurseCancelled: number; notVisited: number; cancelled: number; }) => x.isVisited == 0 && x.accepted == 1 && x.nurseCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
        this.acceptcount = this.acceptapplist.length;


        this.patientvisit = this.appointmentreportlist;
        this.patientvisittt = this.patientvisit.filter((x: { isVisited: number; accepted: number; nurseCancelled: number; notVisited: number; cancelled: number; }) => x.isVisited == 1 && x.accepted == 1 && x.nurseCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
        this.patientvisitcount = this.patientvisittt.length;

        this.patientnotvisit = this.appointmentreportlist;
        this.patientnotvisitt = this.patientnotvisit.filter((x: { notVisited: number; }) => x.notVisited == 1);
        this.patientnotvisitcount = this.patientnotvisitt.length;

        this.patientcalncellist = this.appointmentreportlist;
        this.patientcalncellisttt = this.patientcalncellist.filter((x: { nurseCancelled: number; cancelled: number; }) => x.nurseCancelled == 1 || x.cancelled == 1);
        this.cancelcount = this.patientcalncellisttt.length;
        this.loader = false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetBook_Nurse_AppointmentReports",error);
      }
    )
  }


  Dashboard(id: any) {
    location.href = "#/Nurse/NurseAdminDashboard/" + btoa(id)
  }
}
