import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { formatDate } from '@angular/common';
import { SharedService } from '../../services/shared.service';
import Labels from '../../Lables/Registrations/regilabels.json';



@Component({
  selector: 'app-approved-users',
  templateUrl: './approved-users.component.html',
  styleUrls: ['./approved-users.component.css']
})
export class ApprovedUsersComponent implements OnInit {
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
  currentUrl:any;
  labels:any;
  

  constructor(private CommonService: CommonService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl=window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.user = sessionStorage.getItem('user');
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

    this.typeid = 1
    this.GetRegistreedVoiladocusers()
    this.GetAllRegisteredUsersCount()
  }



  

  countlist: any;

  public GetAllRegisteredUsersCount() {
    this.CommonService.GetAllRegisteredUsersCount(this.startdate, this.enddate).subscribe(data => {
      // this.RegisteredList = data;
      this.countlist = data;

      this.loader = false;
    },error=>{
      this.loader = false;
    })
  }


  public dummreglist: any;

  public GetRegistreedVoiladocusers() {
    this.CommonService.GetVoiladocRegistrationsUsers(this.startdate, this.enddate, this.typeid, this.languageID).subscribe(data => {
      // this.RegisteredList = data;
      this.dummreglist = data;
      // this.RegisteredList = this.dummreglist.filter((x: { approved: number; }) => x.approved == 1)
      this.RegisteredList = this.dummreglist.filter((x: { approved: boolean; addressLink:any}) => x.approved && x.addressLink == 'https://voiladoc.org/registration/#/Login/madagascar')
      this.count = this.RegisteredList.length;
      this.loader = false;

    },error=>{
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl,"GetVoiladocRegistrationsUsers",error);
    })
  }




  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.CommonService.GetDates(data[0]);
    this.enddate = this.CommonService.GetDates(data[1]);
    this.GetRegistreedVoiladocusers()
  }


  public GetTypeID(even:any) {
    this.typeid = even.target.value;
    
    this.GetRegistreedVoiladocusers()
  }

}
