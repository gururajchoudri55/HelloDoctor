import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import Labels from '../../../Lables/Report/reportlabels.json';
@Component({
  selector: 'app-patient-report',
  templateUrl: './patient-report.component.html',
  styleUrls: ['./patient-report.component.css']
})
export class PatientReportComponent implements OnInit {
  languageid:any;
  currentUrl:any;
  patientsList:any;
  count:any;
  loader:boolean | undefined ;
  search:any
  p:any;
  labels:any;
  
  
  constructor(private MenuService:MenuService,private SharedService:SharedService ) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem("LanguageID");
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.Getregisterdpatients();
  }


  public Getregisterdpatients() {
    this.MenuService.GetPatientRegistration('2020-01-01', '2080-01-01',this.languageid).subscribe(
      data => {
       this.loader=false;
        this.patientsList = data;
        this.count = this.patientsList.length
      },
      error => { 
        this.SharedService.insertexceptions(this.currentUrl,"GetPatientRegistration",error);
      }
    );
  }

     //Pagination
     public pageChanged(even:any) {

      let fgdgfgd = even;
      this.p = even;
    }

}
