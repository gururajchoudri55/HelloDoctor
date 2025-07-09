import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { CommonService } from 'src/app/Pages/services/common.service';
import Labels from '../../../Lables/Revenue/revenuelabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-all-monthly-subscriptions',
  templateUrl: './all-monthly-subscriptions.component.html',
  styleUrls: ['./all-monthly-subscriptions.component.css']
})
export class AllMonthlySubscriptionsComponent implements OnInit {
  startdate:any;
  enddate:any;
  bsRangeValue:any;
  p:any;
  search:any;
  languageid:any;
  typeid:any;
  AllDetails:any;
  count:any;
  term:any;
  labels:any;
  loader:boolean | undefined;
  currentUrl:any;

  
  constructor(private CommonService:CommonService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.typeid = sessionStorage.getItem('TypeID');
    this.GetAllProviderReports();
  }



  
  dummAlldetails: any;
  public GetAllProviderReports() {
    
    this.CommonService.GetAllProvidersMontlySubscriptions(this.languageid).subscribe(
      data => {
        
        // this.AllDetails = data;
        this.dummAlldetails = data;
        this.AllDetails = this.dummAlldetails.filter((x: { typeid: any; }) => x.typeid == this.typeid)
        this.count = this.AllDetails.length;
        this.loader=false;
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetAllProvidersMontlySubscriptions",error);
      }
    )
  }

  GettypeID(even:any) {
    this.typeid = even.target.value;
    if (even.target.value != 0) {
      this.AllDetails = this.dummAlldetails.filter((x: { typeid: any; }) => x.typeid == this.typeid)
    }
    else {
      this.GetAllProviderReports();
    }
  }

     //To Select Date
     selectDate(data: any) {
      this.startdate = this.CommonService.GetDates(data[0]);
      this.enddate = this.CommonService.GetDates(data[1]);
      sessionStorage.setItem("startdate", this.startdate);
      sessionStorage.setItem("enddate", this.enddate);
       this.GetAllProviderReports();
    }

      // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


     //export to excel
     fileName = 'Approved Applicants Reports.xlsx';
     exportexcel(): void {
       /* table id is passed over here */
       let element = document.getElementById('download');
       
       const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
       
   
       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
   
       /* save to file */
       XLSX.writeFile(wb, this.fileName);
   
     }

}
