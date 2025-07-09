import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/Masters/Masterlabels.json';

@Component({
  selector: 'app-diagnostic-test-master',
  templateUrl: './diagnostic-test-master.component.html',
  styleUrls: ['./diagnostic-test-master.component.css'],
})
export class DiagnosticTestMasterComponent implements OnInit {
  languageid: any;
  diatests: any;
  currentUrl: any;
  p: any;
  search: any;
  count: any;
  loader: boolean | undefined;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  labels: any;
  roleid: any;

  constructor(
    private MasterService: MasterService,
    private SharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.roleid = sessionStorage.getItem('roleid');
    this.getdiatests();
  }
  public getdiatests() {
    this.MasterService.GetDiagnosticTestMasterByLangID(
      this.languageid
    ).subscribe(
      (data) => {
        this.loader = false;
        this.diatests = data;
        this.count = this.diatests.length;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDiagnosticTestMasterByLangID',
          error
        );
      }
    );
  }

  //Delete Daignostic
  public DeleteDiagnosticTestMaster(id: any) {
    this.showPopup = 0;

    Swal.fire({
      title: this.labels.title,
      text: this.labels.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.labels.confirmButtonText,
      cancelButtonText: this.labels.cancelButtonText,
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.MasterService.DeleteDiagnosticTestMaster(id).subscribe((res) => {
            let test = res;
            this.ngOnInit();
          });
          this.showPopup = 1;
          this.messageID = 75;
          this.typeofPopUp = 1;
        }
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'DeleteDiagnosticTestMaster',
          error
        );
      }
    );
  }

  //Pagination
  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }

  //Redirecting The Page

  edit(id: any) {
    location.href = '#/Masters/DiagnosticTestMasterDetails/' + btoa(id);
  }
}
