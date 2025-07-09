import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Report/reportlabels.json';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
@Component({
  selector: 'app-promo-code-form',
  templateUrl: './promo-code-form.component.html',
  styleUrls: ['./promo-code-form.component.css']
})
export class PromoCodeFormComponent implements OnInit {
  currentUrl: string | undefined;
  labels: any;
  languageid: any;
  loader: boolean | undefined;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  Name: any;
  PhoneNumber: any;
  EmailId: any;
  CompanyName: any;
  PromoCode: any;
  showbutton: any;
  id: any;
  programName: string = ""
  constructor(private CommonService: CommonService, private SharedService: SharedService,
    private ActivatedRoute: ActivatedRoute, private MenuService: MenuService) { }
  ngOnInit(): void {
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.ActivatedRoute.params.subscribe(params => {
      this.showbutton = 0;
      this.id = params['id'];
      if (this.id == undefined) {
        this.showbutton = 0;
      }
      else if (this.id != undefined) {
        this.showbutton = 1;
        this.id = atob(this.id);
        this.GetSalesPromoCodeRegistration()
      }
    }
    )
  }
  public GetSalesPromoCodeRegistration() {
    this.MenuService.GetSalesPromoCodeRegistration().subscribe(
      data => {
        this.loader = false;
        console.log("Promo" + data)
        let temp: any = data;
        let temp1: any = temp.filter((x: { id: any; }) => x.id == this.id);
        this.Name = temp1[0].name;
        this.CompanyName = temp1[0].companyName;
        this.PhoneNumber = temp1[0].phoneNumber;
        this.EmailId = temp1[0].emailId;
        this.PromoCode = temp1[0].promoCode,
          this.programName = temp1[0].programName


      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetSalesPromoCodeRegistration", error);
      }
    )
  }
  public InsertSalesPromoCodeRegistration() {

    this.showPopup = 0;

    var entity = {
      'Name': this.Name,
      'PhoneNumber': this.PhoneNumber,
      'EmailId': this.EmailId,
      'CompanyName': this.CompanyName,
      'PromoCode': this.PromoCode,
      'ProgramName': this.programName
    }
    console.log("entity" + entity)
    this.MenuService.InsertSalesPromoCodeRegistration(entity).subscribe(data => {
      console.log("DATA" + data);
      this.sendSms();
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      location.href = '#/menus/promoCode';
    }, error => {
      console.log("Error", error.message)
    })
  }

  sendSms() {
    //212 append
    let text = ""
    this.PhoneNumber;
    if (this.languageid == 1) {
      text = this.Name + ' here is your Ref/promo code : ' + this.PromoCode + ' Aux nouveaux utilisateurs de Voiladoc'
    }
    else {

      text = this.Name + ' voici votre code ref/promo : ' + this.PromoCode + ' Aux nouveaux utilisateurs de Voiladoc'
    }

    this.MenuService.sendSms(this.PhoneNumber, text).subscribe(data => {
      console.log(data)
    })

  }
  public updatedetails() {
    this.showPopup = 0;
    
    var entity = {
      'id': this.id,
      'Name': this.Name,
      'PhoneNumber': this.PhoneNumber,
      'EmailId': this.EmailId,
      'CompanyName': this.CompanyName,
      'PromoCode': this.PromoCode,
      'ProgramName': this.programName
    }
    this.MenuService.UpdateSalesPromoCodeRegistration(entity).subscribe(data => {
      
      console.log(data)
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      location.href = '#/menus/promoCode';

    })
  }
}


