import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NurseService } from 'src/app/Pages/services/nurse.service';
import Labels from '../../../Lables/Nurse/nurselabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-npm-emr',
  templateUrl: './npm-emr.component.html',
  styleUrls: ['./npm-emr.component.css']
})
export class NpmEmrComponent implements OnInit {
  loader: boolean | undefined;

  constructor(private NurseService: NurseService, private activatedroute: ActivatedRoute,
    private SharedService: SharedService) { }
  public patientid: any;
  public languageid: any;
  details: any;
  patientname: any;
  mobileno: any;
  emailid: any;
  patientidd: any;
  appointmentno: any;
  appointmentdate: any;
  email: any;
  reasonforappointment: any;
  gender: any;
  bloodgroup: any;
  address: any;
  age: any;
  color: any;
  soaplist1: any;
  attchment: any;
  soaplist: any;
  soapid: any;
  labels: any;
  currentUrl: any;


  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];


    this.activatedroute.params.subscribe(params => {

      this.patientid = atob(params['patientID']);

      this.NurseService.GetPatientDetails(this.patientid, this.languageid).subscribe(
        data => {

          this.details = data;

          this.patientname = this.details.patientName,
            this.mobileno = this.details.mobileNumber,
            this.emailid = this.details.emailID,
            this.patientidd = this.details.patientID,
            this.appointmentno = this.details.appointmentID,
            this.appointmentdate = this.details.apptDateTime,
            this.mobileno = this.details.mobileNumber,
            this.email = this.details.emailID,
            this.reasonforappointment = this.details.reasonForVisit,
            this.gender = this.details.gender,
            this.bloodgroup = this.details.bloodGroup,
            this.address = this.details.address,
            this.age = this.details.age

        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetPatientDetails", error);
        }
      )

    }
    )


    this.NurseService.GetAllHomeCareSoap(this.patientid, this.languageid).subscribe(
      data => {
        this.loader = false;
        this.soaplist1 = data;
        
        console.log("soap", this.soaplist1)
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetAllHomeCareSoap", error);
      }
    )

  }


  public GetSoapPdf() {
    
    // document.getElementById('closeview').click();
    location.href = "#/Shared/view/" + btoa(this.attachment)

  }


  subjective:any;
  objective:any;
  assesment:any;
  plan:any;
  diagnosiscode:any;
  icerdescription:any;
  followUpPlan:any;
  notes:any;
  attachment:any;
  public GetSoapID(soapid: any) {

    this.soapid = soapid;
    this.NurseService.GetHomeCaeeSoapNotesByID(this.soapid, this.languageid).subscribe(
      data => {
        this.soaplist = data[0];

        this.subjective= data[0].subjective,
        this.objective=data[0].objective,
        this.assesment=data[0].assessment,
        this.plan=data[0].plan,
        this.diagnosiscode=data[0].diagnosisCode,
        this.icerdescription=data[0].icrDescription,
        this.followUpPlan=data[0].followUpPlan,
        this.notes=data[0].notes,
        this.attachment=data[0].attchment
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetHomeCaeeSoapNotesByID", error);
      }
    )
  }


}
