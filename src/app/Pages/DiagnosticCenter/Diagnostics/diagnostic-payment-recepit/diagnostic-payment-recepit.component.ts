import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Labels from '../../../Lables/diagnostic/diagnosticlabels.json';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PharmacyService } from 'src/app/Pages/services/pharmacy.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { DiagnosticService } from 'src/app/Pages/services/diagnostic.service';
import jspdf from 'jspdf';

@Component({
  selector: 'app-diagnostic-payment-recepit',
  templateUrl: './diagnostic-payment-recepit.component.html',
  styleUrls: ['./diagnostic-payment-recepit.component.css'],
})
export class DiagnosticPaymentRecepitComponent implements OnInit {
  @Input() Details: any = [];
  @Output() closeReceipt: EventEmitter<any> = new EventEmitter();
  @Output() showLoader: EventEmitter<any> = new EventEmitter();
  pdfDownload: any;
  loader: boolean | undefined;
  typeID: any;
  currentUrl: any;
  languageID: any;
  labels: any;
  doctorID: any;
  appointmentDetails: any;
  testList: any;
  constructor(
    private DoctorService: DoctorService,
    private SharedService: SharedService,
    private DiagnosticService: DiagnosticService
  ) {}

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels['en'][0] : Labels['fr'][0];
  }

  gettest(data: any) {
    debugger;
    this.typeID = data;
    console.log('type' + this.typeID);
    this.currentUrl = window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels['en'][0] : Labels['fr'][0];
    console.log('Details', this.Details);
    this.appointmentDetails = this.Details[0];
    this.pdfDownload = document.getElementById('receipts');
    this.pdfDownload.style.display = 'none';

    this.DiagnosticService.GetDiagnosticTestsByAppointmentIDWeb(
      this.languageID,
      this.Details[0].id
    ).subscribe(
      (data) => {
        debugger;
        this.testList = data;
      },
      (error) => {}
    );
  }
  pdfContent: any;
  pdfurl: any;
  mailAttachmentUrl: any = [];
  cclist: any = [];
  bcclist: any = [];

  public SavePDF() {
    debugger;
    this.showLoader.emit();
    this.pdfContent = window.document.getElementById('Receipts');
    var doc = new jsPDF('p', 'mm', 'a4');
    html2canvas(this.pdfContent, {
      logging: true,
      allowTaint: false,
      useCORS: true,
    }).then((canvas) => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var doc = new jsPDF('p', 'mm', 'a4');
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 0;
      while (heightLeft >= 0) {
        const contentDataURL = canvas.toDataURL('image/png');
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(contentDataURL, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.deletePage(1);
      var pdf = doc.output('blob');
      var file = new File([pdf], 'DocReceipt' + '.pdf');
      let body = new FormData();
      body.append('Dan', file);
      let foldername = 'LAB' + '/' + 'Receipts';
      this.DoctorService.DoctorReports(file, foldername).subscribe(
        async (res) => {
          this.pdfurl = res;
          this.mailAttachmentUrl.push(res);
          //await this.UpdateReceiptPharmacy();
          await this.sendEmail();
          this.closeReceipt.emit((this.messageID = 64));
        }
      );
    });
  }
  // async UpdateReceiptPharmacy() {
  //   debugger;
  //   this.showLoader.emit();
  //   var entity = {
  //     AppointmentID: this.Details[0].id,
  //     ReceiptURL: this.pdfurl,
  //   };
  //   this.DoctorService.UpdateBook_DiagnosticAppointmentsPdfUrl(
  //     entity
  //   ).subscribe(
  //     async (data) => {},
  //     (error) => {
  //       this.SharedService.insertexceptions(
  //         this.currentUrl,
  //         'UpdateBook_DiagnosticAppointmentsPdfUrl',
  //         error
  //       );
  //     }
  //   );
  // }
  messageID: any;

  async sendEmail() {
    debugger;

    this.showLoader.emit();
    var entity = {
      emailto: this.Details[0].emailID,
      emailsubject:
        this.languageID == 1
          ? 'Payment receipt for Consultation'
          : 'Récépissé de consultation médicale',
      emailbody:
        this.languageID == 1
          ? 'Payment receipt for Consultation'
          : 'Récépissé de consultation médicale',
      attachmenturl: this.mailAttachmentUrl,
      cclist: this.cclist,
      bcclist: this.bcclist,
    };
    this.DoctorService.sendemail(entity).subscribe(
      async (data) => {
        let res = data;
        if (res == 'Success') {
          this.closeReceipt.emit((this.messageID = 64));
          console.log('email', res);
        }
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'sendemail',
          error
        );
      }
    );
  }
  downloadpdf() {
    debugger;
    this.loader = true;
    this.pdfDownload.style.display = 'block';
    html2canvas(this.pdfDownload, {
      scale: 5, // Increase scale to improve image resolution
      logging: true, // Improve text rendering
    }).then((canvas) => {
      debugger;
      this.loader = true;
      const imgWidth = 208;
      const pageHeight = 295;
      const marginTop = 10; // Adjust margin-top padding as needed
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = marginTop;
      heightLeft -= pageHeight - marginTop;
      const doc = new jspdf('p', 'mm');
      doc.addImage(
        canvas.toDataURL('image/jpeg', 1.0),
        'JPEG',
        0,
        position,
        imgWidth,
        imgHeight
      ); // Use 'JPEG' format for better quality
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(
          canvas.toDataURL('image/jpeg', 1.0),
          'JPEG',
          0,
          position + marginTop,
          imgWidth,
          imgHeight
        );
        heightLeft -= pageHeight;
      }
      doc.save('Diagnostic.pdf');
      this.pdfDownload.style.display = 'none';
      console.log(doc);
      this.loader = false;
    });
    // var entity = {
    //   "prescription": true,
    //   "diagnosticTest": false,
    //   "soapNotes": false,
    //   "medicalCertificate": false,
    //   "doctorReferals": false,
    //   "medicalQuestionare": false,
    //   "TypeIDDownload": true
    // }
    // this.checkPdfArray.push(entity);
    // this.sendEmail.emit(this.checkPdfArray);
  }
}
