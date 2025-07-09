import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/Doctor/doctor.service';
import { SharedService } from '../../services/shared.service';
import Labels from '../../Lables/Support/Supportlabels.json';

@Component({
  selector: 'app-doctor-support-dash',
  templateUrl: './doctor-support-dash.component.html',
  styleUrls: ['./doctor-support-dash.component.css']
})
export class DoctorSupportDashComponent implements OnInit {

  constructor(private DoctorService: DoctorService, private SharedService: SharedService) { }
  loader: boolean | undefined;
  term: any;
  count: any;
  languageid: any;
  typeid: any;
  paidamount: any;
  startdate: any;
  enddate: any;
  appointmentreportList: any;
  bsRangeValue: Date[] | undefined;
  bsValue = new Date();
  maxDate = new Date();
  doctorid: any;
  issuelist: any
  resolvephotourl: any;
  p: any;
  labels: any;
  currentUrl:any;

  ngOnInit(): void {

    this.loader = true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];

    this.typeid = 1;


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

    this.doctorid = sessionStorage.getItem('userid');
    this.bsRangeValue = [start, end];

    this.GetSupportIssues()
  }

  public GetSupportIssues() {
    this.DoctorService.GetSupportForWeb(this.languageid, this.doctorid, 1, this.startdate, this.enddate).subscribe(res => {
      this.issuelist = res;
      this.loader = false;
      this.count = this.issuelist.length;

    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl,"GetSupportForWeb",error);
    })
  }


  photourl: any;

  public GetImageUrl(photoURL: any) {

    this.photourl = photoURL
  }



  selectDate(data: any) {
    this.startdate = this.DoctorService.GetDates(data[0])
    this.enddate = this.DoctorService.GetDates(data[1])
    this.GetSupportIssues()
  }


  public GetResolvePhotoUrl(resolveDescription: any) {
    this.resolvephotourl = resolveDescription
  }

}
