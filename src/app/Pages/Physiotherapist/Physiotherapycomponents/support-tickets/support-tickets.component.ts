import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { PhysioService } from 'src/app/Pages/services/physio.service';
import { formatDate } from '@angular/common';
import Labels from '../../../Lables/Support/Supportlabels.json'

@Component({
  selector: 'app-support-tickets',
  templateUrl: './support-tickets.component.html',
  styleUrls: ['./support-tickets.component.css']
})
export class SupportTicketsComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();
  bsRangeValue: Date[] | undefined;
  loader:boolean | undefined;
  photourl:any;
  resolvephotourl:any;
  physioid:any;
  languageid:any;
  dummissuelist:any;
  issueList:any;
  count:any;
  currentUrl:any
   search:any;
   labels:any;

   
  constructor(private PhysioService:PhysioService,private SharedService:SharedService) { }

  ngOnInit(): void {
    var date = new Date();
    this.currentUrl=window.location.href;
    this.physioid = sessionStorage.getItem('physioid');
    this.loader=true;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
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
    this.PhysioService.GetSupportForWeb(this.languageid, this.physioid, 3, this.startdate, this.enddate).subscribe(res => {
      this.loader=false;
      this.dummissuelist = res;
      this.issueList =res;
      this.count = this.issueList.length;
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"GetSupportForWeb",error);
      this.loader=false;
    })
  }





         //To Select Date
         selectDate(data: any) {
          this.loader = true;
          this.startdate = this.PhysioService.GetDates(data[0]);
          this.enddate = this.PhysioService.GetDates(data[1]);
          sessionStorage.setItem("startdate", this.startdate);
          sessionStorage.setItem("enddate", this.enddate);
          this.GetSupportIssues();
    }


    public GetImageUrl(photoURL: any) {

      this.photourl = photoURL
    }

    
  public GetResolvePhotoUrl(resolveDescription: any) {
    this.resolvephotourl = resolveDescription
  }
  

}
