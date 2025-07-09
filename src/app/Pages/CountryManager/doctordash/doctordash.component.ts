import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import Labels from '../../Lables/countrymanager/countrylabels.json';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-doctordash',
  templateUrl: './doctordash.component.html',
  styleUrls: ['./doctordash.component.css'],
})
export class DoctordashComponent implements OnInit {
  selectedValue: any;

  constructor(
    private CommonService: CommonService,
    private SharedService: SharedService
  ) {}

  meridionalid: any;
  countrymanaerid: any;
  salesrepresntiveid: any;
  hospitalclinicid: any;
  languageid: any;
  dummlist: any;
  doctorList: any;
  count: any;
  term: any;
  departmentName: any;
  p: number = 1;
  departmentID: any;
  dummdoctorlist: any;
  loader: boolean | undefined;
  departmentList: any;
  currentURL: any;
  labels: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  showdelete: any;
  activeAnddeactiveDoctorList: any;

  ngOnInit(): void {
    this.currentURL = window.location.href;

    this.loader = true;
    this.meridionalid = sessionStorage.getItem('meridionalid');
    this.countrymanaerid = sessionStorage.getItem('countrymanagerid');
    this.salesrepresntiveid = sessionStorage.getItem('salesrepresntativeid');
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    this.languageid = sessionStorage.getItem('LanguageID');

    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    if (this.meridionalid == undefined) {
      this.showdelete = 0;
    } else {
      this.showdelete = 1;
    }

    if (this.hospitalclinicid == undefined) {
      this.getDoctorAdmin();
    } else if (this.hospitalclinicid != undefined) {
      this.CommonService.GetDoctorForAdminByLanguageID(
        this.languageid
      ).subscribe(
        (data) => {
          this.loader = false;
          this.dummlist = data;
          this.doctorList = this.dummlist.filter(
            (x: { hospitalClinicID: any }) =>
              x.hospitalClinicID == this.hospitalclinicid
          );
          this.activeAnddeactiveDoctorList = JSON.parse(
            JSON.stringify(this.doctorList)
          );
          this.count = this.doctorList.length;
        },
        (error) => {
          console.log('Error With GetDoctorForAdminByLanguageID', error);
          this.loader = false;
          this.SharedService.insertexceptions(
            this.currentURL,
            'GetDoctorForAdminByLanguageID',
            error
          );
        }
      );
    }
    this.getDepartmentMaster();
  }

  // AllDoctorssList

