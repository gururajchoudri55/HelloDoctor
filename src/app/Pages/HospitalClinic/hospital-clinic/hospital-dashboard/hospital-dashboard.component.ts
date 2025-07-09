import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import { formatDate } from '@angular/common';
import Labels from '../../../Lables/Hospital/hospitallabels.json';

@Component({
  selector: 'app-hospital-dashboard',
  templateUrl: './hospital-dashboard.component.html',
  styleUrls: ['./hospital-dashboard.component.css'],
})
export class HospitalDashboardComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  loader: boolean | undefined;
  hospitalid: any;
  homecarerevenuecount: any;
  dummdetilslist: any;
  detailslist1: any;
  element: any;
  TotalAmount: any;
  NurseRevenueCount: any;
  NurseAppointmentsCount: any;
  physioAppointmentsCount: any;
  PhysioRevenue: any;
  languageid: any;
  hospitaltype: any;
  homecareappointment: any;
  homecarerev: any;
  detailslist: any;
  totalreveue: any;
  totalappointments: any;
  currentUrl: any;
  labels: any;

  constructor(
    private DoctorService: DoctorService,
    private SharedService: SharedService
  ) {}

  ngOnInit(): void {
    debugger;
    this.loader = true;
    this.currentUrl = window.location.href;
    this.hospitaltype = sessionStorage.getItem('hospitaltype');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.hospitalid = sessionStorage.getItem('hospitalid');
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

    sessionStorage.setItem('startdate', this.startdate);
    sessionStorage.setItem('enddate', this.enddate);

    this.bsRangeValue = [start, end];
    this.NurseAppointmentsCount = 0;
    this.physioAppointmentsCount = 0;
    this.NurseRevenueCount = 0;
    this.PhysioRevenue = 0;
    this.GetHospitalRevenue();
    this.homecarerevenue();
    this.homecareAppointments();
    this.GetHomecareRevenueByHospitalID();
  }

  public GetHomecareRevenueByHospitalID() {
    this.DoctorService.GetHomecareRevenueByHospitalID(
      this.hospitalid,
      this.startdate,
      this.enddate
    ).subscribe(
      (data) => {
        this.dummdetilslist = data;
        this.detailslist1 = this.dummdetilslist.filter(
          (x: { isVisited: number }) => x.isVisited == 1
        );
        let total1 = 0;
        this.homecarerevenuecount = this.detailslist1.length;
        this.detailslist1.forEach((element: { paidAmount: number }) => {
          total1 += element.paidAmount;
        });
        this.TotalAmount = total1;
        this.loader = false;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetHomecareRevenueByHospitalID',
          error
        );
      }
    );
  }

  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.DoctorService.GetDates(data[0]);
    this.enddate = this.DoctorService.GetDates(data[1]);
    sessionStorage.setItem('startdate', this.startdate);
    sessionStorage.setItem('enddate', this.enddate);
    this.GetHomecareRevenueByHospitalID();
    this.GetHospitalRevenue();
    this.GetNurse_PatientPaymentDetails();
    this.GetNurse_AppointmentCounts();
    this.GetPhysio_AppointmentCounts();
    this.GetPhysiotherapist_PatientPaymentDetails();
  }

  // NurseRevenueCount
  public GetNurse_PatientPaymentDetails() {
    this.DoctorService.GetNurse_PatientPaymentDetails(
      this.hospitalid
    ).subscribe(
      (data) => {
        this.NurseRevenueCount = data[0].nurseRevenue;
        this.loader = false;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetNurse_PatientPaymentDetails',
          error
        );
        this.loader = false;
      }
    );
  }

  // NurseAppointmentsCount
  public GetNurse_AppointmentCounts() {
    this.DoctorService.GetNurse_AppointmentCounts(this.hospitalid).subscribe(
      (data) => {
        this.NurseAppointmentsCount = data[0].nurseApptCount;
        this.loader = false;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetNurse_AppointmentCounts',
          error
        );
      }
    );
  }

  //  physioAppointmentsCount
  public GetPhysio_AppointmentCounts() {
    this.DoctorService.GetPhysio_AppointmentCounts(this.hospitalid).subscribe(
      (data) => {
        this.physioAppointmentsCount = data[0].apptCount;
        this.loader = false;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetPhysio_AppointmentCounts',
          error
        );
        this.loader = false;
      }
    );
  }

  // PhysioRevenue
  public GetPhysiotherapist_PatientPaymentDetails() {
    this.DoctorService.GetPhysiotherapist_PatientPaymentDetails(
      this.hospitalid
    ).subscribe(
      (data) => {
        this.PhysioRevenue = data[0].physioRevenue;
        this.loader = false;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetPhysiotherapist_PatientPaymentDetails',
          error
        );
        this.loader = false;
      }
    );
  }

  //homecarerev
  public homecarerevenue() {
    this.DoctorService.GetNurse_PatientPaymentDetails(
      this.hospitalid
    ).subscribe(
      (data) => {
        this.NurseRevenueCount = data[0].nurseRevenue;
        this.loader = false;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetNurse_PatientPaymentDetails',
          error
        );
      }
    );
    this.DoctorService.GetPhysiotherapist_PatientPaymentDetails(
      this.hospitalid
    ).subscribe(
      (data) => {
        this.PhysioRevenue = data[0].physioRevenue;
        this.loader = false;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetPhysiotherapist_PatientPaymentDetails',
          error
        );
      }
    );
    this.homecarerev = this.NurseRevenueCount + this.PhysioRevenue;
  }

  //homecareappointment
  public homecareAppointments() {
    this.DoctorService.GetNurse_AppointmentCounts(this.hospitalid).subscribe(
      (data) => {
        this.NurseAppointmentsCount = data[0].nurseApptCount;
        this.loader = false;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetNurse_AppointmentCounts',
          error
        );
      }
    );
    this.DoctorService.GetPhysio_AppointmentCounts(this.hospitalid).subscribe(
      (data) => {
        this.physioAppointmentsCount = data[0].apptCount;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetPhysio_AppointmentCounts',
          error
        );
      }
    );
    this.homecareappointment =
      this.NurseAppointmentsCount + this.physioAppointmentsCount;
  }

  //Get All Counts

  public GetHospitalRevenue() {
    debugger;
    this.DoctorService.GetHospitalRevenueandCounts(
      this.hospitalid,
      this.startdate,
      this.enddate
    ).subscribe(
      (data) => {
        this.detailslist = data;
        // this.totalreveue = Number(this.detailslist[0].inclinicRevenue) + Number(this.detailslist[0].vedioconferenceRevenue) + Number(this.detailslist[0].homeVisitRevenue) + Number(this.detailslist[0].nurseRevenue) + Number(this.detailslist[0].midwifehospitalrevenue) + Number(this.detailslist[0].physiohospitlrevenue),
        //   this.totalappointments = Number(this.detailslist[0].clicniccount) + Number(this.detailslist[0].vedocallappointmentcount) + Number(this.detailslist[0].homeVisitAppointments);
        this.loader = false;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetHospitalRevenueandCounts',
          error
        );
        this.loader = false;
      }
    );
  }

  gotodashboard(id: any) {
    location.href = '#/HospitalClinic/HospitalDashoardDetails/' + btoa(id);
  }

  goRevenue() {
    location.href = '#/HospitalClinic/HomeCareRevenueDetails';
  }
}
