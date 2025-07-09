import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Doctors/myAppointments.json';

@Component({
  selector: 'app-patient-red-dash',
  templateUrl: './patient-red-dash.component.html',
  styleUrls: ['./patient-red-dash.component.css'],
})
export class PatientRedDashComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  loader: boolean | undefined;
  hospitalid: any;
  doctorid: any;
  roleid: any;
  languageid: any;
  recpid: any;
  patientslist: any;
  dummlist: any;
  count: any;
  currentUrl: any;
  p: any;
  search: any;
  labels: any;
  HospitalClinicID: any;
  appointmentTypeID: any;
  loginID: any;
  constructor(
    private SharedService: SharedService,
    private DoctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.roleid = sessionStorage.getItem('roleid');
    this.doctorid = sessionStorage.getItem('userid');
    this.recpid = sessionStorage.getItem('recpid');
    this.hospitalid = sessionStorage.getItem('hospitalid');
    this.HospitalClinicID = sessionStorage.getItem('hospitalClinicID');
    this.loginID = sessionStorage.getItem('loginid');
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

    this.bsRangeValue = [start, end];

    this.startdate = '2020-01-01';
    this.enddate = '2050-01-01';
    this.Getregisterdpatients();

    this.appointmentTypeID = 0;
  }

  //To get Patient List
  public Getregisterdpatients() {
    debugger;
    if (this.recpid == null) {
      this.DoctorService.GetBookAppointmentByHospitalPatients(
        this.HospitalClinicID,
        this.startdate,
        this.enddate
      ).subscribe(
        (data) => {
          //this.patientslist = data;
          this.dummlist = data;
          this.patientslist = this.dummlist;

          // this.patientslist = this.dummlist.filter((x: { doctorID: any; }) => x.doctorID == this.doctorid);
          this.count = this.patientslist.length;
          this.loader = false;
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetBookAppointmentByHospitalPatients',
            error
          );
        }
      );
    } else {
      this.DoctorService.GetBookAppointmentByHospitalPatients(
        this.HospitalClinicID,
        this.startdate,
        this.enddate
      ).subscribe(
        (data) => {
          this.dummlist = data;
          this.patientslist = this.dummlist;

          this.patientslist = this.dummlist.filter(
            (x: { doctorID: any }) => x.doctorID == this.doctorid
          );
          this.count = this.patientslist.length;
          this.loader = false;
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetBookAppointmentByHospitalPatients',
            error
          );
        }
      );
    }
  }

  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.DoctorService.GetDates(data[0]);
    this.enddate = this.DoctorService.GetDates(data[1]);
    this.Getregisterdpatients();
  }

  // Pagination

  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }

  //Redirecting Page
  edit(id: any) {
    location.href = '#/Doctor/PatientReg/' + btoa(id);
  }

  uploadfile(details: any) {
    sessionStorage.setItem('patientName', details.patientName);
    location.href = '#/Doctor/CreateFolder';
  }

  GetAppointmentTypeID(even: any) {
    this.loader = true;
    this.appointmentTypeID = even.target.value;
  }
}
