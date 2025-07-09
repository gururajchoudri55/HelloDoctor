import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { DiagnosticService } from 'src/app/Pages/services/diagnostic.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/diagnostic/diagnosticlabels.json'

@Component({
  selector: 'app-diagnostic-special-offers',
  templateUrl: './diagnostic-special-offers.component.html',
  styleUrls: ['./diagnostic-special-offers.component.css']
})
export class DiagnosticSpecialOffersComponent implements OnInit {
  diagnosticid:any;
  languageid:any;
  diagnosticlist:any;
  currentUrl:any;
  loader:boolean | undefined;
  p:any;
  search:any;
  count:any;
  labels:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;

  
  constructor(private DiagnosticService:DiagnosticService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.diagnosticid = sessionStorage.getItem('diagnosticid');
    this.getdiagnosticofferbydiagnosticid();
  }

  //Get Daignostic List
  public getdiagnosticofferbydiagnosticid() {
    this.DiagnosticService.GetDiagnosticOfferByDiagnosticID(this.diagnosticid).subscribe(
      data => {
        this.diagnosticlist = data;
        this.count=this.diagnosticlist.length;
        this.loader=false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticOfferByDiagnosticID",error);
        this.loader=false;
      }
    )
  }
  

  //To redired the page
  edit(id:any){
   location.href="#/Diagnostic/DiagnosticSpecialOffersDetails/" +btoa(id); 
  }


    //delete diagnostic Offers
    public deletediagnosticoffers(id: any) {
      
      Swal.fire({
        title:this.labels.title,
        text: this.labels.revert,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText:this.labels.deleteButton,
        cancelButtonText:this.labels.confirmdeletebutton
      }).then((result) => {
        if (result.isConfirmed) {
          this.DiagnosticService.DeleteDiagnosticOffer(id).subscribe(res => {
            let test = res;
            this.ngOnInit()
          })
             this.showPopup=1;
             this.messageID=74;
             this.typeofPopUp=1;
        }
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"DeleteDiagnosticOffer",error);
      })
    }
  
    // Pagination

    public pageChanged(even: any) {
      let fgdgfgd = even;
      this.p = even;
    }


    
}
