import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Doctors/AllLabels.json';


@Component({
  selector: 'app-soap-notes',
  templateUrl: './soap-notes.component.html',
  styleUrls: ['./soap-notes.component.css']
})
export class SOAPNotesComponent implements OnInit {
  @Input() Details: any = [];

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() showLoader: EventEmitter<any> = new EventEmitter();
  @Output() Message: EventEmitter<any> = new EventEmitter();
  @Output() StopLoader: EventEmitter<any> = new EventEmitter();

  manuallyEnter: boolean | undefined;
  subjective: any;
  objective: any;
  assesment: any;
  plan: any;
  diagnosis: any;
  diagnosisCode: any;
  followUpPlan: any;
  signature: any;
  notes: any;
  saveAsTemplate: boolean | undefined;
  loader: boolean | undefined;
  languageID: any;
  doctorID: any;
  patientID: any;
  appointmentID: any;
  templateName: any;
  templateList: any;

  icrcodeid: any;
  showSoap: boolean | undefined;
  icdCodeList: any;
  templateID: any;
  messageID:any;

  constructor(private DoctorService: DoctorService,private SharedService: SharedService) { }
  labels:any;
  currentUrl:any;



  ngOnInit(): void {
    // this.loader = true;
    this.currentUrl=window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.doctorID = sessionStorage.getItem('userid');
    console.log("Appointment List", this.Details)
    
    this.patientID = this.Details[0].patientID;
    this.appointmentID = this.Details[0].appointmentID;

    this.getDoctorTemplates();
    this.getIcdCode();
    if (this.languageID == 1) {
      this.signature = 'Electronically signed by ' + this.Details[0].doctorName + ' ' + this.Details[0].date
    }
    else if (this.languageID == 6) {
      this.signature = 'Signature électronique du ' + this.Details[0].doctorName + ' ' + this.Details[0].date
    }
    this.saveAsTemplate = false;
  }


  public getDoctorTemplates() {

    this.DoctorService.GetDoctorSoapNotesTemplates().subscribe(
      data => {
        this.templateList = data.filter((x: { doctorID: any; }) => x.doctorID == this.doctorID)
      }, error => {
          this.SharedService.insertexceptions(this.currentUrl,"GetDoctorSoapNotesTemplates",error);
      }
    )
  }


  GetTemplateID(even: any) {
    if (even.target.value != 0) {
      this.templateID = even.target.value;
      var list = this.templateList.filter((x: { id: any; }) => x.id == this.templateID)

      this.subjective = list[0].subjective,
        this.objective = list[0].objective,
        this.assesment = list[0].assesment,
        this.plan = list[0].plan,
        this.diagnosisCode = list[0].diagnosisCode,
        this.followUpPlan = list[0].followUpPlan,
        this.notes = list[0].notes,
        this.diagnosisCode = list[0].icrCode,
        this.icrcodeid = list[0].icrID,
        this.diagnosis = list[0].icrDescrption
    }
    else {
      this.subjective = "";
      this.objective = "";
      this.assesment="";
      this.plan="";
      this.diagnosisCode="";
      this.followUpPlan="";
      this.notes="";
      this.diagnosisCode="";
      this.diagnosis="";
      this.notes;
    }
  }






  insertDoctorSoapNoteTemplate() {
    var entity = {
      'DoctorID': this.doctorID,
      'TemplateName': this.templateName,
      'Subjective': this.subjective,
      'Objective': this.objective,
      'Assesment': this.assesment,
      'Plan': this.plan,
      'DiagnosisCode': this.diagnosisCode,
      'FollowUpPlan': this.followUpPlan,
      'Signature': this.signature,
      'Notes': this.notes,
      'LanguageID': this.languageID,
      'IcrCode': this.diagnosisCode,
      'IcrDescrption': this.diagnosis,
      'IcrID': this.icrcodeid
    }
    this.DoctorService.InsertDoctorSoapNotesTemplates(entity).subscribe(data => {
      if (data != 0) {
        this.getDoctorTemplates()
      }
    },error=>{
      this.StopLoader.emit();
      this.SharedService.insertexceptions(this.currentUrl,"InsertDoctorSoapNotesTemplates",error);
    })
  }




  public SearchIcrCode() {
    
    if (this.diagnosis == '') {
      this.diagnosis = ''
      this.showSoap = false;
    }
    else {
      this.showSoap = true;

    }
  }




  public getIcdCode() {
    this.DoctorService.GetICDCodeMaster(this.languageID).subscribe(
      data => {
        ;
        this.loader = false;
        this.icdCodeList = data;
      },
      error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl,"GetICDCodeMaster",error);
      }
    );
  }


  public GetIcrCodeID(id: any, description: any, icdCode: any) {
    this.diagnosisCode = icdCode,
      this.icrcodeid = id
    this.diagnosis = description
    this.showSoap = false;
  }




  files1: File[] = [];
  attchmentUrl: any = [];
  onSelectAttchment(event: any) {
    // this.showLoader.emit();
    this.loader = true;
    console.log(event);
    
    this.files1.push(...event.addedFiles);
    this.uploadAttachments()

  }


  public uploadAttachments() {
    let folder = this.patientID + '/' + 'SoapNotes'
    this.DoctorService.UploadPatientDocuments(this.files1, folder).subscribe(res => {

      this.attchmentUrl.push(res);
      this.loader = false;
      this.Message.emit(11);
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl,"UploadPatientDocuments",error);

    })
    // this.sendattachment();
  }

  onAttachmentRemove(event: any) {
    console.log(event);
    this.attchmentUrl.splice(this.files1.indexOf(event), 1);
  }

  

  public insertSoapNotes() {
    this.showLoader.emit();
    var entity = {
      'DoctorID': this.doctorID,
      'PatientID': this.patientID,
      'AppointmentID': this.appointmentID,
      'AppointmentDate': new Date(),
      'Subjective': this.subjective,
      'Objective': this.objective,
      'Assessment': this.assesment,
      'Plan': this.plan,
      'FollowUpPlan': this.followUpPlan,
      'DiagnosisCode': this.diagnosisCode,
      'Notes': this.notes,
      'LanguageID': this.languageID,
      'ICRCode': this.diagnosisCode,
      'ICRDescription': this.diagnosis,
      'ICRID': this.icrcodeid,
      'AttachmentUrl': this.attchmentUrl[0],
      'Signature': this.signature
    }
    this.DoctorService.InsertDoctor_PatientSoapNotes1(entity).subscribe(data => {
      if (data != 0) {
        if (this.saveAsTemplate == true) {
          this.insertDoctorSoapNoteTemplate();
        }
        this.SharedService.sendSms(this.Details[0], 42, 1);
        this.close.emit(this.messageID=1);
      }
    }, error => {
      this.StopLoader.emit();
      this.SharedService.insertexceptions(this.currentUrl,"InsertDoctor_PatientSoapNotes1",error);
    })

  }

}
