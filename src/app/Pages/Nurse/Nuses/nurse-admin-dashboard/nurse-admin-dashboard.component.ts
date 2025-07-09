import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NurseService } from 'src/app/Pages/services/nurse.service';
import Labels from '../../../Lables/Nurse/nurselabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';



@Component({
  selector: 'app-nurse-admin-dashboard',
  templateUrl: './nurse-admin-dashboard.component.html',
  styleUrls: ['./nurse-admin-dashboard.component.css']
})
export class NurseAdminDashboardComponent implements OnInit {
  loader: boolean | undefined;

  constructor(private NurseService: NurseService, private activatedroute: ActivatedRoute,private SharedService:SharedService) { }
  public id: any;
  public languageid: any;
  public nurseid: any;
  public startdate: any;
  public enddate: any;
  public appointmentreportlist: any;
  public labels: any;
  public count: any;
  public term: any;
  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();
  bsRangeValue: Date[] | undefined;
  p:any;
  currentUrl:any;



  ngOnInit(): void {
    this.loader = true;
    this.currentUrl=window.location.href;
    this.activatedroute.params.subscribe(params => {

      this.id = atob(params['id']);
    }
    )
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.nurseid = sessionStorage.getItem('nurseid');
    this.startdate = sessionStorage.getItem('startdate');
    this.enddate = sessionStorage.getItem('enddate');

    this.GetAppointmentReportsList()
  }


  public GetAppointmentReportsList() {

    this.NurseService.GetBook_Nurse_AppointmentReports(this.nurseid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
     
        if (this.id == 1) {
          this.appointmentreportlist = data;
          this.count = this.appointmentreportlist.length
        }
        if (this.id == 2) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter((x: { isVisited: number; accepted: number; nurseCancelled: number; notVisited: number; cancelled: number; }) => x.isVisited == 0 && x.accepted == 0 && x.nurseCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
          this.count = this.appointmentreportlist.length

        }
        if (this.id == 3) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter((x: { isVisited: number; accepted: number; nurseCancelled: number; notVisited: number; cancelled: number; }) => x.isVisited == 0 && x.accepted == 1 && x.nurseCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
          this.count = this.appointmentreportlist.length

        }
        if (this.id == 4) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter((x: { isVisited: number; accepted: number; nurseCancelled: number; notVisited: number; cancelled: number; }) => x.isVisited == 1 && x.accepted == 1 && x.nurseCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
          this.count = this.appointmentreportlist.length

        }

        if (this.id == 5) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter((x: { notVisited: number; }) => x.notVisited == 1);
          this.count = this.appointmentreportlist.length

        }
        if (this.id == 6) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter((x: { nurseCancelled: number; cancelled: number; }) => x.nurseCancelled == 1 || x.cancelled == 1);
          this.count = this.appointmentreportlist.length
        }
        if (this.id == 7) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter((x: { isVisited: number; accepted: number; nurseCancelled: number; notVisited: number; cancelled: number; }) => x.isVisited == 1 && x.accepted == 1 && x.nurseCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
          this.count = this.appointmentreportlist.length

        }
        this.loader = false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetBook_Nurse_AppointmentReports",error);
      }
    )
  }


  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.NurseService.GetDates(data[0]);
    this.enddate = this.NurseService.GetDates(data[1]);
    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);
    this.GetAppointmentReportsList()
  }


  
 // Pagination

 public pageChanged(even: any) {

  let fgdgfgd = even;
  this.p = even;
}


}
