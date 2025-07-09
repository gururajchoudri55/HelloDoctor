import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { DoctorService } from 'src/app/Pages/services/Doctor/doctor.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Hospital/hospitallabels.json'

@Component({
  selector: 'app-hospital-dashoard-details',
  templateUrl: './hospital-dashoard-details.component.html',
  styleUrls: ['./hospital-dashoard-details.component.css']
})
export class HospitalDashoardDetailsComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  loader: boolean | undefined;
  appointmenttypeid: any;
  Revenuelist: any;
  filterdummrevenuelist: any;
  count: any;
  grandtotal: any;
  hospitalid: any;
  languageid: any;
  ID: any;
  dummRevenuelist: any;
  currentUrl: any;
  p: any;
  search: any;
  labels: any;


  constructor(private DoctorService: DoctorService, private SharedService: SharedService,
    private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
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

    this.ActivatedRoute.params.subscribe(params => {
      this.ID = params["id"];
      this.ID = atob(this.ID);
      this.hospitalid = sessionStorage.getItem('hospitalid');
      this.startdate = sessionStorage.getItem("startdate");
      this.enddate = sessionStorage.getItem("enddate");

      if (this.ID == 1) {
        this.DoctorService.GetHospitalAppointmentDetails(this.hospitalid, this.startdate, this.enddate).subscribe(
          data => {
            
            this.filterdummrevenuelist = data;
            this.Revenuelist = this.filterdummrevenuelist
            // .filter((x: { isVisited: number; }) => x.isVisited == 1)
            this.count = this.Revenuelist.length;
            this.grandtotal = 0
            if(this.Revenuelist.length!=0)
            {
              this.grandtotal = this.Revenuelist.map((a: { paidAmount: any; }) => a.paidAmount).reduce(function (a: any, b: any) {
                return a + b;
              });
            }
         
          }, error => {
            this.SharedService.insertexceptions(this.SharedService, "GetHospitalAppointmentDetails", error);
          }
        )
      }
      if (this.ID == 2) {
        this.DoctorService.GetHospitalAppointmentDetails(this.hospitalid, this.startdate, this.enddate).subscribe(
          data => {
            this.Revenuelist = data;
            this.filterdummrevenuelist = data;
            this.count = this.Revenuelist.length;
          }, error => {
            this.SharedService.insertexceptions(this.currentUrl, "GetHospitalAppointmentDetails", error);
          }
        )
      }

      if (this.ID == 3) {
        this.DoctorService.GetHospitalAppointmentDetails(this.hospitalid, this.startdate, this.enddate).subscribe(
          data => {
            this.dummRevenuelist = data;
            this.Revenuelist = this.dummRevenuelist.filter((x: { appointmentTypeID: number; }) => x.appointmentTypeID == 5)
            this.count = this.Revenuelist.length;
          }, error => {
            this.SharedService.insertexceptions(this.currentUrl, "GetHospitalAppointmentDetails", error);
          }
        )
      }
      if (this.ID == 4) {
        this.DoctorService.GetHospitalAppointmentDetails(this.hospitalid, this.startdate, this.enddate).subscribe(
          data => {
            this.dummRevenuelist = data;
            this.Revenuelist = this.dummRevenuelist.filter((x: { appointmentTypeID: number; }) => x.appointmentTypeID == 5)
            this.count = this.Revenuelist.length;
          }, error => {
            this.SharedService.insertexceptions(this.currentUrl, "GetHospitalAppointmentDetails", error);
          }
        )
      }
    });



  }


  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.DoctorService.GetDates(data[0]);
    this.enddate = this.DoctorService.GetDates(data[1]);
    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);
    this.loader = false;
  }


  //export to excel
  fileName = 'Hospital Dashboard Reports.xlsx';
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('download');
    
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }


  //To Get Appointment Type

  public GetAppointmentType(even: any) {

    this.appointmenttypeid = even.target.value;
    if (even.target.value != 0) {
      this.Revenuelist = this.filterdummrevenuelist.filter((x: { appointmentTypeID: any; }) => x.appointmentTypeID == this.appointmenttypeid)
      this.count = this.Revenuelist.length;
      // this.grandtotal=0
      this.grandtotal = this.Revenuelist.map((a: { paidAmount: any; }) => a.paidAmount).reduce(function (a: any, b: any) {
        return a + b;
      });
    }
    else {
      this.DoctorService.GetHospitalAppointmentDetails(this.hospitalid, this.startdate, this.enddate).subscribe(
        data => {
          this.Revenuelist = data;
          this.filterdummrevenuelist = data;
          this.count = this.Revenuelist.length;
          // this.grandtotal=0
          this.grandtotal = this.Revenuelist.map((a: { paidAmount: any; }) => a.paidAmount).reduce(function (a: any, b: any) {
            return a + b;
          });

        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetHospitalAppointmentDetails", error);
        }
      )
    }
  }

  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


}
