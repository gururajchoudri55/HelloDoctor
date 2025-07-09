import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { NurseService } from 'src/app/Pages/services/nurse.service';
import { formatDate } from '@angular/common';
import Labels from '../../../Lables/Nurse/nurselabels.json';

@Component({
  selector: 'app-nurse-support-dash',
  templateUrl: './nurse-support-dash.component.html',
  styleUrls: ['./nurse-support-dash.component.css']
})
export class NurseSupportDashComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();
  bsRangeValue: Date[] | undefined;
  loader: boolean | undefined;

  nurseid: any;
  languageid: any;
  issuelist: any;
  labels: any;
  term: any;
  description: any;
  dummissuelist: any;
  user: any;
  count: any;
  currentUrl:any;



  constructor(private NurseService: NurseService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
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

    sessionStorage.setItem('startdate', this.startdate);
    sessionStorage.setItem('enddate', this.enddate);

    this.bsRangeValue = [start, end];

    this.description = ""
    this.nurseid = sessionStorage.getItem('nurseid');
    this.user = sessionStorage.getItem('user');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.GetSupportIssues();
  }



  public GetSupportIssues() {
    this.NurseService.GetSupportForWeb(this.languageid, this.nurseid, 2, this.startdate, this.enddate).subscribe(res => {
      this.loader = false;
      this.issuelist = res;
      this.count = this.issuelist.length;
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"GetSupportForWeb",error);
      this.loader=false;
    })
  }


  photourl: any;

  public GetImageUrl(photoURL: any) {

    this.photourl = photoURL
  }


  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.NurseService.GetDates(data[0]);
    this.enddate = this.NurseService.GetDates(data[1]);
    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);
    this.GetSupportIssues();
  }


  public resolvephotourl: any;

  public GetResolvePhotoUrl(resolveDescription: any) {
    this.resolvephotourl = resolveDescription
  }

}