  public getDoctorAdmin() {
    this.CommonService.GetDoctorForAdminByLanguageID(this.languageid).subscribe(
      (data) => {
        this.loader = false;
        this.doctorList = data;
        this.dummlist = this.doctorList;
        this.count = this.doctorList.length;
        console.log('DoctorList', this.doctorList);
      },
      (error) => {
        console.log('Error With  GetDoctorForAdminByLanguageID', error);
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentURL,
          'GetDoctorForAdminByLanguageID',
          error
        );
      }
    );
  }

  //export to excel
  fileName = 'doctorlist.xlsx';
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('download');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName, { password: 'S3cret!' });
  }

  // DepartmentMaster

  public getDepartmentMaster() {
    this.CommonService.GetDepartmentMasterByLanguageID(
      this.languageid
    ).subscribe(
      (data) => {
        this.departmentList = data;
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentURL,
          'GetDepartmentMasterByLanguageID',
          error
        );
      }
    );
  }

  // Pagination

  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }

  // DepartmentFilter

  public GetDepartmentID(even: any) {
    this.departmentID = even.target.value;
    if (even.target.value != 0) {
      this.departmentID = even.target.value;

      if (this.hospitalclinicid == undefined) {
        this.CommonService.GetDoctorForAdminByLanguageID(
          this.languageid
        ).subscribe(
          (data) => {
            this.dummlist = data;
            this.doctorList = this.dummlist.filter(
              (x: { departmentID: any }) => x.departmentID == this.departmentID
            );
            this.count = this.doctorList.length;
          },
          (error) => {
            this.SharedService.insertexceptions(
              this.currentURL,
              'GetDoctorForAdminByLanguageID',
              error
            );
          }
        );
      } else if (this.hospitalclinicid != undefined) {
        this.CommonService.GetDoctorForAdminByLanguageID(
          this.languageid
        ).subscribe(
          (data) => {
            this.dummlist = data;
            this.dummdoctorlist = this.dummlist.filter(
              (x: { hospitalClinicID: any }) =>
                x.hospitalClinicID == this.hospitalclinicid
            );
            this.doctorList = this.dummdoctorlist.filter(
              (x: { departmentID: any }) => x.departmentID == this.departmentID
            );
            this.count = this.doctorList.length;
          },
          (error) => {
            this.loader = false;
            this.SharedService.insertexceptions(
              this.currentURL,
              'GetDoctorForAdminByLanguageID',
              error
            );
          }
        );
      }
    } else {
      if (this.hospitalclinicid == undefined) {
        this.getDoctorAdmin();
      } else if (this.hospitalclinicid != undefined) {
        this.CommonService.GetDoctorForAdminByLanguageID(
          this.languageid
        ).subscribe(
          (data) => {
            this.dummlist = data;
            this.doctorList = this.dummlist.filter(
              (x: { hospitalClinicID: any }) =>
                x.hospitalClinicID == this.hospitalclinicid
            );
            this.count = this.doctorList.length;
          },
          (error) => {
            this.loader = false;
            this.SharedService.insertexceptions(
              this.currentURL,
              'GetDoctorForAdminByLanguageID',
              error
            );
          }
        );
      }
    }
  }

  // doctortypefilter

  typeid: any;

  getTypeID(even: any) {
    this.typeid = even.target.value;
    this.loader = true;

    if (even.target.value != '590' && even.target.value != '0') {
      this.doctorList = this.dummlist.filter(
        (x: { typeID: any; hospitalClinicID: string }) =>
          x.typeID == this.typeid && x.hospitalClinicID != '590'
      );
      this.count = this.doctorList.length;

      this.loader = false;
    } else if (even.target.value == '590') {
      this.doctorList = this.dummlist.filter(
        (x: { hospitalClinicID: any }) => x.hospitalClinicID == this.typeid
      );
      this.count = this.doctorList.length;

      this.loader = false;
    } else {
      this.getDoctorAdmin();
    }
  }

  Paytypeid: any;
  getMvolaID(even: any) {
    this.Paytypeid = even.target.value;
    this.loader = true;

    if (this.Paytypeid == '1') {
      this.doctorList = this.dummlist.filter(
        (x: { acountNumbers: any }) =>
          x.acountNumbers.slice(0, 3) == '034' ||
          x.acountNumbers.slice(0, 3) == '038'
      );
      this.count = this.doctorList.length;
      this.loader = false;
    } else if (this.Paytypeid == '2') {
      this.doctorList = this.dummlist.filter(
        (x: { acountNumbers: any }) =>
          x.acountNumbers.slice(0, 3) != '034' &&
          x.acountNumbers.slice(0, 3) != '038'
      );
      this.count = this.doctorList.length;
      this.loader = false;
    }
  }

  GetDocTypeID(event: any) {
    this.selectedValue = event.target.value;
    this.doctorList = this.dummlist.filter(
      (x: { doctorType: any }) => x.doctorType == this.selectedValue
    );
    this.count = this.doctorList.length;
  }

  GetActiveID(event: any) {
    debugger;
    this.selectedValue = event.target.value;
    if (this.selectedValue == 'true') {
      this.doctorList = this.dummlist.filter(
        (x: { enabledisble: any }) => x.enabledisble
      );
    } else {
      this.doctorList = this.dummlist.filter(
        (x: { enabledisble: any }) => !x.enabledisble
      );
    }
    this.count = this.doctorList.length;
  }
  //delete doctor
  public deletedoctorregistration(id: any) {
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
          this.CommonService.DeleteDoctorRegistration(id).subscribe((res) => {
            let test = res;
            this.ngOnInit();
          });
          this.showPopup = 1;
          (this.messageID = 75), (this.typeofPopUp = 1);
        }
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentURL,
          'DeleteDoctorRegistration',
          error
        );
      }
    );
  }

  edit(id: any) {
    location.href = '#/countrymanager/EditDoctor/' + btoa(id);
  }

  ngOnDestroy() {
    console.log('Called');
  }
}
