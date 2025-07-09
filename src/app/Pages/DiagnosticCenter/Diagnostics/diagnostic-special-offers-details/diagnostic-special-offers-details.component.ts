import { Component, OnInit } from '@angular/core';
import { DiagnosticService } from 'src/app/Pages/services/diagnostic.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/diagnostic/diagnosticlabels.json';

@Component({
  selector: 'app-diagnostic-special-offers-details',
  templateUrl: './diagnostic-special-offers-details.component.html',
  styleUrls: ['./diagnostic-special-offers-details.component.css']
})
export class DiagnosticSpecialOffersDetailsComponent implements OnInit {
  folderName:any;
  loader:boolean | undefined;
  showPopup:any;
  offerphoto:any=[];
  messageID:any;
  typeofPopUp:any;
  diagnosticid:any;
  languageid:any;
  showbit:any;
  id:any;
  offername:any;
  descripton:any;
  testid:any;
  sdate:any;
  edate:any;
  offer:any;
  diagnosticofferid:any;
  diagnosticlist:any;
  diadd:any;
  search:any
  currentUrl:any;
  showbutton:any;
  labels:any;

  


  constructor(private DiagnosticService:DiagnosticService,private SharedService:SharedService,
    private ActivatedRoute:ActivatedRoute) { }


  
  ngOnInit(): void {
  
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.diagnosticid = sessionStorage.getItem('diagnosticid'); 
    this.ActivatedRoute.params.subscribe(params => {
      this.showbit = 0;
      
      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
        
      }
      else if (this.id != undefined) {
        
        this.showbit = 1;
        this.id=atob(this.id);
        this.GetDiagnosticOfferByDiagnosticID();
      }
    }
  
    )

  
  }

public GetDiagnosticOfferByDiagnosticID (){
  this.DiagnosticService.GetDiagnosticOfferByDiagnosticID(this.diagnosticid).subscribe(data => {
    var offers = data;
    var list = offers.filter(x => x.id == this.id);
    this.descripton = list[0].description,
      this.offer = list[0].offer,
      this.offername = list[0].offerName,
      this.sdate = this.DiagnosticService.GetDates(list[0].sdate),
      this.edate =  this.DiagnosticService.GetDates(list[0].edate),
      this.offerphoto[0] = list[0].photo
  },error=>{
    this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticOfferByDiagnosticID",error);
  })
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
    this.DiagnosticService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
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
        'DiagnosticCenterID': this.diagnosticid,
        'OfferName': this.offername,
        'Description': this.descripton,
        'TestID': this.testid,
        'SDate': this.sdate,
        'EDate': this.edate,
        'Offer': this.offer
      }
      this.DiagnosticService.InsertDiagnosticCenterOffers(entity).subscribe(data => {
        if (data != 0) {
          this.diagnosticofferid = data;
          for (let i = 0; i < this.offerphoto.length; i++) {
            var entity = {
              'DiagnosticCenterID': this.diagnosticid,
              'DiagnosticOfferID': this.diagnosticofferid,
              'PhotoURL': this.offerphoto[0]
            }
            this.DiagnosticService.InsertDiagnosticCenterOfferPhotos(entity).subscribe(data => {

              if (data != 0) {
                this.showPopup=1;
                this.messageID=11;
                this.typeofPopUp=1;
                this.offerphoto.length = 0;

              }
            })
          }
            location.href = "#/Diagnostic/DiagnosticSpecialOffers";
            this.clear();
        }
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"InsertDiagnosticCenterOfferPhotos",error);
      })

    }

  }

  public clear() {
    this.offername = '';
    this.descripton = '';
    this.sdate = '';
    this.edate = '';
    this.offer = '';
  }

  public getdiagnostictestmaster() {
    this.DiagnosticService.GetDiagnosticTestMaster().subscribe(
      data => {

        this.diagnosticlist = data;
        this.diadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,

        };

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticTestMaster",error);
        
      }
    )
  }
  public GetTestID(item1: any) {
    this.testid = item1.id;
  }
      getStartDate(startDate: any) {
        this.sdate = this.DiagnosticService.GetDates(startDate);
      }
  
      getendDate(endDate: any) {
        this.edate = this.DiagnosticService.GetDates(endDate);
      }


      back(){
        location.href = "#/Diagnostic/DiagnosticSpecialOffers";
      }

      public updatedetails() {
        
            var sdate = this.DiagnosticService.GetDates(this.sdate);
            var edate = this.DiagnosticService.GetDates(this.edate);
            
            var entity = {
              'ID': this.id,
              'OfferName': this.offername,
              'Description': this.descripton,
              'TestID': this.testid,
              'SDate': sdate,
              'EDate': edate,
              'Offer': this.offer
            }
            this.DiagnosticService.UpdateDiagnosticCenterOffers(entity).subscribe(data => {
              var entity = {
                'DiagnosticCenterID': this.diagnosticid,
                'DiagnosticOfferID': this.id,
                'PhotoURL': this.offerphoto[0]
              }
              this.DiagnosticService.UpdateDiagnosticCenterOfferPhotos(entity).subscribe(data => {
                this.clear();
                this.offerphoto.length = 0;
                location.href = "#/Diagnostic/DiagnosticSpecialOffers";
                
              })
            },error=>{
              this.SharedService.insertexceptions(this.currentUrl,"UpdateDiagnosticCenterOfferPhotos",error);
            })
          }










}
