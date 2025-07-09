import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DoctorService } from '../../services/Doctor/doctor.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Pages/Lables/Doctors/AllLabels.json';

@Component({
  selector: 'app-dashboard-details',
  templateUrl: './dashboard-details.component.html',
  styleUrls: ['./dashboard-details.component.css']
})
export class DashboardDetailsComponent implements OnInit {
  loader: boolean | undefined;
  startdate: any;
  enddate: any;
  ID: any;
  doctorid: any;
  languageid: any;
  appointmentlist: any;
  count: any;
  currentUrl: any;
  p: any;
  search: any;
  bsRangeValue: any;
  labels: any;


  constructor(private DoctorService: DoctorService, private SharedService: SharedService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loader = true;
    this.languageid = sessionStorage.getItem("LanguageID");
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.currentUrl = window.location.href;
    this.ActivatedRoute.params.subscribe(params => {
      
      this.ID = atob(params["id"]);
      this.doctorid = sessionStorage.getItem("userid");
      this.startdate = sessionStorage.getItem("startdate");
      this.enddate = sessionStorage.getItem("enddate");

      this.GetAppointmetbyDociD();
    });

  }



  public GetAppointmetbyDociD() {

    this.DoctorService
      .GetBookAppointmentByDocID(this.startdate, this.enddate, this.doctorid, this.languageid)
      .subscribe(
        data => {
          
          this.loader = false;
          if (this.ID == 1) {
            this.appointmentlist = data;

            this.count = this.appointmentlist.length;
          }
          if (this.ID == 2) {
            this.appointmentlist = data;
            this.appointmentlist = this.appointmentlist.filter(
              (x: { isVisited: number; }) => x.isVisited == 1
            );
            this.count = this.appointmentlist.length;
          }
          if (this.ID == 3) {
            this.appointmentlist = data;
            this.appointmentlist = this.appointmentlist.filter(
              (x: { noShow: number; }) => x.noShow == 1
            );
            this.count = this.appointmentlist.length;
          }
          if (this.ID == 4) {
            this.appointmentlist = data;
            this.appointmentlist = this.appointmentlist.filter(
              (x: { cancelled: number; }) => x.cancelled == 1
            );
            this.count = this.appointmentlist.length;
          }
          if (this.ID == 5) {
            this.appointmentlist = data;
            this.appointmentlist = this.appointmentlist.filter(
              (x: { accepted: number; isVisited: number; docCancelled: number; cancelled: number; noShow: number; }) => x.accepted == 1 && x.isVisited == 0 && x.docCancelled == 0 && x.cancelled == 0 && x.noShow == 0
            );
            this.count = this.appointmentlist.length;
          }
          if (this.ID == 6) {
            this.appointmentlist = data;
            this.appointmentlist = this.appointmentlist.filter(
              (x: { isVisited: number; accepted: number; cancelled: number; docCancelled: number; noShow: number; }) => x.isVisited == 0 && x.accepted == 0 && x.cancelled == 0 && x.docCancelled == 0 && x.noShow == 0
            );
            this.count = this.appointmentlist.length;
          }
          if (this.ID == 7) {
            
            this.appointmentlist = data;
            this.appointmentlist = this.appointmentlist.filter(
              (x: { appointmentTypeID: number; }) => x.appointmentTypeID == 1
            );
            this.count = this.appointmentlist.length;
          }
          if (this.ID == 8) {
            this.appointmentlist = data;
            this.appointmentlist = this.appointmentlist.filter(
              (x: { appointmentTypeID: number; }) => x.appointmentTypeID == 2
            );
            this.count = this.appointmentlist.length;
          }
          if (this.ID == 9) {
            this.appointmentlist = data;
            this.appointmentlist = this.appointmentlist.filter(
              (x: { homeVisit: number; }) => x.homeVisit == 1
            );
            this.count = this.appointmentlist.length;
          }
          if (this.ID == 10) {
            this.appointmentlist = data;
            this.appointmentlist = this.appointmentlist.filter(
              (x: { docCancelled: number; }) => x.docCancelled == 1
            );
            this.count = this.appointmentlist.length;
          }
        },
        error => {

        }
      );
  }

