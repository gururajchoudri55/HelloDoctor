import { Component, OnInit } from '@angular/core';
import Labels from '../../../Lables/Report/reportlabels.json';
import { CommonService } from '../../../services/common.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-promo-code',
  templateUrl: './promo-code.component.html',
  styleUrls: ['./promo-code.component.css']
})
export class PromoCodeComponent implements OnInit {
  currentUrl: string | undefined;
  labels: any;
  languageid: any;
  loader: boolean | undefined;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  promoCodeList: any;
  promlist: any;
  search: any;
  p: any;
  constructor(private CommonService: CommonService, private SharedService: SharedService, private MenuService: MenuService,) { }

  ngOnInit(): void {
    this.loader = true;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.currentUrl = window.location.href;
    this.GetSalesPromoCodeRegistration();
  }

  public GetSalesPromoCodeRegistration() {
    this.MenuService.GetSalesPromoCodeRegistration().subscribe(
      data => {
        this.loader = false;
        console.log("Promo" + data)
        this.promoCodeList = data;
        

      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl, "GetSalesPromoCodeRegistration", error);
      }
    )
  }
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }
  edit(id: any) {
    location.href = "#/menus/promoCodeForm/" + btoa(id);
  }
  public DeleteSalesPromoCodeRegistration(id: any) {
    
    Swal.fire({
      title: this.labels.title,
      text: this.labels.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.labels.confirmButtonText,
      cancelButtonText: this.labels.cancelButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        this.MenuService.DeleteSalesPromoCodeRegistration(id).subscribe(res => {
          let test = res;
          this.ngOnInit()
        })
        this.showPopup = 1;
        this.messageID = 75,
          this.typeofPopUp = 1;

      }
    })
  }
}
