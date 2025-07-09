import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/MenuServices/menu.service';
import { SharedService } from '../../../services/shared.service';
import { CommonService } from '../../../services/common.service';
import Labels from '../../../Lables/Report/reportlabels.json';
@Component({
  selector: 'app-vital-patient-report',
  templateUrl: './vital-patient-report.component.html',
  styleUrls: ['./vital-patient-report.component.css']
})
export class VitalPatientReportComponent implements OnInit {

  loader: boolean | undefined;
  languageid:any;
  currentUrl:any;
  labels:any;
  todayDate:any;
  p: any;
  count:any;
  search:any;
  dataList:any;
  constructor(private MenuService: MenuService, private SharedService: SharedService,private CommonService:CommonService) { }

  ngOnInit(): void {
     this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    var date = new Date();
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';  
   
    this.getVitalspatinetreport();
  }
  getVitalspatinetreport() {
    ;
    this.MenuService.GetPatientVitalsReportReport().subscribe(data=>{
      this.dataList=data;
      this.count=this.dataList.length;
      this.loader=false;
    },err=>{
      this.loader=false;
    })
  }

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

}
