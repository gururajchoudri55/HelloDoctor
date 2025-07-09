import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/Doctor/doctor.service';
import { SharedService } from '../../services/shared.service';
import  Labels from '../../../Pages/Lables/Doctors/AllLabels.json';

@Component({
  selector: 'app-my-revenue',
  templateUrl: './my-revenue.component.html',
  styleUrls: ['./my-revenue.component.css']
})
export class MyRevenueComponent implements OnInit {

  constructor(private DoctorService: DoctorService, private SharedService: SharedService) { }
  loader: boolean | undefined;
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  languageid: any;
  doctorid: any;
  Notificationslist: any;
  count: any;
  currentUrl: any;
  search: any;
  inclinicount: any;
  vediocountcommision: any;
  labels:any;
  
  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.doctorid = sessionStorage.getItem('userid');

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

    sessionStorage.setItem('startdate',this.startdate)
    sessionStorage.setItem('enddate',this.enddate)

    this.GetInclinicCommissionCount();
    this.GetVideoAllCommsiionRevenue();
  }



  public GetInclinicCommissionCount() {
    this.DoctorService.GetDoctorCommissionFeesByAdminRevenueByInclinRevenueByDocID(this.startdate, this.enddate, this.doctorid).subscribe(
      data => {
        this.inclinicount = data;
        this.loader = false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetDoctorCommissionFeesByAdminRevenueByInclinRevenueByDocID", error);
        this.loader = false;
      }
    )
  }



  public GetVideoAllCommsiionRevenue() {
    this.DoctorService.GetDoctorCommissionFeesByAdminRevenueByVedoevenueByDocID(this.startdate, this.enddate, this.doctorid).subscribe(
      data => {

        this.vediocountcommision = data;
        this.loader = false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetDoctorCommissionFeesByAdminRevenueByVedoevenueByDocID", error);
        this.loader = false;
      }
    )
  }

  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.DoctorService.GetDates(data[0]);
    this.enddate = this.DoctorService.GetDates(data[1]);
    this.GetInclinicCommissionCount();
    this.GetVideoAllCommsiionRevenue()
    sessionStorage.setItem('startdate',this.startdate)
    sessionStorage.setItem('enddate',this.enddate)
  }



  gotoRevenueDash(id: any) {
    location.href = "#/Doctor/RevenueDetails/" + btoa(id)
  }
}
