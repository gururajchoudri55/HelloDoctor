import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Masters/Masterlabels.json'

@Component({
  selector: 'app-specialization-master-details',
  templateUrl: './specialization-master-details.component.html',
  styleUrls: ['./specialization-master-details.component.css']
})
export class SpecializationMasterDetailsComponent implements OnInit {
  languageid:any;
  currentUrl:any;
  specilisationlist:any;
  specilizationanme:any;
  description:any;
  id:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  showbit:any;
  loader:boolean | undefined;
  labels:any;

  constructor(private MasterService:MasterService,private SharedService:SharedService,
    private ActivatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.currentUrl=window.location.href;
    this.showbit = 0;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.ActivatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id == undefined||null) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.id=atob(this.id);
        this.showbit = 1;
        this.getspecilicationmaster();
      }
    }
    )
  }


  //Get Specialization List 
  public getspecilicationmaster() {
    this.MasterService.GetSpecilaizationMasterByLanguageID(this.languageid).subscribe(
      data => {     
        this.specilisationlist = data;
        var list = this.specilisationlist.filter((x: { id: any; }) => x.id == this.id)
        this.specilizationanme = list[0].specilaizationName,
        this.description = list[0].description
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetSpecilaizationMasterByLanguageID",error);
    }
    )
  }


  //Insert Details

  public insertdetails() {
    var entity = {
      'SpecilaizationName': this.specilizationanme,
      'Description': this.description,
      'LanguageID': 1,
    }
    this.MasterService.InsertSpecilaizationMaster(entity).subscribe(data => {
      this.showPopup=1;
      this.typeofPopUp=1;
      this.messageID=1;
        location.href = "#/Masters/SpecializationMaster";
    })
  }

   // Update Details
  public updatedetails() {
    var entity = {
      'ID': this.id,
      'SpecilaizationName': this.specilizationanme,
      'Description': this.description,
      'LanguageID': this.languageid,
    }
    this.MasterService.UpdateSpecilaizationMaster_Web(entity).subscribe(data => {
      let res = data
       this.showPopup=1;
       this.messageID=34;
       this.typeofPopUp=1;
       location.href = "#/Masters/SpecializationMaster";

    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"UpdateSpecilaizationMaster_Web",error);
    })
  }


  //Redirectin the Page
  cancel(){
    location.href = "#/Masters/SpecializationMaster";
  }



}
