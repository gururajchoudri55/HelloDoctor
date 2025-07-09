import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Doctors/AllLabels.json';
import html2canvas from 'html2canvas';
import jspdf, { jsPDF } from 'jspdf';

@Component({
  selector: 'app-medicalcertificate',
  templateUrl: './medicalcertificate.component.html',
  styleUrls: ['./medicalcertificate.component.css']
})
export class MedicalcertificateComponent implements OnInit {
  @Input() Details: any = [];
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() showLoader: EventEmitter<any> = new EventEmitter();
  @Output() sendEmail: EventEmitter<any> = new EventEmitter();
  @Output() StopLoader: EventEmitter<any> = new EventEmitter();
  @Output() closeGeneratePopUP: EventEmitter<any> = new EventEmitter();
  patientName: any;
  mobileNumber: any;
  emailID: any;
  languageID: any;
  doctorID: any;
  loader: boolean | undefined;
  patientID: any;
  appointmentID: any;
  startDate: any;
  endDate: any;
  leaveTyepe: any;
  Scholldata: any;
  notes: any;
  todayDate: any;
  leavefor: any;
  messageID: any;
  startdate: any;
  enddate: any;
  checkPdfArray: any = [];
  popup: number = 0;
  folderName: any;
  files: File[] = [];
  pdfDownload1:any;
  reportURL: any = [];
  data: any;
  emailURL: any;
  cclist: any = [];
  bcclist: any = [];
  constructor(private DoctorService: DoctorService, private SharedService: SharedService) { }
  labels: any;
  currentUrl: any;
  desc: any;
  OtherRegion: any;
  reason: boolean = false
  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todayDate = formatDate(myDate, format, locale);

    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.startdate = this.labels.startDate;
    this.enddate = this.labels.endDate;
    this.doctorID = sessionStorage.getItem('userid');
    console.log("Appointment List", this.Details);
    this.patientID = this.Details[0].patientID;
    this.appointmentID = this.Details[0].appointmentID;
    this.patientName = this.Details[0].pName;
    this.mobileNumber = this.Details[0].pMobileNo;
    this.emailID = this.Details[0].pEmail;
    this.loader = false;
    this.pdfDownload1 = document.getElementById('htmlData');
    this.pdfDownload1.style.display = 'none';


  }


  getStartDate(startDate: any) {
    this.startDate = this.DoctorService.GetDates(startDate);
  }

  getendDate(endDate: any) {
    this.endDate = this.DoctorService.GetDates(endDate);
  }



  Getscholladate() {
    
    
    if (this.languageID == 6) {
      if (this.leaveTyepe == 1) {
        this.leavefor = 'École'
        this.Scholldata = 'Arrêt maladie (Ecole).'
      }
      if (this.leaveTyepe == 2) {
        
        this.leavefor = 'Travail'
        this.Scholldata = 'Arrêt maladie (Travail)'
      }
      if (this.leaveTyepe == 3) {
        
        // this.OtherRegion=''
        this.leavefor = this.OtherRegion
        console.log(this.leavefor, 'data')
        this.Scholldata = 'Arrêt maladie'
      }
    }
    else if (this.languageID == 1) {
      
      if (this.leaveTyepe == 1) {
        this.leavefor = 'School'
        this.Scholldata = 'School'
      }
      if (this.leaveTyepe == 2) {
        this.leavefor = 'Office'
        this.Scholldata = 'Office'
      }
      if (this.leaveTyepe == 3) {

        this.leavefor = this.OtherRegion
        console.log(this.leavefor, 'data')
        this.Scholldata = this.OtherRegion
      }
    }
  }
  // Getotherreason() {
  //   this.reason = true

  // }

  formatdata() {
    
    this.popup = 1;
    this.leavefor = this.OtherRegion;
    if (this.languageID == 1 && this.leaveTyepe == 3) {
      this.desc = '<p>DATE: ' + this.todayDate + '</p><p><b>SUBJECT : ' + this.Scholldata + (this.leavefor) + ' Sick Slip / Medical Note</b></p><p>  </p><p style="text-align: center !important;"><b>To Whom It May Concern:</b></p><p style="text-align:justify;">' + this.patientName + ' had a telehealth visit with me on ' + this.startDate + ' for an acute illness.</p><p>Based on this evaluation, please excuse this patient from ' + this.leavefor + ' on the following dates:</p><p>Start Date: ' + this.startDate + '<br>End Date: ' + this.endDate + '</p><p>If they are feeling better, the patient may return to ' + this.leavefor + ' on the following day.</p><p>If they are not feeling better, they should be evaluated further.</p><p style="float: left;">Best Regards,<br><u>Dr. ' + this.Details[0].doctorName + "<br>Registration no :" + this.Details[0].registrationNo + "<br>";
    }
    else if (this.languageID == 6 && this.leaveTyepe == 3) {
      this.desc = '<p>DATE: ' + this.todayDate + '</p><p><b>Objet : ' + this.Scholldata + ' (' + (this.leavefor) + ')</b></p>  </p><p style="text-align: center !important;"><b>A qui de droit,</b></p><p style="text-align:justify;"> Je soussigné(e), certifie avoir examiné le patient et prescrit ' + this.notes + '(' + (this.leavefor) + ')<br><br>' + 'Date de commencement : ' + this.startDate + ',<br><br>Date de fin : ' + this.endDate + ',<br><br><br>' + '<br>Meilleures Salutations,<br><u>' + this.Details[0].doctorName + "<br> No d’inscription  : " + this.Details[0].registrationNo + "<br>"
    }
    else if (this.languageID == 1 && this.leaveTyepe != 3) {
      this.desc = '<p>DATE: ' + this.todayDate + '</p><p><b>SUBJECT : ' + this.Scholldata + ' Sick Slip / Medical Note</b></p><p>  </p><p style="text-align: center !important;"><b>To Whom It May Concern:</b></p><p style="text-align:justify;">' + this.patientName + ' had a telehealth visit with me on ' + this.startDate + ' for an acute illness.</p><p>Based on this evaluation, please excuse this patient from ' + this.leavefor + ' on the following dates:</p><p>Start Date: ' + this.startDate + '<br>End Date: ' + this.endDate + '</p><p>If they are feeling better, the patient may return to ' + this.leavefor + ' on the following day.</p><p>If they are not feeling better, they should be evaluated further.</p><p style="float: left;">Best Regards,<br><u>Dr. ' + this.Details[0].doctorName + "<br>Registration no :" + this.Details[0].registrationNo + "<br>";
    }
    else if (this.languageID == 6 && this.leaveTyepe != 3) {
      this.desc = '<p>DATE: ' + this.todayDate + '</p><p><b>Objet : ' + this.Scholldata + '</b></p>  </p><p style="text-align: center !important;"><b>A qui de droit,</b></p><p style="text-align:justify;"> Je soussigné(e), certifie avoir examiné le patient et prescrit ' + this.notes + ' ' + this.Scholldata +
        ' <br><br>' + 'Date de commencement : ' + this.startDate + ',<br><br>Date de fin : ' + this.endDate + ',<br><br>' + 'Remarques :  ' + this.notes + ' <br><br>' + '<br>Meilleures Salutations,<br><u>' + this.Details[0].doctorName + "<br> No d’inscription  : " + this.Details[0].registrationNo + "<br>"
    }
  }


  generateMedicalCertificate() {
    
    this.showLoader.emit();
    // if (this.languageID == 1) {
    //   // </p><p style="float: left;">Best Regards,<br><u>Dr. ' + this.Details[0].doctorName + "<br>Registration no :" + this.Details[0].registrationNo + "<br>
    //   this.desc = '<p>DATE: ' + this.todayDate + '</p><p><b>SUBJECT : ' + this.Scholldata + ' Sick Slip / Medical Note</b></p><p>  </p><p style="text-align: center !important;"><b>To Whom It May Concern:</b></p><p style="text-align:justify;">' + this.patientName + ' had a telehealth visit with me on ' + this.startDate + ' for an acute illness.</p><p>Based on this evaluation, please excuse this patient from ' + this.leavefor + ' on the following dates:</p><p>Start Date: ' + this.startDate + '<br>End Date: ' + this.endDate + '</p><p>If they are feeling better, the patient may return to ' + this.leavefor + ' on the following day.</p><p>If they are not feeling better, they should be evaluated further.' + this.notes;
    // }
    // else {
    //   // + this.Details[0].doctorName + "<br> No d’inscription  : " + this.Details[0].registrationNo + "<br>"
    //   this.desc = '<p>DATE: ' + this.todayDate + '</p><p><b>Objet : ' + this.Scholldata + '</b></p><p>  </p><p style="text-align: center !important;"><b>A qui de droit,</b></p><p style="text-align:justify;">' + this.leavefor + ' Je soussigné(e), certifie avoir examiné le patient et prescrit ' + this.Scholldata + '<br><br>' + 'Date de commencement : ' + this.startDate + '.<br><br>Date de fin : ' + this.endDate + '.<br><br>' + this.notes + '<br><br>Meilleures Salutations,<br><u>';
    // }
    this.leavefor = this.OtherRegion;
    if (this.languageID == 1 && this.leaveTyepe == 3) {
      this.desc = '<p>DATE: ' + this.todayDate + '</p><p><b>SUBJECT : ' + this.Scholldata + (this.leavefor) + ' Sick Slip / Medical Note</b></p><p>  </p><p style="text-align: center !important;"><b>To Whom It May Concern:</b></p><p style="text-align:justify;">' + this.patientName + ' had a telehealth visit with me on ' + this.startDate + ' for an acute illness.</p><p>Based on this evaluation, please excuse this patient from ' + this.leavefor + ' on the following dates:</p><p>Start Date: ' + this.startDate + '<br>End Date: ' + this.endDate + '</p><p>If they are feeling better, the patient may return to ' + this.leavefor + ' on the following day.</p><p>If they are not feeling better, they should be evaluated further.</p><p style="float: left;">Best Regards,<br><u>Dr. ' + this.Details[0].doctorName + "<br>Registration no :" + this.Details[0].registrationNo + "<br>";
    }
    else if (this.languageID == 6 && this.leaveTyepe == 3) {
      this.desc = '<p>DATE: ' + this.todayDate + '</p><p><b>Objet : ' + this.Scholldata + ' (' + (this.leavefor) + ')</b></p>  </p><p style="text-align: center !important;"><b>A qui de droit,</b></p><p style="text-align:justify;"> Je soussigné(e), certifie avoir examiné le patient et prescrit' + this.notes + ' (' + (this.leavefor) + ')<br><br>' + 'Date de commencement : ' + this.startDate + ',<br><br>Date de fin : ' + this.endDate + ',<br><br><br>' + '<br>Meilleures Salutations,<br><u>' + this.Details[0].doctorName + "<br> No d’inscription  : " + this.Details[0].registrationNo + "<br>"
    }
    else if (this.languageID == 1 && this.leaveTyepe != 3) {
      this.desc = '<p>DATE: ' + this.todayDate + '</p><p><b>SUBJECT : ' + this.Scholldata + ' Sick Slip / Medical Note</b></p><p>  </p><p style="text-align: center !important;"><b>To Whom It May Concern:</b></p><p style="text-align:justify;">' + this.patientName + ' had a telehealth visit with me on ' + this.startDate + ' for an acute illness.</p><p>Based on this evaluation, please excuse this patient from ' + this.leavefor + ' on the following dates:</p><p>Start Date: ' + this.startDate + '<br>End Date: ' + this.endDate + '</p><p>If they are feeling better, the patient may return to ' + this.leavefor + ' on the following day.</p><p>If they are not feeling better, they should be evaluated further.</p><p style="float: left;">Best Regards,<br><u>Dr. ' + this.Details[0].doctorName + "<br>Registration no :" + this.Details[0].registrationNo + "<br>";
    }
    else if (this.languageID == 6 && this.leaveTyepe != 3) {
      this.desc = '<p>DATE: ' + this.todayDate + '</p><p><b>Objet : ' + this.Scholldata + '</b></p>  </p><p style="text-align: center !important;"><b>A qui de droit,</b></p><p style="text-align:justify;"> Je soussigné(e), certifie avoir examiné le patient et prescrit ' + this.Scholldata + ' <br><br>' + 'Date de commencement : ' + this.startDate + ',<br><br>Date de fin : ' + this.endDate + ',<br><br><br>' + '<br>Meilleures Salutations,<br><u>' + this.Details[0].doctorName + "<br> No d’inscription  : " + this.Details[0].registrationNo + "<br>"
    }
    var entity = {
      'PatientID': this.patientID,
      'Ailment': this.notes,
      'FromDate': this.startDate,
      'ToDate': this.endDate,
      'SickSlipDate': this.todayDate,
      'Description': this.desc,
      'AppointmentID': this.appointmentID,
      'DoctorID': this.doctorID,
      'LeaveFor': this.Scholldata,
      'Mobiledescription': this.desc,
      'LanguageID': this.languageID,
      'OtherRegion': this.OtherRegion
    }
    this.DoctorService.InsertSickSlipGenarator(entity).subscribe(data => {
       this.close.emit(this.messageID = 1);
      this.GeneratePDf()
    }, error => {
      this.StopLoader.emit()
    })
  }





  generatepdff() {
    var entity = {
      "prescription": false,
      "diagnosticTest": false,
      "soapNotes": false,
      "medicalCertificate": true,
      "doctorReferals": false,
      "medicalQuestionare": false,
      "TypeID": true
    }
    this.checkPdfArray.push(entity);
    this.sendEmail.emit(this.checkPdfArray);
  }

  downloadpdf() {
    this.loader = true;
    let data = document.getElementById('medicalcertificate');
    html2canvas(data!, {
      scale: 5, // Increase scale to improve image resolution
      logging: true, // Improve text rendering
    }).then((canvas) => {
      ;
      const imgWidth = 190;
      const pageHeight = 275;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;
      heightLeft -= pageHeight - 20;
      const doc = new jspdf('p', 'mm');
      doc.addImage(canvas, 'PNG', 10, position, imgWidth, imgHeight, '', 'FAST');
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10;
        doc.addPage();
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
        heightLeft -= pageHeight - 20;
      }
      doc.save('medicalcertificate.pdf');
      console.log(doc);
      this.loader = false;

    });
  }


  public GeneratePDf() {
    // this.spinner.show()
    ;
    this.loader = true;
    this.pdfDownload1.style.display = 'block'
    this.data = document.getElementById('htmlData');
    html2canvas(this.data).then(
      (canvas) => {
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
          doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        this.StopLoader.emit();
        doc.deletePage(1);
        var pdf = doc.output('blob');
        var file = new File([pdf], 'Report' + '.pdf');
        let body = new FormData();
        body.append('Dan', file);
        ;
        let folder = this.patientID + '/' + 'Consulation Report';
        this.DoctorService.DoctorReports(file, folder).subscribe(
          (res) => {
            this.reportURL.push(res);
            let a = this.reportURL[0].slice(2);
            let b = 'https://maroc.voiladoc.org' + a;
            this.emailURL = b;
            console.log( this.emailURL ,"Email URL")
            this.pdfDownload1.style.display = 'none'
            this.updateReport();
            this.SendGenaratedReport();
          },
          (error) => {
            this.loader = false;
          }
        );

        // doc.save('Prescriptions.pdf');
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'getElementById',
          error
        );
        console.log('error with canvas', error);
      }
    );
  }

  public SendGenaratedReport() {
    
    if (this.languageID == 1) {
      var sub = 'Consultation report summary';
      var emaildesc =
        'Health professional  ' +
        this.Details[0].doctorName +
        ' has sent you a summary of the consultation report. It is now available in the "My medical report" menu under consultation report.' +
        '<span class="highlightText">' +
        //this.emailURL +
        '</span>' +
        '<br><br>' +
        'Regards,' +
        '<br>' +
        'Voiladoc Team';
    } else {
      var sub = 'Résumé du rapport de consultation';
      var emaildesc =
        "La professionnelle de santé " +
        this.Details[0].doctorName +
        ' vous a adressé un résumé du rapport de consultation. Il est désormais disponible dans le menu "Mon rapport médical" sous « Rapport de consultation' +
        '<span class="highlightText">' +
        //this.emailURL +
        '</span>' +
        '<br><br>' +
        'Cordialement,' +
        '<br>' +
        'Voiladoc Team';
    }
    ;
    var entity = {
      emailto: this.Details[0].emailID,
      emailsubject: sub,
      emailbody: emaildesc,
      attachmenturl: this.reportURL,
      cclist: this.cclist,
      bcclist: this.bcclist,
    };
    this.DoctorService.sendemail(entity).subscribe(
      async (data) => {
        // this.closeGeneratePopUP.emit((this.messageID = 1));
        console.log('email Sent Succesfully');
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.Details[0].pEmail,
          'Email Erroe',
          error
        );
        this.loader = false;
        console.log('Email Failed');
      }
    );
  }

  public updateReport() {
    ;
    var entity = {
      ApointmentID: this.appointmentID,
      ReportPdfsUrl: this.reportURL[0],
    };
    this.DoctorService.UpdateBookAppointmentReportPdfsUrl(entity).subscribe(
      (data) => { },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'UpdateBookAppointmentReportPdfsUrl',
          error
        );
      }
    );
  }
  typeID:any;
  pdfprslist:any;
  Alldata() {
    if (this.typeID == true) {
      ;
      this.DoctorService.GetBookAppointmentByAppID(
        this.languageID,
        this.appointmentID,
        1
      ).subscribe(
        async (data) => {
          this.pdfprslist = data;
          console.log('pdflist', this.pdfprslist);
          ;
          return true;
        },
        (error) => {
          this.loader = false;
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetBookAppointmentByAppID',
            error
          );
        }
      );
    } else {
      this.DoctorService.GetBookAppointmentByAppID(
        this.languageID,
        this.appointmentID,
        1
      ).subscribe(
        async (data) => {
          this.pdfprslist = data;
          ;
          this.loader = false;
          console.log('pdflist1', this.pdfprslist);
          return true;
        },
        (error) => {
          this.loader = false;
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetBookAppointmentByAppID',
            error
          );
        }
      );
    }
  }

}



