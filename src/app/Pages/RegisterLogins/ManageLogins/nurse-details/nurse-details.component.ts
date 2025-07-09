import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../RegisterService/register.service';
import Labels from '../../../Lables/managelogins/managelabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-nurse-details',
  templateUrl: './nurse-details.component.html',
  styleUrls: ['./nurse-details.component.css'],
})
export class NurseDetailsComponent implements OnInit {
  languageid: any;
  nurseList: any;
  nursedd: any;
  hospitalclinicid: any;
  dummnurselist: any;
  nurseid: any;
  showPopup: any;
  password: any;
  messageID: any;
  typeofPopUp: any;
  userName: any;
  labels: any;
  selectnurse: any;
  search: any;
  currentUrl: any;
  nursename: any;
  email: any;
  pinno: any;
  smsmobileno: any;

  constructor(
    private RegisterService: RegisterService,
    private SharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.selectnurse = this.labels.selectNurse;
    this.search = this.labels.search;
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    if (this.hospitalclinicid == null) {
      this.RegisterService.GetNurseListForRegisteringLogin(
        this.languageid
      ).subscribe(
        (data) => {
          this.nurseList = data;
          this.nursedd = {
            singleSelection: true,
            idField: 'id',
            textField: 'nurseName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
          };
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetNurseListForRegisteringLogin',
            error
          );
        }
      );
    } else if (this.hospitalclinicid != undefined) {
      this.RegisterService.GetNurseListForRegisteringLogin(
        this.languageid
      ).subscribe(
        (data) => {
          this.dummnurselist = data;
          this.nurseList = this.dummnurselist.filter(
            (x: { hospitalClinicID: any }) =>
              x.hospitalClinicID == this.hospitalclinicid
          );

          this.nursedd = {
            singleSelection: true,
            idField: 'id',
            textField: 'nurseName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
          };
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'GetNurseListForRegisteringLogin',
            error
          );
        }
      );
    }
  }

  public GetnurseID(item1: any) {
    this.nurseid = item1.id;
  }

  public insertdetails() {
    this.showPopup = 0;
    this.password=  this.RegisterService.generateRandomPassword();
    console.log("password",this.password);

    if (this.nurseid == undefined) {
      this.showPopup = 1;
      this.messageID = 21;
      this.typeofPopUp = 2;
    } else {
      var entity = {
        NurseID: this.nurseid,
        UserName: this.userName,
        Password: this.password,
      };
      this.RegisterService.InsertNurseLogin(entity).subscribe(
        (data) => {
          if (data != 0) {
            this.GetNurseLoginAdmin();
            this.showPopup = 1;
            this.messageID = 1;
            this.typeofPopUp = 1;
            location.href = '#/Registerlogins/NurseDash';
          } else {
            this.showPopup = 1;
            this.messageID = 15;
            this.typeofPopUp = 2;
          }
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'InsertNurseLogin',
            error
          );
        }
      );
    }
  }

  public GetNurseLoginAdmin() {
    this.RegisterService.GetNurseLoginAdmin(this.languageid).subscribe(
      (data) => {
        var list = data.filter((x) => x.nurseID == this.nurseid);
        (this.nursename = list[0].nurseName),
          (this.email = list[0].email),
          (this.pinno = list[0].pinno),
          (this.smsmobileno = list[0].smsmobileno);
        this.SharedService.SendEmailSmsToProvider(
          this.pinno,
          this.userName,
          this.password,
          this.smsmobileno,
          this.email,
          this.nursename
        );
      },
      (error) => {}
    );
  }
}
