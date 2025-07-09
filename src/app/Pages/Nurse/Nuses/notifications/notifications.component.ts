import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { NurseService } from 'src/app/Pages/services/nurse.service';
import Labels from '../../../Lables/Nurse/nurselabels.json';

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
  loader: boolean | undefined;
  nurseid: any;
  languageid: any;
  Notificationslist: any;
  count: any;
  term: any;
  currentUrl: any;
  labels:any;
  p:any;
  
  
  constructor(private NurseService: NurseService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.nurseid = sessionStorage.getItem('nurseid');
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

    sessionStorage.setItem('startdate', this.startdate);
    sessionStorage.setItem('enddate', this.enddate);

    this.bsRangeValue = [start, end];
    this.getNotifications()
  }


  getNotifications() {
    this.NurseService.GetNotifications_NPMWeb(this.nurseid, this.startdate, this.enddate, 25, this.languageid).subscribe(
      data => {
        this.loader = false;
        this.Notificationslist = data;
        this.count = this.Notificationslist.length
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetNurseListForRegisteringLogin", error);
      }
    )
  }

  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.NurseService.GetDates(data[0]);
    this.enddate = this.NurseService.GetDates(data[1]);
    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);
    this.getNotifications()
  }


  
 // Pagination

 public pageChanged(even: any) {

  let fgdgfgd = even;
  this.p = even;
}


}
