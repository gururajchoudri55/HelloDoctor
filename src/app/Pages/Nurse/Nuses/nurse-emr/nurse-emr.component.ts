import { Component, OnInit } from '@angular/core';
import { NurseService } from 'src/app/Pages/services/nurse.service';
import Labels from '../../../Lables/Nurse/nurselabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-nurse-emr',
  templateUrl: './nurse-emr.component.html',
  styleUrls: ['./nurse-emr.component.css']
})
export class NurseEmrComponent implements OnInit {
  loader: boolean | undefined;

  constructor(private NurseService: NurseService,public SharedService:SharedService) { }
  public appointmentlist: any;
  public term: any;
  public languageid: any;
  public labels: any;
  public patientslist: any;
  count: any;
  currentUrl:any;
  p:any;



  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.getallpatients();
  }


  public getallpatients() {
    this.NurseService.GetHomeCareDistinctPatientID(this.languageid).subscribe(
      data => {
        this.loader=false;
        this.patientslist = data;
        this.count = this.patientslist.length;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetHomeCareDistinctPatientID",error);
        this.loader=false;
      }
    )
  }


  Npm(id: any) {
    location.href = "#/Nurse/NpmEmr/" + btoa(id)
  }


  
 // Pagination

 public pageChanged(even: any) {
  let fgdgfgd = even;
  this.p = even;
}

}
