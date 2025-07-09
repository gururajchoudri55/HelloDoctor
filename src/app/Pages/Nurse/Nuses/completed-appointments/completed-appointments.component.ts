import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { NurseService } from 'src/app/Pages/services/nurse.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Nurse/nurselabels.json';

@Component({
  selector: 'app-completed-appointments',
  templateUrl: './completed-appointments.component.html',
  styleUrls: ['./completed-appointments.component.css']
})
export class CompletedAppointmentsComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();
  bsRangeValue: Date[] | undefined;
  loader: boolean | undefined;

  public nurseid: any;
  ;
  value: any;
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
  roleid: any;
  currentUrl:any;

  constructor(private NurseService: NurseService, private SharedService: SharedService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loader = true;
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
    this.currentUrl=window.location.href;
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.nurseid = sessionStorage.getItem('nurseid');
    this.roleid = sessionStorage.getItem('roleid');
    this.sdate = sessionStorage.getItem('StartDate');
    this.edate = sessionStorage.getItem('EndDate');

    this.activatedroute.params.subscribe(params => {

      this.id = params['id'];

    }
    )

    if (this.id == undefined) {
      this.GetAppointmentReportsList();


    }
    else {

      this.NurseService.GetBook_Nurse_AppointmentForWeb(this.sdate, this.edate, this.languageid).subscribe(
        data => {
          this.loader = false;
          this.notshowdrop = 1;
          this.appointmentreportlist = data;
          this.dummlist = this.appointmentreportlist
          this.count = this.appointmentreportlist.length
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl,"GetBook_Nurse_AppointmentForWeb",error);
        }
      )
    }
  }



  public GetAppointmentReportsList() {

    this.NurseService.GetBook_Nurse_AppointmentReports(this.nurseid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        this.loader = false;
        this.appointmentreportlist = data;
        this.dummlist = this.appointmentreportlist
        this.count = this.appointmentreportlist.length
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetBook_Nurse_AppointmentReports",error);
      }
    )
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




  public getget(even: any) {
    // this.featurelist.find(item => item.featureID == fid).checkbox = true;
    this.loader = true;
    if (even.target.value == 1) {

      let dfsfd = this.dummlist.filter((x: { isVisited: number; }) => x.isVisited == 1);

      this.appointmentreportlist = dfsfd;
      this.count = this.appointmentreportlist.length
      this.loader = false;;
    }
    if (even.target.value == 2) {

      let dfsfd = this.dummlist.filter((x: { nurseCancelled: number; cancelled: number; }) => x.nurseCancelled == 1 || x.cancelled == 1);

      this.appointmentreportlist = dfsfd;
      this.count = this.appointmentreportlist.length
      this.loader = false;;
    }
    if (even.target.value == 3) {

      let dfsfd = this.dummlist.filter((x: { notVisited: number; }) => x.notVisited == 1);

      this.appointmentreportlist = dfsfd;
      this.count = this.appointmentreportlist.length;
      this.loader = false;;
    }
    if (even.target.value == 4) {

      this.GetAppointmentReportsList();
      this.count = this.appointmentreportlist.length
      this.NurseService.GetBook_Nurse_AppointmentForWeb(this.sdate, this.edate, this.languageid).subscribe(
        data => {
          this.loader = false;;
          this.appointmentreportlist = data;
          this.dummlist = this.appointmentreportlist
          this.count = this.appointmentreportlist.length
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl,"GetBook_Nurse_AppointmentForWeb",error);
        }
      )
    }

  }
}
