import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MidwifeService } from 'src/app/Pages/services/midwife.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Midwife/midwifelables.json';

@Component({
  selector: 'app-midwife-revenue',
  templateUrl: './midwife-revenue.component.html',
  styleUrls: ['./midwife-revenue.component.css']
})
export class MidwifeRevenueComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();
  bsRangeValue: Date[] | undefined;
  loader:boolean | undefined;
  miwifeid:any;
  languageid:any;
  totalcommissions:any;
  totalamount:any;
  currentUrl:any;
  labels:any;
  
  constructor(private MidwifeService:MidwifeService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.miwifeid = sessionStorage.getItem('midwifeid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
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
    this.GetAllMidWIfeCount();
    this.GetTotalCommissions();

  }

//To get All Midwife Counts
  public GetAllMidWIfeCount() {
    this.MidwifeService.GetMidWifeCommissionDeatailsByMidWifeID(this.startdate, this.enddate, this.miwifeid).subscribe(
      data => {  
        this.loader=false;
        this.totalamount = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetMidWifeCommissionDeatailsByMidWifeID",error);
      }
    )
  }

  public GetTotalCommissions() {
    this.MidwifeService.GetMidWife_PatientPaymentCommissionByMidwifeID(this.startdate, this.enddate, this.miwifeid).subscribe(
      data => { 
        this.totalcommissions = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetMidWife_PatientPaymentCommissionByMidwifeID",error);
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
        this.GetAllMidWIfeCount();
        this.GetTotalCommissions();
      }


      revenue(id:any){

        location.href="#/midwife/MidwifeRevenueDetails/" +btoa(id);
      }


}