  // public GetAppointmetbyDociD() { 
  //   this.DoctorService
  //     .GetBookAppointmentByDocID(this.startdate, this.enddate, this.doctorid, this.languageid)
  //     .subscribe(
  //       data => {
  //         this.loader=false;
  //         if (this.ID == 1) {
  //           this.appointmentlist = data;
  //           this.count = this.appointmentlist.length;
  //         }
  //         if (this.ID == 2) {
  //           this.appointmentlist = data;
  //           this.appointmentlist = this.appointmentlist.filter(
  //             ( x: { isVisited: number; }) => x.isVisited == 1);
  //           this.count = this.appointmentlist.length;
  //         }
  //         if (this.ID == 3) {
  //           this.appointmentlist = data;
  //           this.appointmentlist = this.appointmentlist.filter((x: { noShow: number; }) => x.noShow == 1);
  //           this.count = this.appointmentlist.length;
  //         }
  //         if (this.ID == 4) {
  //           this.appointmentlist = data;
  //           this.appointmentlist = this.appointmentlist.filter((x: { cancelled: number; }) => x.cancelled == 1 );
  //           this.count = this.appointmentlist.length;
  //         }
  //         if (this.ID == 5) {
  //           this.appointmentlist = data;
  //           this.appointmentlist = this.appointmentlist.filter(
  //             (x: { accepted: number; isVisited: number; docCancelled: number; cancelled: number; noShow: number; }) => x.accepted == 1 && x.isVisited == 0 && x.docCancelled == 0 && x.cancelled == 0 && x.noShow == 0
  //           );
  //           this.count = this.appointmentlist.length;
  //         }
  //         if (this.ID == 6) {
  //           this.appointmentlist = data;
  //           this.appointmentlist = this.appointmentlist.filter(
  //             (x: { isVisited: number; accepted: number; cancelled: number; docCancelled: number; noShow: number; }) => x.isVisited == 0 && x.accepted == 0 && x.cancelled == 0 && x.docCancelled == 0 && x.noShow == 0
  //           );
  //           this.count = this.appointmentlist.length;
  //         }
  //         if (this.ID == 7) {
  //           this.appointmentlist = data;
  //           this.appointmentlist = this.appointmentlist.filter(
  //             (x: { appointmentTypeID: number; }) => x.appointmentTypeID == 1
  //           );
  //           this.count = this.appointmentlist.length;
  //         }
  //         if (this.ID == 8) {
  //           this.appointmentlist = data;
  //           this.appointmentlist = this.appointmentlist.filter(
  //             (x: { appointmentTypeID: number; }) => x.appointmentTypeID == 2
  //           );
  //           this.count = this.appointmentlist.length;
  //         }
  //         if (this.ID == 9) {
  //           this.appointmentlist = data;
  //           this.appointmentlist = this.appointmentlist.filter(
  //             (x: { homeVisit: number; }) => x.homeVisit == 1
  //           );
  //           this.count = this.appointmentlist.length;
  //         }
  //         if (this.ID == 10) {
  //           this.appointmentlist = data;
  //           this.appointmentlist = this.appointmentlist.filter(
  //             (x: { docCancelled: number; }) => x.docCancelled == 1
  //           );
  //           this.count = this.appointmentlist.length;
  //         }
  //       },
  //       error => {
  //         this.SharedService.insertexceptions(this.currentUrl,"GetBookAppointmentByDocID",error);
  //         this.loader=false;
  //        }
  //     );
  // }


  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.DoctorService.GetDates(data[0]);
    this.enddate = this.DoctorService.GetDates(data[1]);
    this.GetAppointmetbyDociD();
  }





}
