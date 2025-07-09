import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PhysioService } from 'src/app/Pages/services/physio.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/physiotherapist/physiolabels.json';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();
  bsRangeValue: Date[] | undefined;
  loader:boolean | undefined;
  languageid:any;
  currentUrl:any;
  physioid:any;
  NotificationsList:any;
  count:any;
  search:any;
  p:any;
  labels:any;
  

  constructor(private SharedService:SharedService,private PhysioService:PhysioService ) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.physioid = sessionStorage.getItem('physioid');
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
    this.GetNotifications_NPMWeb();
  }


  public GetNotifications_NPMWeb(){
   
    this.PhysioService.GetNotifications_NPMWeb(this.physioid, this.startdate, this.enddate, 26,this.languageid).subscribe(
      data => {
        this.loader=false;
        this.NotificationsList = data;
        this.count = this.NotificationsList.length
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetNotifications_NPMWeb",error);
        this.loader=false;
      }
    )
  }

       //To Select Date
       selectDate(data: any) {
        this.loader = true;
        this.startdate = this.PhysioService.GetDates(data[0]);
        this.enddate = this.PhysioService.GetDates(data[1]);
        sessionStorage.setItem("startdate", this.startdate);
        sessionStorage.setItem("enddate", this.enddate);
        this.GetNotifications_NPMWeb();
  }

    // Pagination

    public pageChanged(even: any) {

      let fgdgfgd = even;
      this.p = even;
    }

}
