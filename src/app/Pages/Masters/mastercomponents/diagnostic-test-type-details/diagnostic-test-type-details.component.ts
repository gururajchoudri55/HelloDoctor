import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Masters/Masterlabels.json';


@Component({
  selector: 'app-diagnostic-test-type-details',
  templateUrl: './diagnostic-test-type-details.component.html',
  styleUrls: ['./diagnostic-test-type-details.component.css']
})
export class DiagnosticTestTypeDetailsComponent implements OnInit {
  currentUrl:any;
  languageid:any;
  testslist:any;
  id:any;
  test:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  p:any;
  showbit:any;
  loader:any;
  labels:any;
  



  constructor(private MasterService:MasterService,private SharedService:SharedService,
    private ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUrl=window.location.href;
    this.showbit = 0;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.ActivatedRoute.params.subscribe(params => {
      this.id =params['id'];
      if (this.id == undefined ) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.id=atob(this.id);
        this.showbit = 1;
        this.getdiagnosticcentertests();
      }
    }
    )

  }

  public getdiagnosticcentertests() {
    this.MasterService.GetDiagnosticTestTypeMasterByLanguageID(this.languageid).subscribe(
      data => {
        this.loader=false;
        this.testslist = data;
        var list=this.testslist.filter((x: { id: any; })=>x.id==this.id)
        this.test=list[0].name
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticTestTypeMasterByLanguageID",error);
      }
    )
  }
  public insertdetails() {
    var entity = {
      'Name': this.test,
      'LanguageID': 1
    }
    this.MasterService.InsertDiagnosticTestTypeMaster(entity).subscribe(data => {
      this.showPopup=1;
      this.typeofPopUp=1;
      this.messageID=1;
      location.href="#/Masters/DiagnosticTestMaster";
    })
  }


  public updatedetails() {
    var entity = {
      'ID':this.id,
      'Name': this.test,
      'LanguageID': this.languageid
    }
    this.MasterService.UpdateDiagnosticTestTypeMaster(entity).subscribe(data => {
    let res=data;
        this.showPopup=1;
        this.messageID=34;
        this.typeofPopUp=1;
        location.href="#/Masters/DiagnosticTestMaster";
      
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"UpdateDiagnosticTestTypeMaster",error);
    })
  }



}
