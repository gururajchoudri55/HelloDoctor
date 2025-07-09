import { Component, OnInit } from '@angular/core';
import { PhysioService } from 'src/app/Pages/services/physio.service';
import { SharedService } from 'src/app/Pages/services/shared.service';


@Component({
  selector: 'app-emr',
  templateUrl: './emr.component.html',
  styleUrls: ['./emr.component.css']
})
export class EMRComponent implements OnInit {
  languageid:any;
  loader:boolean | undefined;
  currentUrl:any;
  patientsList:any;
   search:any;
   p:any;

  constructor(private SharedService:SharedService,private PhysioService:PhysioService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.getallpatients();
  }
  public getallpatients() {
    this.PhysioService.GetHomeCareDistinctPatientID(this.languageid).subscribe(
      data => {
        this.loader=false;
        this.patientsList = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetHomeCareDistinctPatientID",error);
        this.loader=false;
      }
    )
  }

    // Pagination

    public pageChanged(even: any) {

      let fgdgfgd = even;
      this.p = even;
    }

}
