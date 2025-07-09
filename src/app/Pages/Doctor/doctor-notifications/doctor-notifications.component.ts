import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DoctorService } from '../../services/Doctor/doctor.service';
import { formatDate } from '@angular/common';
import Labels from '../../../Pages/Lables/Doctors/AllLabels.json';

@Component({
  selector: 'app-doctor-notifications',
  templateUrl: './doctor-notifications.component.html',
  styleUrls: ['./doctor-notifications.component.css'],
})
export class DoctorNotificationsComponent implements OnInit {
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
  labels: any;
  p: any;

  constructor(
    private DoctorService: DoctorService,
    private SharedService: SharedService
  ) {}

  ngOnInit(): void {
    debugger;
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
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
    this.getNotifications();
  }

  //get Notifications

  getNotifications() {
    debugger;
    this.DoctorService.GetNotifications_DoctorByDoctorIDWeb(
      this.doctorid,
      this.startdate,
      this.enddate,
      this.languageid
    ).subscribe(
      (data) => {
        this.loader = false;
        this.Notificationslist = data;
        this.count = this.Notificationslist.length;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetNotifications_DoctorByDoctorIDWeb',
          error
        );
      }
    );
  }

  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.DoctorService.GetDates(data[0]);
    this.enddate = this.DoctorService.GetDates(data[1]);
    this.getNotifications();
  }

  // Pagination

  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }
}
