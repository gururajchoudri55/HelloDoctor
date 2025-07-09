import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Swal from 'sweetalert2';
declare var window: any;
import Labels from '../../../Lables/Doctors/AllLabels.json';
import jspdf from 'jspdf';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css'],
})
export class PrescriptionsComponent implements OnInit {
  signatureUrl: any;
  stamp: any;
  appointmentDate: any;

  constructor(
    private DoctorService: DoctorService,
    private SharedService: SharedService
  ) {}

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() showLoader: EventEmitter<any> = new EventEmitter();
  @Output() sendEmail: EventEmitter<any> = new EventEmitter();
  @Output() StopLoader: EventEmitter<any> = new EventEmitter();
  @Output() closeGeneratePopUP: EventEmitter<any> = new EventEmitter();
  typeID: any;
  @Input() checkedList: any = [];
  @Input() Details: any = [];
  languageID: any;
  doctorTemplateList: any;
  doctorID: any;
  sig: any;
  dispenseQuantity: any;
  howManyRefills: any;
  noteToPharmacist: any;
  saveAsTemplate: boolean | undefined;
  substistuePermitted: any;
  templateID: any;
  manuallyEnter: boolean | undefined;
  drugNameList: any;
  medicineName: any;
  medicineArray: any = [];
  showTable: boolean | undefined;
  idcount: Number | undefined;
  patientID: Number | undefined;
  appointmentID: Number | undefined;
  loader: boolean | undefined;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  templateName: any;
  labels: any;
  checkPdfArray: any = [];
  labels1: any;
  pdfprslist: any;
  currentUrl: any;
  pdfDownload: any;
  reportURL: any = [];
  emailURL: any;
  cclist: any = [];
  bcclist: any = [];
  mailphotourlurl: any = [];
  folderName: any;
  files: File[] = [];
  pdfDownload1: any;
  todayDate: any;
  data: any;
  ngOnInit(): void {
    debugger;
    // this.loader = true;
    this.currentUrl = window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.doctorID = sessionStorage.getItem('userid');
    console.log('Appointment List', this.Details);

    this.patientID = this.Details[0].patientID;
    this.appointmentID = this.Details[0].appointmentID;
    this.signatureUrl = this.Details[0].signatureURL;
    this.stamp = this.Details[0].stampURL;
    // this.appointmentDate = this.Details[0].appdate;

    this.GetDoctorPrescrptionTemplates();
    this.GetDrugnamemaster();
    this.manuallyEnter = false;
    this.saveAsTemplate = false;
    this.idcount = 1;
    this.substistuePermitted = 1;

    this.pdfDownload = document.getElementById('prescription');
    this.pdfDownload.style.display = 'none';

    this.pdfDownload1 = document.getElementById('htmlData');
    this.pdfDownload1.style.display = 'none';
  }

