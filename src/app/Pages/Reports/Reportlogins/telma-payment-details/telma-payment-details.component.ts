import { Component, OnInit } from '@angular/core';
import Labels from '../../../Lables/Report/reportlabels.json';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-telma-payment-details',
  templateUrl: './telma-payment-details.component.html',
  styleUrls: ['./telma-payment-details.component.css']
})
export class TelmaPaymentDetailsComponent implements OnInit {

  loader: boolean | undefined;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  labels: any;
  languageid: any;
  bsRangeValue: Date[] | undefined;
  startdate: any;
  enddate: any;
  search: any;
  patientsltransactionist: any;
  p: any;
  currentUrl: any;
  count: any;

  constructor(private MenuService: MenuService, private SharedService: SharedService) { }

  async ngOnInit() {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem("LanguageID");
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.startdate = "2019-01-01";
    this.enddate = "2050-01-01";
    this.patientpaymentDetails();
  }
  selectDate(data: any) {
    this.loader = true;
    this.startdate = this.MenuService.GetDates(data[0]);
    this.enddate = this.MenuService.GetDates(data[1]);
    this.patientpaymentDetails();
  }
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }
  public patientpaymentDetails() {
    this.MenuService.GetPatientRegistration(this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        this.loader = false;
        this.patientsltransactionist = data;
        this.count = this.patientsltransactionist.length
      },
      error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetPatientRegistration", error);
      }
    );
  }

}
