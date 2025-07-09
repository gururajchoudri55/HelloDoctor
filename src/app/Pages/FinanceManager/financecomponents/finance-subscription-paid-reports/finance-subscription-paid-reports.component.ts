import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { FinanceService } from 'src/app/Pages/services/finance.service';
import { formatDate } from '@angular/common';
import Labels from '../../../Lables/finance/finance.json';

@Component({
  selector: 'app-finance-subscription-paid-reports',
  templateUrl: './finance-subscription-paid-reports.component.html',
  styleUrls: ['./finance-subscription-paid-reports.component.css']
})
export class FinanceSubscriptionPaidReportsComponent implements OnInit {
  languageid:any;
  todaydate:any;
  month:any;
  year:any;
  typeid:any;
  reportList:any;
  id: any;
  paidAmount:any;
  reportphotourl:any=[];
  comments:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  loader:boolean | undefined;
  folderName:any;
  search:any;
  labels:any;
  currentUrl:any;

  
  constructor(private FinanceService:FinanceService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.languageid = sessionStorage.getItem('LanguageID');
    var date = new Date();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
    this.typeid = 1
    this.getsentInvoice();
  }

  getsentInvoice() {
    
    this.FinanceService.GetSentInvoice(this.typeid, this.year, this.month, this.languageid).subscribe(data => {
      this.reportList = data.filter(x => x.paid == 0);
      
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"GetSentInvoice",error);
    })
  }

  
  public GetYear(even:any) {
    this.year = even.target.value;
    this.getsentInvoice()
  }


  public GetMonth(even:any) {
    this.month = even.target.value;
    this.getsentInvoice()
  }


  GetType(even:any) {
    this.typeid = even.target.value;
    this.getsentInvoice()
  }
  amountPaid(details:any) {
    
    this.id = details.id,
      this.paidAmount = details.invoiceAmount
  }

  InsertPayments() {
    var entity = {
      'ID': this.id,
      'AttchmentUrl': this.reportphotourl[0],
      'PaidAmount': this.paidAmount,
      'Comments': this.comments
    }
    this.FinanceService.UpodateSentInvoice(entity).subscribe(data => {
    
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"UpodateSentInvoice",error);
    })
  }


  files: File[] = [];

  onSelect(event: any) {
    this.loader = true;
    this.showPopup = 0;
    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadsAttchments();
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.reportphotourl.splice(this.files.indexOf(event), 1);
  }


  uploadsAttchments() {
    this.folderName = "Images/reportphoto"
    this.FinanceService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
      this.reportphotourl.push(res);
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("reportphoto", this.reportphotourl);
      this.loader = false;
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"AllFilesUploads",error);
    })
  }






}


