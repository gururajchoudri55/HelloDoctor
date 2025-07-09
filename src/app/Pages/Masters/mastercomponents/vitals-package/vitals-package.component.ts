import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Masters/Masterlabels.json';
@Component({
  selector: 'app-vitals-package',
  templateUrl: './vitals-package.component.html',
  styleUrls: ['./vitals-package.component.css']
})
export class VitalsPackageComponent implements OnInit {
  loader:any;
  currentUrl:any;
  languageid:any;
  labels:any;
  id:any;
  showbit:any;
  typeofPopUp:any;
  messageID:any;
  showPopup:any;
  amount:any;
  quentity:any;
  constructor(private MasterService:MasterService,private SharedService:SharedService,
    private ActivatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
   // this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.ActivatedRoute.params.subscribe(params => {      
      ;
      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.id=atob(this.id);
        this.showbit = 1;
        this.GetVitalsPackage(this.id)
      }
    }) 
  }
  insertdetails(){  
    ;
    if(this.amount<=0){
      this.showPopup=1;
      this.typeofPopUp=2;
      this.messageID=94;   
    }
    else if( this.quentity<=0){
      this.showPopup=1;
      this.typeofPopUp=2;
      this.messageID=94;   
    }
  else{
    var entity = {
      'amount': this.amount,
      'quentity': this.quentity,        
    }
    this.MasterService.InsertVitalsPackage(entity).subscribe(data => {
      this.showPopup=1;
      this.typeofPopUp=1;
      this.messageID=1;
      location.href = "#/Masters/VitalsPackageMaster";       
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"InsertVitalsPackage",error);
    })  
  }  
}
updatedetails(){
  var entity = {
    'ID':this.id,
    'amount': this.amount,
    'quentity': this.quentity,        
  }
  this.MasterService.UpdateVitalsPackage(entity).subscribe(data => {
    this.showPopup=1;
    this.typeofPopUp=1;
    this.messageID=1;
    location.href = "#/Masters/VitalsPackageMaster";       
  },error=>{
    this.SharedService.insertexceptions(this.currentUrl,"UpdateVitalsPackage",error);
  })  
}

GetVitalsPackage(id:any){
  this.MasterService.GetVitalsPackageByID(id).subscribe(
    data => {
      ;
this.amount=data[0].amount,
this.quentity=data[0].quentity
    
    }, error => {
      this.loader = false;
      this.SharedService.insertexceptions(this.currentUrl, "GetCityMasterBYIDandLanguageID", error);
    }
  )
}
}
