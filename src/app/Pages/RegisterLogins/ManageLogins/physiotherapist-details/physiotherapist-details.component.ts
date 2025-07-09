import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../RegisterService/register.service';
import Labels from '../../../Lables/managelogins/managelabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-physiotherapist-details',
  templateUrl: './physiotherapist-details.component.html',
  styleUrls: ['./physiotherapist-details.component.css'],
})
export class PhysiotherapistDetailsComponent implements OnInit {
  constructor(
    private RegisterService: RegisterService,
    private SharedService: SharedService
  ) {}

  languageid: any;
  hospitalclinicid: any;
  physioList: any;
  phydd: any;
  dummphysiolist: any;
  physioid: any;
  showPopup: any;
  password: any;
  messageID: any;
  typeofPopUp: any;
  userName: any;
  labels: any;
  selectphysiotherapist: any;
  search: any;
  currentUrl: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.selectphysiotherapist = this.labels.selectPhysiotherapist;
    this.search = this.labels.search;
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    if (this.hospitalclinicid == undefined) {
      this.RegisterService.GetPhysiotherapyRegistringLogins(
        this.languageid
      ).subscribe(
        (data) => {
          this.physioList = data;
          this.phydd = {
            singleSelection: true,
            idField: 'id',
            textField: 'name',
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
            'GetPhysiotherapyRegistringLogins',
            error
          );
        }
      );
    } else if (this.hospitalclinicid != undefined) {
      this.RegisterService.GetPhysiotherapyRegistringLogins(
        this.languageid
      ).subscribe(
        (data) => {
          this.dummphysiolist = data;
          this.physioList = this.dummphysiolist.filter(
            (x: { hospitalClinicID: any }) =>
              x.hospitalClinicID == this.hospitalclinicid
          );

          this.phydd = {
            singleSelection: true,
            idField: 'id',
            textField: 'name',
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
            'GetPhysiotherapyRegistringLogins',
            error
          );
        }
      );
    }
  }

  public GetphysioID(item1: any) {
    this.physioid = item1.id;
  }

  public savedetails() {
    debugger
    this.showPopup = 0;
    this.password=  this.RegisterService.generateRandomPassword();
    console.log("password",this.password);
    if (this.physioid == undefined) {
      this.showPopup = 1;
      this.messageID = 19;
      this.typeofPopUp = 2;
    } else {
      var entity = {
        PhysiotherapistID: this.physioid,
        UserName: this.userName,
        Password: this.password,
      };
      this.RegisterService.InsertPhysiotherapistLogin(entity).subscribe(
        (data) => {
          if (data != 0) {
            this.GetPhysiotherapistLoginAdmin();
            this.showPopup = 1;
            this.messageID = 1;
            this.typeofPopUp = 1;
            location.href = '#/Registerlogins/PhysiotherapistDash';
          } else {
            this.showPopup = 1;
            this.messageID = 15;
            this.typeofPopUp = 2;
          }
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentUrl,
            'InsertPhysiotherapistLogin',
            error
          );
        }
      );
    }
  }

  physioname: any;
  pinno: any;
  email: any;
  smsmobileno: any;
  public GetPhysiotherapistLoginAdmin() {
    this.RegisterService.GetPhysiotherapistLoginAdmin(
      this.languageid
    ).subscribe(
      (data) => {
        var list = data.filter((x) => x.physiotherapistID == this.physioid);
        (this.physioname = list[0].name),
          (this.pinno = list[0].pinno),
          (this.email = list[0].email),
          (this.smsmobileno = list[0].smsmobileno);
        this.SharedService.SendEmailSmsToProvider(
          this.pinno,
          this.userName,
          this.password,
          this.smsmobileno,
          this.email,
          this.physioname
        );
      },
      (error) => {}
    );
  }
}
