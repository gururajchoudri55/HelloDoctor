import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { DiagnosticService } from 'src/app/Pages/services/diagnostic.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/diagnostic/diagnosticlabels.json';


@Component({
  selector: 'app-diagnostic-payment-link-details',
  templateUrl: './diagnostic-payment-link-details.component.html',
  styleUrls: ['./diagnostic-payment-link-details.component.css']
})
export class DiagnosticPaymentLinkDetailsComponent implements OnInit {
  languageid: any;
  showbit: any;
  id: any;
  paymentlinklist: any;
  paymentlink: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  loader: Boolean | undefined;
  currentUrl: any;
  labels:any;
  


  constructor(private DiagnosticService: DiagnosticService, private SharedService: SharedService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.ActivatedRoute.params.subscribe(params => {
      this.showbit = 0;
      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.showbit = 1;
        this.id = atob(this.id);
        this.GetDiagnosticPaymentLinkMaster();
      }
    }
    )
  }

  public GetDiagnosticPaymentLinkMaster() {
    
    this.DiagnosticService.GetDiagnosticPaymentLinkMaster(sessionStorage.getItem('diagnosticid')).subscribe(data => {
      this.paymentlinklist = data;
      var list = this.paymentlinklist.filter((x: { id: any; }) => x.id == this.id);
      this.paymentlink = list[0].paymentLink;
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "GetDiagnosticPaymentLinkMaster", error);
    })
  }

  public InsertDetailes() {
    this.showPopup = 0;
     var entity = {
      DiagnosticID: sessionStorage.getItem('diagnosticid'),
      PaymentLink: this.paymentlink

    }
    this.DiagnosticService.InsertDiagnosticPaymentLinkMaster(entity).subscribe((res: any) => {
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      location.href = "#/Diagnostic/DiagnosticPaymentLink";
    })
  }

  public UpdateDetailes() {
    var entity = {
      ID: this.id,
      DiagnosticID: sessionStorage.getItem('diagnosticid'),
      PaymentLink: this.paymentlink
    }
    this.DiagnosticService.UpdateDiagnosticPaymentLinkMaster(entity).subscribe(res => {
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      location.href = "#/Diagnostic/DiagnosticPaymentLink";

    })
  }



}
