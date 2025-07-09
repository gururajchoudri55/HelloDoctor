import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Masters/Masterlabels.json';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-drug-masterdash',
  templateUrl: './drug-masterdash.component.html',
  styleUrls: ['./drug-masterdash.component.css']
})
export class DrugMasterdashComponent implements OnInit {
  currentUrl: any;
  languageid: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  p: any;
  showbit: any;
  loader: any;
  labels: any;
  drugNameList: any = [];
  term: any;
  count: number = 0;

  constructor(private MasterService: MasterService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl = window.location.href;
    this.showbit = 0;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.GetDrugnamemaster()
  }




  public GetDrugnamemaster() {

    this.MasterService.GetDrugNameMaster(this.languageid).subscribe(
      data => {
        this.loader = false;
        this.drugNameList = data;
        this.count= this.drugNameList.length;
        console.log("drug", this.drugNameList);
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetDrugNameMaster", error);
      }
    )
  }


  //Pagination
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }
  //Delete DrugName
  public DeleteDrugNametMaster(id: any) {
    this.showPopup=0;
    
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
        this.MasterService.DeleteDrugNametMaster(id).subscribe(res => {
          let test = res;
          this.ngOnInit();
        })
         this.showPopup=1;
         this.messageID=75;
         this.typeofPopUp=1;
      }
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"DeleteDiagnosticTestMaster",error);
    })
  }
}




