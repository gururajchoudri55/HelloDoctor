import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../Lables/sponsred/sponsered.json';

@Component({
  selector: 'app-sp-homepage-details',
  templateUrl: './sp-homepage-details.component.html',
  styleUrls: ['./sp-homepage-details.component.css']
})
export class SpHomepageDetailsComponent implements OnInit {
  showPhotoURL: any = [];
  showPopup: any;
  folderName: any;
  messageID: any;
  typeofPopUp: any;
  languageid: any;
  paramid: any;
  ClientName: any;
  Description: any;
  PhotoURL: any;
  LinkURL: any;
  StartDate: any;
  EndDate: any;
  fees: any;
  showbutton: any;
  id: any;
  labels: any;


  loader: boolean | undefined;

  showphoto: any;
  sequence: any;
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
    this.CommonService.GetSponcered_AddsMobile(this.languageid).subscribe(
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
        this.showphoto = temp1[0].photoURL;
        this.sequence=temp1[0].sequence
      }, error => {
      }
    )
  }



  files: File[] = [];

  onSelect(event: any) {
    this.showPhotoURL.length = 0;
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
    this.showPhotoURL.length = 0
    this.folderName = "Images/HomePage"
    this.CommonService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
      this.showPhotoURL.push(res);
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("homepage", this.showPhotoURL);
    })
  }

  getStartDate(startdate: any) {
    this.StartDate = this.CommonService.GetDates(startdate)
  }


  getenddadte(enddate: any) {
    this.EndDate = this.CommonService.GetDates(enddate)
  }

  public insertdetails() {
    ;
    this.showPopup = 0;
    var entity = {
      'ClientName': this.ClientName,
      'Description': this.Description,
      'PhotoURL': this.showPhotoURL[0],
      'LinkURL': this.LinkURL,
      'StartDate': this.StartDate,
      'EndDate': this.EndDate,
      'LanguageID': this.languageid,
      'Fees': this.fees,
      'Sequence': this.sequence
    }
    this.CommonService.InsertSponcered_Adds(entity).subscribe(data => {
      this.showPopup = 0;
      if (data != 0) {
        this.showPopup = 1;
        this.messageID = 80;
        this.typeofPopUp = 1;
        location.href = "#/Sponsered/SpHomePageSponsership";
      }
    })
  }
  numberOnly(event: { which: any; keyCode: any }): boolean {
    ;
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
      return false;
    }
    return true;
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
      'Sequence': this.sequence
    }
    this.CommonService.UpdateSponcered_Adds(entity).subscribe(data => {
      

      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      location.href = "#/Sponsered/SpHomePageSponsership";

    })
  }

  back() {
    location.href = "#/Sponsered/SpHomePageSponsership";
  }


}
