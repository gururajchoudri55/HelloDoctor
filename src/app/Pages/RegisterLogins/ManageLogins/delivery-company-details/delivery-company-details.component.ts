import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../RegisterService/register.service';
import Labels from '../../../Lables/managelogins/managelabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-delivery-company-details',
  templateUrl: './delivery-company-details.component.html',
  styleUrls: ['./delivery-company-details.component.css']
})
export class DeliveryCompanyDetailsComponent implements OnInit {
  languageid:any;
  dcList:any;
  diadd:any;
  dcid:any;
  showPopup:any;
  password:any;
  messageID:any;
  typeofPopUp:any;
  userName:any;
  labels:any;
  selectdeliverycompany:any;
  search:any;
  currentUrl:any;


  constructor(private RegisterService:RegisterService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.selectdeliverycompany=this.labels.selectDeliveryCompany;
    this.search=this.labels.search;
    this.RegisterService.GetDeliveryCompanyAdminByLanguageID(this.languageid).subscribe(
      data => {

        this.dcList = data;
        this.diadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'companyName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search
        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDeliveryCompanyAdminByLanguageID",error);
      }
    )

  }

  public GetdcID(item: any) {

    this.dcid = item.id;
  }

  public insertDetails() {
    this.showPopup = 0;
    this.password=  this.RegisterService.generateRandomPassword();
    console.log("password",this.password);

    if (this.dcid == undefined) {
      this.showPopup = 1;
      this.messageID = 22;
      this.typeofPopUp = 2;
    }
    else {
      var entity = {
        'DeliveryCompanyID': this.dcid,
        'UserName': this.userName,
        'Password': this.password
      }
      this.RegisterService.InsertDeliveryCompanyLogin(entity).subscribe(data => {
        if (data != 0) {
          this.showPopup = 1;
          this.messageID = 1;
          this.typeofPopUp = 1;
          
        }
        else {
          this.showPopup = 1;
          this.messageID = 15;
          this.typeofPopUp = 2;
        }
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"InsertDeliveryCompanyLogin",error);
      })

    }
  }










}
