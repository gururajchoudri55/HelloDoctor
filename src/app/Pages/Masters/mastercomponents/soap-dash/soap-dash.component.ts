import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Masters/Masterlabels.json';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-soap-dash',
  templateUrl: './soap-dash.component.html',
  styleUrls: ['./soap-dash.component.css']
})
export class SoapDashComponent implements OnInit {
  currentUrl: any;
  languageid: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  p: any;
  showbit: any;
  loader: any;
  labels: any;
  soapList: any = [];
  term: any;
  count: number = 0;

  constructor(private MasterService: MasterService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl = window.location.href;
    this.showbit = 0;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.GetSoapMaster()
  }


  
  public GetSoapMaster() {

    this.MasterService.GetICDCodeMaster(this.languageid).subscribe(
      data => {
        this.loader = false;
        this.soapList = data;
        this.count= this.soapList.length;
        console.log("drug", this.soapList);
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
  public DeleteSOAPMaster(id: any) {
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
        this.MasterService.DeleteSOAPMaster(id).subscribe(res => {
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
