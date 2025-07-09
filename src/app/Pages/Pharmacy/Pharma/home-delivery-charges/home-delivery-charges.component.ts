import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import { PharmacyService } from 'src/app/Pages/services/pharmacy.service';
import * as XLSX from 'xlsx';
import Labels from '../../../Lables/Prescriptions/prescriptionlabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-home-delivery-charges',
  templateUrl: './home-delivery-charges.component.html',
  styleUrls: ['./home-delivery-charges.component.css']
})
export class HomeDeliveryChargesComponent implements OnInit {
  loader: boolean | undefined;

  constructor(private PharmacyService:PharmacyService,private SharedService:SharedService) { }
  bsRangeValue: Date[] | undefined;
  bsValue = new Date();
  maxDate = new Date();
  startdate:any;
  enddate:any;
  pharmacyid:any;
  DiagnosticChargeslist: any;
  count: any;
  GrandTotal: any;
  dummchargelist1: any;
  dummchargelist:any;
  languageid:any;
  paymenttypeid:any
  term:any;
  labels:any;
  p:any;
  currentUrl:any;



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
    
    this.pharmacyid = sessionStorage.getItem('pharmacyid');
    this.bsRangeValue = [start, end];

    this.GetPharmacyHomeCareList();
  }

       //export to excel
       fileName = 'Home DeliveryCharges Report.xlsx';
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

 // Pagination

 public pageChanged(even: any) {

  let fgdgfgd = even;
  this.p = even;
}
  
  public GetPharmacyHomeCareList() {
    this.PharmacyService.GetPharmcyOrders_PaymentsReport(this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        
        this.dummchargelist = data;
        this.loader=false;
        this.DiagnosticChargeslist = this.dummchargelist.filter((x: { pharmacyID: any; }) => x.pharmacyID == this.pharmacyid)
        this.dummchargelist1 = this.DiagnosticChargeslist;
        this.count = this.DiagnosticChargeslist.length;
        
        this.GrandTotal = 0;
        for (let i = 0; i < this.DiagnosticChargeslist.length; i++) {
          this.GrandTotal = this.GrandTotal + this.DiagnosticChargeslist[i].paidAmount;
        }

      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetPharmcyOrders_PaymentsReport",error);
      }
    )
  }



  selectDate(data: any) {
    this.loader=true;
    this.startdate = this.PharmacyService.GetDates(data[0])
    this.enddate = this.PharmacyService.GetDates(data[1])
    this.GetPharmacyHomeCareList()
  }


  public GetPaymentTypeID(even:any) {
    if (even.target.value != 0) {
      this.paymenttypeid = even.target.value;
      this.DiagnosticChargeslist = this.dummchargelist1.filter((x: { paymentTypeID: any; }) => x.paymentTypeID == this.paymenttypeid);
      this.count = this.DiagnosticChargeslist.length;
      this.GrandTotal = 0;
      for (let i = 0; i < this.DiagnosticChargeslist.length; i++) {
        this.GrandTotal = this.GrandTotal + this.DiagnosticChargeslist[i].paidAmount;
      }

    }
    else {
      this.loader=true;
      this.GetPharmacyHomeCareList()
    }
  }

}
