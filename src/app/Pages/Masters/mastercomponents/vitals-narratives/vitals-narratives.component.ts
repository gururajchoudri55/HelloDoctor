import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Masters/Masterlabels.json';
@Component({
  selector: 'app-vitals-narratives',
  templateUrl: './vitals-narratives.component.html',
  styleUrls: ['./vitals-narratives.component.css']
})
export class VitalsNarrativesComponent implements OnInit {

  loader: any;
  currentUrl: any;
  languageid: any;
  labels: any;
  id: any;
  showbit: any;
  typeofPopUp: any;
  messageID: any;
  showPopup: any;
  amount: any;
  quentity: any;

  HeartRate: any
  RespiratoryRate: any;
  SDNN: any;
  BloodPressure: any;
  SPO2: any;
  StressLevel: any;
  RMSSD: any;
  CardiacWorkload: any;
  PulseRespiratoryQuotient: any;
  IBI: any;
  dummChargesList: any;
  vitalsData: any;
  count: any;
  NarrativeName: any;
  Discription: any;
  vitalID: any;
  vitallist: any;
  diadd: any;
  selectvital: any;
  search: any;
  VitalNarrativeID: any;
  LanguageID:any;
  constructor(private MasterService: MasterService, private SharedService: SharedService,
    private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.loader=true;
    
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    // this.LanguageID= this.languageid;
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.getvitals();
    this.ActivatedRoute.params.subscribe(params => {
      ;
      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.id = atob(this.id);
        this.showbit = 1;
        this.GetVitalsnarr(this.id)
      }
    });
    this.VitalNarrativeID=0;
    this.LanguageID=0;
  }

  getvitals() {
    this.MasterService.GetVitalNarrativeMaster(this.languageid).subscribe(
      data => {
        this.loader = false;
        this.vitallist = data;
        this.count = this.vitallist.length;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetVitalNarrativeMaster", error);
      }
    )
  }



  insertdetails() {
    
    var entity = {
      'VitalNarrativeID': this.VitalNarrativeID,
      'Discription': this.Discription,
      'LanguageID':this.LanguageID
    }
    this.MasterService.InsertVitalsNarratives(entity).subscribe(data => {
      this.showPopup = 1;
      this.typeofPopUp = 1;
      this.messageID = 1;
      location.href = "#/Masters/VitalsNarrativesMaster";
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "InsertVitalsPackage", error);
    })
  }
  updatedetails() {
    var entity = {
      'ID': this.id,  
      'VitalNarrativeID': this.VitalNarrativeID,
      'Discription': this.Discription,
      'LanguageID': this.languageid
    }
    this.MasterService.UpdateVitalsNarratives(entity).subscribe(data => {
      this.showPopup = 1;
      this.typeofPopUp = 1;
      this.messageID = 1;
      location.href = "#/Masters/VitalsNarrativesMaster";
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "UpdateVitalsNarratives", error);
    })
  }

  GetVitalsnarr(id: any) {
    
    this.MasterService.GetVitalsNarratives(this.languageid).subscribe(
      data => {
        this.loader = false;
        this.vitalsData = data.filter((x: { id: any; }) => x.id == this.id);
        this.VitalNarrativeID = this.vitalsData[0].vitalNarrativeID
        this.Discription = this.vitalsData[0].discription
        this.LanguageID = this.vitalsData[0].languageID

        this.count = this.vitalsData.length;
        this.dummChargesList = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetVitalsPromoCode", error);
      }
    )

  }
}
