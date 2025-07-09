import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import Labels from '../../../Lables/Report/reportlabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';


@Component({
  selector: 'app-total-nurse-reports',
  templateUrl: './total-nurse-reports.component.html',
  styleUrls: ['./total-nurse-reports.component.css']
})
export class TotalNurseReportsComponent implements OnInit {
  startdate:any;
  enddate:any;
  bsRangeValue:any;
  languageid:any;
  nurseid:any;
  roleid:any;
  id:any;
  notshowdrop:any;
  appointmentreportlist:any;
  dummlist:any;
  count:any;
  p:any;
  showdropdown:any;
  search:any;
  hospitalid:any;
  hospitallist:any;
  showdrop:any;
  labels:any;
  loader:boolean | undefined;
  currenturl:any;
  
  constructor(private CommonService:CommonService,private ActivatedRoute:ActivatedRoute,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currenturl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.nurseid = sessionStorage.getItem('nurseid');
    this.roleid = sessionStorage.getItem('roleid');
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

    this.ActivatedRoute.params.subscribe(params => {
     
      this.id = params['id'];

    }
    )

    if (this.id == undefined) {
      this.GetAppointmentReportsList();   
    }
    else {   
      this.CommonService.GetBook_Nurse_AppointmentForWeb(this.startdate, this.enddate, this.languageid).subscribe(
        data => {
          this.notshowdrop=1;
          this.appointmentreportlist = data;
          this.dummlist = this.appointmentreportlist;
          this.count = this.appointmentreportlist.length;

          console.log("appointments",this.appointmentreportlist)
          this.loader=false;
        }, error => {
          this.SharedService.insertexceptions(this.currenturl,"GetBook_Nurse_AppointmentForWeb",error);
          this.loader=false;
        }
      )
    }
  }

  fileName = 'Nurse Appointment ReportList .xlsx';
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('download');
    
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

  public GetAppointmentReportsList() {
    this.CommonService.GetBook_Nurse_AppointmentReports(this.nurseid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        this.appointmentreportlist = data;
        this.dummlist = this.appointmentreportlist
        this.count = this.appointmentreportlist.length
      }, error => {
        this.SharedService.insertexceptions(this.currenturl,"GetBook_Nurse_AppointmentReports",error);
        this.loader=false;
      }
    )
  }
  
  public Gethsopital() {
    this.CommonService.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {
        this.hospitallist = data;
        this.loader=false;
      }, error => {
        this.SharedService.insertexceptions(this.currenturl,"GetHospital_ClinicForAdminByAdmin",error);
        this.loader=false;
      }
    )
  }


  public GetHospitalID(even:any) {
    if (even.target.value != 0) {
      this.hospitalid = even.target.value;
      this.appointmentreportlist = this.dummlist.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.hospitalid)
      this.count = this.appointmentreportlist.length
    }
    else {
    
      this.CommonService.GetBook_Nurse_AppointmentForWeb(this.startdate, this.enddate, this.languageid).subscribe(
        data => {
          this.appointmentreportlist = data;
          this.dummlist = this.appointmentreportlist
          this.count = this.appointmentreportlist.length
        }, error => {
          this.SharedService.insertexceptions(this.currenturl,"GetBook_Nurse_AppointmentForWeb",error);
        }
      )
    }
  }

  selectDate(data: any) {
    this.startdate = this.CommonService.GetDates(data[0]);
    this.enddate = this.CommonService.GetDates(data[1]);
    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);
    this.GetAppointmentReportsList()
  }

  
  public getget(even:any) {  
    if (even.target.value == 1) {
     
      let dfsfd = this.dummlist.filter((x: { isVisited: number; }) => x.isVisited == 1);
     
      this.appointmentreportlist = dfsfd;
      this.count = this.appointmentreportlist.length

    }
    if (even.target.value == 2) {
     
      let dfsfd = this.dummlist.filter((x: { nurseCancelled: number; cancelled: number; }) => x.nurseCancelled == 1 || x.cancelled == 1);
     
      this.appointmentreportlist = dfsfd;
      this.count = this.appointmentreportlist.length

    }
    if (even.target.value == 3) {
     
      let dfsfd = this.dummlist.filter((x: { notVisited: number; }) => x.notVisited == 1);
     
      this.appointmentreportlist = dfsfd;
      this.count = this.appointmentreportlist.length
    }
    if (even.target.value == 4) {   
      this.GetAppointmentReportsList();
      this.count = this.appointmentreportlist.length
      this.CommonService.GetBook_Nurse_AppointmentForWeb(this.startdate, this.enddate, this.languageid).subscribe(
        data => {   
          this.appointmentreportlist = data;
          this.dummlist = this.appointmentreportlist
          this.count = this.appointmentreportlist.length
        }, error => {
          this.SharedService.insertexceptions(this.currenturl,"GetBook_Nurse_AppointmentForWeb",error);
          this.loader=false;
        }
      )
    }

  }

   // Pagination

   public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }





}
