import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/Masters/Masterlabels.json'

@Component({
  selector: 'app-specialization-master',
  templateUrl: './specialization-master.component.html',
  styleUrls: ['./specialization-master.component.css']
})
export class SpecializationMasterComponent implements OnInit {
  languageid:any;
  specilisationList:any;
  count:any;
  currentUrl:any;
  loader:boolean | undefined;
  p:any;
  search:any;
  labels:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;



  constructor(private MasterService:MasterService,private SharedService:SharedService ) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.getspecilicationmaster();
  }



  //Get Specialization
  public getspecilicationmaster() {  
    this.MasterService.GetSpecilaizationMasterByLanguageID(this.languageid).subscribe(
      data => {  
        this.loader=false;
        this.specilisationList = data;
        this.count=this.specilisationList.length;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetSpecilaizationMasterByLanguageID",error);
      }
    )
  }

  //Delete Specialization
  public DeleteSpecilaizationMaster(id: any) {
    
    Swal.fire({
      title:this.labels.title,
      text:this.labels.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText:this.labels.confirmButtonText,
      cancelButtonText:this.labels.cancelButtonText
        }).then((result) => {
      if (result.isConfirmed) {
        this.MasterService.DeleteSpecilaizationMaster(id).subscribe(res => {
          let test = res;
          this.ngOnInit();
        })
           this.showPopup=1;
           this.messageID=75;
           this.typeofPopUp=1;
      }
    })
  }

  //Pagination
  public pageChanged(even:any) {

    let fgdgfgd = even;
    this.p = even;
  }

   //Redirecting the Page
   edit(id:any){
     location.href='#/Masters/SpecializationMasterDetails/' +btoa(id);
   }



}
