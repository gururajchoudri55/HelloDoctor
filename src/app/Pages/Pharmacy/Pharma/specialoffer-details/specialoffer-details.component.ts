import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { PharmacyService } from 'src/app/Pages/services/pharmacy.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Prescriptions/prescriptionlabels.json'

@Component({
  selector: 'app-specialoffer-details',
  templateUrl: './specialoffer-details.component.html',
  styleUrls: ['./specialoffer-details.component.css']
})
export class SpecialofferDetailsComponent implements OnInit {
  loader:boolean | undefined;
  currentUrl:any;
  showPopup:any;
  folderName:any;
  offerphoto:any=[];
  messageID:any;
  typeofPopUp:any;
  pharmacyid:any;
  languageid:any;
  id:any;
  showbutton:any;
  clear:any;
  offername:any;
  descripton:any
  offer:any;
  offerid:any;
  offerslist:any;
  labels:any;
  pharmcyphotos:any;

 
  constructor(private  PharmacyService:PharmacyService,private SharedService:SharedService,
    private ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    // this.loader=true;
    this.currentUrl=window.location.href;
    this.pharmacyid = sessionStorage.getItem('pharmacyid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.showbutton = 0;
    this.ActivatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id == undefined) {
        this.showbutton = 0;
      }
      else {
        this.id=atob(this.id);
        this.showbutton = 1;
        this.getpharmacyoffersbypharmacyid();
      }

    }
    )
 

  }

  public getpharmacyoffersbypharmacyid() {

    this.PharmacyService.GetPharmacyOfferByPharmacyID(this.pharmacyid).subscribe(
      data => {

        this.offerslist = data;
        var list = this.offerslist.filter((x: { id: any; }) => x.id == this.id)
        this.offername = list[0].offerName,
          this.descripton = list[0].description,
          this.startDate =this.PharmacyService.GetDates(list[0].sdate) ,
          this.endDate = this.PharmacyService.GetDates(list[0].edate),
          this.offer = list[0].offer
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetPharmacyOfferByPharmacyID",error);
        this.loader=false;
      }
    )
  }






  files: File[] = [];

  onSelect(event: any) {
    this.loader = true;
    this.showPopup = 0;
    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadsAttchments();
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.offerphoto.splice(this.offerphoto.indexOf(event), 1);
  }



  uploadsAttchments() {
    this.folderName = "Images/OfferPhoto"
    this.PharmacyService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
      this.offerphoto.push(res);
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("OfferPhoto", this.offerphoto);
      this.loader = false;
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"AllFilesUploads",error);
    })
  }

  public insertdetails() {
    this.showPopup=0;
    if (this.offerphoto.length == 0 || this.offerphoto == undefined) {
         this.showPopup=1;
         this.messageID=41;
         this.typeofPopUp=2;
    }
    else {
      var entity = {
        'PharmacyID': this.pharmacyid,
        'OfferName': this.offername,
        'Description': this.descripton,
        'SDate': this.startDate,
        'EDate': this.endDate,
        'Offer': this.offer
      }
      this.PharmacyService.InsertPharmacyOffers(entity).subscribe(data => {

        if (data != 0) {
          this.offerid = data;
          for (let i = 0; i < this.offerphoto.length; i++) {
            var entity = {
              'PharmacyID': this.pharmacyid,
              'PharmacyOfferID': this.offerid,
              'PhotoURL': this.offerphoto[0]
            }
            this.PharmacyService.InsertPharmacyOfferPhotos(entity).subscribe(data => {

              if (data != 0) {
                this.showPopup=1;
                this.messageID=11;
                this.typeofPopUp=1;
              }
            })
          }
            location.href = "#/Pharmacy/SpecialOffers";
            this.clear();
        }
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"InsertPharmacyOfferPhotos",error);
      })
    }

  }


  public Updatedetails() {
    var entity = {
      'ID': this.id,
      'PharmacyID': this.pharmacyid,
      'OfferName': this.offername,
      'Description': this.descripton,
      'SDate': this.startDate,
      'EDate': this.endDate,
      'Offer': this.offer
    }
    this.PharmacyService.UpdatePharmacyOffers(entity).subscribe(data => {

      if (data != 0) {
        this.offerid = data;
        location.href = "#/Pharmacy/SpecialOffers";
        this.clear();
      }
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"UpdatePharmacyOffers",error);
      this.loader=false;
    })

  }


          //To Select Date
          selectDate(data: any) {
            this.loader = true;
            this.startDate = this.PharmacyService.GetDates(data[0]);
            this.endDate = this.PharmacyService.GetDates(data[1]);
          
      }

      startDate:any;
      endDate:any;

      getStartDate(startDate: any) {
        this.startDate = startDate;
      }
  
      getendDate(endDate: any) {
        this.endDate = endDate;
      }


   

  public phrmayphotos() {
    this.PharmacyService.GetPharmacyOffersPhotos(this.id).subscribe(
      data => {
        this.pharmcyphotos = data;
        this.offerphoto[0] = this.pharmcyphotos[0].photourlss
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetPharmacyOffersPhotos",error);
        this.loader=false;
      }
    )
  }

  back(){
    location.href = "#/Pharmacy/SpecialOffers";
  }




}
