import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Report/reportlabels.json';


@Component({
  selector: 'app-sms-dashboard',
  templateUrl: './sms-dashboard.component.html',
  styleUrls: ['./sms-dashboard.component.css']
})
export class SmsDashboardComponent implements OnInit {
  languageid:any;
  startdate:any;
  enddate:any;
  bsRangeValue:any;
  PatientList:any;
  count:any;
  currentUrl:any;
  p:any;
  loader:boolean | undefined;
  search:any;
  labels:any;

  
  constructor(private MenuService:MenuService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem("LanguageID");
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
    this.bsRangeValue = [start, end];
    this.GetPatientSmsList();
  }

  //Get Patient SMS List

  public GetPatientSmsList() {
    this.MenuService.GetPatient_Sms(this.languageid,this.startdate,this.enddate).subscribe(
      data => {
        this.loader=false;
        this.PatientList = data;
        this.count=this.PatientList.length     
      },
      error => { 
        this.SharedService.insertexceptions(this.currentUrl,"GetPatient_Sms",error);
      }
    );
  }

   //Pagination

   public pageChanged(even:any) {

    let fgdgfgd = even;
    this.p = even;
  }

      //To Select Date

    selectDate(data: any) {
    this.loader = true;
    this.startdate = this.MenuService.GetDates(data[0]);
    this.enddate = this.MenuService.GetDates(data[1]);
    this.GetPatientSmsList();
   
  }



  
}
