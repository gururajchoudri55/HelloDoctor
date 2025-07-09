import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DoctorService } from '../../services/Doctor/doctor.service';
import * as XLSX from 'xlsx';
import Labels from '../../Lables/Hospital/hospitallabels.json';

@Component({
  selector: 'app-home-care-revenue-details',
  templateUrl: './home-care-revenue-details.component.html',
  styleUrls: ['./home-care-revenue-details.component.css'],
})
export class HomeCareRevenueDetailsComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  hospitalid: any;
  languageid: any;
  currentUrl: any;
  loader: boolean | undefined;
  dummlist: any;
  cancelledlist: any;
  TotalAmount: any;
  count: any;
  departmentlist: any;
  search: any;
  roleid: any;
  labels: any;
  p: any;

  constructor(
    private DoctorService: DoctorService,
    private SharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.loader = false;
    this.currentUrl = window.location.href;
    this.hospitalid = sessionStorage.getItem('hospitalid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
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

    this.startdate = sessionStorage.getItem('startdate');
    this.enddate = sessionStorage.getItem('enddate');

    this.bsRangeValue = [start, end];
    this.getdepartmentmaster();
    this.GetHospitalHomevisitAppointmentDetails();
  }

  //To Get CancelledList

  public GetHospitalHomevisitAppointmentDetails() {
    this.DoctorService.GetHospitalHomevisitAppointmentDetails(
      this.hospitalid,
      this.startdate,
      this.enddate
    ).subscribe(
      (data) => {
        this.cancelledlist = data;
        // this.cancelledlist = this.dummlist.filter((x: { isVisited: number; }) => x.isVisited == 1);
        // let total1 = 0;
        // this.cancelledlist.forEach((element: { paidAmount: number; }) => {
        //   total1 += element.paidAmount;
        // });
        // this.TotalAmount = total1
        this.count = this.cancelledlist.length;
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

  //To get Department List
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

  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.DoctorService.GetDates(data[0]);
    this.enddate = this.DoctorService.GetDates(data[1]);
    sessionStorage.setItem('startdate', this.startdate);
    sessionStorage.setItem('enddate', this.enddate);
    this.GetHospitalHomevisitAppointmentDetails();
    this.loader = false;
  }

  public GetTypeID(event: any) {
    if (event.target.value == 'none') {
      this.DoctorService.GetHomecareRevenueByHospitalID(
        this.hospitalid,
        this.startdate,
        this.enddate
      ).subscribe(
        (data) => {
          this.dummlist = data;
          this.cancelledlist = this.dummlist.filter(
            (x: { isVisited: number }) => x.isVisited == 1
          );
          let total1 = 0;
          this.cancelledlist.forEach((element: { paidAmount: number }) => {
            total1 += element.paidAmount;
          });
          this.TotalAmount = total1;
          this.count = this.cancelledlist.length;
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetHomecareRevenueByHospitalID',
            error
          );
        }
      );
    } else {
      this.DoctorService.GetHomecareRevenueByHospitalID(
        this.hospitalid,
        this.startdate,
        this.enddate
      ).subscribe(
        (data) => {
          this.dummlist = data;
          this.cancelledlist = this.dummlist.filter(
            (x: { type: any; isVisited: number }) =>
              x.type == event.target.value && x.isVisited == 1
          );
          let total1 = 0;
          this.cancelledlist.forEach((element: { paidAmount: number }) => {
            total1 += element.paidAmount;
          });
          this.TotalAmount = total1;
          this.count = this.cancelledlist.length;
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

  // Pagination

  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }
}
