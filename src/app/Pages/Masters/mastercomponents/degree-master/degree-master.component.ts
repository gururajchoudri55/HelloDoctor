import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Masters/Masterlabels.json';

@Component({
  selector: 'app-degree-master',
  templateUrl: './degree-master.component.html',
  styleUrls: ['./degree-master.component.css']
})
export class DegreeMasterComponent implements OnInit {

  constructor(private MasterService: MasterService, private SharedService: SharedService, private ActivatedRoute: ActivatedRoute) { }
  currentUrl: any;
  showbit: any;
  languageid: any;
  labels: any;
  public id: any;
  loader: boolean | undefined
  public description: any;
  public degreename: any;
  public degreelist: any;

  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.showbit = 0;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.ActivatedRoute.params.subscribe(params => {


      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.showbit = 1;
        this.getdegreemaster()
      }
    }
    )

  }




  public getdegreemaster() {

    this.MasterService.GetDegreeMasterBylanguageID(this.languageid).subscribe(
      data => {

        this.degreelist = data;
        var list = this.degreelist.filter((x: { id: any; }) => x.id == this.id)
        this.degreename = list[0].short
        this.description = list[0].description
      }, error => {
      }
    )
  }



  public insertdetails() {
    this.loader = true;
    this.showPopup = 0;

    var entity = {
      'Short': this.degreename,
      'Description': this.description,
      'LanguageID': 1
    }
    this.MasterService.InsertDegreeMaster(entity).subscribe(data => {
      if (data != 0) {
        this.showPopup = 1;
        this.messageID = 1;
        this.typeofPopUp = 1
        this.loader = false
        location.href = "#/Masters/degreeMasterdash"
      }
    })
  }



  public updatedetails() {
    this.loader = true;

    var entity = {
      'ID': this.id,
      'Short': this.degreename,
      'Description': this.description,
      'LanguageID': this.languageid
    }
    this.MasterService.UpdateDegreeMaster_Web(entity).subscribe(data => {
      this.loader = false;

      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1
      location.href = "#/Masters/degreeMasterdash"

    })
  }

  cancel()
  {
    location.href="#/Masters/degreeMasterdash"
  }
}
