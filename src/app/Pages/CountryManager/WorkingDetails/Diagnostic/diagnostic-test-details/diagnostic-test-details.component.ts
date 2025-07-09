import { Component, OnInit } from '@angular/core';
import { DiagnosticService } from 'src/app/Pages/services/diagnostic.service';
import { CommonService } from 'src/app/Pages/services/common.service';
import Labels from '../../../../Lables/WorkingDetails/workinglabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-diagnostic-test-details',
  templateUrl: './diagnostic-test-details.component.html',
  styleUrls: ['./diagnostic-test-details.component.css']
})
export class DiagnosticTestDetailsComponent implements OnInit {
  
  loader: boolean | undefined
  constructor(private DiagnosticService: DiagnosticService, private CommonService: CommonService,private SharedService:SharedService) { }
  public diagnosticlist: any;
  public testlist: any;
  public diagnosticid: any;
  public description: any;
  public price: any;
  public testid: any;
  public tablecount: any;
  public count: any;

  public details: any;
  public diagnosticname: any;
  public diagnostictestname: any;
  public diagnotictestname: any;

  public qwerty: any = [];
  public idcount: any;
  public testname: any;
  public diadd = {};
  public labels: any;
  public languageid: any;
  dummdiagnosticid: any;
  public searchlable: any;
  diatestdd = {};
  term: any;
  showdropdown: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  diagnosticCenter:any;
  currentUrl:any;
  p:any;

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.diagnosticCenter=this.labels.selectDiagnosticcenter
    this.diagnosticid = sessionStorage.getItem('diagnosticid')
    this.dummdiagnosticid = sessionStorage.getItem('diagnosticid')
    this.diagnosticname = sessionStorage.getItem('user');
    if (this.dummdiagnosticid == undefined) {
      this.showdropdown = 1;
    }
    else {
      this.showdropdown = 2;
    }
    this.getdiagnosticforadmin();
    this.getdiagnostictestmaster();
    this.idcount = 1;
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
          allowSearchFilter: true
        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticCenterListByLanguageID",error);
      }
    )
  }



  public getdiagnostictestmaster() {
    
    if (this.diagnosticid == undefined || this.diagnosticid == null) {
      this.diagnosticid = 0;
    }
    else {
      this.diagnosticid = this.diagnosticid;
    }
    this.CommonService.GetDiagnosticTestMasterTests(this.languageid, this.diagnosticid).subscribe(
      data => {
        
        this.testlist = data;
        this.testlist[0]["checked"] = false;
        console.log("testlist", this.testlist)
        this.loader=false;
        this.count= this.testlist.length;
        // this.diatestdd = {
        //   singleSelection: true,
        //   idField: 'id',
        //   textField: 'short',
        //   selectAllText: 'Select All',
        //   unSelectAllText: 'UnSelect All',
        //   //  itemsShowLimit: 3,
        //   allowSearchFilter: true,
        //   searchPlaceholderText: this.searchlable,
        // };

      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticTestMasterTests",error);
      }
    )
  }

  public GetTestID(item4: any) {
    this.testid = item4.id;

    for (let i = 0; i < this.testlist.length; i++) {

      if (this.testlist[i].id == this.testid) {
        this.testname = this.testlist[i].short
      }
    }




    // this.docservice.GetDiagnosticCenterTests(this.testid).subscribe(
    //   data => {
    //    
    //     this.details = data[0];
    //    
    //     this.diagnotictestname = this.details.short

    //   }, error => {
    //   }
    // )

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
    this.tablecount = 1;

    var entity1: any | undefined = {
      'Sno': this.idcount,
      'DiagnosticCenterID': this.diagnosticid,
      'DiagnosticName': this.diagnosticname,
      'DiagnosticTestID': this.testid,
      'DiagnotiocTestName': this.testname,
      'Description': this.description,
      'Price': this.price
    }
    this.idcount = this.idcount + 1;
    this.qwerty.push(entity1)
    this.description = "";
    this.price = "";
  }
  public insertdetails() {
    this.showPopup = 0;
    let testarry = this.testlist.filter((x: { checked: boolean; }) => x.checked == true)

    let validate = this.testlist.filter((x: { checked: boolean; amount: string | number; }) => x.checked == true && (x.amount == 0 || x.amount == ''))

    if (testarry.length == 0 || validate.length != 0) {
      this.showPopup = 1;
      this.typeofPopUp = 2;
      this.messageID = 74
    }
    else {
      this.loader = true;
      for (let i = 0; i < testarry.length; i++) {
        var entity = {
          'DiagnosticCenterID': this.diagnosticid,
          'DiagnosticTestID': testarry[i].id,
          'Description': testarry[i].description,
          'Price': testarry[i].amount,
        }
        this.CommonService.InsertDiagnosticCenterTests(entity).subscribe(data => {

          if (data != 0) {
            this.showPopup = 1;
            this.typeofPopUp = 1;
            this.messageID = 1
            this.loader = false;
            location.href="#/countrymanager/DiagnosticTest"
          }
          else {
            this.showPopup = 1;
            this.typeofPopUp = 2;
            this.messageID = 15;
            this.loader = false;
            location.href="#/countrymanager/DiagnosticTest"
          }
        },error=>{
          this.SharedService.insertexceptions(this.currentUrl,"InsertDiagnosticCenterTests",error);
        })
      }
    }
  }
  public delete(sno: any) {

    for (let i = 0; i < this.qwerty.length; i++) {

      if (sno == this.qwerty[i].Sno) {

        this.qwerty.splice(i, 1);
      }
    }

  }

   // Pagination

 public pageChanged(even: any) {

  let fgdgfgd = even;
  this.p = even;
}

}
