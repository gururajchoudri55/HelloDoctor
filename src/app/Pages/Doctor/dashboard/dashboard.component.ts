import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DoctorService } from '../../services/Doctor/doctor.service';
import Labels from '../../../Pages/Lables/Doctors/AllLabels.json'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  startdate: any;
  enddate: any;
  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();
  doctorlist: any;
  GrandTotal: any;
  hospitalid: any;
  doctorID: any;
  bsRangeValue: Date[] | undefined;
  vediocountcommision: any;
  languageid: any;
  currentUrl: any;
  appointmentlist: any;
  finallist: any;
  count: any;
  appointmentvisitedlist: any;
  visitedcount: any;
  appointmentcancelledlist: any;
  cancelledcount: any;
  appointmentnotvisitedlist: any;
  notvisitedcount: any;
  appointmentacceptlist: any;
  accepetedlist: any;
  accptcount: any;
  pendinglist: any;
  pendinglistt: any;
  pendingcount: any;
  cliniclist: any;
  cliniclistttt: any;
  cliniccount: any;
  videoapplist: any;
  videoapplistt: any;
  videoappcount: any;
  homecalls: any;
  homecalllist: any;
  homecallscount: any;
  doccancelledlist: any;
  doccancelledlisttss: any;
  doccancelledcount: any;
  refereallist: any;
  receivedreferlcount: any;
  sentrefereralscount: any;
  loader: any;
  labels: any;
  

  constructor(private DoctorService: DoctorService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.languageid = sessionStorage.getItem('LanguageID');
    var lang = sessionStorage.getItem('LanguageID');
    
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];

    console.log("labels",this.labels)

    
    this.loader = true;
    this.currentUrl = window.location.href;
    this.hospitalid = sessionStorage.getItem('hospitalClinicID');
    this.doctorID = sessionStorage.getItem('userid');
    this.languageid = sessionStorage.getItem('LanguageID');
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

    this.GetAppointmetbyDociD();
    this.GetDoctorRefereals();


  }



  //Get Appiointment

  public GetAppointmetbyDociD() {
    this.DoctorService
      .GetBookAppointmentByDocID(this.startdate, this.enddate, this.doctorID, this.languageid)
      .subscribe(
        data => {
          
          this.loader = false;
          this.appointmentlist = data;
          console.log("appointmentList", this.appointmentlist)
          this.finallist = data;
          this.count = this.appointmentlist.length;
          this.appointmentvisitedlist = this.finallist;
          this.appointmentvisitedlist = this.appointmentvisitedlist.filter((x: { isVisited: number; }) => x.isVisited == 1);

          this.visitedcount = this.appointmentvisitedlist.length;
          this.appointmentcancelledlist = this.finallist;
          this.appointmentcancelledlist = this.appointmentcancelledlist.filter((x: { cancelled: number; }) => x.cancelled == 1);
          this.cancelledcount = this.appointmentcancelledlist.length;
          this.appointmentnotvisitedlist = this.finallist;
          this.appointmentnotvisitedlist = this.appointmentnotvisitedlist.filter((x: { noShow: number; }) => x.noShow == 1);
          this.notvisitedcount = this.appointmentnotvisitedlist.length;
          this.appointmentacceptlist = this.finallist;
          this.accepetedlist = this.appointmentacceptlist.filter((x: { accepted: number; isVisited: number; docCancelled: number; cancelled: number; noShow: number; }) => x.accepted == 1 && x.isVisited == 0 && x.docCancelled == 0 && x.cancelled == 0 && x.noShow == 0)
          this.accptcount = this.accepetedlist.length;
          this.pendinglist = this.finallist;
          this.pendinglistt = this.pendinglist.filter((x: { isVisited: number; accepted: number; cancelled: number; docCancelled: number; noShow: number; }) => x.isVisited == 0 && x.accepted == 0 && x.cancelled == 0 && x.docCancelled == 0 && x.noShow == 0)
          this.pendingcount = this.pendinglistt.length;
          this.cliniclist = this.finallist;
          this.cliniclistttt = this.cliniclist.filter((x: { appointmentTypeID: number; }) => x.appointmentTypeID == 1)
          this.cliniccount = this.cliniclistttt.length;
          this.videoapplist = this.finallist;
          this.videoapplistt = this.videoapplist.filter((x: { appointmentTypeID: number; }) => x.appointmentTypeID == 2)
          this.videoappcount = this.videoapplistt.length;
          this.homecalls = this.finallist;
          
          this.homecalllist = this.homecalls.filter((x: { homeVisit: number; }) => x.homeVisit == 1)
          this.homecallscount = this.homecalllist.length;
          this.doccancelledlist = this.finallist;
          this.doccancelledlisttss = this.doccancelledlist.filter((x: { docCancelled: number; }) => x.docCancelled == 1);
          this.doccancelledcount = this.doccancelledlisttss.length;

          this.loader = false;
        },
        error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetBookAppointmentByDocID", error);
          this.loader = false;
        }
      );
  }


  public GetDoctorRefereals() {
    this.DoctorService.GetDoctorReferalsCount(this.doctorID, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        this.refereallist = data[0];
        this.receivedreferlcount = this.refereallist.receiveedReferelas,
          this.sentrefereralscount = this.refereallist.sendrefererals
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetDoctorReferalsCount", error);
      }
    )
  }

  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.DoctorService.GetDates(data[0]);
    this.enddate = this.DoctorService.GetDates(data[1]);
    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);
    this.GetAppointmetbyDociD();
  }



  goToDashboard(id: any) {
    location.href = "#/Doctor/DashboardDetails/" + btoa(id)
  }


  sentrefferals(){
    location.href="#/Doctor/SentRefferals/";
  }

  receivedreferals(){
    location.href="#/Doctor/RefferedPatients/";
  }

}
