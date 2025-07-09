import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { PharmacyService } from 'src/app/Pages/services/pharmacy.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/Prescriptions/prescriptionlabels.json'


@Component({
  selector: 'app-special-offers',
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.css']
})
export class SpecialOffersComponent implements OnInit {
  p:any;
  pharmacyid:any;
  languageid:any;
  offerslist:any;
  loader:boolean | undefined;
  currentUrl:any;
  search:any;
  count:any;
  labels:any;
  
  constructor(private PharmacyService:PharmacyService,private  SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.pharmacyid = sessionStorage.getItem('pharmacyid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.getpharmacyoffersbypharmacyid();
  }

//To Get Pharmacy Offers List

  public getpharmacyoffersbypharmacyid() {
   
    this.PharmacyService.GetPharmacyOfferByPharmacyID(this.pharmacyid).subscribe(
      data => {
        this.offerslist = data;
        this.count=this.offerslist.length;
        this.loader=false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetPharmacyOfferByPharmacyID",error);
        this.loader=false;
      }
    )
  }

//Paginantion
  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }

  //Redirecting to OtherPage
  edit(id:any){
    location.href="#/Pharmacy/SpecialofferDetails/" + btoa(id);

  }

//Delete Offers

  public deletepharmacyoffer(id: any) {
    
    Swal.fire({
      title:this.labels.title,
      text:this.labels.youwant,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.labels.confirmButtonText,
      cancelButtonText:this.labels.cancelButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        this.PharmacyService.DeletePharmacyOffer(id).subscribe(res => {
          let test = res;
          this.ngOnInit();
        })
        Swal.fire(
          'Deleted!',
          'Doctor has been deleted.',
          'success'
        )
      }
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"DeletePharmacyOffer",error);
    })


  }

}
