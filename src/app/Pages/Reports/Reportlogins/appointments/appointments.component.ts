import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import Labels from '../../../Lables/managelogins/managelabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  loader: boolean | undefined;
  languageid: any;
  allcounts: any;
  enddate: any;
  startdate: any;
  labels: any;
  currentUrl: any;


  constructor(private CommonService: CommonService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    var date = new Date();

    this.startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);

    const format1 = 'yyyy-MM-dd';
    const locale1 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale1);

    this.GetCounts();
  }

  public GetCounts() {
    
    this.CommonService.GetAdminDashboardCounts(this.languageid, this.startdate, this.enddate).subscribe(
      data => {
        this.allcounts = data;
        this.loader = false;
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetAdminDashboardCounts", error);
      }
    )
  }

  dashboard(id: any) {
    location.href = "#/reports/DoctorReports/" + btoa(id);
  }



  appointments(id: any) {
    location.href = "#/reports/TotalAppointmentReports/" + btoa(id);
  }


  getdiagnostic() {
    location.href = "#/reports/TotalDiagnosticReports/" + 1
  }
  getPharma()
  {
    location.href="#/reports/TotalPrescriptionReports/"+1
  }
  getPhysio()
  {
    location.href="#/reports/TotalPhysiotherapistReports/"+1
  }

  getMidwife()
  {
    location.href="#/reports/TotalMidwifeReports/"+1
  }
  getNures()
  {
    location.href="#/reports/TotalNurseReports/"+1
  }
}
