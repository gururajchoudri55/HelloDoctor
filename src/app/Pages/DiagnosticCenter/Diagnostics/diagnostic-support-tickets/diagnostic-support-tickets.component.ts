import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { DiagnosticService } from 'src/app/Pages/services/diagnostic.service';
import { formatDate } from '@angular/common';
import Labels from '../../../Lables/Support/Supportlabels.json';

@Component({
  selector: 'app-diagnostic-support-tickets',
  templateUrl: './diagnostic-support-tickets.component.html',
  styleUrls: ['./diagnostic-support-tickets.component.css']
})
export class DiagnosticSupportTicketsComponent implements OnInit {
  photourl:any;
  resolvephotourl:any;
  languageid:any;
  diagnosticid:any;
  startdate:any;
  enddate:any;
  dummissuelist:any;
  issuelist:any;
  count:any;
  loader:boolean | undefined;
  bsRangeValue:any;
  search:any;
  labels:any;
  currentUrl:any;


  constructor(private DiagnosticService:DiagnosticService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.diagnosticid = sessionStorage.getItem('diagnosticid');
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
    this.GetSupportIssues();

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

 
//To Get Issues List
  public GetSupportIssues() {
    this.DiagnosticService.GetSupportForWeb(this.languageid, this.diagnosticid, 8, this.startdate, this.enddate).subscribe(res => {
      this.dummissuelist = res;
      this.issuelist =res;
      this.count = this.issuelist.length;
      this.loader=false;
     
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"GetSupportForWeb",error);
    })
  }

  // To Get ImageUrl

  public GetImageUrl(photoURL: any) {

    this.photourl = photoURL
  }

public GetResolvePhotoUrl(resolveDescription: any) {
  this.resolvephotourl = resolveDescription
}

}
