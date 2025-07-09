import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import Labels from '../../../Lables/Report/reportlabels.json';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent implements OnInit {
  loader:boolean | undefined ;
  currentUrl:any;
  languageid:any;
  startdate:any;
  enddate:any;
  bsRangeValue:any;
  dummappointmentlist:any;
  appointmentlist:any;
  count:any;
  dummlist:any;
  p:any;
 search:any;
 appointmenttypeid:any;
 labels:any;
 
  constructor(private MenuService:MenuService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem("LanguageID");
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
    this.bsRangeValue = [start, end];
    this.getbookappointmentbydoctorid();
  }

  //get doctor  Appointment
  public getbookappointmentbydoctorid() {
    this.MenuService.GetBookAppointmentByReports(0, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        
        this.loader=false;
        this.dummappointmentlist = data;
        this.appointmentlist = this.dummappointmentlist.filter((x: { isVisited: number; }) => x.isVisited == 1)
        this.count = this.appointmentlist.length
        this.dummlist = this.appointmentlist;
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"GetBookAppointmentByReports",error);
      })
  }

  
  //Pagination
  public pageChanged(even:any) {

    let fgdgfgd = even;
    this.p = even;
  }
  
      //To Select Date
      selectDate(data: any) {
        this.loader = true;
        this.startdate = this.MenuService.GetDates(data[0]);
        this.enddate = this.MenuService.GetDates(data[1]);
        this.getbookappointmentbydoctorid();
      }
 
      //Get Appointment Type

      public GetAppointmenttype(even:any) {
        if (even.target.value != 0) {
          this.appointmenttypeid = even.target.value;
          this.appointmentlist = this.dummappointmentlist.filter((x: { appointmentTypeID: any; isVisited: number; }) => x.appointmentTypeID == this.appointmenttypeid && x.isVisited == 1);
          this.count = this.appointmentlist.length;
        }
        else {
          this.getbookappointmentbydoctorid()
        }
      }

       //export to excel
    fileName = 'Patient History Report.xlsx';
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
