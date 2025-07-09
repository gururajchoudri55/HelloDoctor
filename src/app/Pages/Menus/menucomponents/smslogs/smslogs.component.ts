import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { formatDate } from '@angular/common';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Report/reportlabels.json';
import { CommonService } from 'src/app/Pages/services/common.service';
@Component({
  selector: 'app-smslogs',
  templateUrl: './smslogs.component.html',
  styleUrls: ['./smslogs.component.css']
})
export class SmslogsComponent implements OnInit {
  loader: boolean | undefined;
  languageid:any;
  currentUrl:any;
  labels:any;
  todayDate:any;
  p: any;
  count:any;
  search:any;
  smsList:any;
  constructor(private MenuService: MenuService, private SharedService: SharedService,private CommonService:CommonService) { }

  ngOnInit(): void {
     this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    var date = new Date();
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    
    this.todayDate = formatDate(date, format, locale);
    this.getSmslogs()
  }



  getSmslogs()
  {
    ;
    this.MenuService.GetTwillioSms_Logs().subscribe(data=>{
      this.smsList=data;
      this.count=this.smsList.length;
      this.loader=false;
    },err=>{
      this.loader=false;
    })
  }


    // Pagination

    public pageChanged(even: any) {

      let fgdgfgd = even;
      this.p = even;
    }
  
  
  

}
