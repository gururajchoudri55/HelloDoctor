import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import * as XLSX from 'xlsx';
import Labels from '../../../Lables/Revenue/revenuelabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-country-revenue',
  templateUrl: './country-revenue.component.html',
  styleUrls: ['./country-revenue.component.css'],
})
export class CountryRevenueComponent implements OnInit {
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  p: any;
  typeid: any;
  count: any;
  languageid: any;
  search: any;
  labels: any;
  AllDetails: any;
  dummAllDetails: any;
  currentUrl: any;
  loader: boolean | undefined;

  constructor(
    private CommonService: CommonService,
    private SharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.typeid = sessionStorage.getItem('TypeID');
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

    this.bsRangeValue = [start, end];

    this.startdate = sessionStorage.getItem('SDATE');
    this.enddate = sessionStorage.getItem('EDATE');

    this.GetAllProviderReports();
  }

  public GetAllProviderReports() {
    this.CommonService.GetAllCountryManagerReports(
      this.startdate,
      this.enddate,
      1,
      this.languageid
    ).subscribe(
      (data) => {
        this.AllDetails = data.filter((x) => x.typeid == this.typeid);
        this.dummAllDetails = data;
        this.count = this.AllDetails.length;
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetAllCountryManagerReports',
          error
        );
      }
    );
  }

  //To Select Date
  selectDate(data: any) {
    this.startdate = this.CommonService.GetDates(data[0]);
    this.enddate = this.CommonService.GetDates(data[1]);
    sessionStorage.setItem('startdate', this.startdate);
    sessionStorage.setItem('enddate', this.enddate);
    this.GetAllProviderReports();
  }

  // Pagination

  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }

  //export to excel
  fileName = 'Appointment Reports.xlsx';
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

  GettypeID(even: any) {
    this.typeid = even.target.value;
    if (even.target.value != 0) {
      this.AllDetails = this.dummAllDetails.filter(
        (x: { typeid: any }) => x.typeid == this.typeid
      );
    } else {
      this.GetAllProviderReports();
    }
  }
}
