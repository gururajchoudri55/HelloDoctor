import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import Swal from 'sweetalert2';
import Labels from '../../../../Lables/WorkingDetails/workinglabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-diagnostic-package',
  templateUrl: './diagnostic-package.component.html',
  styleUrls: ['./diagnostic-package.component.css'],
})
export class DiagnosticPackageComponent implements OnInit {
  loader: boolean | undefined;
  languageid: any;
  diagnosticenterid: any;
  dummdiagnosticid: any;
  diagnosticname: any;
  countryid: any;
  cityid: any;
  dummpackagelist: any;
  packagelist: any;
  count: any;
  search: any;
  p: any;
  labels: any;
  id: any;
  packagename: any;
  packageDescription: any;
  packageprice: any;
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
    console.log(this.roleid, 'roleid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.diagnosticenterid = sessionStorage.getItem('diagnosticid');
    this.dummdiagnosticid = sessionStorage.getItem('diagnosticid');
    this.diagnosticname = sessionStorage.getItem('user');
    this.countryid = 0;
    this.cityid = 0;
    this.GetDiagnosticPackages();
  }

  public GetDiagnosticPackages() {
    if (this.diagnosticenterid != undefined) {
      this.CommonService.GetDiagnosticCenterPackages(this.languageid).subscribe(
        (data) => {
          this.loader = false;
          this.dummpackagelist = data;
          this.packagelist = this.dummpackagelist.filter(
            (x: { diagnosticCenterID: any }) =>
              x.diagnosticCenterID == this.diagnosticenterid
          );
          this.count = this.packagelist.length;
        },
        (error) => {
          console.log('Error With GetDiagnosticCenterPackages', error);
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetDiagnosticCenterPackages',
            error
          );
        }
      );
    } else {
      this.CommonService.GetDiagnosticCenterPackages(this.languageid).subscribe(
        (data) => {
          this.loader = false;
          this.dummpackagelist = data;
          this.packagelist = this.dummpackagelist;
          this.count = this.packagelist.length;
        },
        (error) => {
          console.log('Error With GetDiagnosticCenterPackages', error);
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetDiagnosticCenterPackages',
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
      confirmButtonText: this.labels.confirmButtonText,
      cancelButtonText: this.labels.cancelButtonText,
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.CommonService.DeleteDiagnosticCenterPackages(id).subscribe(
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
          'DeleteDiagnosticCenterPackages',
          error
        );
      }
    );
  }

  public GetPackages(details: any) {
    this.id = details.id;
    this.packagename = details.packageName;
    this.packageDescription = details.description;
    this.packageprice = details.price;
  }

  public UpdatePackages() {
    this.showPopup = 0;
    var entity = {
      ID: this.id,
      PackageName: this.packagename,
      Description: this.packageDescription,
      Price: this.packageprice,
      LanguageID: this.languageid,
    };
    this.CommonService.UpdateDiagnosticCenterPackages(entity).subscribe(
      (data) => {
        let res = data;
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
        this.GetDiagnosticPackages();
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'UpdateDiagnosticCenterPackages',
          error
        );
      }
    );
  }
}
