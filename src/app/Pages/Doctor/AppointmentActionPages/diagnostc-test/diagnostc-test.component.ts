import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Doctors/AllLabels.json';
import html2canvas from 'html2canvas';
import jspdf, { jsPDF } from 'jspdf';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';

@Component({
  selector: 'app-diagnostc-test',
  templateUrl: './diagnostc-test.component.html',
  styleUrls: ['./diagnostc-test.component.css'],
})
export class DiagnostcTestComponent implements OnInit {
  @Input() Details: any = [];

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() showLoader: EventEmitter<any> = new EventEmitter();
  @Output() sendEmail: EventEmitter<any> = new EventEmitter();
  @Output() StopLoader: EventEmitter<any> = new EventEmitter();
  @Output() closeGeneratePopUP: EventEmitter<any> = new EventEmitter();

  testsName: any;
  SerachtestOn: any;
  testsname: any;
  loader: boolean | undefined;
  languageID: any;
  doctorID: any;
  patientID: any;
  appointmentID: any;
  testList: any;
  showTest: any;
  tableCount: any;
  idcount: any;
  clinicalInfo: any;
  diagnosticArray: any = [];
  messageID: any;
  diagnosticTestName: any;
  diaManualtestArray: any = [];
  showManualtest: any;
  pdfDownload: any;
  signatureUrl: any;
  stamp: any;
  data: any;
  reportURL: any = [];
  emailURL: any;
  cclist: any = [];
  bcclist: any = [];
  mailphotourlurl: any = [];
  folderName: any;
  files: File[] = [];
  pdfDownload1: any;
  todayDate: any;

  constructor(
    private DoctorService: DoctorService,
    private SharedService: SharedService,
    private MenuService: MenuService
  ) {}
  labels: any;
  checkPdfArray: any = [];
  currentUrl: any;

  ngOnInit(): void {
    // this.loader = true;
    this.currentUrl = window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.doctorID = sessionStorage.getItem('userid');
    console.log('Appointment List', this.Details);
    this.todayDate = new Date().toJSON().slice(0, 10);
    this.patientID = this.Details[0].patientID;
    this.appointmentID = this.Details[0].appointmentID;
    this.signatureUrl = this.Details[0].signatureURL;
    this.stamp = this.Details[0].stampURL;
    this.getDiagnosticTests();
    this.idcount = 0;
    this.showTest = 0;
    this.diagnosticArray.length = 0;
    this.diaManualtestArray.length = 0;
    this.tableCount = 0;
    this.showManualtest = 0;

    this.pdfDownload = document.getElementById('diagnosticTest');
    this.pdfDownload.style.display = 'none';

    this.pdfDownload1 = document.getElementById('htmlData');
    this.pdfDownload1.style.display = 'none';
  }

