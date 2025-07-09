import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import Swal from 'sweetalert2';
import Labels from '../../../../Lables/WorkingDetails/workinglabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-diagnostic-test',
  templateUrl: './diagnostic-test.component.html',
  styleUrls: ['./diagnostic-test.component.css'],
})
export class DiagnosticTestComponent implements OnInit {
  loader: boolean | undefined;
  languageid: any;
  diagnosticenterid: any;
  dummdiid: any;
  showDrop: any;
  diagnosticlist: any;
  dia: any;
  search: any;
  dummlist: any;
  servicelist: any;
  count: any;
  p: any;
  countryid: any;
  cityid: any;
  labels: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  currentUrl: any;
  roleid: any;

  constructor(
    private CommonService: CommonService,
    private SharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.roleid = sessionStorage.getItem('roleid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.diagnosticenterid = sessionStorage.getItem('diagnosticid');
    this.dummdiid = sessionStorage.getItem('diagnosticid');
    if (this.dummdiid == undefined) {
      this.showDrop = 1;
    } else {
      this.showDrop = 2;
    }
    this.CommonService.GetDiagnosticForAdminByLanguageID(
      this.languageid
    ).subscribe(
      (data) => {
        this.loader = false;
        this.diagnosticlist = data;
        this.dia = {
          singleSelection: true,
          idField: 'id',
          textField: 'diagnosticCenterName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.labels.search,
        };
      },
      (error) => {
        console.log('GetDiagnosticForAdminByLanguageID', error);
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDiagnosticForAdminByLanguageID',
          error
        );
      }
    );

    this.GetDiagnosticServices();

    this.countryid = 0;
    this.cityid = 0;
  }

  public GetDiagnosticcenterID(item: any) {
    this.diagnosticenterid = item.id;
    this.GetDiagnosticServices();
  }

  public GetDiagnosticServices() {
    if (this.diagnosticenterid != undefined) {
      this.CommonService.GetDiagnosticCenterTestsForDash(
        this.languageid
      ).subscribe(
        (data) => {
          this.loader = false;
          this.dummlist = data;
          console.table('Servicelist', this.dummlist);
          this.servicelist = this.dummlist.filter(
            (x: { diagnosticCenterID: any }) =>
              x.diagnosticCenterID == this.diagnosticenterid
          );
          this.count = this.servicelist.length;
        },
        (error) => {
          console.log('Error With GetDiagnosticCenterTestsForDash', error);
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetDiagnosticCenterTestsForDash',
            error
          );
        }
      );
    } else {
      this.CommonService.GetDiagnosticCenterTestsForDash(
        this.languageid
      ).subscribe(
        (data) => {
          this.loader = false;
          this.servicelist = data;
          console.table('Servicelist', data);
          this.dummlist = this.servicelist;
          this.count = this.servicelist.length;
        },
        (error) => {
          console.log('Error With GetDiagnosticCenterTestsForDash', error);
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetDiagnosticCenterTestsForDash',
            error
          );
        }
      );
    }
  }

  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }

  public DeleteDiagnostocServces(id: any) {
    Swal.fire({
      title: this.labels.title,
      text: this.labels.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.labels.yes,
      cancelButtonText: this.labels.no,
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.CommonService.DeleteDiagnosticCenterTestsForDash(id).subscribe(
            (res) => {
              let test = res;
              this.ngOnInit();
            }
          );

          this.showPopup = 1;
          this.messageID = 74;
          this.typeofPopUp = 1;
        }
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'DeleteDiagnosticCenterTestsForDash',
          error
        );
      }
    );
  }

  edit(id: any) {
    location.href = '#/countrymanager/DiagnosticTestNew/' + id;
  }
}
