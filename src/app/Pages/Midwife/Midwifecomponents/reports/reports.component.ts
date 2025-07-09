import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MidwifeService } from 'src/app/Pages/services/midwife.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Midwife/midwifelables.json';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();
  bsRangeValue: Date[] | undefined;
  loader:boolean | undefined;
  id:any;
  languageid:any;
  sdate:any;
  edate:any;
  listid:any;
  showdropdown:any;
  appointmentreportlist:any;
  dummlist:any;
  hospitallist:any;
  hospitalid:any;
  term:any;
  count:any;
  labels:any;
  p:any;
  currentUrl:any;


  constructor(private MidwifeService:MidwifeService,private SharedService:SharedService,
    private ActivatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.id = sessionStorage.getItem('midwifeid');
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.sdate = sessionStorage.getItem('StartDate');
    this.edate = sessionStorage.getItem('EndDate');
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


      this.listid = params['id']
    }
    )

    if (this.listid == undefined) {
      this.GetAppointmentReportsList();
   
    }
    else {
      this.MidwifeService.GetBook_Book_Midwives_AppointmentForWeb(this.sdate, this.edate, this.languageid).subscribe(
        data => {
          this.showdropdown=1
          this.appointmentreportlist = data;
          this.dummlist = this.appointmentreportlist
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl,"GetBook_Book_Midwives_AppointmentForWeb",error);
        }
      )
    }
    this.Gethsopital();
  }


    
  public Gethsopital() {
    this.MidwifeService.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {
        this.hospitallist = data;

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetHospital_ClinicForAdminByAdmin",error);
      }
    )
  }



  
  public GetHospitalID(even:any) {
    if (even.target.value != 0) {
      this.hospitalid = even.target.value;
      this.appointmentreportlist = this.dummlist.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.hospitalid)
    }
    else {
      this.MidwifeService.GetBook_Book_Midwives_AppointmentForWeb(this.sdate, this.edate, this.languageid).subscribe(
        data => {

          this.appointmentreportlist = data;
          this.dummlist = this.appointmentreportlist
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl,"GetBook_Book_Midwives_AppointmentForWeb",error);
        }
      )
    }
  }

  public GetAppointmentReportsList() {

    this.MidwifeService.GetBook_Book_Midwives_AppointmentReports(this.id, this.startdate, this.enddate, this.languageid).subscribe(
      data => {

        this.appointmentreportlist = data;
        this.count=this.appointmentreportlist.length;
        this.dummlist = this.appointmentreportlist
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetBook_Book_Midwives_AppointmentReports",error);
      }
    )
  }
  
     //To Select Date
     selectDate(data: any) {
      this.loader = true;
      this.startdate = this.MidwifeService.GetDates(data[0]);
      this.enddate = this.MidwifeService.GetDates(data[1]);
      sessionStorage.setItem("startdate", this.startdate);
      sessionStorage.setItem("enddate", this.enddate);
      this.GetAppointmentReportsList();
  
    }


    public getget(even:any) {
      // this.featurelist.find(item => item.featureID == fid).checkbox = true;
  
      if (even.target.value == 1) {
  
        let dfsfd = this.dummlist.filter((x: { isVisited: number; }) => x.isVisited == 1);
  
        this.appointmentreportlist = dfsfd;
  
      }
      if (even.target.value == 3) {
  
        let dfsfd = this.dummlist.filter((x: { midwivesCancelled: number; cancelled: number; }) => x.midwivesCancelled == 1 || x.cancelled == 1);
  
        this.appointmentreportlist = dfsfd;
  
      }
      if (even.target.value == 4) {
  
        let dfsfd = this.dummlist.filter((x: { notVisited: number; }) => x.notVisited == 1);
  
        this.appointmentreportlist = dfsfd;
  
      }
      if (even.target.value == 5) {
  
        this.GetAppointmentReportsList();
      }
    }

        //export to excel
        fileName = 'appointmentlist.xlsx';
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

 // Pagination

 public pageChanged(even: any) {

  let fgdgfgd = even;
  this.p = even;
}




}
