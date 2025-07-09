import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { CommonService } from 'src/app/Pages/services/common.service';
import Labels from '../../../../Lables/WorkingDetails/workinglabels.json';

@Component({
  selector: 'app-diagnostic-package-details',
  templateUrl: './diagnostic-package-details.component.html',
  styleUrls: ['./diagnostic-package-details.component.css']
})
export class DiagnosticPackageDetailsComponent implements OnInit {
  diagnosticid: any;
  details: any;
  diagnosticname: any;
  languageid: any;
  testslist: any;
  currentUrl: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  tablecount: any;
  testnamearray: any=[];
  testnamearrayid: any=[];
  dummdiagnosticid: any;
  showdropdown: any;
  diagnosticlist: any;
  diadd = {};
  loader: boolean | undefined;
  testname: any;
  tests: any;
  testsidd: any;
  testesids: any;
  idcount: any;
  packagename: any;
  packageprice: any;
  description: any;
  qwerty1: any = [];
  qwerty: any = [];
  selectedItemsRoot: any = [];
  cleardop: any = [];
  testlist: any;
  testdd = {}
  testid: any = [];
  selecttestType:any;
  labels:any;
  selecttest:any;
  selectdiagnostic:any;
  search:any;


  constructor(private CommonService: CommonService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.selectdiagnostic=this.labels.selectDiagnosticcenter
    this.selecttest=this.labels.selectTest;
    this.search=this.labels.search;
    this.diagnosticid = sessionStorage.getItem('diagnosticid')
    this.dummdiagnosticid = sessionStorage.getItem('diagnosticid')
    this.diagnosticname = sessionStorage.getItem('user')
    if (this.dummdiagnosticid == undefined || this.dummdiagnosticid == null) {
      this.showdropdown = 1;
    }
    this.getdiagnosticforadmin();
    this.getdiagnostictestmaster();
    this.getdiagnosticcentertests();
    this.tablecount = 0;
    this.idcount = 1;
  }

  public getdiagnosticcentertests() {
    this.CommonService.GetDiagnosticTestTypeMasterByLanguageID(this.languageid).subscribe(
      data => {
        this.testslist = data;
        this.loader=false;
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl, "GetDiagnosticTestTypeMasterByLanguageID", error);
      }
    )
  }


  public getdiagnosticforadmin() {

    this.CommonService.GetDiagnosticCenterListByLanguageID(this.languageid).subscribe(
      data => {
        this.diagnosticlist = data;
        this.diadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'diagnosticCenterName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true

        };

      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticCenterListByLanguageID",error);
      }
    )

  }


  public GetTestID(item: any) {
    
    this.testid.push(item);
  }


  public getdiagnostictestmaster() {

    this.CommonService.GetDiagnosticTestMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.testlist = data;
        this.testdd = {
          singleSelection: false,
          idField: 'id',
          textField: 'short',
          allowSearchFilter: true,
          enableCheckAll: false,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true

        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticTestMasterByLanguageID",error);
      }
    )
  }


  public GetDiagnosticID(item2: any) {

    this.diagnosticid = item2.id;
    this.CommonService.GetDiagnosticCenterDetailsByID(this.diagnosticid).subscribe(
      data => {
        this.details = data[0];
        this.diagnosticname = this.details.diagnosticCenterName
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticCenterDetailsByID",error);
      }
    )
  }



  public adddetails() {
    if (this.diagnosticid == undefined || this.testid.length == 0) {
      this.showPopup = 1;
      this.messageID = 72;
      this.typeofPopUp = 2;
    }
    else {
      this.tablecount = 1;

      for (let i = 0; i < this.testid.length; i++) {
        this.testnamearray.push(this.testid[i].short);

        this.testnamearrayid.push(this.testid[i].id)
      }

      this.testname = this.testnamearray;
      this.tests = this.testname.join(',')
      this.testsidd = this.testnamearrayid;
      this.testesids = this.testsidd.join(',')

      var entity1 = {
        'Sno': this.idcount,
        'DiagnosticCenterID': this.diagnosticid,
        'DiagnosticName': this.diagnosticname,
        'diagnostictestname': this.tests,
        'PackageName': this.packagename,
        'Price': this.packageprice,
        'Description': this.description
      }

      for (let v = 0; v < this.testid.length; v++) {
        var entity2 = {
          'DiagnosticCenterID': this.diagnosticid,
          'DiagnosticName': this.diagnosticname,
          'diagnostictestname': this.tests,
          'PackageName': this.packagename,
          'TestID': this.testid[v].id,
          'Price': this.packageprice,
          'Description': this.description
        }
        this.qwerty1.push(entity2);

      }
      this.qwerty.push(entity1);
      this.idcount = this.idcount + 1;

      this.selectedItemsRoot = [];
      this.testnamearray.length = 0
      this.testnamearrayid.length = 0
      this.testnamearrayid = [];
      this.testid.length = 0;
      this.testid = [];
      this.cleardop = [];
      this.packagename = "";
      this.packageprice = "";
      this.description = "";
    }
  }
  packageid: any;



  public insertdetails() {
    this.loader = true;
    this.loader = false;
    for (let j = 0; j < this.qwerty.length; j++) {
      var abcd = {
        'DiagnosticCenterID': this.diagnosticid,
        'PackageName': this.qwerty[j].PackageName,
        'Price': this.qwerty[j].Price,
        'Description': this.qwerty[j].Description,
      }
      this.CommonService.InsertDiagnosticCenterPackages(abcd).subscribe(data => {
        if (data != 0) {
          this.packageid = data;
          this.inserttestdetails();
        }
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"InsertDiagnosticCenterPackages",error);
      })
    }
  }


  public inserttestdetails() {

    for (let i = 0; i < this.qwerty1.length; i++) {
      var gh = {
        'PackageID': this.packageid,
        'TestID': this.qwerty1[i].TestID
      }
      this.CommonService.InsertDiagnosticPackageRelatedTests(gh).subscribe(data => {
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"InsertDiagnosticPackageRelatedTests",error);
      })
    }
    this.showPopup = 1;
    this.messageID = 1;
    this.typeofPopUp = 1;
    location.href = "#/countrymanager/DiagnosticPackage"
  }


  public delete(sno: any) {

    for (let i = 0; i < this.qwerty.length; i++) {

      if (sno == this.qwerty[i].sno) {

        this.qwerty.splice(i, 1);
        this.qwerty.length = 0;
        this.qwerty1.length = 0;
        this.tablecount = 0;
      }
    }
  }
}
