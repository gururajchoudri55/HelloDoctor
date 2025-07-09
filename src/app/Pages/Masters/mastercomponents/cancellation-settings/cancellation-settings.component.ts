import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Masters/Masterlabels.json';


@Component({
  selector: 'app-cancellation-settings',
  templateUrl: './cancellation-settings.component.html',
  styleUrls: ['./cancellation-settings.component.css']
})

export class CancellationSettingsComponent implements OnInit {
  languageid:any;
  cancelationTimings:any;
  loader:boolean | undefined;
  currentUrl:any;
  search:any;
  count:any;
  id:any;
  patientinclinictimings:any;
  patientvideocalltiminngs:any;
  codcancelationtime:any;
  doctorCancelledTime:any;
  nurseCancelledTime:any;
  physioCancelledTime:any;
  midwifeCancelledTime:any;
  homeCareCancelationTime:any;
  p:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  cancelationtimings:any;
  labels:any;


  constructor(private  MasterService:MasterService,private SharedService:SharedService,private ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.GetCancellationTimings();
 
  }



  public GetCancellationTimings(){
    this.MasterService.GetCancellationTimings(this.languageid).subscribe(
      data => {
        this.loader=false;
        this.cancelationTimings = data;
        this.count=this.cancelationTimings.length;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetCancellationTimings",error); 
      }
    )
  }




   //Pagination
  public pageChanged(even:any) {
    let fgdgfgd = even;
    this.p = even;
  }


  //To Get Cancellation Timings
  public GetCancelTimings(list:any) {
    this.id = list.id,
    this.patientinclinictimings = list.patientInclinicCancelledTime;
    this.patientvideocalltiminngs = list.patientVideoCallTime
    this.codcancelationtime = list.patientHomeVisitCancelledCodTime
    this.doctorCancelledTime = list.doctorCancelledTime
    this.nurseCancelledTime = list.nurseCancelledTime
    this.physioCancelledTime = list.physioCancelledTime
    this.midwifeCancelledTime = list.midwifeCancelledTime
    this.homeCareCancelationTime = list.homeCareCancelationTime

  }

  public updatedetails() {
    
    this.showPopup=0;
    var entity = {
      'ID': this.id,
      'PatientInclinicCancelledTime': this.patientinclinictimings,
      'PatientVideoCallTime': this.patientvideocalltiminngs,
      'PatientHomeVisitCancelledCodTime': this.codcancelationtime,
      'DoctorCancelledTime': this.doctorCancelledTime,
      'NurseCancelledTime': this.nurseCancelledTime,
      'PhysioCancelledTime': this.physioCancelledTime,
      'MidwifeCancelledTime': this.midwifeCancelledTime,
      'HomeCareCancelationTime': this.homeCareCancelationTime
    }
    this.MasterService.UpdateCancellationTimings(entity).subscribe(data => {
      let res = data;
        this.showPopup=1;
        this.messageID=34;
        this.typeofPopUp=1;
      this.cancelationtimings = data;
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"UpdateCancellationTimings",error);
    })
  }

 



}
