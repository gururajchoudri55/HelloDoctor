import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Masters/Masterlabels.json';
@Component({
  selector: 'app-vitals-promicode',
  templateUrl: './vitals-promicode.component.html',
  styleUrls: ['./vitals-promicode.component.css']
})
export class VitalsPromicodeComponent implements OnInit {

  loader:any;
  currentUrl:any;
  languageid:any;
  labels:any;
  id:any;
  showbit:any;
  typeofPopUp:any;
  messageID:any;
  showPopup:any;
  promoCodeText:any;
  scans:any;
  constructor(private MasterService:MasterService,private SharedService:SharedService,
    private ActivatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
   // this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.ActivatedRoute.params.subscribe(params => {     
       
      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.id=atob(this.id);
        this.showbit = 1;
       this.GetVitalsPromoCodeByID(this.id);
      }
    }) 
  }
  insertdetails(){    
      var entity = {
        'promoCodeText': this.promoCodeText,
        'scans': this.scans,        
      }
      this.MasterService.InsertVitalsPromoCode(entity).subscribe(data => {
        this.showPopup=1;
        this.typeofPopUp=1;
        this.messageID=1;
        location.href = "#/Masters/VitalsPromocodeMaster";       
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"InsertCityMaster",error);
      })    
  }
  updatedetails(){
    this.loader=true;
    var entity = {
      'ID':this.id,
      'promoCodeText': this.promoCodeText,
      'scans': this.scans,        
    }
    this.MasterService.UpdateVitalsPromoCode(entity).subscribe(data => {
      this.showPopup=1;
      this.typeofPopUp=1;
      this.messageID=1;
      location.href = "#/Masters/VitalsPromocodeMaster";   
      this.loader=true;    
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"UpdateVitalsPromoCode",error);
    })  
  }

  GetVitalsPromoCodeByID(id:any){
    this.MasterService.GetVitalsPromoCodeByID(id).subscribe(
      data => {
        ;
  this.promoCodeText=data[0].promoCodeText,
this.scans=data[0].scans
      
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetCityMasterBYIDandLanguageID", error);
      }
    )
  }

}
