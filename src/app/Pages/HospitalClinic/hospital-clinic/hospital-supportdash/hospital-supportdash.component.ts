import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { DiagnosticService } from 'src/app/Pages/services/diagnostic.service';
import { formatDate } from '@angular/common';
import Labels from '../../../Lables/Support/Supportlabels.json'

@Component({
  selector: 'app-hospital-supportdash',
  templateUrl: './hospital-supportdash.component.html',
  styleUrls: ['./hospital-supportdash.component.css']
})
export class HospitalSupportdashComponent implements OnInit {
  startdate:any;
  enddate:any;
  bsRangeValue:any;
  hospitalid:any;
  languageid:any;
  dummissuelist:any;
  issuelist:any;
  count:any;
  photourl:any;
  resolvephotourl:any;
  loader:boolean | undefined;
  currentUrl:any;
  search:any;
  labels:any;
  p:any;
  

  constructor(private DiagnosticService:DiagnosticService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.hospitalid = sessionStorage.getItem('hospitalid');
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
    this.GetSupportIssues();
  }




  public GetSupportIssues() {
    this.DiagnosticService.GetSupportForWeb(this.languageid, this.hospitalid, 5, this.startdate, this.enddate).subscribe(res => {
      this.dummissuelist = res;
      this.issuelist = res;
      this.count = this.issuelist.length;
      this.loader=false;
    })
  }

          //To Select Date
          selectDate(data: any) {
            this.loader = true;
            this.startdate = this.DiagnosticService.GetDates(data[0]);
            this.enddate = this.DiagnosticService.GetDates(data[1]);
            sessionStorage.setItem("startdate", this.startdate);
            sessionStorage.setItem("enddate", this.enddate);
            this.GetSupportIssues();
      }

  

 // Pagination

 public pageChanged(even: any) {

  let fgdgfgd = even;
  this.p = even;
}

      public GetImageUrl(photoURL: any) {
        this.photourl = photoURL
      }
    
    public GetResolvePhotoUrl(resolveDescription: any) {
      this.resolvephotourl = resolveDescription
    }



}
