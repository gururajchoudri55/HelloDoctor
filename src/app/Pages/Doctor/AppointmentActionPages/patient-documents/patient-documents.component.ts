import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import Labels from '../../../Lables/countrymanager/countrylabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-patient-documents',
  templateUrl: './patient-documents.component.html',
  styleUrls: ['./patient-documents.component.css']
})
export class PatientDocumentsComponent implements OnInit {
  @Input() Details: any = [];

  @Output() openAllergies: EventEmitter<any> = new EventEmitter();
  @Output() closeDocumentsModal: EventEmitter<any> = new EventEmitter();
  loader: boolean | undefined;
  languageID: any;
  doctorID: any;
  patientID: any;
  appointmentID: any;
  patientDetails: any;
  uploadedImages: any;
  nophoto: any;
  patientUploadedVideos: any;
  novideo: any;
  labels: any;
  currentUrl: any;


  constructor(private DoctorService: DoctorService, private SharedService: SharedService) { }
  ngOnInit(): void {
    // this.loader = true;
    this.currentUrl = window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.doctorID = sessionStorage.getItem('userid');
    console.log("Appointment List", this.Details)
    
    this.patientID = this.Details[0].patientID;
    this.appointmentID = this.Details[0].appointmentID;
    this.patientDetails = this.Details[0];
    this.getPatientUploadedImages();
    this.getpatientUploadedVideos();
  }



  getPatientUploadedImages() {
    this.DoctorService.GetPatient_Illnessphotos(this.appointmentID).subscribe(
      data => {
        this.uploadedImages = data;
        if (this.uploadedImages.length == 0) {
          this.nophoto = 1
        }
        else if (this.uploadedImages.length != 0) {
          this.nophoto = 0
        }
        this.loader = false;
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetPatient_Illnessphotos", error);
      }
    )
  }




  getpatientUploadedVideos() {
    this.DoctorService.GetPatient_IllnessVedioes(this.appointmentID).subscribe(
      data => {
        this.loader = false;
        this.patientUploadedVideos = data;
        if (this.patientUploadedVideos.length == 0) {
          this.novideo = 1
        }
        else if (this.patientUploadedVideos.length != 0) {
          this.novideo = 0
        }
        this.loader = false;
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetPatient_IllnessVedioes", error);
      }
    )
  }



  public GetReportPdf(pdf: any) {
    // this.closeModal.emit()
    this.closeDocumentsModal.emit()
    location.href = "#/Shared/view/" + btoa(pdf)
    // window.open(pdf, "_blank");
  }

  typeID: any;
  getTypeID(type: any) {
    this.openAllergies.emit(this.typeID = type)
  }
}
