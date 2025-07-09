import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NurseService } from 'src/app/Pages/services/nurse.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Nurse/nurselabels.json';

@Component({
  selector: 'app-nurse-revenue',
  templateUrl: './nurse-revenue.component.html',
  styleUrls: ['./nurse-revenue.component.css']
})
export class NurseRevenueComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();
  bsRangeValue: Date[] | undefined;
  loader: boolean | undefined;
  totalamount: any;
  nurseid: any;
  languageid: any;
  currentUrl: any;
  labels:any;
  

  constructor(private NurseService: NurseService, private SharedService: SharedService) { }

  ngOnInit(): void {

    this.loader = true;
    this.currentUrl = window.location.href;
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

    this.nurseid = sessionStorage.getItem('nurseid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.bsRangeValue = [start, end];

    this.GetAllNurseAmount();

  }



  public GetAllNurseAmount() {
    this.NurseService.GetNurseCommissionDeatailsAdminRevenueByNurseID(this.startdate, this.enddate, this.nurseid).subscribe(
      data => {
        this.loader = false;
        this.totalamount = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetNurseCommissionDeatailsAdminRevenueByNurseID", error);
        this.loader = false;
      }
    )
  }


  Dashboard(id: any) {
    location.href = "#/Nurse/NurseAdminDashboard/" + btoa(id)
  }


  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.NurseService.GetDates(data[0]);
    this.enddate = this.NurseService.GetDates(data[1]);
    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);
    this.GetAllNurseAmount();
  }


}
