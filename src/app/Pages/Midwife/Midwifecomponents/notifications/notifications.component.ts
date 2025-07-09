import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MidwifeService } from 'src/app/Pages/services/midwife.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Midwife/midwifelables.json';

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
  midwifeid:any;
  Notificationslist:any;
  count:any;
  currentUrl:any;
  search:any;
  p:any;
  labels:any;

  constructor(private MidwifeService:MidwifeService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
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
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.midwifeid=sessionStorage.getItem('midwifeid');

    this.bsRangeValue = [start, end];
    this.GetNotifications_NPMWeb();

  }
   // Pagination

   public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


       //To Select Date
       selectDate(data: any) {
         this.loader=true;
        this.startdate = this.MidwifeService.GetDates(data[0]);
        this.enddate = this.MidwifeService.GetDates(data[1]);
        sessionStorage.setItem("startdate", this.startdate);
        sessionStorage.setItem("enddate", this.enddate);
        this.GetNotifications_NPMWeb();

  }


  public GetNotifications_NPMWeb (){
    this.MidwifeService.GetNotifications_NPMWeb(this.midwifeid, this.startdate, this.enddate, 27,this.languageid).subscribe(
      data => {
        this.loader=false;
        this.Notificationslist = data;
        this.count = this.Notificationslist.length
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetNotifications_NPMWeb",error);
      }
    )
  }

}
