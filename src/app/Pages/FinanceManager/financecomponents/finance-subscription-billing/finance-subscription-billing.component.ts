import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { FinanceService } from 'src/app/Pages/services/finance.service';
import { formatDate } from '@angular/common';
import html2canvas from 'html2canvas';
import Labels from '../../../Lables/finance/finance.json';
import jspdf, { jsPDF } from 'jspdf';

@Component({
  selector: 'app-finance-subscription-billing',
  templateUrl: './finance-subscription-billing.component.html',
  styleUrls: ['./finance-subscription-billing.component.css'],
})
export class FinanceSubscriptionBillingComponent implements OnInit {
  roleid: any;
  todaydate: any;
  languageid: any;
  month: any;
  year: any;
  typeid: any;
  billinglist: any;
  hospitalname: any;
  userid: any;
  phoneNo: any;
  monthlysub: any;
  appointmentperc: any;
  address: any;
  emailid: any;
  pincode: any;
  totalCommission: any;
  vatAmount: any;
  totalamount: any;
  invoicenumber: any;
  monthName: any;
  invoiceurl: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  search: any;
  loader: boolean | undefined;
  monthDate: any;
  nextPaymentYear: any;
  nextPaymentMonth: any;
  paymentMode: any;
  labels: any;
  currentUrl: any;
  pdfDownload: any;

  constructor(
    private FinanceService: FinanceService,
    private SharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.roleid = sessionStorage.getItem('roleid');
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    var date = new Date();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
    this.monthDate = this.year + '-' + this.month + '-' + '01';
    this.typeid = 1;
    this.GetBillingdetails();
    this.pdfDownload = document.getElementById('content');
  }

  public GetBillingdetails() {
    this.FinanceService.GetAllProviderSubscriptions(
      this.languageid,
      this.year,
      this.month,
      this.typeid,
      this.monthDate
    ).subscribe(
      (data) => {
        this.loader = false;
        this.billinglist = data;
        console.log('billing list', this.billinglist);
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetAllProviderSubscriptions',
          error
        );
      }
    );
  }

  public GetList(invlist: any) {
    this.hospitalname = invlist.providerName;
    this.userid = invlist.id;
    this.phoneNo = invlist.phoneNo;
    this.monthlysub = invlist.monthlySubscription;
    this.appointmentperc = invlist.appointmentpercentageamount;
    this.address = invlist.address;
    this.emailid = invlist.emailID;
    this.pincode = invlist.pincode;
    this.totalCommission = invlist.totalCommissionsAmount;
    var total = Number(
      invlist.monthlySubscription + invlist.totalCommissionsAmount
    );
    this.vatAmount = Number((total * invlist.vatPercentage) / 100);
    this.totalamount = Number(total + this.vatAmount);
    this.invoicenumber = Math.floor(100000 + Math.random() * 900000);
    this.monthName = invlist.name;
    (this.nextPaymentMonth = invlist.nextPaymentMonth),
      (this.nextPaymentYear = invlist.nextPaymentYear),
      (this.paymentMode = invlist.monthlyType);

    this.monthDate = this.year + '-' + this.month + '-' + '01';
    console.log('month', this.monthDate);
  }

  public GetYear(even: any) {
    this.year = even.target.value;
    this.monthDate = this.year + '-' + this.month + '-' + '01';
    console.log('month', this.monthDate);
    this.GetBillingdetails();
  }

  public GetMonth(even: any) {
    this.month = even.target.value;
    this.monthDate = this.year + '-' + this.month + '-' + '01';
    console.log('month', this.monthDate);
    this.GetBillingdetails();
  }

  GetType(even: any) {
    this.typeid = even.target.value;
    this.monthDate = this.year + '-' + this.month + '-' + '01';
    console.log('month', this.monthDate);
    this.GetBillingdetails();
  }

  pdfContent: any;

  public SavePDF() {
    this.loader = true;
    this.pdfContent = window.document.getElementById('content');
    var doc = new jsPDF('p', 'mm', 'a4');

    html2canvas(this.pdfContent).then(
      (canvas) => {
        var imgData = canvas.toDataURL('image/jpeg', 1.0);

        doc.setFontSize(3);

        doc.addImage(imgData, 'JPEG', 10, 10, 180, 150);
        var pdf = doc.output('blob');

        var file = new File([pdf], 'Invoice' + '.pdf');

        let body = new FormData();

        body.append('Dan', file);

        this.FinanceService.UploadInvoicePDF(file).subscribe((res) => {
          this.invoiceurl = res;

          this.InsertDetailes();
        });
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'UploadInvoicePDF',
          error
        );
      }
    );
  }

  public InsertDetailes() {
    var entity = {
      Type: this.typeid,
      UserID: this.userid,
      InvoiceUrl: this.invoiceurl,
      InvoiceAmount: this.totalamount,
      Year: this.year,
      Month: this.month,
      nextPaymentYear: this.nextPaymentYear,
      nextPaymentmonth: this.nextPaymentMonth,
    };
    this.FinanceService.InsertSentInvoice(entity).subscribe(
      (data) => {
        if (data != undefined) {
          this.loader = false;

          this.GetBillingdetails();
          // this.GetBillingdetails(this.type, this.startdate, this.enddate);
        }
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'InsertSentInvoice',
          error
        );
      }
    );
  }
  fileName = 'Invoices.xlsx';
  downloadpdf() {
    this.loader = true;
    this.pdfDownload.style.display = 'block';
    html2canvas(this.pdfDownload, {
      scale: 5, // Increase scale to improve image resolution
      logging: true, // Improve text rendering
    }).then((canvas) => {
      this.loader = true;

      const imgWidth = 190;
      const pageHeight = 275;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;
      heightLeft -= pageHeight - 20;
      const doc = new jspdf('p', 'mm');
      doc.addImage(
        canvas,
        'PNG',
        10,
        position,
        imgWidth,
        imgHeight,
        '',
        'FAST'
      );
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10;
        doc.addPage();
        doc.addImage(
          canvas,
          'PNG',
          0,
          position,
          imgWidth,
          imgHeight,
          '',
          'FAST'
        );
        heightLeft -= pageHeight;
      }
      doc.save('Invoices.pdf');
      console.log(doc);
      this.loader = false;
    });
  }
}
