import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { LanguageService } from 'src/app/Pages/services/language.service';
import Swal from 'sweetalert2';
import Messages from '../../../../../assets/Messages.json'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-toastpopup',
  templateUrl: './toastpopup.component.html',
  styleUrls: ['./toastpopup.component.css']
})
export class ToastpopupComponent implements OnChanges {

  constructor(private toast: NgToastService, public LanguageService: LanguageService,private toastrService: ToastrService) { }


  @Input() messageID: any;
  @Input() typeofPopUp: any;
  messageList: any;
  languageID: any;

  message: any;
  header: any;
  ngOnChanges(): void {
    this.languageID = sessionStorage.getItem('LanguageID');

    // this.LanguageService.getMessages().subscribe(data => {
      
      var list = Messages.filter((x: { id: any; }) => x.id == this.messageID);

      if (this.languageID == 1) {
        this.header = list[0].headingEn
        this.message = list[0].MessageEn
      }
      else {
        this.header = list[0].headingFr
        this.message = list[0].MessageFr
      }


      if (this.typeofPopUp == 1) {
        this.showSuccess()
      }
      else if (this.typeofPopUp == 2) {
        this.showError()
      }
      
    // })
  }

  showSuccess() {
    // this.toast.success({ detail: this.header, summary: this.message });
    this.toastrService.success(
      this.message,
      this.header
    );

  }

  showError() {
    this.toastrService.error(this.message, this.header);
    // this.toast.error({ detail: this.header, summary: this.message });

  }

  showInfo() {
    this.toast.info({ detail: this.header, summary: this.message, sticky: true });
  }

  // showWarn() {
  //   this.toast.warn({detail:"WARN",summary:'Your Warn Message',duration:'5000'});
  // }

}
