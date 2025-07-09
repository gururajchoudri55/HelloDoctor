import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import Labels from '../../../Lables/managelogins/managelabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-registered-entities',
  templateUrl: './registered-entities.component.html',
  styleUrls: ['./registered-entities.component.css']
})
export class RegisteredEntitiesComponent implements OnInit {
  loader:boolean | undefined;
  allcounts:any;

  constructor(private CommonService:CommonService,private SharedService:SharedService) { }
  languageid:any;
  labels:any;
  currentUrl:any;
  bsRangeValue:any;


  ngOnInit(): void {

    var date = new Date();
    this.startdate = "2019-01-01";
    this.enddate = "2030-01-01"

    var start = new Date(this.startdate);
    var end = new Date(this.enddate);

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);

    const format1 = 'yyyy-MM-dd';
    const locale1 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale1);

    this.bsRangeValue = [start, end];
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.GetCounts();


   
  }


  public GetCounts() {
    this.CommonService.GetAdminDashboardCounts(this.languageid, this.startdate, this.enddate).subscribe(
      data => {     
        this.allcounts = data;
        this.loader=false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetAdminDashboardCounts",error);
        this.loader=false;
      }
    )
  }

  startdate:any;
  enddate:any;

  selectDate(data: any) {
    this.startdate = this.CommonService.GetDates(data[0]);
    this.enddate = this.CommonService.GetDates(data[1]);
    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);
    this.GetCounts()
    
   
  }
}
