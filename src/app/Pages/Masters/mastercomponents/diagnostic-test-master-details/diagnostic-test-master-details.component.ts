import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Masters/Masterlabels.json';

@Component({
  selector: 'app-diagnostic-test-master-details',
  templateUrl: './diagnostic-test-master-details.component.html',
  styleUrls: ['./diagnostic-test-master-details.component.css'],
})
export class DiagnosticTestMasterDetailsComponent implements OnInit {
  languageid: any;
  currentUrl: any;
  testslist: any;
  testsid: any;
  diatests: any;
  id: any;
  testname: any;
  description: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  showbit: any;
  loader: boolean | undefined;
  labels: any;
  searchtext: any;

  constructor(
    private MasterService: MasterService,
    private SharedService: SharedService,
    private ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    debugger;
    this.loader = true;
    this.showPopup = 0;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.searchtext = this.labels.selectPatient;
    this.ActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      } else if (this.id != undefined) {
        this.id = atob(this.id);
        this.showbit = 1;
        this.getdiatests();
      }
    });

    this.testsid = 0;

    this.getdiagnosticcentertests();
  }

  patientdd = {};
  search: any;
  //To get DiagnosticCenter Test List
  public getdiagnosticcentertests() {
    debugger;
    this.MasterService.GetDiagnosticTestTypeMasterByLanguageID(
      this.languageid
    ).subscribe(
      (data) => {
        this.loader = false;
        this.testslist = data;
        this.patientdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'name',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          closeDropdownOnSelect: true,
          closeDropDownOnSelection: true,
          searchPlaceholderText: this.searchtext,
        };
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

  // public getdiagnosticcentertests() {
  //   debugger;
  //   this.MasterService.GetDiagnosticTestTypeMasterByLanguageID(
  //     this.languageid
  //   ).subscribe(
  //     (data) => {
  //       this.loader = false;
  //       this.testslist = data;
  //     },
  //     (error) => {
  //       this.SharedService.insertexceptions(
  //         this.currentUrl,
  //         'GetDiagnosticTestTypeMasterByLanguageID',
  //         error
  //       );
  //     }
  //   );
  // }

  // public getdiagnosticcentertests() {
  //   this.MasterService.GetDiagnosticTestTypeMasterByLanguageID(
  //     this.languageid
  //   ).subscribe(
  //     (data) => {
  //       this.testslist = data;

  //       this.patientdd = {
  //         singleSelection: true,
  //         idField: 'patientID',
  //         textField: 'patientName',
  //         selectAllText: 'Select All',
  //         unSelectAllText: 'UnSelect All',
  //         itemsShowLimit: 3,
  //         allowSearchFilter: true,
  //         closeDropdownOnSelect: true,
  //         closeDropDownOnSelection: true,
  //         searchPlaceholderText: this.search,
  //       };
  //     },
  //     (error) => {}
  //   );
  // }

  //Get Test ID
  public GetTestsID(item: any) {
    debugger;
    this.testsid = item.id;
  }

  public getdiatests() {
    this.MasterService.GetDiagnosticTestMasterByLangID(
      this.languageid
    ).subscribe(
      (data) => {
        this.diatests = data;
        var list = this.diatests.filter((x: { id: any }) => x.id == this.id);
        (this.testsid = list[0].testTypeID),
          (this.testname = list[0].short),
          (this.description = list[0].description);
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

  public insertdetails() {
    this.showPopup = 0;
    if (this.testsid == 0 || this.testsid == undefined) {
      this.showPopup = 1;
      this.typeofPopUp = 2;
      this.messageID = 40;
    } else {
      var entity = {
        Short: this.testname,
        Description: this.description,
        TestTypeID: this.testsid,
        LanguageID: 1,
      };
      this.MasterService.InsertDiagnosticTestMaster(entity).subscribe(
        (data) => {
          this.showPopup = 1;
          this.typeofPopUp = 1;
          this.messageID = 1;
          location.href = '#/Masters/DiagnosticTestMaster';
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'InsertDiagnosticTestMaster',
            error
          );
        }
      );
    }
  }

  //To Edit the details
  public updatedetails() {
    var entity = {
      ID: this.id,
      Short: this.testname,
      Description: this.description,
      TestTypeID: this.testsid,
      LanguageID: this.languageid,
    };
    this.MasterService.UpdateDiagnosticTestMaster(entity).subscribe(
      (data) => {
        let res = data;
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
        location.href = '#/Masters/DiagnosticTestMaster';
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'UpdateDiagnosticTestMaster',
          error
        );
      }
    );
  }

  //Redirecting Page
  cancel() {
    location.href = '#/Masters/DiagnosticTestMaster';
  }
}
