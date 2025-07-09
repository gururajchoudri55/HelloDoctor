import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { DiagnosticService } from 'src/app/Pages/services/diagnostic.service';
import * as XLSX from 'xlsx';
import Labels from '../../../Lables/diagnostic/diagnosticlabels.json'

@Component({
  selector: 'app-diagnostic-home-services',
  templateUrl: './diagnostic-home-services.component.html',
  styleUrls: ['./diagnostic-home-services.component.css']
})
export class DiagnosticHomeServicesComponent implements OnInit {
  startdate:any;
  enddate:any;
  bsRangeValue:any;
  loader:boolean | undefined;
  dummchargelist:any;
  languageid:any;
  diagnosticid:any;
  search:any;
  paymenttypeid:any;
  DiagnosticChargeslist:any;
  dummchargelis1t1:any;
  count:any;
  GrandTotal:any;
  currentUrl:any;
  labels:any;
  p:any;
  

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
    this.GetPharmacyHomeCareList();

  }

         //To Select Date
         selectDate(data: any) {
          this.loader = true;
          this.startdate = this.DiagnosticService.GetDates(data[0]);
          this.enddate = this.DiagnosticService.GetDates(data[1]);
          sessionStorage.setItem("startdate", this.startdate);
          sessionStorage.setItem("enddate", this.enddate);
          this.GetPharmacyHomeCareList();
          this.loader=false;
         }

    //export to excel
    fileName = 'Orderdetails.xlsx';
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


 
//To Get PaymentType ID
    public GetPaymentTypeID(even:any) {
      if (even.target.value != 0) {
        this.paymenttypeid = even.target.value;
        this.DiagnosticChargeslist = this.dummchargelis1t1.filter((x: { paymentTypeID: any; }) => x.paymentTypeID == this.paymenttypeid);
        this.count = this.DiagnosticChargeslist.length;
        this.GrandTotal = 0;     
        for (let i = 0; i < this.DiagnosticChargeslist.length; i++) {
          this.GrandTotal = this.GrandTotal + this.DiagnosticChargeslist[i].paidAmount;
          this.loader=false;
        }
      }
      else {
        this.GetPharmacyHomeCareList();
        this.loader=false;
      }
    }



    public GetPharmacyHomeCareList() {
      this.DiagnosticService.GetDianosticAppointments_PaymentsReport(this.startdate, this.enddate, this.languageid).subscribe(
        data => {    
          this.dummchargelist = data;
          this.DiagnosticChargeslist = this.dummchargelist.filter((x: { diagnosticCenterID: any; }) => x.diagnosticCenterID == this.diagnosticid);         
          this.dummchargelis1t1 = this.DiagnosticChargeslist
          this.count = this.DiagnosticChargeslist.length;
          this.loader=false;
          this.GrandTotal = 0;
          for (let i = 0; i < this.DiagnosticChargeslist.length; i++) {
            this.GrandTotal = this.GrandTotal + this.DiagnosticChargeslist[i].paidAmount;
          }
  
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl,"GetDianosticAppointments_PaymentsReport",error);
          this.loader=false;
        }
      )
    }


    



 // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }






}
