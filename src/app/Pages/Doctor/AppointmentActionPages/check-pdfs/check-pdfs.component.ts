import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import Labels from '../../../Lables/Doctors/AllLabels.json';


@Component({
  selector: 'app-check-pdfs',
  templateUrl: './check-pdfs.component.html',
  styleUrls: ['./check-pdfs.component.css']
})
export class CheckPdfsComponent implements OnInit {

  @Input() Details: any = [];
  @Output() generatePDF: EventEmitter<any> = new EventEmitter();
  @Output() showLoader: EventEmitter<any> = new EventEmitter();

  constructor(private DoctorService: DoctorService) { }
  prescription: boolean | undefined;
  diagnosticTest: boolean | undefined;
  soapNotes: boolean | undefined;
  medicalCertificate: boolean | undefined;
  doctorReferals: boolean | undefined;
  medicalQuestionare: boolean | undefined
  checkPdfArray: any = [];
  languageID:any;
  labels:any;
  


  ngOnInit(): void {
    this.languageID = sessionStorage.getItem('LanguageID');
     this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];

  }




  generate() {
    this.showLoader.emit();
    
    var entity = {
      "prescription": this.prescription,
      "diagnosticTest": this.diagnosticTest,
      "soapNotes": this.soapNotes,
      "medicalCertificate": this.medicalCertificate,
      "doctorReferals": this.doctorReferals,
      "medicalQuestionare": this.medicalQuestionare,
      "TypeID": false
    }
    
    this.checkPdfArray.push(entity);
    this.generatePDF.emit(this.checkPdfArray);
  }
  selectAll(){
    this.prescription= true;
    this.diagnosticTest= true;
    this.soapNotes= true;
    this.medicalCertificate= true;
    this.doctorReferals= true;
    this.medicalQuestionare= true
  }

}
