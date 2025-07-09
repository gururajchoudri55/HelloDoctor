import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../services/Doctor/doctor.service';
import { SharedService } from '../../services/shared.service';
import  Labels from '../../../Pages/Lables/Doctors/AllLabels.json';

@Component({
  selector: 'app-revenue-details',
  templateUrl: './revenue-details.component.html',
  styleUrls: ['./revenue-details.component.css']
})
export class RevenueDetailsComponent implements OnInit {
  p: any;
  loader: boolean | undefined;

  constructor(private DoctorService: DoctorService, private activatedroute: ActivatedRoute, private SharedService: SharedService) { }
  public hospitalid: any;
  public doctorlist: any;
  public departmentlist: any;
  public departmentid: any;
  public term1: any;
  public term: any;
  public languageid: any;
  public labels: any;
  public doctorID: any;
  public id: any;
  public appointmentlist: any;
  startdate: any;
  enddate: any;
  appointmentdummlist: any;
  value: any;
  GrandTotal: any;
  bsRangeValue: any;
  currentUrl: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.hospitalid = sessionStorage.getItem('hospitalClinicID');
    this.doctorID = sessionStorage.getItem('userid');
    this.startdate = sessionStorage.getItem('startdate');
    this.enddate = sessionStorage.getItem('enddate');
    this.activatedroute.params.subscribe(params => {
      this.id = atob(params['id']);
      this.getReveue()
    }
    )
  }



  getReveue() {

    if (this.id == 2) {
      this.DoctorService.GetBookAppointmentByDoctorID(this.doctorID, this.startdate, this.enddate, this.languageid).subscribe(
        data => {
          this.loader = false;
          
          this.appointmentdummlist = data;
          this.appointmentlist = this.appointmentdummlist.filter((x: { appointmentTypeID: number; isVisited: number; refundBit: number; }) => x.appointmentTypeID == 2 && x.isVisited == 1 && x.refundBit == 0)
          this.GrandTotal = 0
          for (let i = 0; i < this.appointmentlist.length; i++) {

            this.GrandTotal = this.GrandTotal + this.appointmentlist[i].indcorevenue;
          }
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetBookAppointmentByDoctorID", error);
        })
    }
    if (this.id == 1) {
      this.DoctorService.GetBookAppointmentByDoctorID(this.doctorID, this.startdate, this.enddate, this.languageid).subscribe(
        data => {
          this.loader = false;
          this.appointmentdummlist = data;
          this.appointmentlist = this.appointmentdummlist.filter((x: { appointmentTypeID: number; isVisited: number; refundBit: number; }) => x.appointmentTypeID == 1 && x.isVisited == 1 && x.refundBit == 0)
          this.GrandTotal = 0
          for (let i = 0; i < this.appointmentlist.length; i++) {

            this.GrandTotal = this.GrandTotal + this.appointmentlist[i].indcorevenue;
          }
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetBookAppointmentByDoctorID", error);
        })
    }
    if (this.id == 3) {
      this.DoctorService.GetBookAppointmentByDoctorID(this.doctorID, this.startdate, this.enddate, this.languageid).subscribe(
        data => {
          this.loader = false;
          this.appointmentdummlist = data;
          this.appointmentlist = this.appointmentdummlist.filter((x: { appointmentTypeID: number; isVisited: number; refundBit: number; }) => x.appointmentTypeID == 5 && x.isVisited == 1 && x.refundBit == 0)
          this.GrandTotal = 0
          for (let i = 0; i < this.appointmentlist.length; i++) {

            this.GrandTotal = this.GrandTotal + this.appointmentlist[i].indcorevenue;
          }
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetBookAppointmentByDoctorID", error);
        })
    }
  }

  // Pagination
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.DoctorService.GetDates(data[0]);
    this.enddate = this.DoctorService.GetDates(data[1]);
    this.getReveue();

  }

}
