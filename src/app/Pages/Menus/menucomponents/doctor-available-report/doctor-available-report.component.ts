import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { formatDate } from '@angular/common';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Report/reportlabels.json';
import { CommonService } from 'src/app/Pages/services/common.service';

@Component({
  selector: 'app-doctor-available-report',
  templateUrl: './doctor-available-report.component.html',
  styleUrls: ['./doctor-available-report.component.css']
})
export class DoctorAvailableReportComponent implements OnInit {
  
  constructor(private MenuService: MenuService, private SharedService: SharedService,private CommonService:CommonService) { }

  loader: boolean | undefined;
  typeid: any;
  auditReportList: any;
  dummauditReportList: any;
  startdate: any;
  enddate: any;
  languageid: any;
  p: any;
  bsRangeValue: any;
  search: any;
  count: any;
  currentUrl: any;
  ShowSms: boolean | undefined;
  labels: any;
  departmentList: any;
  dayID: any;
  AppointmentTypeID: any;
  AppointmentDate: any;
  typeID: any;
  DepartmentID: any;
  ReportList: any;
  todayDate: any;
  departmentID: any;
  filterList: any;
 
  ngOnInit(): void {
     this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    var date = new Date();
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.todayDate = formatDate(date, format, locale);
    this.AppointmentDate = formatDate(date, format, locale);
    this.departmentID=0;
    this.AppointmentTypeID = 2;
    this.DepartmentID = 1;
    this.typeID = 2
    this.getDay();
    this.getDepartmentMaster();
  }



 


  getDay() {
    var gsDayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    var d = new Date(this.AppointmentDate);
    var dayName = gsDayNames[d.getDay()];

    this.MenuService.GetDayID(dayName).subscribe(data => {

      this.dayID = data[0].dayID;
      this.getDoctorAvailableReport()
    })
  }



  getDoctorAvailableReport() {
    this.MenuService.GetDoctorsTimeWiseWeb(this.dayID, this.AppointmentDate, this.AppointmentTypeID, this.typeID, this.DepartmentID).subscribe(async data => {
      this.loader = false;
      this.filterList=data;
      this.ReportList = data;
      this.count=this.ReportList.length;
      console.log("Report List", this.ReportList)

    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "GetProvidersAuditReport", error);
    })
  }


  selectDate(data: any) {
    
    this.loader = true;
    this.startdate = this.MenuService.GetDates(data[0]);
    this.enddate = this.MenuService.GetDates(data[1]);
    this.getDoctorAvailableReport();
    
  }


  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }



  changeAppointmentTypeID(even: any) {
    this.loader=true;
    this.AppointmentTypeID = even.target.value;
    this.getDay()
  }


  getAppointmentDate(AppointmentDate: any) {
    this.loader=true;
    this.AppointmentDate = this.CommonService.GetDates(AppointmentDate);
    console.log("exoneration Period From Date", this.AppointmentDate);

    if(this.todayDate==this.AppointmentDate)
    {
      
      this.typeID=2
      this.getDay()
    }
    else{
      
      this.typeID=1
      this.getDay()
    }

  
  }

  // DepartmentMaster

  public getDepartmentMaster() {

    this.CommonService.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.departmentList = data;
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetDepartmentMasterByLanguageID", error);
      }
    )
  }
  public GetDepartmentID(even: any) {
    this.departmentID = even.target.value;
    this.ReportList = this.filterList.filter((x: { depID: number; }) => x.depID ==  this.departmentID);
    this.count=this.ReportList.length;
  }
}
