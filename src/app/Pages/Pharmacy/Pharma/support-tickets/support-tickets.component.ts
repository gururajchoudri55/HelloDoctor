import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { PharmacyService } from 'src/app/Pages/services/pharmacy.service';
import { formatDate } from '@angular/common';
import Labels from '../../../Lables/Support/Supportlabels.json';

@Component({
  selector: 'app-support-tickets',
  templateUrl: './support-tickets.component.html',
  styleUrls: ['./support-tickets.component.css']
})
export class SupportTicketsComponent implements OnInit {
  loader: boolean | undefined;
  term: any;
  count: any;
  languageid: any;
  typeid: any;
  paidamount: any;
  startdate: any;
  enddate: any;
  appointmentreportList: any;
  bsRangeValue: Date[] | undefined;
  bsValue = new Date();
  maxDate = new Date();
  pharmacyid: any;
  issuelist: any
  resolvephotourl: any;
  currentUrl:any;
  labels:any;

  constructor(private PharmacyService:PharmacyService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.currentUrl=window.location.href;
    this.loader = true;
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

    this.pharmacyid = sessionStorage.getItem('pharmacyid');
    this.bsRangeValue = [start, end];

    this.GetSupportIssues()
  }


  public GetSupportIssues() {
    this.PharmacyService.GetSupportForWeb(this.languageid, this.pharmacyid, 7, this.startdate, this.enddate).subscribe(res => {
      
      this.issuelist = res;
      this.loader = false;
      this.count = this.issuelist.length;

    },error=>{
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "GetSupportForWeb", error);
    })
  }


  photourl: any;

  public GetImageUrl(photoURL: any) {

    this.photourl = photoURL
  }



  selectDate(data: any) {
    this.startdate = this.PharmacyService.GetDates(data[0])
    this.enddate = this.PharmacyService.GetDates(data[1])
    this.GetSupportIssues()
  }


  public GetResolvePhotoUrl(resolveDescription: any) {
    this.resolvephotourl = resolveDescription
  }


  
}
