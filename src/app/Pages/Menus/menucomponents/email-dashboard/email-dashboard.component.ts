import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Report/reportlabels.json'

@Component({
  selector: 'app-email-dashboard',
  templateUrl: './email-dashboard.component.html',
  styleUrls: ['./email-dashboard.component.css']
})
export class EmailDashboardComponent implements OnInit {


  p: any;
  languageid: any;
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  PatientList: any;
  count: any;
  loader: boolean | undefined;
  currentUrl: any;
  search: any;
  message: any;
  attchmentlist: any;
  labels: any;

  constructor(private MenuService: MenuService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
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

    this.GetPatientlistEmailsList();
    this.bsRangeValue = [start, end];

  }


  //Get EmailList
  public GetPatientlistEmailsList() {
    this.MenuService.GetPatientEmails(this.languageid, this.startdate, this.enddate).subscribe(
      data => {
        this.loader = false;
        this.PatientList = data;
        this.count = this.PatientList.length
      },
      error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetPatientEmails", error);
      }
    );
  }

  //To Select Date

  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.MenuService.GetDates(data[0]);
    this.enddate = this.MenuService.GetDates(data[1]);
    this.GetPatientlistEmailsList();

  }

  //Pagination
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  //get Message
  public GetMessage(message: any) {
    this.message = message;
  }

  //get Attachment
  public GetAttachmentID(id: any) {

    this.MenuService.GetEmail_Attachments(id).subscribe(
      data => {
        this.attchmentlist = data;
        for (let i = 0; i < this.attchmentlist.length; i++) {
          let fjkjhafd = this.attchmentlist[i].attchmentUrl.split('.');
          let one = fjkjhafd[fjkjhafd.length - 2].split('/');
          var re = /\\/gi;
          var path2 = one[one.length - 1].replace(/\\/g, "-");
          let two = path2.split('-');
          this.attchmentlist[i].docname = two[two.length - 2];
          
          if (fjkjhafd[fjkjhafd.length - 1] == 'txt') {
            this.attchmentlist[i].doctype = 1;
          }
          if (fjkjhafd[fjkjhafd.length - 1] == 'xlsx') {
            this.attchmentlist[i].doctype = 2;
          }
          if (fjkjhafd[fjkjhafd.length - 1] == 'pdf') {
            this.attchmentlist[i].doctype = 3;
          }
          if (fjkjhafd[fjkjhafd.length - 1] == 'pptx' || fjkjhafd[fjkjhafd.length - 1] == 'ppt') {
            this.attchmentlist[i].doctype = 4;
          }
          if (fjkjhafd[fjkjhafd.length - 1] == 'png' || fjkjhafd[fjkjhafd.length - 1] == 'jpg') {
            this.attchmentlist[i].doctype = 5;
          }
          if (fjkjhafd[fjkjhafd.length - 1] == 'mp4') {
            this.attchmentlist[i].doctype = 6;
          }
        }
      },
      error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetEmail_Attachments", error);
      }
    );
  }

}
