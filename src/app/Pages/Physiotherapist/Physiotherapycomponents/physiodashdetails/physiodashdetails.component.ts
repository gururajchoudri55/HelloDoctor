import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhysioService } from 'src/app/Pages/services/physio.service';
import Labels from '../../../Lables/physiotherapist/physiolabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-physiodashdetails',
  templateUrl: './physiodashdetails.component.html',
  styleUrls: ['./physiodashdetails.component.css']
})
export class PhysiodashdetailsComponent implements OnInit {
  public id: any;
  public languageid: any;
  public physioid: any;
  public startdate: any;
  public enddate: any;
  public appointmentreportlist: any;
  public count: any;
  public labels: any;
  public term: any;
  loader: boolean | undefined;
  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();
  bsRangeValue: Date[] | undefined;
  currentUrl:any;
  p:any;
  

  constructor(private PhysioService: PhysioService, private activatedroute: ActivatedRoute,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.activatedroute.params.subscribe(params => {

      this.id = atob(params['id']);
    }
    )
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.physioid = sessionStorage.getItem('physioid');
    this.startdate = sessionStorage.getItem('startdate');
    this.enddate = sessionStorage.getItem('enddate');
    this.GetAppointmentReportsList();
  }



  public GetAppointmentReportsList() {

    this.PhysioService.GetBook_Physio_AppointmentReports(this.physioid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        
        if (this.id == 1) {
          this.appointmentreportlist = data;
          this.count = this.appointmentreportlist.length;
        }
        if (this.id == 2) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter((x: { isVisited: number; accepted: number; physioCancelled: number; notVisited: number; cancelled: number; }) => x.isVisited == 0 && x.accepted == 0 && x.physioCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
          this.count = this.appointmentreportlist.length;
        }
        if (this.id == 3) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter((x: { isVisited: number; accepted: number; physioCancelled: number; notVisited: number; cancelled: number; }) => x.isVisited == 0 && x.accepted == 1 && x.physioCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
          this.count = this.appointmentreportlist.length;
        }

        if (this.id == 4) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter((x: { isVisited: number; accepted: number; physioCancelled: number; notVisited: number; cancelled: number; }) => x.isVisited == 1 && x.accepted == 1 && x.physioCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
          this.count = this.appointmentreportlist.length;
        }
        if (this.id == 5) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter((x: { physioCancelled: number; cancelled: number; }) => x.physioCancelled == 1 || x.cancelled == 1);
          this.count = this.appointmentreportlist.length;
        }
        if (this.id == 6) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter((x: { notVisited: number; }) => x.notVisited == 1);
          this.count = this.appointmentreportlist.length;
        }
        if (this.id == 7) {
          
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter((x: { isVisited: number; accepted: number; physioCancelled: number; notVisited: number; cancelled: number; }) => x.isVisited == 1 && x.accepted == 1 && x.physioCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
          this.count = this.appointmentreportlist.length;
          
        }
        this.loader=false;
      }, error => {
         this.SharedService.insertexceptions(this.currentUrl,"GetBook_Physio_AppointmentReports",error);
      }
    )
  }

  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.PhysioService.GetDates(data[0]);
    this.enddate = this.PhysioService.GetDates(data[1]);
    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);
    this.GetAppointmentReportsList()
  }



  location: any;


  getaddress(address: any) {
    this.location = address;
  }


 // Pagination

 public pageChanged(even: any) {

  let fgdgfgd = even;
  this.p = even;
}




}
