import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Doctors/myAppointments.json'
import { DiagnosticService } from 'src/app/Pages/services/diagnostic.service';


@Component({
  selector: 'app-patient-reg-dash',
  templateUrl: './patient-reg-dash.component.html',
  styleUrls: ['./patient-reg-dash.component.css']
})
export class PatientRegDashComponent implements OnInit {

  constructor(private SharedService: SharedService, private DiagnosticService: DiagnosticService) { }
  count: any;
  currentUrl: any;
  p: any;
  search: any;
  labels: any;
  languageid: any;
  loader: boolean | undefined;
  roleid: any;
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  diagnosticid: any;
  patientslist: any;
  messageID:any;
  typeofPopUp:any;
  showPopup:any;
  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem("LanguageID");
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.roleid = sessionStorage.getItem("roleid");
    this.diagnosticid = sessionStorage.getItem('diagnosticid');
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
    this.enddate = formatDate(this.enddate, format1, locale1)

    this.bsRangeValue = [start, end];
    this.Getregisterdpatients()
  }


  public Getregisterdpatients() {
    this.DiagnosticService.GetDiagnosticpatients(this.diagnosticid).subscribe(
      data => {
        this.loader = false;
        this.patientslist = data;

        this.count = this.patientslist.length
      },
      error => { 
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticpatients",error);
      }
    );
  }

  //To Select Date
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.DiagnosticService.GetDates(data[0]);
    this.enddate = this.DiagnosticService.GetDates(data[1]);
    this.Getregisterdpatients();
  }

  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

}
