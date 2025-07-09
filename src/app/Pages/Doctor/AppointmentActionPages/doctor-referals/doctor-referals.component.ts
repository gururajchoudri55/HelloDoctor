import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import Labels from '../../../Lables/Doctors/AllLabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';
import html2canvas from 'html2canvas';
import jspdf, { jsPDF } from 'jspdf';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-doctor-referals',
  templateUrl: './doctor-referals.component.html',
  styleUrls: ['./doctor-referals.component.css'],
})
export class DoctorReferalsComponent implements OnInit {
  constructor(
    private DoctorService: DoctorService,
    private SharedService: SharedService
  ) {}
  @Input() Details: any = [];

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() showLoader: EventEmitter<any> = new EventEmitter();
  @Output() Message: EventEmitter<any> = new EventEmitter();
  @Output() StopLoader: EventEmitter<any> = new EventEmitter();
  @Output() sendEmail: EventEmitter<any> = new EventEmitter();
  @Output() closeGeneratePopUP: EventEmitter<any> = new EventEmitter();
  @Output()
  patientName: any;
  mobileNumber: any;
  emailID: any;
  languageID: any;
  doctorID: any;
  loader: boolean | undefined;
  patientID: any;
  appointmentID: any;
  todayDate: any;
  referaltypeid: any;
  departmentid: any;
  departmentList: any;
  referDoctorList: any;
  docdd = {};
  referDoctorID: any;
  doctorName: any;
  doctorMobileNumber: any;
  doctorEmailID: any;
  referalNotes: any;
  hospitalClinicName: any;
  labels: any;
  selectdoctor: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  checkPdfArray: any = [];
  pdfDownload: any;
  signatureUrl: any;
  showname: any;
  stamp: any;
  pdfDownload1: any;
  reportURL: any = [];
  emailURL: any;
  cclist: any = [];
  bcclist: any = [];
  mailphotourlurl: any = [];
  folderName: any;
  files: File[] = [];

  data: any;
  currentUrl: any;
  referalist: any;

  // public editor = ClassicEditor;

  onReady(editor: any) {
    console.log('ABC');
    editor.ui
      ?.getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }

  config = {
    toolbar: [
      'heading',
      'fontfamily',
      '|',
      'alignment',
      '|',
      'bold',
      'italic',
      'strikethrough',
      'underline',
      'subscript',
      'superscript',
      '|',
      'link',
      '|',
      'bulletedList',
      'numberedList',
      'todoList',

      'fontsize',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'code',
      'codeBlock',
      '|',
      'insertTable',
      '|',
      'imageInsert',
      'blockQuote',
      '|',
      'undo',
      'redo',
    ],
    font_names: {
      options: [
        'Arial/Arial, Helvetica, sans-serif;' +
          'Times New Roman/Times New Roman, Times, serif;' +
          'Verdana',
      ],
    },

    fontFamily: {
      options: [
        'default',
        'Arial, Helvetica, sans-serif',
        'Courier New, Courier, monospace',
        'Georgia, serif',
        'Lucida Sans Unicode, Lucida Grande, sans-serif',
        'Tahoma, Geneva, sans-serif',
        'Times New Roman, Times, serif',
        'Trebuchet MS, Helvetica, sans-serif',
        'Verdana, Geneva, sans-serif',
        // 'Popins'
      ],
    },
  };
  ngOnInit(): void {
    // this.loader = true;
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';

    this.todayDate = formatDate(myDate, format, locale);
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.selectdoctor = this.labels.selectDoctor;
    this.doctorID = sessionStorage.getItem('userid');
    console.log('Appointment List', this.Details);
    this.patientID = this.Details[0].patientID;
    this.appointmentID = this.Details[0].appointmentID;
    this.patientName = this.Details[0].pName;
    this.mobileNumber = this.Details[0].pMobileNo;
    this.emailID = this.Details[0].pEmail;
    (this.hospitalClinicName = this.Details[0].hospital_ClinicName),
      (this.doctorName = this.Details[0].doctorName),
      (this.doctorMobileNumber = this.Details[0].docMobileNumber),
      (this.appointmentID = this.Details[0].appointmentID);
    (this.signatureUrl = this.Details[0].signatureURL),
      (this.stamp = this.Details[0].stampURL);
    this.pdfDownload1 = document.getElementById('htmlData');
    this.pdfDownload1.style.display = 'none';

    this.departmentid = 0;
    this.getDepartmentMaster();
    this.getDoctors();

    if (this.languageID == 1) {
      this.referalNotes =
        ' DATE: ' +
        this.todayDate +
        '<br><p>SUBJECT : Referral To ' +
        this.doctorName +
        '</p > <p>RE: Mr. ' +
        this.patientName +
        '<p>&nbsp;</p > <p>i am referring my patient ' +
        this.patientName +
        " for review of his new onset.<p>&nbsp;</p > <p>Thank you In advance for attending to the patients's health needs</p><p>" +
        this.doctorName +
        '<br>' +
        this.doctorMobileNumber +
        '</p><p>Consultation Summary<p><strong>Patient Name </strong>: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;' +
        this.patientName +
        '</p><p><strong>Date of Consult : &nbsp;</strong> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;' +
        this.todayDate +
        '</p><p><strong>Provider </strong>: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ' +
        this.doctorName +
        '<br>' +
        this.doctorMobileNumber +
        '<br>' +
        this.hospitalClinicName +
        '</p>';
    } else if (this.languageID == 6) {
      this.referalNotes =
        ' DATE :' +
        this.todayDate +
        'OBJET : Lettre de recommandation <br> Cher(e) confrère (consœur), Je vous réfère le patient  ' +
        this.patientName +
        '<p>Pour le(s) motif(s) et diagnostic(s) suivant(s) : ' +
        '<p>Vous remerciant, je vous prie d’agréer, mon cher confrère (consœur) mes salutations les meilleures.<br><br>' +
        this.doctorName +
        '<br>' +
        this.doctorMobileNumber +
        '<br>' +
        this.hospitalClinicName +
        '</p>';
    }
    this.pdfDownload = document.getElementById('htmlData');
    this.pdfDownload.style.display = 'none';
  }