  public getDiagnosticTests() {
    this.DoctorService.GetDiagnosticTestMasterByTestIDByLanguageID(
      1,
      this.languageID
    ).subscribe(
      (data) => {
        this.testList = data;
        this.testList[0]['checked'] = false;
      },
      (error) => {
        this.loader = false;
        this.StopLoader.emit();
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDiagnosticTestMasterByTestIDByLanguageID',
          error
        );
      }
    );
  }

  public SearchTestname(testsName: any) {
    if (testsName == '') {
      this.SerachtestOn = 0;
      this.showTest = 0;
    } else {
      this.SerachtestOn = 1;
    }
  }

  testDatabase() {
    this.showTest = 1;
  }
  manuallyWritten() {
    this.showTest = 2;
  }

  public adddetails(code: any) {
    this.tableCount = 1;
    var entity = {
      Sno: this.idcount,
      DiagnosticTestTypeID: code.testtypeid,
      DiagnosticTestName: code.short,
      DiagnosticTestTypeName: code.name,
      TestName: code.short,
      TestID: code.id,
      ClinicalInfo: this.clinicalInfo,
    };
    this.diagnosticArray.push(entity);
    for (let i = 0; i < this.testList.length - 1; i++) {
      // this.testList[i]['checked'] = false;
      if (this.testList[i].id == entity.TestID) {
        this.testList[i].checked = true;
      }
    }
    this.idcount = this.idcount + 1;
  }

  public delete(Sno: any) {
    for (let i = 0; i < this.diagnosticArray.length; i++) {
      if (Sno == this.diagnosticArray[i].Sno) {
        this.diagnosticArray.splice(i, 1);
      }
    }
  }

  // generatepdff() {
  //   var entity = {
  //     prescription: false,
  //     diagnosticTest: true,
  //     soapNotes: false,
  //     medicalCertificate: false,
  //     doctorReferals: false,
  //     medicalQuestionare: false,
  //     TypeID: true,
  //   };
  //   this.checkPdfArray.push(entity);
  //   this.sendEmail.emit(this.checkPdfArray);
  // }

  addManuallyTests() {
    this.showManualtest = 1;
    var entity = {
      Sno: this.idcount,
      DiagnosticTestTypeID: 0,
      DiagnosticTestName: this.diagnosticTestName,
      DiagnosticTestTypeName: '',
      TestName: this.diagnosticTestName,
      TestID: 0,
      ClinicalInfo: this.clinicalInfo,
    };
    this.diaManualtestArray.push(entity);
    this.idcount = this.idcount + 1;
  }

  public deleteDiagnostic(Sno: any) {
    for (let i = 0; i < this.diaManualtestArray.length; i++) {
      if (Sno == this.diaManualtestArray[i].Sno) {
        this.diaManualtestArray.splice(i, 1);
      }
    }
  }

  insertDignosticManualTest() {
    this.showLoader.emit();
    for (let i = 0; i < this.diaManualtestArray.length; i++) {
      var entity = {
        DoctorID: this.doctorID,
        PateintID: this.patientID,
        DiagnosticTestTypeID: 1,
        DiagnosticTestName: this.diaManualtestArray[i].DiagnosticTestName,
        LanguageID: this.languageID,
        AppointmentID: this.appointmentID,
        TestsID: 59,
        ClinicalInfo: 0,
      };
      this.DoctorService.InsertDoctor_PatientDiagnostics(entity).subscribe(
        (data) => {
          if (data != 0) {
          }
        },
        (error) => {
          this.StopLoader.emit();
        }
      );
    }

    this.diaManualtestArray.length = 0;
    this.tableCount = 0;
    this.SharedService.sendSms(this.Details[0], 41, 1);
    // this.generatepdff();
    this.GeneratePDf();

    // setTimeout(() => {
    //   this.GeneratePDf();
    // }, 1000);
    // this.close.emit(this.messageID = 57);
  }

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
      doc.save('Diagnostic.pdf');
      this.pdfDownload.style.display = 'none';
      console.log(doc);
      this.loader = false;
    });
  }

  insertDiagnostictDetails() {
    debugger;
    this.loader = true;
    this.showLoader.emit();
    for (let i = 0; i < this.diagnosticArray.length; i++) {
      var entity = {
        DoctorID: this.doctorID,
        PateintID: this.patientID,
        DiagnosticTestTypeID: this.diagnosticArray[i].DiagnosticTestTypeID,
        DiagnosticTestName: this.diagnosticArray[i].DiagnosticTestName,
        LanguageID: this.languageID,
        AppointmentID: this.appointmentID,
        TestsID: this.diagnosticArray[i].TestID,
        ClinicalInfo: 0,
      };
      this.DoctorService.InsertDoctor_PatientDiagnostics(entity).subscribe(
        async (data) => {
          if (data != 0) {
          }
        },
        (error) => {
          this.StopLoader.emit();
        }
      );
    }

    // this.close.emit(this.messageID = 57);
    // this.SharedService.sendSms(this.Details[0], 41, 1);

    // setTimeout(() => {
    //   this.GeneratePDf();
    // }, 1000);
    this.GeneratePDf();
    this.close.emit((this.messageID = 57));
    this.loader = false;
    this.diagnosticArray.length = 0;
    this.tableCount = 0;
  }

  public GeneratePDf() {
    debugger;
    this.loader = true;
    this.pdfDownload1.style.display = 'block';
    this.data = document.getElementById('htmlData');
    html2canvas(this.data).then(
      (canvas) => {
        const imgWidth = 208;
        const pageHeight = 295;
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
        let folder = this.patientID + '/' + 'Consulation Report';
        this.DoctorService.DoctorReports(file, folder).subscribe(
          (res) => {
            this.reportURL.push(res);
            let a = this.reportURL[0].slice(2);

            let b = 'https://maroc.voiladoc.org' + a;
            this.emailURL = b;
            console.log(this.emailURL, 'Email URL');
            this.pdfDownload1.style.display = 'none';
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
    this.loader = true;
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
        'La professionnelle de santé ' +
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
    var entity = {
      ApointmentID: this.appointmentID,
      ReportPdfsUrl: this.reportURL[0],
    };
    this.DoctorService.UpdateBookAppointmentReportPdfsUrl(entity).subscribe(
      (data) => {},
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
}
