import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import Labels from '../../Lables/Registrations/regilabels.json';

@Component({
  selector: 'app-rejected-users',
  templateUrl: './rejected-users.component.html',
  styleUrls: ['./rejected-users.component.css']
})
export class RejectedUsersComponent implements OnInit {
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
  labels:any;
  

  constructor(private CommonService: CommonService) { }

  ngOnInit(): void {
    this.loader = true;
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
      // this.RegisteredList = this.dummreglist.filter((x: { rejected: number; }) => x.rejected == 1)
      this.RegisteredList = this.dummreglist.filter((x: { rejected: boolean; }) => x.rejected)
      this.count = this.RegisteredList.length;
      this.loader = false;

    },error=>{
      this.loader = false;
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