  dummrefelist: any;

  getDoctors() {
    this.DoctorService.GetDoctorForAdminByLanguageID(this.languageID).subscribe(
      (data) => {
        this.referDoctorList = data.filter(
          (x: { referealBit: number }) => x.referealBit == 1
        );
        this.dummrefelist = data.filter(
          (x: { referealBit: number }) => x.referealBit == 1
        );

        this.docdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'doctorName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',

          allowSearchFilter: true,
          searchPlaceholderText: this.labels.search,
          closeDropDownOnSelection: true,
        };
      },
      (error) => {}
    );
  }

  public getDepartmentMaster() {
    this.DoctorService.GetDepartmentMasterByLanguageID(
      this.languageID
    ).subscribe(
      (data) => {
        this.loader = false;
        this.departmentList = data;
      },
      (error) => {}
    );
  }

  public GetReferencetypeID(even: any) {
    this.referaltypeid = even.target.value;
    if (this.referaltypeid == '2') {
      // this.doctorname = "",
      //   this.doctoremail = "",
      //   this.docphoneno = ""
      this.doctorName = '';
      this.doctorEmailID = '';
      this.doctorMobileNumber = '';
    }
  }

  public GetDepartmentID(even: any) {
    this.departmentid = even.target.value;

    this.referDoctorList = this.dummrefelist.filter(
      (x: { departmentID: any }) => x.departmentID == this.departmentid
    );
  }

  public GetDoctorID(item: any) {
    this.referDoctorID = item.id;
  }

  files1: File[] = [];
  attchmentUrl: any = [];
  onSelectAttchment(event: any) {
    // this.showLoader.emit();
    // this.loader = true;
    console.log(event);

    this.files1.push(...event.addedFiles);
    this.uploadAttachments();
  }

  public uploadAttachments() {
    let folder = this.patientID + '/' + 'SoapNotes';
    this.DoctorService.UploadPatientDocuments(this.files1, folder).subscribe(
      (res) => {
        this.attchmentUrl.push(res);
        // this.loader = false;
        this.Message.emit(11);
      },
      (error) => {
        this.StopLoader.emit();
      }
    );
    // this.sendattachment();
  }

  mobilereferalnotes: any;
  onAttachmentRemove(event: any) {
    console.log(event);
    this.attchmentUrl.splice(this.files1.indexOf(event), 1);
  }

  insertReferals() {
    let doc = document.getElementById('qwerty') as HTMLElement;
    doc.innerHTML = this.referalNotes;
    this.mobilereferalnotes = doc.innerText;
    //this.showLoader.emit();
    var entity = {
      ReferalTypeID: this.referaltypeid,
      AppointmentID: this.appointmentID,
      PatientID: this.patientID,
      PatientName: this.patientName,
      DoctorID: this.referDoctorID,
      DoctorName: this.doctorName,
      DoctorEmail: this.doctorEmailID,
      DoctorPhNo: this.doctorMobileNumber,
      ReferalNotes: this.referalNotes,
      AssignDoctorID: this.doctorID,
      MobileReferalNotes: this.mobilereferalnotes,
      soapbit: 0,
      Hospital_ClinicID: this.Details[0].hospital_ClinicID,
      DoctorHospitalDetailsID: this.Details[0].doctorHospitalDetailsID,
      LanguageID: this.languageID,
    };
    this.DoctorService.InsertDoctorReferals(entity).subscribe(
      async (data) => {
        this.close.emit((this.messageID = 1));
        await this.InsertDoctorRefererlas();
        this.GeneratePDf();
      },
      (error) => {
        this.StopLoader.emit();
      }
    );
  }

  async InsertDoctorRefererlas() {
    for (let i = 0; i < this.attchmentUrl.length; i++) {
      var entity = {
        AppointmentID: this.appointmentID,
        PatientID: this.patientID,
        AttachmentUrl: this.attchmentUrl[i],
      };
      this.DoctorService.InsertDoctorReferalAttachments(entity).subscribe(
        async (data) => {
          if (data != 0) {
          }
          // this.close.emit((this.messageID = 1));
          // this.loader = true;
        },
        (error) => {
          this.StopLoader.emit();
        }
      );
    }
  }

  generatepdff() {
    var entity = {
      prescription: false,
      diagnosticTest: false,
      soapNotes: false,
      medicalCertificate: false,
      doctorReferals: true,
      medicalQuestionare: false,
      TypeID: true,
    };
    this.checkPdfArray.push(entity);
    this.sendEmail.emit(this.checkPdfArray);
  }

  public sendmail1() {
    if (this.languageID == 1) {
      var desc =
        this.referalNotes +
        '<br>' +
        'Welcome to Voiladoc. If you would like to know more about Voiladoc and wish to join the Voiladoc network as a provider, please click on this link, https://voiladoc.ma/professionnel-de-sante/ or call 522446145.';
    } else {
      var desc =
        this.referalNotes +
        '<br>' +
        'Bienvenue sur Voiladoc. Si vous souhaitez en savoir plus sur Voiladoc et souhaitez rejoindre le réseau Voiladoc en tant que prestataire, veuillez cliquer sur ce lien, https://voiladoc.ma/professionnel-de-sante/ ou appeler le 522446145.';
    }
    var entity = {
      emailto: this.doctorEmailID,
      emailsubject: '' + this.doctorName,
      emailbody: desc + '<br><br>',
      attachmenturl: this.attchmentUrl,
      cclist: this.cclist,
      bcclist: this.bcclist,
    };
    this.DoctorService.sendemail(entity).subscribe(
      async (data) => {},
      (error) => {
        this.StopLoader.emit();
      }
    );
  }

  valid: boolean | undefined;

  public isValidEmail(emailString: string): boolean {
    try {
      let pattern = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');
      this.valid = pattern.test(emailString);

      return this.valid;
    } catch (TypeError) {
      return false;
    }
  }

  downloadpdf() {
    //this.loader = true;
    this.pdfDownload.style.display = 'block';
    html2canvas(this.pdfDownload, {
      scale: 5, // Increase scale to improve image resolution
      logging: true, // Improve text rendering
    }).then((canvas) => {
      // this.loader = true;
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
      doc.save('referals.pdf');
      this.pdfDownload.style.display = 'none';
      console.log(doc);
      //this.loader = false;
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

  public GeneratePDf() {
    // this.spinner.show()
    //this.loader = true;
    this.pdfDownload1.style.display = 'block';
    this.data = document.getElementById('htmlData');
    html2canvas(this.data).then(
      (canvas) => {
        var imgWidth = 190;
        var pageHeight = 275;
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
            //this.loader = false;
          }
        );

        // doc.save('Prescriptions.pdf');
      },
      (error) => {
        //this.loader = false;
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
        this.close.emit((this.messageID = 1));
        // this.closeGeneratePopUP.emit((this.messageID = 1));
        console.log('email Sent Succesfully');
        this.loader = false;
      },
      (error) => {
        //this.loader = false;
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
  pdfprslist: any;
  GetDate() {
    this.DoctorService.GetBookAppointmentByAppID(
      this.languageID,
      this.appointmentID,
      1
    ).subscribe(
      async (data) => {
        this.pdfprslist = data;
        console.log('pdflist', this.pdfprslist);
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
