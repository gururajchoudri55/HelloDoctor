import { Component, OnInit } from '@angular/core';
import { MidwifeService } from 'src/app/Pages/services/midwife.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Midwife/midwifelables.json';

@Component({
  selector: 'app-midwife-revenue-details',
  templateUrl: './midwife-revenue-details.component.html',
  styleUrls: ['./midwife-revenue-details.component.css']
})
export class MidwifeRevenueDetailsComponent implements OnInit {
  id:any;
  midwifeid:any;
  languageid:any;
  startdate:any;
  enddate:any;
  loader:boolean | undefined;
  appointmentreportlist:any;
  count:any;
  p:any;
  search:any;
  labels:any;
  currentUrl:any;

  
  constructor(private MidwifeService:MidwifeService,private SharedService:SharedService,private ActivatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.ActivatedRoute.params.subscribe(params => {
      this.id =atob(params['id']);
    }
    )
    this.midwifeid = sessionStorage.getItem('midwifeid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.startdate = sessionStorage.getItem('startdate');
    this.enddate = sessionStorage.getItem('enddate');
    this.GetAppointmentReportsList();
  }


  
  
  public GetAppointmentReportsList() {  
    this.MidwifeService.GetBook_Book_Midwives_AppointmentReports(this.midwifeid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {   
        if (this.id == 1) {
          this.appointmentreportlist = data;
          this.count = this.appointmentreportlist.length;
        }
        if (this.id == 2) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter((x: { isVisited: number; accepted: number; midwivesCancelled: number; notVisited: number; cancelled: number; }) => x.isVisited == 0 && x.accepted == 0 && x.midwivesCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
          this.count = this.appointmentreportlist.length;
        }
        if (this.id == 3) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter((x: { isVisited: number; accepted: number; midwivesCancelled: number; notVisited: number; cancelled: number; }) => x.isVisited == 0 && x.accepted == 1 && x.midwivesCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
          this.count = this.appointmentreportlist.length;
        }

        if (this.id == 4) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter((x: { isVisited: number; accepted: number; midwivesCancelled: number; notVisited: number; cancelled: number; }) => x.isVisited == 1 && x.accepted == 1 && x.midwivesCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
          this.count = this.appointmentreportlist.length;
        }
        if (this.id == 5) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter((x: { midwivesCancelled: number; cancelled: number; }) => x.midwivesCancelled == 1 || x.cancelled == 1);
          this.count = this.appointmentreportlist.length;
        }
        if (this.id == 6) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter((x: { notVisited: number; }) => x.notVisited == 1);
          this.count = this.appointmentreportlist.length;
        }
        if (this.id == 7) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter((x: { isVisited: number; accepted: number; midwivesCancelled: number; notVisited: number; cancelled: number; }) => x.isVisited == 1 && x.accepted == 1 && x.midwivesCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
          this.count = this.appointmentreportlist.length;
        }
        this.loader=false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetBook_Book_Midwives_AppointmentReports",error);
      }
    )
  }


  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


}