  public GetDoctorPrescrptionTemplates() {
    this.DoctorService.GetDoctorPrescrptionTemplates().subscribe(
      (data) => {
        this.doctorTemplateList = data.filter(
          (x) => x.doctorID == this.doctorID
        );
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctorPrescrptionTemplates',
          error
        );
      }
    );
  }

  GetDoctorPrecriptioTemplateID(even: any) {
    if (even.target.value != 0) {
      this.templateID = even.target.value;
      var list = this.doctorTemplateList.filter(
        (x: { id: any }) => x.id == this.templateID
      );
      (this.medicineName = list[0].drugName),
        (this.dispenseQuantity = list[0].dispencequnatity),
        (this.noteToPharmacist = list[0].noteToPharmacist);
      this.howManyRefills = list[0].howManyRefils;
      this.substistuePermitted = list[0].substainablenotPermitted;
      this.sig = list[0].sig;
    } else {
      this.medicineName = '';
      this.sig = '';
      this.noteToPharmacist = '';
      this.howManyRefills = '';
      this.dispenseQuantity = '';
      this.substistuePermitted = 0;
    }
  }

  public GetDrugnamemaster() {
    this.DoctorService.GetDrugNameMaster(this.languageID).subscribe(
      (data) => {
        this.loader = false;
        this.drugNameList = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDrugNameMaster',
          error
        );
      }
    );
  }

  SerachOn: any;
  public SerchDrugName(mediciName: any) {
    if (mediciName == '') {
      this.SerachOn = 0;
    } else {
      this.SerachOn = 1;
    }
  }

  public GetDrugID(code: any) {
    this.medicineName = code.medicinename;
    this.SerachOn = 0;
  }

  addPrescription() {
    this.showTable = true;
    var entity = {
      Sno: this.idcount,
      MedicineName: this.medicineName,
      SIG: this.sig,
      DispenseQuantity: this.dispenseQuantity,
      NoteToPharmasist: this.noteToPharmacist,
      HowmanyRefills: this.howManyRefills,
      SubstainablenotPermitted: this.substistuePermitted,
    };
    this.medicineArray.push(entity);
    this.idcount = Number(this.idcount) + 1;
    if (this.saveAsTemplate == true) {
      this.AddDoctorPrescriptionTemplates();
    }
    this.saveAsTemplate = false;
    this.medicineName = '';
    this.sig = '';
    this.dispenseQuantity = '';
    this.noteToPharmacist = '';
    this.howManyRefills = '';
    this.substistuePermitted = '';
  }

  public deleteMedicines(Sno: any) {
    for (let i = 0; i < this.medicineArray.length; i++) {
      if (Sno == this.medicineArray[i].Sno) {
        this.medicineArray.splice(i, 1);
      }
    }
  }

  Prescription: any;
  async insertPrescription() {
    this.loader = true;
    this.showLoader.emit();
    this.Prescription = 1;
    this.showPopup = 0;

    for (let i = 0; i < this.medicineArray.length; i++) {
      var entity = {
        DoctorID: this.doctorID,
        PateintID: this.patientID,
        LanguageID: this.languageID,
        Date: new Date(),
        AppointmentID: this.appointmentID,
        MedicineName: this.medicineArray[i].MedicineName,
        SIG: this.medicineArray[i].SIG,
        DispenseQuantity: this.medicineArray[i].DispenseQuantity,
        NoteToPharmasist: this.medicineArray[i].NoteToPharmasist,
        HowmanyRefills: this.medicineArray[i].HowmanyRefills,
        LocalDoctorID: 0,
        EndorseBit: 0,
        SubstainablenotPermitted:
          this.medicineArray[i].SubstainablenotPermitted,
      };
      this.DoctorService.InsertDoctor_PatientPrescription(entity).subscribe(
        (data) => {
          if (data != 0) {
          }
        },
        (error) => {
          this.StopLoader.emit();
          this.SharedService.insertexceptions(
            this.currentUrl,
            'InsertDoctor_PatientPrescription',
            error
          );
        }
      );
    }

    // this.DoctorService.GetBookAppointmentByAppID(this.languageID, this.appointmentID, 1).subscribe(async data => {
    //   this.pdfprslist = data;
    //

    // }, error => {
    //   this.loader = false;
    // })
    // this.generatepdff()
    this.medicineArray.length = 0;
    this.showTable = false;
    // await this.SharedService.sendSms(this.Details[0], 40, 1);
    this.GeneratePDf();
    this.close.emit((this.messageID = 52));
    this.loader = false;
    //
  }

  generatepdff() {
    var entity = {
      prescription: true,
      diagnosticTest: false,
      soapNotes: false,
      medicalCertificate: false,
      doctorReferals: false,
      medicalQuestionare: false,
      TypeID: true,
    };
    this.checkPdfArray.push(entity);
    this.sendEmail.emit(this.checkPdfArray);
  }
  downloadpdf() {
    this.loader = true;
    this.pdfDownload.style.display = 'block';
    html2canvas(this.pdfDownload, {
      scale: 5, // Increase scale to improve image resolution
      logging: true, // Improve text rendering
    }).then((canvas) => {
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
        canvas,
        'PNG',
        10,
        position,
        imgWidth,
        imgHeight,
        '',
        'FAST'
      ); // Use 'JPEG' format for better quality
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
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
      doc.save('Prescriptions.pdf');
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

  public AddDoctorPrescriptionTemplates() {
    var entity = {
      DoctorID: this.doctorID,
      TemplateName: this.templateName,
      MedicineTypeID: 0,
      MedicineName: this.medicineName,
      SIG: this.sig,
      DrugName: this.medicineName,
      UnitOfMeasure: 0,
      Dosage: 0,
      Duration: 0,
      Dispencequnatity: this.dispenseQuantity,
      NoteToPharmacist: this.noteToPharmacist,
      Diagnosis: 0,
      HowManyRefils: this.howManyRefills,
      ICDCode: 0,
      ICDDescription: 0,
      ICDID: 0,
      SubstainablenotPermitted: this.substistuePermitted,
    };
    this.DoctorService.InsertDoctorPrescrptionTemplates(entity).subscribe(
      (data) => {
        if (data != 0) {
          this.GetDoctorPrescrptionTemplates();
        }
      },
      (error) => {
        this.StopLoader.emit();
        this.SharedService.insertexceptions(
          this.currentUrl,
          'InsertDoctorPrescrptionTemplates',
          error
        );
      }
    );
  }

  public getlanguage() {
    this.DoctorService.GetAdmin_DoctorMyAppointments_Label(
      this.languageID
    ).subscribe(
      (data) => {
        this.labels1 = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetAdmin_DoctorMyAppointments_Label',
          error
        );
      }
    );
  }

  public GeneratePDf() {
    // this.spinner.show()
    this.loader = true;
    this.pdfDownload1.style.display = 'block';
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
        let folder = this.patientID + '/' + 'Consulation Report';
        // doc.save('Prescriptions.pdf');
        // this.MenuService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
        //   this.mailphotourlurl.push(res);
        //    this.showPopup = 1;
        //   this.messageID = 11;
        //    this.typeofPopUp = 1;
        //   console.log("mailphoto", this.mailphotourlurl);
        //   this.loader = false;
        // }, error => {
        //   this.SharedService.insertexceptions(this.currentUrl, "AllFilesUploads", error);
        // })
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
    if (this.languageID == 1) {
      var sub = 'Consultation report summary';
      var emaildesc =
        'Health professional  ' +
        this.Details[0].doctorName +
        ' has sent you a medical certificate. It is now available in the "My Medical Report" menu .' +
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
        ' vous a envoyé un certificat médical. Il est maintenant disponible dans le menu « Mon dossier médical »' +
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
        this.close.emit((this.messageID = 52));
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
