import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import Labels from '../../../Lables/Doctors/AllLabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';


@Component({
  selector: 'app-reffered-patients',
  templateUrl: './reffered-patients.component.html',
  styleUrls: ['./reffered-patients.component.css']
})
export class RefferedPatientsComponent implements OnInit {
  p:any;
  search:any;
  startdate:any;
  enddate:any;
  bsRangeValue:any;
  count:any;
  docreferels:any;
  doctorid:any;
  languageid:any;
  referalnotes:any;
  attachments:any;
  id:any;
  soaplist:any;
  subjective:any;
  assessment:any;
  plan:any;
  diagnosiscode:any;
  followupplan:any;
  notes:any;
  neurological:any;
  objective:any;
  signature:any;
  phsycialexam:any;
  genaral:any;
  ent:any;
  neck:any;
  lymphnode:any;
  cardiovascular:any;
  lungs:any;
  skin:any;
  breast:any;
  Psychiatry:any;
  abdomen:any;
  genitourinary:any;
  rectal:any;
  extremities:any;
  musculoskeletal:any;
  showmyediticon:any;
  labels:any;
  currentUrl:any;


  constructor(private DoctorService:DoctorService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem("LanguageID");
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.doctorid = sessionStorage.getItem('userid');
    var date = new Date();
    this.startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var start = new Date(date.getFullYear(), date.getMonth(), 1);
    var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);
    const format1 = 'yyyy-MM-dd';
    const locale1 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale1);
    sessionStorage.setItem('startdate',this.startdate);
    sessionStorage.setItem('enddate',this.enddate);
    this.bsRangeValue = [start, end];
    this.GetDoctorRefererals();
  }


          //To Select Date
          selectDate(data: any) {
            this.startdate = this.DoctorService.GetDates(data[0]);
            this.enddate = this.DoctorService.GetDates(data[1]);
            sessionStorage.setItem("startdate", this.startdate);
            sessionStorage.setItem("enddate", this.enddate); 
            this.GetDoctorRefererals();
     
      }
  

      public GetDoctorRefererals() {
        this.DoctorService.GetDoctorReferals(this.doctorid, 2, this.startdate, this.enddate).subscribe(
          data => {
            let temp: any = data
            this.docreferels = temp.filter((x: { doctorID: any; languageID: any; }) => x.doctorID == this.doctorid && x.languageID == this.languageid);
            this.count = this.docreferels.length
          },
          error => {
            this.SharedService.insertexceptions(this.currentUrl,"GetDoctorReferals",error);
                     }
        );
      }

      public GetPatientCondition(referalNotes:any) {
        this.referalnotes = referalNotes
      }
    

      public GetAppointmentID(appointmentid:any) {
        this.DoctorService.GetDoctorReferalAttachments(appointmentid).subscribe(
          data => {
           
            this.attachments = data;
          },
          error => { 
            this.SharedService.insertexceptions(this.currentUrl,"GetDoctorReferalAttachments",error);
          }
        );
      }


  public GetPdf(attchments:any) {
    location.href = "#/Shared/view/" + btoa(attchments)

  }


  // Pagination
  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }




  public GetSopaNotesID(id:any) {
   
    this.id = id;
    this.GetSoapNotesByID();
  }


  public GetSoapNotesByID() {
   
    this.DoctorService.GetSoapNotesByPatientRefereal(this.id, this.languageid).subscribe(
      data => {
       
        this.soaplist = data;
        if (this.soaplist == null || this.soaplist == undefined || this.soaplist.length == 0) {
          this.subjective = "";
          this.assessment = "";
          this.plan = "";
          this.diagnosiscode = "";
          this.followupplan = "";
          this.notes = "";
          this.neurological = "";
          this.objective = "";
          this.signature = "";
        }
        else {
          this.subjective = this.soaplist[0].subjective,
            this.phsycialexam = this.soaplist[0].physicalExam,
            this.genaral = this.soaplist[0].genaral,
            this.ent = this.soaplist[0].ent,
            this.neck = this.soaplist[0].neck,
            this.lymphnode = this.soaplist[0].lymphNode,
            this.cardiovascular = this.soaplist[0].cardiovascular,
            this.lungs = this.soaplist[0].lungs,
            this.skin = this.soaplist[0].skin,
            this.breast = this.soaplist[0].breast,
            this.Psychiatry = this.soaplist[0].psychiatry,
            this.abdomen = this.soaplist[0].abdomen,
            this.genitourinary = this.soaplist[0].genitourinarySystem,
            this.rectal = this.soaplist[0].rectal,
            this.extremities = this.soaplist[0].extremities,
            this.musculoskeletal = this.soaplist[0].musculoskeletal,
            this.assessment = this.soaplist[0].assessment,
            this.plan = this.soaplist[0].plan,
            this.diagnosiscode = this.soaplist[0].diagnosisCode,
            this.followupplan = this.soaplist[0].followUpPlan,
            this.notes = this.soaplist[0].notes,
            this.neurological = this.soaplist[0].neurological,
            this.objective = this.soaplist[0].objective
        }
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetSoapNotesByPatientRefereal",error);
      }

    )
  }





}
