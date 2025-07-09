import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../services/Doctor/doctor.service';
import Labels from '../../../Pages/Lables/Doctors/AllLabels.json';
import { SharedService } from '../../services/shared.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dme',
  templateUrl: './dme.component.html',
  styleUrls: ['./dme.component.css'],
})
export class DMEComponent implements OnInit {
  loader: boolean | undefined;
  viewMedicalHistoryList: any;
  vaccinationViewlist: any;
  term: any;
  nationalIdentityNo: any;
  smoker: any;
  height: any;
  weight: any;
  bMI: any;
  surgeryHistory: any;
  medicalHistory: any;
  allergies: any;
  longtermTreatment: any;
  vaccinationStatus: any;
  dietaryIssues: any;
  alcohol: any;
  medicalinsurance: any;
  exercise: any;
  knownAllergies: any;
  modalType: any;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  patientid3: any;
  showInputField: any;
  vaccinationName: any;
  fileUrl2: any;

  constructor(
    private DoctorService: DoctorService,
    private activatedroute: ActivatedRoute,
    private SharedService: SharedService,
    private sanitizer: DomSanitizer
  ) {}

  DiaAttchmentList: any;
  public doctorid: any;
  public patientid: any;
  public patientlist: any;
  public details: any;
  public patientname: any;
  public mobileno: any;
  public emailid: any;
  public patientidd: any;
  public appointmentno: any;
  public appointmentdate: any;
  public gender: any;
  public bloodgroup: any;
  public address: any;
  public email: any;
  public reasonforappointment: any;
  public prescriptionlist: any;
  public dialist: any;
  public prescriptionid: any;
  public prelist: any;
  public soaplist: any;
  public soapid: any;
  public plan: any;
  public assessment: any;
  public subjective: any;

