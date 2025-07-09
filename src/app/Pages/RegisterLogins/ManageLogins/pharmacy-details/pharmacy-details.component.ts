import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../RegisterService/register.service';
import Labels from '../../../Lables/managelogins/managelabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-pharmacy-details',
  templateUrl: './pharmacy-details.component.html',
  styleUrls: ['./pharmacy-details.component.css'],
})
export class PharmacyDetailsComponent implements OnInit {
  constructor(
    private RegisterService: RegisterService,
    public SharedService: SharedService
  ) {}
  pharmacyid: any;
  languageID: any;
  pharmacyList: any;
  pharmacydd: any;
  showPopup: any;
  password: any;
  messageID: any;
  typeofPopUp: any;
  userName: any;
  labels: any;
  selectpharmacy: any;
  search: any;
  currentURl: any;

  ngOnInit(): void {
    this.currentURl = window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.selectpharmacy = this.labels.selectPharmacy;
    this.search = this.labels.search;
    this.RegisterService.GetPharmacyForAdminByLanguageID(
      this.languageID
    ).subscribe(
      (data) => {
        this.pharmacyList = data;
        this.pharmacydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'pharmacyName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
        };
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentURl,
          'GetPharmacyForAdminByLanguageID',
          error
        );
      }
    );
  }

  public GetPharmacyID(item2: any) {
    this.pharmacyid = item2.id;
  }

  public savedetails() {
    this.showPopup = 0;
  
    this.password=  this.RegisterService.generateRandomPassword();
    console.log("password",this.password);

    if (this.pharmacyid == undefined) {
      this.showPopup = 1;
      this.messageID = 20;
      this.typeofPopUp = 2;
    } else {
      var entity = {
        PharmacyID: this.pharmacyid,
        UserName: this.userName,
        Password: this.password,
      };
      this.RegisterService.InsertPharmacyAdminRegistration(entity).subscribe(
        async (data) => {
          if (data != 0) {
          await  this.getpharmacyloginfordash();
            this.showPopup = 1;
            this.messageID = 1;
            this.typeofPopUp = 1;
            location.href = '#/Registerlogins/PharmacyDash';
          } else {
            this.showPopup = 1;
            this.messageID = 15;
            this.typeofPopUp = 2;
          }
        },
        (error) => {
          this.SharedService.insertexceptions(
            this.currentURl,
            'InsertPharmacyAdminRegistration',
            error
          );
        }
      );
    }
  }

  pinno: any;
  email: any;
  pharmacyname: any;
  smsmobileno: any;

  public getpharmacyloginfordash() {
    this.RegisterService.GetPharmacyLoginForDash(this.languageID).subscribe(
      (data) => {
        var list = data.filter((x) => x.pharmacyID == this.pharmacyid);
        (this.pinno = list[0].pinno),
          (this.email = list[0].email),
          (this.pharmacyname = list[0].pharmacyName);

        this.SharedService.SendEmailSmsToProvider(
          this.pinno,
          this.userName,
          this.password,
          this.smsmobileno,
          this.email,
          this.pharmacyname
        );
      },
      (error) => {}
    );
  }
}
