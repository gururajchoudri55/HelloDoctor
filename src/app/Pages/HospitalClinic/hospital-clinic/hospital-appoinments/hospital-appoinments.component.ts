import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/Doctor/doctor.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Hospital/hospitallabels.json';

@Component({
  selector: 'app-hospital-appoinments',
  templateUrl: './hospital-appoinments.component.html',
  styleUrls: ['./hospital-appoinments.component.css'],
})
export class HospitalAppoinmentsComponent implements OnInit {
  constructor(
    private DoctorService: DoctorService,
    private SharedService: SharedService
  ) {}
  doctortype: any;
  bookingtype: any;
  appointmentypeid: any;
  languageid: any;
  hospitalid: any;
  todayDate: any;
  departmentlist: any;
  doctorslist: any;
  docdd = {};
  dummdoctorslist: any;
  filterdummlist: any;
  departmentid: any;
  term: any;
  doctorid: any;
  loader: boolean | undefined;
  currentUrl: any;
  labels: any = [];
  ngOnInit(): void {
    debugger;
    this.loader = true;
    this.currentUrl = window.location.href;
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todayDate = formatDate(myDate, format, locale);
    sessionStorage.setItem('Showbutton', '1');
    this.doctortype = 1;
    this.bookingtype = 2;
    this.appointmentypeid = 1;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.hospitalid = sessionStorage.getItem('hospitalid');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];

    sessionStorage.setItem('SelectedDate', this.todayDate);
    this.getdepartmentmaster();
    this.getDoctorss();
  }

  public getdepartmentmaster() {
    this.DoctorService.GetDepartmentMasterByLanguageID(
      this.languageid
    ).subscribe(
      (data) => {
        this.departmentlist = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDepartmentMasterByLanguageID',
          error
        );
      }
    );
  }

  public getDoctorss() {
    debugger;
    this.DoctorService.GetDoctorDetails_ForVideoConferenceForWeb(
      5,
      this.appointmentypeid,
      this.bookingtype,
      this.languageid,
      this.hospitalid
    ).subscribe(
      (data) => {
        this.doctorslist = data;
        this.dummdoctorslist = data;
        this.filterdummlist = data;
        this.docdd = {
          singleSelection: true,
          idField: 'doctorID',
          textField: 'doctorName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
        };
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctorDetails_ForVideoConferenceForWeb',
          error
        );
      }
    );
  }

  public GetAppointmentTypeID(even: any) {
    this.appointmentypeid = even.target.value;
    this.getDoctorss();
  }

  public GetDepartmentID(even: any) {
    if (even.target.value != 0) {
      this.departmentid = even.target.value;
      this.doctorslist = this.dummdoctorslist.filter(
        (x: { departmentID: any }) => x.departmentID == this.departmentid
      );
    } else {
      this.getDoctorss();
    }
  }

  public GetDoctorID(item2: any) {
    this.doctorid = item2.doctorID;
    this.doctorslist = this.dummdoctorslist.filter(
      (x: { doctorID: any }) => x.doctorID == this.doctorid
    );
  }
}
