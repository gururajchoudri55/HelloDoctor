import { Component, OnInit } from '@angular/core';
import Labels from '../../../Lables/Masters/Masterlabels.json';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { formatDate } from '@angular/common';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
@Component({
  selector: 'app-vitals-promocode-master',
  templateUrl: './vitals-promocode-master.component.html',
  styleUrls: ['./vitals-promocode-master.component.css'],
})
export class VitalsPromocodeMasterComponent implements OnInit {
  typeid: any;
  charges: any;
  dummChargesList: any;
  languageid: any;
  currentUrl: any;
  p: any;
  count: any;
  search: any;
  loader: boolean | undefined;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  id: any;
  deliverycharges: any;
  meridionalcommission: any;
  deliveryPatnerFees: any;
  labels: any;
  startdate:any;
  enddate:any;
  bsRangeValue: any;
  constructor(
    private MasterService: MasterService,
    private SharedService: SharedService,
    private MenuService:MenuService
  ) {}

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    var date = new Date();
    this.startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var start = new Date(date.getFullYear(), date.getMonth(), 1);
    var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);

    const format1 = 'yyyy-MM-dd';
    const locale1 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale1);

    this.getPromocode();
    this.bsRangeValue = [start, end];
  }
  getPromocode() {
    this.MasterService.GetVitalsPromoCodeFilterBydate(this.startdate,this.enddate).subscribe(
      (data) => {
        this.loader = false;
        this.charges = data;
        this.count = this.charges.length;
        this.dummChargesList = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetVitalsPromoCodeFilterBydate',
          error
        );
      }
    );
  }
  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }
  EnableFess(id: any) {
    this.MasterService.UpdateEnabledVitalsPromoCode(id).subscribe(
      (data) => {
        this.getPromocode();
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'UpdateEnabledPackage',
          error
        );
      }
    );
  }
  GetDisableFess(id: any) {
    this.MasterService.UpdateDisabledVitalsPromoCode(id).subscribe(
      (data) => {
        this.getPromocode();
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'UpdateDisabledPackage',
          error
        );
      }
    );
  }
  GetDetails(id: any) {
    location.href = '#/Masters/VitalsPromocode/' + btoa(id);
  }
    //To Select Date
    selectDate(data: any) {
      
      this.loader = true;
      this.startdate = this.MenuService.GetDates(data[0]);
      this.enddate = this.MenuService.GetDates(data[1]);
      this.getPromocode();
      
    }
  

    UpdateVitalsPromoCodePublish(id: any) {
      this.MasterService.UpdateVitalsPromoCodePublish(id).subscribe(
        (data) => {
          this.getPromocode();
        },
        (error) => {
          this.loader = false;
          this.SharedService.insertexceptions(
            this.currentUrl,
            'UpdateVitalsPromoCodePublish',
            error
          );
        }
      );
    }
}
