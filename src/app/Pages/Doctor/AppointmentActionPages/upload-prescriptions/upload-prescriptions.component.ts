import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import Labels from '../../../Lables/Doctors/AllLabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';





@Component({
  selector: 'app-upload-prescriptions',
  templateUrl: './upload-prescriptions.component.html',
  styleUrls: ['./upload-prescriptions.component.css']
})
export class UploadPrescriptionsComponent implements OnInit {
  loader: boolean | undefined;

  constructor(private DoctorService: DoctorService, private SharedService: SharedService) { }
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() showLoader: EventEmitter<any> = new EventEmitter();
  @Output() Message: EventEmitter<any> = new EventEmitter();
  @Input() Details: any = [];
  languageID: any;
  doctorID: any;
  patientID: any;
  appointmentID: any;
  typeID: any;
  foldername: any;
  attchmentURL: any = [];
  messageID: any;
  labels: any;
  currentUrl: any;

  files1: File[] = [];


  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.doctorID = sessionStorage.getItem('userid');
    console.log("Appointment List", this.Details);
    
    this.patientID = this.Details[0].patientID;
    this.appointmentID = this.Details[0].appointmentID;
    
    this.attchmentURL.length = 0;

  }







  onSelect(event: any) {
    this.showLoader.emit()

    console.log(event);
    
    this.files1.push(...event.addedFiles);
    this.uploadattachments1()

  }




  public uploadattachments1() {
    if (this.typeID == 1) {
      this.foldername = this.patientID + '/' + 'DiagnosticTests'
    }
    else if (this.typeID == 2) {
      this.foldername = this.patientID + '/' + 'SoapNotes'
    }
    else if (this.typeID == 3) {
      this.foldername = this.patientID + '/' + 'Prescriptions'
    }
    else if (this.typeID == 4) {
      this.foldername = this.patientID + '/' + 'Medical Certificate'
    }
    else if (this.typeID == 5) {
      this.foldername = this.patientID + '/' + 'Referal Letter'
    }
    this.DoctorService.UploadPatientDocuments(this.files1, this.foldername).subscribe(res => {

      this.attchmentURL.push(res);
      this.Message.emit(this.messageID = 11)
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "UploadPatientDocuments", error);
    })

  }


  ondoctorPhotoRemove(event: any) {
    console.log(event);
    
    this.attchmentURL.splice(this.attchmentURL.indexOf(event), 1);
    this.files1.splice(this.files1.indexOf(event), 1);
  }









  public InsertPrescrptionPhoto() {
    
    this.showLoader.emit()
    if (this.attchmentURL.length == 0 || (this.attchmentURL == null)) {
      this.Message.emit(this.messageID == 59)
    }
    else {
      var entity = {
        'DoctorID': this.doctorID,
        'PateintID': this.patientID,
        'LanguageID': this.languageID,
        'AppointmentID': this.appointmentID,
        'NewPrescriptionPhotoUrl': this.attchmentURL[0],
      }
      
      this.DoctorService.InsertDoctor_PatientPrescriptionPhotoUrl(entity).subscribe(data => {
        
        if (data != 0) {
          this.close.emit(this.messageID = 52)
        }
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "InsertDoctor_PatientPrescriptionPhotoUrl", error);
      })
    }
  }





  public InsertDiagnostictestAndSoap() {
    this.showLoader.emit()
    if (this.attchmentURL.length == 0 || (this.attchmentURL == null)) {
      this.Message.emit(this.messageID = 60)
    }
    else {
      var entity = {
        'TypeID': this.typeID,
        'AppointmentID': this.appointmentID,
        'DoctorID': this.doctorID,
        'PatientID': this.patientID,
        'PhotoUrl': this.attchmentURL[0],
      }
      this.DoctorService.InsertDiagnostic_SoapNotesAttachments(entity).subscribe(data => {
        if (data != 0) {
          this.close.emit(this.messageID = 1);
        }
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "InsertDiagnostic_SoapNotesAttachments", error);
      })
    }
  }

}
