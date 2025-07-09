import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { FinanceService } from 'src/app/Pages/services/finance.service';
import { formatDate } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
declare var window: any;
import Labels from '../../../Lables/finance/finance.json';



@Component({
  selector: 'app-all-provider-paymrnts',
  templateUrl: './all-provider-paymrnts.component.html',
  styleUrls: ['./all-provider-paymrnts.component.css']
})
export class AllProviderPaymrntsComponent implements OnInit {
  todaydate: any;
  languageid: any;
  month: any;
  year: any;
  typeid: any;
  alldetails: any;
  count: any;
  GrandTotal: any;
  totrevenue: any;
  totalcommission: any;
  vatAmount: any;
  paymentdue: any;
  userid: any;
  hospitalname: any;
  phoneNo: any;
  address: any;
  emailid: any;
  monthName: any;
  socialSeccurityNo: any;
  businessid: any;
  nameofthebank: any;
  accountName: any;
  pincode: any;
  accountNumber: any;
  invoicenumber: any;
  monthlyStatement: any;
  p: any;
  search: any;
  loader: boolean | undefined;
  currentUrl: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  transctionid: any;
  chequeno: any;
  paymenttypeid: any;
  invoiceurl: any;
  formModal: any;
  labels:any;
  

  constructor(private FinanceService: FinanceService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("alldetails")
    )

    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    var date = new Date();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
    this.typeid = 1
    this.GetAllRevenue();

  }


  public GetList(details: any) {

    if (this.typeid == 3 || this.typeid == 4 || this.typeid == 5 || this.typeid == 6) {
      this.formModal.show()
    }
    this.totrevenue = details.grandTotalAmount
    this.totalcommission = details.totalCommissionsAmount,
      this.vatAmount = Number(details.totalCommissionsAmount * details.vatPercentage / 100)
    this.paymentdue = Number(details.grandTotalAmount) - Number(details.totalCommissionsAmount) + this.vatAmount,
      this.userid = details.id,
      this.hospitalname = details.providername
    this.phoneNo = details.contactPersonPhNo
    this.address = details.address
    this.emailid = details.emailID
    this.monthName = details.month
    this.socialSeccurityNo = details.socialSeccurityNo
    this.businessid = details.businessID
    this.nameofthebank = details.nameofthebank
    this.accountName = details.accountName,
      this.pincode = details.pincode
    this.accountNumber = details.accountNumber
    this.invoicenumber = Math.floor(100000 + Math.random() * 900000);
    
    this.FinanceService.GetDoctorsMonthlyStatement(details.id, this.month, this.year, this.languageid, this.typeid).subscribe(data => {
      
      this.monthlyStatement = data;
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "GetDoctorsMonthlyStatement", error);
    })
  }



  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


  //export to excel
  fileName = 'Reports.xlsx';
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



  public GetAllRevenue() {
    this.FinanceService.GetAllAdminPayments(this.year, this.month, this.typeid).subscribe(data => {

      this.alldetails = data;
      this.count = this.alldetails.length;
      this.loader = false;
      this.GrandTotal = 0;
      for (let i = 0; i < this.alldetails.length; i++) {
        
        this.GrandTotal = this.GrandTotal + Number(this.alldetails[i].grandTotalAmount);
      }
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "GetAllAdminPayments", error);
      this.loader = false;
    })
  }



  public GetTypeID(even: any) {
    this.typeid = even.target.value;
    this.loader = true;
    this.GetAllRevenue()
  }


  public GetYear(even: any) {
    this.year = even.target.value;
    this.loader = true;
    this.GetAllRevenue()
  }


  public GetMonth(even: any) {
    this.loader = true;
    this.month = even.target.value;
    this.GetAllRevenue()
  }



  public InsertPayments() {
    this.showPopup = 0;
    var entity = {
      'TypeID': this.typeid,
      'UserID': this.userid,
      'Month': this.month,
      'Year': this.year,
      'TransctionID': this.transctionid,
      'ChequeNo': this.chequeno,
      'PaymentType': this.paymenttypeid,
      'TransctionPhoto': this.invoiceurl,
      'TotalRevenue': this.totrevenue,
      'VoiladocRevenue': this.totalcommission,
      'PaidAmount': this.paymentdue
    }
    this.FinanceService.InsertProviderPaidPayments(entity).subscribe(async data => {
      this.showPopup = 1;
      this.messageID = 55,
        this.typeofPopUp = 1;
      this.GetAllRevenue()
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"InsertProviderPaidPayments",error);
    })
  }




  pdfContent: any



  public SavePDF() {
    ;
    this.loader = true;
    this.pdfContent = window.document.getElementById("content");
    var doc = new jsPDF('p', 'mm', "a4");

    html2canvas(this.pdfContent).then(canvas => {
      ;
      var imgData = canvas.toDataURL('image/jpeg', 1.0);

      doc.setFontSize(3);

      doc.addImage(imgData, 'JPEG', 10, 10, 180, 150);
      var pdf = doc.output('blob');

      var file = new File([pdf], "Invoice" + ".pdf");

      let body = new FormData();

      body.append('Dan', file);


      this.FinanceService.UploadInvoicePDF(file).subscribe(res => {
        ;

        this.invoiceurl = res;
        this.InsertPayments()

        doc.save(this.hospitalname + this.month + this.year + '.pdf');
      });
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"UploadInvoicePDF",error);
    });

  }


}
