import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../Lables/sponsred/sponsered.json';

@Component({
  selector: 'app-sp-appointment-details',
  templateUrl: './sp-appointment-details.component.html',
  styleUrls: ['./sp-appointment-details.component.css']
})
export class SpAppointmentDetailsComponent implements OnInit {
  languageid: any;
  showbutton: any;
  id: any;
  ClientName: any;
  Description: any;
  LinkURL: any;
  fees: any;
  StartDate: any;
  EndDate: any;
  showPhotoURL: any = [];
  showphoto: any;
  showPopup: any;
  folderName: any;
  messageID: any;
  typeofPopUp: any;
  paramid: any;
  loader: boolean | undefined;
  labels: any;

  constructor(private CommonService: CommonService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.ActivatedRoute.params.subscribe(params => {
      this.showbutton = 0;
      this.id = params['id'];
      if (this.id == undefined) {
        this.showbutton = 0;
      }
      else if (this.id != undefined) {
        this.showbutton = 1;
        this.id = atob(this.id);
        this.getsponsradd();
      }
    }
    )
  }





  public getsponsradd() {
    this.CommonService.GetAppPageSponsorship().subscribe(
      data => {
        let temp: any = data;
        let temp1: any = temp.filter((x: { id: any; }) => x.id == this.id)
        this.ClientName = temp1[0].clientName;
        this.Description = temp1[0].description;
        this.LinkURL = temp1[0].linkURL;
        this.fees = temp1[0].fees;
        this.StartDate = temp1[0].startdateeee;
        this.EndDate = temp1[0].enddateeee;
        this.showPhotoURL[0] = temp1[0].photourlss;
        this.showphoto = temp1[0].photoURL
      }, error => {
      }
    )
  }



  files: File[] = [];

  onSelect(event: any) {
    // this.showPhotoURL.length=0;
    this.showPopup = 0;
    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadsAttchments();
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.showPhotoURL.splice(this.files.indexOf(event), 1);
  }


  uploadsAttchments() {
    this.showPhotoURL.length = 0;
    this.folderName = "Images/Appontment"
    this.CommonService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
      this.showPhotoURL.push(res);
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("Appontment", this.showPhotoURL);
    })
  }

  getStartDate(startdate: any) {
    this.StartDate = this.CommonService.GetDates(startdate)
  }


  getenddadte(enddate: any) {
    this.EndDate = this.CommonService.GetDates(enddate)
  }

  public insertdetails() {
    this.showPopup = 0;
    var entity = {
      'ClientName': this.ClientName,
      'Description': this.Description,
      'PhotoURL': this.showPhotoURL[0],
      'LinkURL': this.LinkURL,
      'StartDate': this.StartDate,
      'EndDate': this.EndDate,
      'LanguageID': this.languageid,
      'Fees': this.fees
    }
    this.CommonService.InsertAppPageSponsorship(entity).subscribe(data => {
      
      this.showPopup = 0;
      if (data != 0) {
        this.showPopup = 1;
        this.messageID = 80;
        this.typeofPopUp = 1;
        location.href = "#/Sponsered/SpAppointmentSponsership/";
      }
    })
  }

  public updatedetails() {
    this.showPopup = 0;
    var entity = {
      'ID': this.id,
      'ClientName': this.ClientName,
      'Description': this.Description,
      'LinkURL': this.LinkURL,
      'StartDate': this.StartDate,
      'EndDate': this.EndDate,
      'Fees': this.fees,
      'PhotoURL': this.showPhotoURL[0],
    }
    this.CommonService.UpdateAppPageSponsorship(entity).subscribe(data => {
      
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      location.href = "#/Sponsered/SpAppointmentSponsership/";
    })
  }

  back() {
    location.href = "#/Sponsered/SpAppointmentSponsership";
  }





}
