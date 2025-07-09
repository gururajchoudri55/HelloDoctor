import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { DiagnosticService } from 'src/app/Pages/services/diagnostic.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/diagnostic/diagnosticlabels.json';

@Component({
  selector: 'app-diagnostic-payment-link',
  templateUrl: './diagnostic-payment-link.component.html',
  styleUrls: ['./diagnostic-payment-link.component.css']
})
export class DiagnosticPaymentLinkComponent implements OnInit {
  languageid: any;
  paymentlinklist: any;
  count: any;
  search:any;
  loader:boolean | undefined;
  currentUrl:any;
  labels:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;


  constructor(private DiagnosticService: DiagnosticService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.GetPaymentlink();
  }

//To Get PaymentLink
  public GetPaymentlink() {
    this.DiagnosticService.GetDiagnosticPaymentLinkMaster(sessionStorage.getItem('diagnosticid')).subscribe(data => {
      this.paymentlinklist = data;
      this.loader=false;
      this.count = this.paymentlinklist.length;
    })
  }


  //Delete paymentlink
  public delete(id: any) {
    
    Swal.fire({
      title:this.labels.title,
      text: this.labels.revert,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.labels.deleteButton,
      cancelButtonText:this.labels.confirmdeletebutton
    }).then((result) => {
      if (result.isConfirmed) {
        this.DiagnosticService.DeleteDiagnosticPaymentLinkMaster(id).subscribe(res => {
          let test = res;
          this.ngOnInit();
        })
          this.showPopup=1;
          this.messageID=74;
          this.typeofPopUp=1;
      }
    })
  }

  //To redirect the page 
  edit (id:any){
      location.href="#/Diagnostic/DiagnosticPaymentLinkDetails/"+btoa(id);
  }


}
