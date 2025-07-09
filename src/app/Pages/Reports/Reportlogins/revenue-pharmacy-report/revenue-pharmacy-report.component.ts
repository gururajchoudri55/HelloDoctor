import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import * as XLSX from 'xlsx';
import Labels from '../../../Lables/Revenue/revenuelabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';



@Component({
  selector: 'app-revenue-pharmacy-report',
  templateUrl: './revenue-pharmacy-report.component.html',
  styleUrls: ['./revenue-pharmacy-report.component.css']
})
export class RevenuePharmacyReportComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  languageid: any;
  paymenttypeid: any;
  DiagnosticChargeslist: any;
  dummchargelist: any;
  count: any;
  GrandTotal: any;
  p: any;
  pharmacyid: any;
  search: any;
  pharmacylist: any;
  labels:any;
  loader:boolean | undefined;
  currentUrl:any;

  constructor(private CommonService:CommonService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
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

    this.bsRangeValue = [start, end];

    this.GetPharmacyHomeCareList();
    this.getpharmacyforadmin();
  }

  

  public getpharmacyforadmin() {
    
    this.CommonService.GetPharmacyForAdminByLanguageID(this.languageid).subscribe(
      data => {
        this.pharmacylist = data;
        this.loader=false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetPharmacyForAdminByLanguageID",error);
        this.loader=false;
      }
    )
  }

  public GetPaymentTypeID(even: any) {
    
    if (even.target.value != 0) {
      this.paymenttypeid = even.target.value;
      this.DiagnosticChargeslist = this.dummchargelist.filter((x: { paymentTypeID: any; }) => x.paymentTypeID == this.paymenttypeid);
      this.count = this.DiagnosticChargeslist.length;
      this.GrandTotal = 0;
      for (let i = 0; i < this.DiagnosticChargeslist.length; i++) {
        this.GrandTotal = this.GrandTotal + this.DiagnosticChargeslist[i].paidAmount;
      }

    }
    else {
      this.GetPharmacyHomeCareList();
    }
  }


  public GetPharmacyHomeCareList() {
    
    this.CommonService.GetPharmcyOrders_PaymentsReport(this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        this.DiagnosticChargeslist = data;
        this.dummchargelist = data;
        this.count = this.DiagnosticChargeslist.length;
        this.GrandTotal = 0;
        for (let i = 0; i < this.DiagnosticChargeslist.length; i++) {
          this.GrandTotal = this.GrandTotal + this.DiagnosticChargeslist[i].paidAmount;
        }
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetPharmcyOrders_PaymentsReport",error);
        this.loader=false;
      }
    )
  }


  //To Select Date

  selectDate(data: any) {
    
    this.startdate = this.CommonService.GetDates(data[0]);
    this.enddate = this.CommonService.GetDates(data[1]);
    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);
    this.GetPharmacyHomeCareList();
  }

  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


  //export to excel
  fileName = 'Revenue Pharmacy Reports.xlsx';
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



  public GetPharmacyID(even: any) {
    
    if (even.target.value != 0) {
      this.pharmacyid = even.target.value;
      this.DiagnosticChargeslist = this.dummchargelist.filter((x: { pharmacyID: any; }) => x.pharmacyID == this.pharmacyid);
      this.count = this.DiagnosticChargeslist.length;
      this.GrandTotal = 0;
      for (let i = 0; i < this.DiagnosticChargeslist.length; i++) {
        this.GrandTotal = this.GrandTotal + this.DiagnosticChargeslist[i].paidAmount;
      }
    }
    else {
      this.GetPharmacyHomeCareList();
    }
  }


}
