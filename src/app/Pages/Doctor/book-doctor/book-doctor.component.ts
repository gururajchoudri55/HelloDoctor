import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/Doctor/doctor.service';
import Labels from '../../Lables/Doctors/myAppointments.json';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-book-doctor',
  templateUrl: './book-doctor.component.html',
  styleUrls: ['./book-doctor.component.css'],
})
export class BookDoctorComponent implements OnInit {
  loader: boolean | undefined;

  constructor(
    private DoctorService: DoctorService,
    private SharedService: SharedService
  ) {}
  doctorType: any;
  bookingType: any;
  appointmentTypeID: any;
  doctorList: any;
  doctorID: any;
  languageID: any;
  hospitalID: any;
  todayDate: any;
  labels: any;
  currentUrl: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todayDate = formatDate(myDate, format, locale);

    this.todayDate = this.DoctorService.GetDates(this.todayDate);
    sessionStorage.setItem('Showbutton', '2');
    this.loader = true;
    this.doctorID = sessionStorage.getItem('userid');
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.hospitalID = sessionStorage.getItem('hospitalClinicID');

    sessionStorage.setItem('SelectedDate', this.todayDate);
    this.doctorType = 1;
    this.bookingType = 2;
    this.appointmentTypeID = 1;
    this.getDoctorss();
  }

  public getDoctorss() {
    this.DoctorService.GetDoctorDetails_ForVideoConferenceForWeb(
      5,
      this.appointmentTypeID,
      this.bookingType,
      this.languageID,
      this.hospitalID
    ).subscribe(
      (data) => {
        this.doctorList = data.filter(
          (x: { doctorID: any }) => x.doctorID == this.doctorID
        );
        this.loader = false;
        // data.filter((x: { doctorID: any; }) => x.doctorID == this.doctorID)
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

  GetAppointmentTypeID(even: any) {
    this.loader = true;
    this.appointmentTypeID = even.target.value;
    this.getDoctorss();
  }
}
