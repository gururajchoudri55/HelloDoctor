import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NurseService } from 'src/app/Pages/services/nurse.service';
import Labels from '../../../Lables/Doctors/myAppointments.json';
@Component({
  selector: 'app-midwife-paymentreceipts',
  templateUrl: './midwife-paymentreceipts.component.html',
  styleUrls: ['./midwife-paymentreceipts.component.css']
})
export class MidwifePaymentreceiptsComponent implements OnInit {

  constructor(private NurseService:NurseService) { }
  @Input() Details: any = [];
  @Output() closeReceipt: EventEmitter<any> = new EventEmitter();
  @Output() showLoader: EventEmitter<any> = new EventEmitter();
  currentUrl: any;
  languageID: any;
  labels: any;
  patientID: any;
  appointmentID: any;
  appointmentDetails: any;
  messageID:any;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.patientID = this.Details[0].patientID;
    this.appointmentID = this.Details[0].id;
    this.appointmentDetails = this.Details[0];

    console.log("details",this.appointmentDetails)
  }



  
  pdfContent: any;
  pdfurl: any;
  mailAttachmentUrl: any = [];
  cclist: any = []
  bcclist: any = []


  public SavePDF() {
    this.showLoader.emit()
    this.pdfContent = window.document.getElementById("Receipts");
    var doc = new jsPDF('p', 'mm', "a4");

    html2canvas(this.pdfContent).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var doc = new jsPDF("p", "mm", "a4");
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();

      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 0;
      while (heightLeft >= 0) {
        const contentDataURL = canvas.toDataURL('image/png')
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.deletePage(1)
      var pdf = doc.output('blob');

      var file = new File([pdf], "NurseReceipts" + ".pdf");

      let body = new FormData();

      body.append('Dan', file);

      let foldername = this.patientID + '/' + 'Receipts'

      this.NurseService.DoctorReports(file, foldername).subscribe(async res => {
        ;
        this.pdfurl = res;
        this.mailAttachmentUrl.push(res)
        await this.UpdateReceipt();
        await this.sendEmail()
        this.closeReceipt.emit(this.messageID = 64)
      });
    });
  }


  async UpdateReceipt() {
  
    var entity = {
      'AppointmentID': this.appointmentID,
      'ReceiptURL': this.pdfurl
    }
    this.NurseService.UpdateBook_Midwives_Appointment(entity).subscribe(async data => {

    },error=>{
      // this.SharedService.insertexceptions(this.currentUrl,"UpdateBookAppoinmentReceiptUrl",error);
    })
  }
// this.Details[0].pEmail


  async sendEmail() {
    
    var entity = {
      'emailto': this.Details[0].emailID,
      'emailsubject': "Payment Receipt",
      'emailbody': "Payment Recipt for Your Nurse Home Visit Consulatation",
      'attachmenturl': this.mailAttachmentUrl,
      'cclist': this.cclist,
      'bcclist': this.bcclist
    }
    this.NurseService.sendemail(entity).subscribe(async data => {
      let res = data;
      if (res == 'Success') {
         this.closeReceipt.emit(this.messageID = 34)
        console.log("email", res);
      }

    }, error => {
      //  this.SharedService.insertexceptions(this.currentUrl,"sendemail",error);
    })
  }

}