  public diagnosiscode: any;
  public sickslip: any;
  public followupplan: any;
  public signature: any;
  public notes: any;
  public soaplist1: any;
  public objective: any;
  public vedioslist: any;
  public languageid: any;
  public departmentid: any;
  dummprescrptiolist: any;
  dummdialist: any;
  dummsoaplist: any;
  dummvedioslist: any;
  age: any;
  color: any;
  homecaresoaplist: any;
  Appointmentlist: any;
  dateofBirth: any;
  viewdetaillist: any;
  vaccinationlist: any;
  icrdescription: any;
  attchment: any;
  labels: any;
  HomeCaresoaplist: any;
  currentUrl: any;
  referallistL: any;
  attachment: any;
  referallist: any;
  vitalsdetailslist: any;
  departmentname: any;
  term1: any;
  checkboxChecked: boolean = false;
  ngOnInit(): void {
    debugger;
    this.loader = true;

    this.currentUrl = window.location.href;
    this.activatedroute.params.subscribe((params) => {
      this.patientid = atob(params['patientID']);
      this.doctorid = sessionStorage.getItem('userid');
      this.languageid = sessionStorage.getItem('LanguageID');
      this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
      this.departmentid = sessionStorage.getItem('departmentid');

      this.getSoapNotes();
      this.getPatientDetails();
      this.getDoctorPrscriptionDetails();
      this.getDoctorDiagnosticApps();
      this.GetDiagnosticAttachments();
      this.getBookAppointmentByPatientID();
      this.getvaccinatindetails();
      this.getvitaldetails();
      this.getHomecareSoap();
      this.referralhistory();
    });
  }
  getSoapNotes() {
    this.DoctorService.GetSoapNotesByPatientID(
      this.patientid,
      this.languageid,
      this.doctorid
    ).subscribe(
      (data) => {
        this.soaplist1 = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetSoapNotesByPatientID',
          error
        );
      }
    );
  }

  getPatientDetails() {
    this.DoctorService.GetPatientDetails(
      this.patientid,
      this.languageid
    ).subscribe(
      (data) => {
        this.details = data;
        (this.patientname = this.details.patientName),
          (this.mobileno = this.details.mobileNumber),
          (this.emailid = this.details.emailID),
          (this.patientidd = this.details.id),
          (this.appointmentno = this.details.appointmentID),
          (this.appointmentdate = this.details.apptDateTime),
          (this.mobileno = this.details.mobileNumber),
          (this.email = this.details.emailID),
          (this.reasonforappointment = this.details.reasonForVisit),
          (this.gender = this.details.gender),
          (this.bloodgroup = this.details.bloodGroup),
          (this.address = this.details.address),
          (this.age = this.details.age),
          (this.dateofBirth = this.details.dateOfBirth),
          (this.nationalIdentityNo = this.details.nationalIdentityNo),
          (this.smoker = this.details.smoker);
        this.nationalIdentityNo = this.details.nationalIdentityNo;
        this.height = this.details.height;
        this.weight = this.details.weight;
        this.bMI = this.details.bMI;
        this.surgeryHistory = this.details.surgeryHistory;
        this.medicalHistory = this.details.medicalHistory;
        this.longtermTreatment = this.details.longtermTreatment;
        this.vaccinationStatus = this.details.vaccinationStatus;
        this.dietaryIssues = this.details.dietaryIssues;
        this.alcohol = this.details.alcohol;
        this.smoker = this.details.smoker;
        this.medicalinsurance = this.details.medicalinsurance;
        this.exercise = this.details.exercise;
        this.knownAllergies = this.details.knownAllergies;
        // this.vaccinationName = this.details.vaccinationName
        this.getCalBMI();
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetPatientDetails',
          error
        );
      }
    );
  }
  bmi: any;

  getCalBMI() {
    debugger;
    const weight: number = this.weight;
    const height: number = this.height;
    console.log(this.weight + ' ' + this.height, 'BMI');
    if (height > 0) {
      //this.bmi = weight / (height * height) * 10,000;
      this.bmi = parseFloat(((weight * 10000) / (height * height)).toFixed(2));
      console.log(this.bmi + ' ' + this.weight + ' ' + this.height, 'BMI');
    } else {
      console.error('Height must be greater than zero');
    }
  }

  getDoctorPrscriptionDetails() {
    this.DoctorService.GetDoctor_PatientPrescriptionbyPatientDeatails(
      this.patientid,
      this.languageid
    ).subscribe(
      (data) => {
        this.prescriptionlist = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctor_PatientPrescriptionbyPatientDeatails',
          error
        );
      }
    );
  }

  getDoctorDiagnosticApps() {
    this.DoctorService.GetDoctor_PatientDiagosticApps(
      this.patientid,
      this.languageid
    ).subscribe(
      (data) => {
        this.dialist = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctor_PatientDiagosticApps',
          error
        );
      }
    );
  }

  public GetDiagnosticAttachments() {
    this.DoctorService.GetDiagnostic_SoapNotesAttachmentsWeb(
      this.patientid,
      this.languageid
    ).subscribe(
      (data) => {
        this.DiaAttchmentList = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDiagnostic_SoapNotesAttachmentsWeb',
          error
        );
      }
    );
  }

  getHomecareSoap() {
    this.DoctorService.GetAllHomeCareSoap(
      this.patientid,
      this.languageid
    ).subscribe(
      (data) => {
        this.loader = false;
        this.homecaresoaplist = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetAllHomeCareSoap',
          error
        );
      }
    );
  }

  getVideoList() {
    this.DoctorService.GetBook_DoctorPatientBookedVideoConferenceByPatientID(
      this.patientid
    ).subscribe(
      (data) => {
        this.vedioslist = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetBook_DoctorPatientBookedVideoConferenceByPatientID',
          error
        );
      }
    );
  }

  getBookAppointmentByPatientID() {
    this.DoctorService.GetPatientAllergiesByID(
      this.patientid,
      this.languageid
    ).subscribe(
      // this.DoctorService.GetBookApptbyPatientID(this.patientid, this.languageid).subscribe(
      (data) => {
        this.Appointmentlist = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetBookApptbyPatientID',
          error
        );
      }
    );
  }

  showmedicalquestionare(app: any) {
    this.viewdetaillist = this.Appointmentlist.filter(
      (x: { id: any }) => x.id == app.id
    );
  }

  vaccination(vaccine: any) {
    this.vaccinationViewlist = this.vaccinationlist.filter(
      (x: { id: any }) => x.id == vaccine.id
    );
    // for (let data of this.vaccinationlist) {
    //   data.vitalDetails = JSON.parse(data.vitalDetails)
    // }
    // console.log(this.vitalsdetailslist, 'vitalsdetailslist')
  }

  showvitals(vital: any) {
    this.vitalsdetailslist = this.vitalslist.filter(
      (x: { appointmentID: any }) => x.appointmentID == vital.appointmentID
    );
    for (let data of this.vitalsdetailslist) {
      data.vitalDetails = JSON.parse(data.vitalDetails);
    }
    console.log(this.vitalsdetailslist, 'vitalsdetailslist');
  }

  getvaccinatindetails() {
    this.DoctorService.GetPatientVaccinationByID(
      this.patientid,
      this.languageid
    ).subscribe(
      // this.DoctorService.GetPatient_VaccinationDetails(this.patientid, this.languageid).subscribe(
      (data) => {
        this.vaccinationlist = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetPatient_VaccinationDetails',
          error
        );
      }
    );
  }

  public GetprscriptionID(id: any) {
    this.prescriptionid = id;
    this.DoctorService.GetDoctor_PatientPrescriptionByID(
      this.prescriptionid,
      this.languageid
    ).subscribe(
      (data) => {
        this.prelist = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctor_PatientPrescriptionByID',
          error
        );
      }
    );
    //this.getDoctorPatientPrescriptions()
  }

  appointmentDialist: any;

  getDiaTests(appointmentID: any) {
    this.DoctorService.GetDoctor_PatientDiagnosticsbypatientdeatils(
      this.patientid,
      this.languageid,
      this.doctorid
    ).subscribe(
      (data) => {
        this.appointmentDialist = data.filter(
          (x) => x.appointmentID == appointmentID
        );
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctor_PatientDiagnosticsbypatientdeatils',
          error
        );
      }
    );
  }

  // public GetReportPdf(pdf: any) {
  //   debugger;
  //   location.href = '#/Shared/view/' + btoa(pdf);
  //   // window.open(pdf, "_blank");
  // }
  public GetReportPdf(pdf: any) {
    debugger;
    // Check if the string ends with ".pdf"
    if (pdf && pdf.endsWith('.pdf')) {
      location.href = '#/Shared/view/' + btoa(pdf);
    } else if (pdf && pdf.includes('.png')) {
      location.href = '#/Shared/view/' + btoa(pdf);
    } else if (pdf && pdf.includes('.jpg')) {
      location.href = '#/Shared/view/' + btoa(pdf);
    } else if (pdf && pdf.includes('.jpeg')) {
      location.href = '#/Shared/view/' + btoa(pdf);
    } else if (pdf && pdf.includes('.jfif')) {
      location.href = '#/Shared/view/' + btoa(pdf);
    } else if (pdf && pdf.includes('.ppt')) {
      location.href = '#/Shared/view/' + btoa(pdf);
    } else {
      this.viewfile(pdf);
    }
  }
  viewfile(fileUrl: any) {
    debugger;
    this.fileUrl2 = this.bypassAndSanitize(fileUrl);
  }
  bypassAndSanitize(url: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public GetSoapID(soapid: any) {
    this.soapid = soapid;
    this.DoctorService.GetSoapNotesByID(this.soapid, this.languageid).subscribe(
      (data) => {
        this.soaplist = data;
        if (
          this.soaplist == null ||
          this.soaplist.length == 0 ||
          this.soaplist == undefined
        ) {
          this.subjective = '';

          this.assessment = '';
          this.plan = '';
          this.diagnosiscode = '';
          this.followupplan = '';
          this.notes = '';

          this.signature = '';
          this.objective = '';
          this.signature = '';
          this.icrdescription = '';
        } else {
          (this.subjective = this.soaplist[0].subjective),
            (this.assessment = this.soaplist[0].assessment),
            (this.plan = this.soaplist[0].plan),
            (this.diagnosiscode = this.soaplist[0].diagnosisCode),
            (this.followupplan = this.soaplist[0].followUpPlan),
            (this.notes = this.soaplist[0].notes),
            (this.objective = this.soaplist[0].objective),
            (this.icrdescription = this.soaplist[0].icrDescription),
            (this.attachment = this.soaplist[0].attchment);
        }
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetSoapNotesByID',
          error
        );
      }
    );
  }

  public GetPdfsss(attchments: any) {
    location.href = '#/Shared/view/' + btoa(attchments);
    // window.open(attchments, '_blank');
  }

  public GetSoapHomeCarelist(soapid: any) {
    this.soapid = soapid;
    this.DoctorService.GetHomeCaeeSoapNotesByID(
      this.soapid,
      this.languageid
    ).subscribe(
      (data) => {
        this.HomeCaresoaplist = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetHomeCaeeSoapNotesByID',
          error
        );
      }
    );
  }

  vitalslist: any;
  vitalSigns: any;
  holisticHealth: any;
  cardiovascularRisks: any;
  covidRisk: any;
  arra: any[] = [];
  arra1: any[] = [];
  vi: any;
  public getvitaldetails() {
    this.DoctorService.GetPatient_VitalDetailsByPatientID(
      this.patientid,
      1
    ).subscribe(
      (data) => {
        //  this.vitalsData= JSON.parse( res[0].vitalDetails)
        this.vitalslist = data;

        for (let i = 0; i < this.vitalslist.length; i++) {
          //   this.vi=JSON.parse(this.vitalslist[i].vitalDetails);
          //   this.vi.add(this.vitalslist[i].appointmentID)
          //   this.vi.add(this.vitalslist[i].vitalDate)
          //   this.vi.add(this.vitalslist[i].vitalTime)
          // this.arra.push(this.vi.vitalSigns);
          // console.log( "dabba",this.arra);
          const dataToAdd = {
            appointmentID: this.vitalslist[i].appointmentID,
            vitalDate: this.vitalslist[i].vitalDate,
            vitalTime: this.vitalslist[i].vitalTime,
            // Assuming vi has a property 'vitalSigns'
            ...JSON.parse(this.vitalslist[i].vitalDetails).vitalSigns,
          };
          this.arra.push(dataToAdd);
          console.log('dabba', this.arra);

          const data1ToAdd = {
            appointmentID: this.vitalslist[i].appointmentID,
            vitalDate: this.vitalslist[i].vitalDate,
            vitalTime: this.vitalslist[i].vitalTime,
            // Assuming vi has a property 'vitalSigns'
            ...JSON.parse(this.vitalslist[i].vitalDetails).holisticHealth,
          };
          this.arra1.push(data1ToAdd);
        }

        this.vitalSigns = this.vi?.vitalSigns;
        this.holisticHealth = this.vi?.holisticHealth;
        this.cardiovascularRisks = this.vi?.risks?.cardiovascularRisks;
        this.covidRisk = this.vi?.risks?.covidRisk;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetPatient_VitalDetailsByPatientID',
          error
        );
      }
    );
  }

  public GetSoapPdf() {
    location.href = '#/Shared/view/' + btoa(this.attachment);
  }
  referralhistory() {
    this.DoctorService.GetPatientReferalHistory(
      this.patientid,
      this.languageid
    ).subscribe(
      (data) => {
        this.referallist = data;
      },
      (error) => {}
    );
  }

  showmedicalHoistory(re: any) {
    this.viewMedicalHistoryList = re;
  }
  handleCheckboxChange(event: any) {
    this.checkboxChecked = event.target.checked;
    this.loader = true;
    if (this.checkboxChecked) {
      this.getDoctorprescritiondetailsBydoctor();
      this.getDoctorDiagnosticlistByDoctor();
      this.referralhistoryByDoctorID();
      this.getSoapNotesByDoctorID();
      this.GetDiagnosticAttachmentsByDoctorID();
      this.loader = false;
    } else {
      this.getSoapNotes();
      this.getPatientDetails();
      this.getDoctorPrscriptionDetails();
      this.getDoctorDiagnosticApps();
      this.GetDiagnosticAttachments();
      this.getBookAppointmentByPatientID();
      this.getvaccinatindetails();
      this.getvitaldetails();
      this.getHomecareSoap();
      this.referralhistory();

      // this.getDoctorprescritiondetailsBydoctor();
    }
  }
  openModal(type: any) {
    this.modalType = type;
  }
  insertdetails() {
    this.loader = true;

    var entity = {
      ID: this.patientidd,
      Height: this.height,
      Weight: this.weight,
      SurgeryHistory: this.surgeryHistory,
      LongtermTreatment: this.longtermTreatment,
      VaccinationStatus: this.vaccinationStatus,
      DietaryIssues: this.dietaryIssues,
      KnownAllergies: this.knownAllergies,
      Exercise: this.exercise,
      Alcohol: this.alcohol,
      Smoker: this.smoker,
      ModifiedBy: this.doctorid,
      BloodGroup: this.bloodgroup,
      ModifiedByAllergies: this.doctorid,
      ModifiedByVaccination: this.doctorid,
    };
    this.DoctorService.UpdatePatientmedicalevaluationByDoctor(entity).subscribe(
      async (data) => {
        if (data != 0) {
          this.showPopup = 1;
          this.messageID = 1;
          this.typeofPopUp = 1;
          this.modalType = '';

          this.loader = false;

          // await this.getPatientDetails();
        } else {
          this.showPopup = 1;
          this.messageID = 15;
          this.typeofPopUp = 2;
        }
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'UpdatePatientmedicalevaluationByDoctor',
          error
        );
      }
    );
  }

  insertbloodfgroup() {
    this.showPopup = 0;
    this.loader = true;

    var entity = {
      ID: this.patientidd,
      Height: this.height,
      Weight: this.weight,
      SurgeryHistory: this.surgeryHistory,
      LongtermTreatment: this.longtermTreatment,
      VaccinationStatus: this.vaccinationStatus,
      DietaryIssues: this.dietaryIssues,
      KnownAllergies: this.knownAllergies,
      Exercise: this.exercise,
      Alcohol: this.alcohol,
      Smoker: this.smoker,
      ModifiedBy: this.doctorid,
      BloodGroup: this.bloodgroup,
      ModifiedByAllergies: this.doctorid,
      ModifiedByVaccination: this.doctorid,
    };
    this.DoctorService.UpdatePatientmedicalevaluationByDoctor(entity).subscribe(
      async (data) => {
        if (data != 0) {
          this.showPopup = 1;
          this.messageID = 1;
          this.typeofPopUp = 1;
          this.modalType = '';
          this.getPatientDetails();
          this.loader = false;
          window.location.reload();
        } else {
          this.showPopup = 1;
          this.messageID = 15;
          this.typeofPopUp = 2;
        }
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'UpdatePatientmedicalevaluationByDoctor',
          error
        );
      }
    );
  }

  getDoctorprescritiondetailsBydoctor() {
    this.DoctorService.GetDoctor_PatientPrescriptionbyPatientDeatailsWeb(
      this.patientid,
      this.languageid,
      this.doctorid
    ).subscribe(
      (data) => {
        this.prescriptionlist = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctor_PatientPrescriptionbyPatientDeatailsWeb',
          error
        );
      }
    );
  }

  getDoctorDiagnosticlistByDoctor() {
    this.DoctorService.GetDoctor_PatientDiagosticAppsWeb(
      this.patientid,
      this.languageid,
      this.doctorid
    ).subscribe(
      (data) => {
        this.dialist = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctor_PatientDiagosticAppsWeb',
          error
        );
      }
    );
  }
  referralhistoryByDoctorID() {
    this.DoctorService.GetDoctorReferalsWebByDoctorID(
      this.patientid,
      this.languageid,
      this.doctorid
    ).subscribe(
      (data) => {
        this.referallist = data;
      },
      (error) => {}
    );
  }
  getSoapNotesByDoctorID() {
    this.DoctorService.GetSoapNotesByPatientIDandDoctorID(
      this.patientid,
      this.languageid,
      this.doctorid
    ).subscribe(
      (data) => {
        this.soaplist1 = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetSoapNotesByPatientIDandDoctorID',
          error
        );
      }
    );
  }
  GetDiagnosticAttachmentsByDoctorID() {
    this.DoctorService.GetDiagnostic_SoapNotesAttachmentsWebByDoctorID(
      this.patientid,
      this.languageid,
      this.doctorid
    ).subscribe(
      (data) => {
        this.DiaAttchmentList = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDiagnostic_SoapNotesAttachmentsWebByDoctorID',
          error
        );
      }
    );
  }

  // toggleInputField(fieldType: any) {
  //   this.showInputField = fieldType;
  // }
  calculateBmi(height: number, weight: number) {
    let BMINew = height * height;
    let BMINewNew = (weight / BMINew) * 10000;
    let bmi = BMINewNew;
    return bmi.toFixed();
  }
}
