import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MidwifeService } from 'src/app/Pages/services/midwife.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Support/Supportlabels.json';

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
  languageid:any;
  midwifeid:any;
  dummissuelist:any;
  issueList:any;
  count:any;
  photourl:any;
  resolvephotourl:any;
  search:any;
  labels:any;
  currentUrl:any;

  constructor(private MidwifeService:MidwifeService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.midwifeid = sessionStorage.getItem('midwifeid');
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

  
         //To Select Date
         selectDate(data: any) {
          this.loader = true;
          this.startdate = this.MidwifeService.GetDates(data[0]);
          this.enddate = this.MidwifeService.GetDates(data[1]);
          sessionStorage.setItem("startdate", this.startdate);
          sessionStorage.setItem("enddate", this.enddate);
          this.GetSupportIssues();
    }


//Get Support ISuues List
    public GetSupportIssues() {
      this.MidwifeService.GetSupportForWeb(this.languageid, this.midwifeid, 4, this.startdate, this.enddate).subscribe(res => {  
        this.dummissuelist = res;
        this.issueList = res;
        // this.dummissuelist.filter(x => x.resolved == 0)
        this.count = this.issueList.length;
        this.loader=false;
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"GetSupportForWeb",error);
      })
    }



    public GetImageUrl(photoURL: any) {

      this.photourl = photoURL
    }

    
  public GetResolvePhotoUrl(resolveDescription: any) {
    this.resolvephotourl = resolveDescription
  }

 
}
