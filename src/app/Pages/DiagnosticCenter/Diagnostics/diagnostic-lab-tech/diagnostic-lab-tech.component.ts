import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { DiagnosticService } from 'src/app/Pages/services/diagnostic.service';
import Labels from '../../../Lables/diagnostic/diagnosticlabels.json';

@Component({
  selector: 'app-diagnostic-lab-tech',
  templateUrl: './diagnostic-lab-tech.component.html',
  styleUrls: ['./diagnostic-lab-tech.component.css']
})
export class DiagnosticLabTechComponent implements OnInit {
  startdate:any;
  enddate:any;
  loader:boolean | undefined;
  bsRangeValue:any;
  currentUrl:any;
  languageid:any;
  myteamlist:any;
  count:any;
  diagnosticid:any;
  userreportlist:any;
  dummuserreportlist:any;
  userid:any;
  p:any;
  search:any;
  labels:any;
  location:any;
  


  constructor(private DiagnosticService:DiagnosticService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.diagnosticid = sessionStorage.getItem('diagnosticid');
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

    this.bsRangeValue = [start, end];
    this.getdiagnosticAppointmentsbyid();
    this.GetMyTeam();

  }

//To Get Team List
  public GetMyTeam() {
    this.DiagnosticService.GetMyTeam(sessionStorage.getItem('diagnosticid')).subscribe(data => {
      this.myteamlist = data;
      this.count = this.myteamlist.length
    })
  }

//To Get UserReport List 

  public getdiagnosticAppointmentsbyid() {
    this.DiagnosticService.GetDiagnosticAppointmentsByUsersReport(this.diagnosticid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        this.userreportlist = data;
        this.count=this.userreportlist.length;
        this.dummuserreportlist = data;
        this.loader=false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticAppointmentsByUsersReport",error);
      }
    )
  }

  // To Get UserID

  public GetUserID(even:any) {
    if (even.target.value != 0) {
      this.userid = even.target.value;
      this.userreportlist = this.dummuserreportlist.filter((x: { assignedID: any; }) => x.assignedID == this.userid)
    }
    else {
      this.getdiagnosticAppointmentsbyid();
    }

  }

   //To Select Date
   selectDate(data: any) {
    this.loader = true;
    this.startdate = this.DiagnosticService.GetDates(data[0]);
    this.enddate = this.DiagnosticService.GetDates(data[1]);
    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);
    this.getdiagnosticAppointmentsbyid();
  
   }

   //Pagination

   public pageChanged(even:any) {

    let fgdgfgd = even;
    this.p = even;
  }

  GetAddress(address:any){
    this.location=address;

  }


}
