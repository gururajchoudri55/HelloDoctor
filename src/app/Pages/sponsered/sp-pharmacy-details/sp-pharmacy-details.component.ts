import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../Lables/sponsred/sponsered.json';

@Component({
  selector: 'app-sp-pharmacy-details',
  templateUrl: './sp-pharmacy-details.component.html',
  styleUrls: ['./sp-pharmacy-details.component.css']
})
export class SpPharmacyDetailsComponent implements OnInit {
  languageid:any;
  id:any;
  showbutton:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  pharmacylist1:any;
  pharmacydd:any;
  pharmacyid:any;
  startdate:any;
  enddate:any;
  fees:any;
  sponserpharmacylist:any;
  pharmacyname:any;
  loader:boolean | undefined;
  labels:any;
  search:any;
  description:any;
  constructor(private CommonService:CommonService,private ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.search=this.labels.search;
    this.ActivatedRoute.params.subscribe(params => {
      this.showbutton = 0;
      this.id = params['id'];
      if (this.id == undefined) {
        this.showbutton = 0;
      }
      else if (this.id != undefined) {
        this.showbutton = 1;
        this.id=atob(this.id);
        this.GetSponsoredPharmacyForAdmin()
      }
    }
    )
    this.getpharmacydetails();
  }


  
  public getpharmacydetails() {
    this.CommonService.GetPharmacyForAdminByLanguageID(this.languageid).subscribe(
      data => {
        this.pharmacylist1 = data;
        this.pharmacydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'pharmacyName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search
        };
      }, error => {
      }
    )
  }

  public GetPharmacyID(item2: any) {
    this.pharmacyid = item2.id;
  }


  public insertdetails() {
    
   this.showPopup=0;
    if (this.pharmacyid == undefined) {
     this.showPopup=1;
     this.messageID=20;
     this.typeofPopUp=2;
    }
    else {
      var entity = {
        'PharmacyID': this.pharmacyid,
        'SDate': this.startdate,
        'EDate': this.enddate,
        'Fees': this.fees,
        'Description':this.description
      }
      this.CommonService.InsertSponsoredPharmacy(entity).subscribe(data => {
        if (data != 0) {
          this.showPopup=1;
          this.messageID=80;
          this.typeofPopUp=1;
          location.href = "#/Sponsered/SpPharmacy";

        }
      })
    }
  }



  public GetSponsoredPharmacyForAdmin() {
      this.CommonService.GetSponsoredPharmacyForAdmin().subscribe(
        data => {
          this.sponserpharmacylist = data;
          var list = this.sponserpharmacylist.filter((x: { id: any; }) => x.id == this.id)
            this.startdate = list[0].sDate,
            this.enddate = list[0].eDate,
            this.fees = list[0].fees,
            this.pharmacyname = list[0].pharmacyName
            this.description = list[0].description

        }, error => {
        }
      )
    }


    public updatedetails() {
      var entity1 = {
        'ID': this.id,
        'SDate': this.startdate,
        'EDate': this.enddate,
        'Fees': this.fees,
        'Description':this.description

      }
      this.CommonService.UpdateSponsoredPharmacy(entity1).subscribe(data => {
        this.messageID=34;
        this.showPopup=1;
        this.typeofPopUp=1;
        location.href = "#/Sponsered/SpPharmacy";
       
      })
    }

 back(){
  location.href = "#/Sponsered/SpPharmacy";
 }


 
 getStartDate(startdate: any) {
  this.startdate = this.CommonService.GetDates(startdate)
}


getenddadte(enddate: any) {
  this.enddate = this.CommonService.GetDates(enddate)
}

}
