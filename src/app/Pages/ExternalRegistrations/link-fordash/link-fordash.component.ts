import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { formatDate } from '@angular/common';
import { SharedService } from '../../services/shared.service';
import Labels from '../../Lables/Registrations/regilabels.json';


@Component({
  selector: 'app-link-fordash',
  templateUrl: './link-fordash.component.html',
  styleUrls: ['./link-fordash.component.css']
})
export class LinkFordashComponent implements OnInit {
  p: any;
  count: any;
  startdate: any;
  enddate: any;
  bsValue = new Date();
  maxDate = new Date();
  minDate = new Date();
  bsRangeValue: Date[] | undefined;
  loader: boolean | undefined;
  user: any;
  languageID: any;
  typeid: any;
  RegisteredList: any;
  search: any;
  linkslist: any;
  messageID:any;
  typeofPopUp:any;
  showPopup:any;
  currentUrl:any;
  labels:any;


  constructor(private CommonService: CommonService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.currentUrl=window.location.href;
    this.user = sessionStorage.getItem('user');
    var date = new Date();
    // this.startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    // this.enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // var start = new Date(date.getFullYear(), date.getMonth(), 1);
    // var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // const format = 'yyyy-MM-dd';
    // const locale = 'en-US';
    // this.startdate = formatDate(this.startdate, format, locale);

    // const format1 = 'yyyy-MM-dd';
    // const locale1 = 'en-US';
    // this.enddate = formatDate(this.enddate, format1, locale1);
    // this.bsRangeValue = [start, end];
    this.startdate = "2019-01-01";
    this.enddate = "2050-01-01";
    this.GetRegisterLinks()
  }



  public GetRegisterLinks() {
    this.CommonService.GetLinkForRegistrations(this.startdate, this.enddate, this.languageID).subscribe(data => {
      //this.linkslist = data;
      this.linkslist = data.filter((x: { addressLink: any; }) => x.addressLink == 'https://voiladoc.org/registration/#/Login/madagascar')
      this.count = this.linkslist.length;
      this.loader = false;
    },error=>{
       this.SharedService.insertexceptions(this.currentUrl,"GetLinkForRegistrations",error);
    })
  }


  selectDate(data:any) {
    this.startdate = this.CommonService.GetDates(data[0])
    this.enddate = this.CommonService.GetDates(data[1])
    this.GetRegisterLinks()

  }
   // Pagination

   public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

}
