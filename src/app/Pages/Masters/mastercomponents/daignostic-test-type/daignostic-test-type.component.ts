import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/Masters/Masterlabels.json';

@Component({
  selector: 'app-daignostic-test-type',
  templateUrl: './daignostic-test-type.component.html',
  styleUrls: ['./daignostic-test-type.component.css'],
})
export class DaignosticTestTypeComponent implements OnInit {
  currentUrl: any;
  loader: boolean | undefined;
  languageid: any;
  testsList: any;
  p: any;
  search: any;
  count: any;
  labels: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  roleid: any;

  constructor(
    private MasterService: MasterService,
    private SharedService: SharedService
  ) {}

  ngOnInit(): void {
    debugger;
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.roleid = sessionStorage.getItem('roleid');
    this.getdiagnosticcentertests();
  }

  //Get Daignostic

  public getdiagnosticcentertests() {
    this.MasterService.GetDiagnosticTestTypeMasterByLanguageID(
      this.languageid
    ).subscribe(
      (data) => {
        this.loader = false;
        this.testsList = data;
        this.count = this.testsList.length;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDiagnosticTestTypeMasterByLanguageID',
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

  //Delete Daignostic Test
  public DeleteDiagnosticTestTypeMaster(id: any, typeId: any) {
    this.showPopup = 0;

    /*  Swal.fire({
       title: this.labels.title,
       text: this.labels.text,
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: this.labels.confirmButtonText,
       cancelButtonText: this.labels.cancelButtonText
     }).then((result) => {
       if (result.isConfirmed) { */
    this.MasterService.DeleteDiagnosticTestTypeMaster(id, typeId).subscribe(
      (res) => {
        let test = res;
        if (typeId == 1) {
          this.showPopup = 1;
          this.messageID = 24;
          this.typeofPopUp = 1;
          //   this.ngOnInit();
        } else {
          this.showPopup = 1;
          this.messageID = 23;
          this.typeofPopUp = 1;
          // this.ngOnInit();
        }
        this.ngOnInit();
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'DeleteDiagnosticTestTypeMaster',
          error
        );
      }
    );
  }

  //Page Redirection

  edit(id: any) {
    location.href = '#/Masters/DiagnosticTestTypeDetails/' + btoa(id);
  }
}
