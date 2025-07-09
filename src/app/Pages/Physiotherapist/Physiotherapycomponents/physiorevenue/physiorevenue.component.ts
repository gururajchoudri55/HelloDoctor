import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PhysioService } from 'src/app/Pages/services/physio.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/physiotherapist/physiolabels.json';
@Component({
  selector: 'app-physiorevenue',
  templateUrl: './physiorevenue.component.html',
  styleUrls: ['./physiorevenue.component.css']
})
export class PhysiorevenueComponent implements OnInit {
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
  physioid: any;
  labels:any;
  constructor(private PhysioService: PhysioService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    var date = new Date();
    this.startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var start = new Date(date.getFullYear(), date.getMonth(), 1);
    var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.bsRangeValue = [start, end];
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);

    const format1 = 'yyyy-MM-dd';
    const locale1 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale1);

    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);

    this.physioid = sessionStorage.getItem('physioid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.GetPhysiofeCount();

    
    
  }


  public GetPhysiofeCount() {
    this.PhysioService.GetPhsyioTherapistCommissionDeatailsByPhysioID(this.startdate, this.enddate, this.physioid).subscribe(
      data => {
        this.loader = false;
        this.totalamount = data;
        console.log("total amount",this.totalamount);
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetPhysiotherapistLoginAdmin", error);
        this.loader=false;
      }
    )
  }

  Dashboard(id: any) {
    location.href = "#/Physiotherapist/Physiodashdetails/" + btoa(id)
  }


  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.PhysioService.GetDates(data[0]);
    this.enddate = this.PhysioService.GetDates(data[1]);
    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);
    this.GetPhysiofeCount();
  }
}
