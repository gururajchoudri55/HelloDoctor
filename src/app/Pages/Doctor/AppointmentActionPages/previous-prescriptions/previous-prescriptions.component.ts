import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DoctorService } from '../../../services/Doctor/doctor.service';
import Labels from '../../../Lables/Doctors/AllLabels.json';
declare var window: any;
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-previous-prescriptions',
  templateUrl: './previous-prescriptions.component.html',
  styleUrls: ['./previous-prescriptions.component.css']
})
export class PreviousPrescriptionsComponent implements OnInit {
  @Input() Details: any = [];
  @Input() typeID: any;
  @Output() closePopUp: EventEmitter<any> = new EventEmitter();
  doctorID: any;
  languageID: any;
  prescriptionList: any;
  loader: boolean | undefined;
  diagnosticList: any;
  SoapList: any;
  medicalCertificateList: any;
  labels: any;
  modal: any;
  currentUrl:any;


  constructor(private DoctorService: DoctorService,private SharedService:SharedService) { }

  ngOnInit(): void {
    // this.loader = true;
    this.currentUrl=window.location.href;
    
    console.log("details list", this.Details);
    console.log("typeID", this.typeID);
    this.doctorID = sessionStorage.getItem('userid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    
    if (this.typeID == 10) {
      this.getPreviousPrescriptions();
    }
    else if (this.typeID == 11) {
      this.getDiagnosticTests()
    }
    else if (this.typeID == 12) {
      this.getSopaNotes()
    }
    else if (this.typeID == 13) {
      this.getPreviousMedicalCertificate();
    }

    this.modal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    )
  }




  getPreviousPrescriptions() {
    this.DoctorService.GetDoctor_PatientPrescriptionByDoctorIDandPatientID(this.Details[0].patientID, this.languageID, this.doctorID).subscribe(
      data => {
        
        this.prescriptionList = data;
        this.loader = false;
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl,"GetDoctor_PatientPrescriptionByDoctorIDandPatientID",error);
      }
    )
  }



  getDiagnosticTests() {
    this.DoctorService.GetDoctor_PatientDiagnosticsByPatient(this.Details[0].patientID, this.languageID, this.doctorID).subscribe(
      data => {
        this.loader = false;
        
        this.diagnosticList = data;
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl,"GetDoctor_PatientDiagnosticsByPatient",error);
      }
    )
  }


  getSopaNotes() {
    this.DoctorService.GetSoapNotesByApointmentID(this.Details[0].patientID, this.languageID, this.doctorID).subscribe(
      data => {
        this.loader = false;
        this.SoapList = data;
        
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl,"GetSoapNotesByApointmentID",error);
      }
    )
  }




  public getPreviousMedicalCertificate() {

    this.DoctorService.GetSickSlipGenaratorByPatientIDWeb(this.Details[0].patientID, this.languageID, this.doctorID).subscribe(data => {
      this.medicalCertificateList = data;
      console.log("prescriptions", this.medicalCertificateList)
      this.loader = false;
      
    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl,"GetSickSlipGenaratorByPatientIDWeb",error);
    })
  }

  description: any;

  view(description: any) {
    this.description = description;
    this.closePopUp.emit(description = description)
  }

}
