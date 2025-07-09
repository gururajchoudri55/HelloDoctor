import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DoctorService } from '../../services/Doctor/doctor.service';
import { formatDate } from '@angular/common';
import Labels from '../../Lables/Hospital/hospitallabels.json'

@Component({
  selector: 'app-hospital-patient-dash',
  templateUrl: './hospital-patient-dash.component.html',
  styleUrls: ['./hospital-patient-dash.component.css']
})
export class HospitalPatientDashComponent implements OnInit {
  languageid:any;
  roleid:any;
  startdate:any;
  enddate:any;
  bsRangeValue:any;
  loader:boolean | undefined;
  hospitalid:any;
  currentUrl:any;
  recpid:any;
  patientslist:any;
  dummlist:any;
  count:any;
  search:any;
  doctorid:any;
  labels:any;

  constructor(private DoctorService:DoctorService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.hospitalid = sessionStorage.getItem('hospitalid');
    this.languageid = sessionStorage.getItem("LanguageID");
    this.roleid = sessionStorage.getItem("roleid");
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    var date = new Date();
    this.startdate = "2017-01-01"
    this.enddate = "2050-01-01"

    // var start = new Date(date.getFullYear(), date.getMonth(), 1);
    // var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);

    const format1 = 'yyyy-MM-dd';
    const locale1 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale1);

    sessionStorage.setItem('startdate',this.startdate);
    sessionStorage.setItem('enddate',this.enddate);

    // this.bsRangeValue = [start, end];
    this.Getregisterdpatients();
  }




  public Getregisterdpatients() {
    if (this.recpid == undefined) {
      this.DoctorService.GetBookAppointmentByHospitalPatients(this.hospitalid, this.startdate, this.enddate).subscribe(
        data => {
          this.patientslist = data;
          this.dummlist = this.patientslist
          this.count = this.patientslist.length;
          this.loader=false;
        },
        error => {
          this.SharedService.insertexceptions(this.currentUrl,"GetBookAppointmentByHospitalPatients",error);
          this.loader=false;
         }
      );
    }
    else {
      this.DoctorService.GetBookAppointmentByHospitalPatients(this.hospitalid, this.startdate, this.enddate).subscribe(
        data => {
          this.dummlist = data;
          this.patientslist = this.dummlist.filter((x: { doctorID: any; }) => x.doctorID == this.doctorid)
          this.count = this.patientslist.length;
          this.loader=false;
        },
        error => {
          this.SharedService.insertexceptions(this.currentUrl,"GetBookAppointmentByHospitalPatients",error);
          this.loader=false;
         }
      );
    }

  }


        //To Select Date
        selectDate(data: any) {
          this.loader = true;
          this.startdate = this.DoctorService.GetDates(data[0]);
          this.enddate = this.DoctorService.GetDates(data[1]);
          sessionStorage.setItem("startdate", this.startdate);
          sessionStorage.setItem("enddate", this.enddate);   
          this.Getregisterdpatients();   
    }

    //Redirecting page
    edit(id:any){
   location.href="#/Doctor/PatientReg/"+ btoa(id);
    }


}
