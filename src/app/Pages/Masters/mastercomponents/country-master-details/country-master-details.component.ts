import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Masters/Masterlabels.json';

@Component({
  selector: 'app-country-master-details',
  templateUrl: './country-master-details.component.html',
  styleUrls: ['./country-master-details.component.css']
})
export class CountryMasterDetailsComponent implements OnInit {
  languageid: any;
  countrylist: any;
  countryname: any;
  countryid: any;
  currentUrl: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  showbit: any;
  labels:any;

  constructor(private MasterService: MasterService, private SharedService: SharedService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.showbit = 0;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];

    this.ActivatedRoute.params.subscribe(params => {
      
      this.countryid = params['id'];
      if (this.countryid == undefined) {
        this.showbit = 0;
      }
      else if (this.countryid != undefined) {
        this.countryid = atob(this.countryid)
        this.showbit = 1;
        this.GetCountryMaster();
        
      }


    }
    )


  }

  //Get Country Master 
  public GetCountryMaster() {
    this.MasterService.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
        this.countrylist = data;
        var list = this.countrylist.filter((x: { id: any; }) => x.id == this.countryid)
        this.countryname = list[0].short;
        console.log("list", this.countrylist);
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetCountryMasterByLanguageID", error);
      }
    )
  }

  //Insert Details 

  public insertdetails() {
    var entity = {
      'Short': this.countryname,
      'LanguageID': 1
    }
    this.MasterService.InsertCountryMaster(entity).subscribe(data => {
      this.showPopup = 1;
      this.typeofPopUp = 1;
      this.messageID = 1;
      location.href = "#/Masters/CountryMaster/";
    })

  }


  //Update Details 
  public updatedetails() {
    var entity = {
      'ID': this.countryid,
      'Short': this.countryname,
      'LanguageID': this.languageid
    }
    this.MasterService.UpdateCountryMaster_Web(entity).subscribe(data => {
      let res = data;
      this.showPopup = 0;
      this.messageID = 34;
      this.typeofPopUp = 1;
      location.href = "#/Masters/CountryMaster/";
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"UpdateCountryMaster_Web",error);
        })
  }


  //Redirecting the page 
  cancel() {
    location.href = "#/Masters/CountryMaster/";
  }


}
