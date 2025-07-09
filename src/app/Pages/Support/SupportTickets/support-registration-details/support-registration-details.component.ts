import { Component, OnInit } from '@angular/core';
import { SupportService } from 'src/app/Pages/services/support.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Support/Supportlabels.json';

@Component({
  selector: 'app-support-registration-details',
  templateUrl: './support-registration-details.component.html',
  styleUrls: ['./support-registration-details.component.css']
})
export class SupportRegistrationDetailsComponent implements OnInit {
  languageid:any;
  countryList:any;
  countrydd:any;
  search:any;
  currentUrl:any;
  countryID:any;
  regionList:any;
  regiondd:any;
  regionID:any;
  cityList:any;
  citydd:any;
  cityID:any;
  areaList:any;
  areadd:any;
  areaID:any;
  pinCode:any;
  showicon:any;
  labels:any;
  

  constructor(private SupportService:SupportService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.getCountryMaster();
  }




  
  // getCountry

  public getCountryMaster() {
    this.SupportService.GetCountryMasterByLanguageID(this.languageid).subscribe(
      (data) => {
        this.countryList = data;
        console.log('CountryList', this.countryList);
        this.countrydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
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
          'GetCountryMasterByLanguageID',
          error
        );
      }
    );
  }


  //getRegion

  public getCountryID(even: any) {
    this.countryID = even.target.value;
    this.SupportService.GetRegionMasterWeb(this.countryID).subscribe(
      (data) => {
        this.regionList = data;

        this.regiondd = {
          singleSelection: true,
          idField: 'id',
          textField: 'regionName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
          noResultsFound: 'no data',
          closeDropDownOnSelection: true,
        };
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetRegionMasterWeb',
          error
        );
      }
    );
  }

  //GetProvince

  GetRegionID(item: any) {
    this.regionID = item.id;

    this.SupportService.GetCityMasterBYIDandLanguageID(
      this.regionID,
      this.languageid
    ).subscribe(
      (data) => {
        this.cityList = data;

        this.citydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
          noDataAvailablePlaceholderText: 'Nod data available',
          closeDropDownOnSelection: true,
        };
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetCityMasterBYIDandLanguageID',
          error
        );
      }
    );
  }


  //GetAreaMaster

  public GetCityID(item1: any) {
    this.cityID = item1.id;
    this.getareamasterbyid();
  }

  public getareamasterbyid() {
    this.SupportService.GetAreaMasterByCityIDAndLanguageID(
      this.cityID,
      this.languageid
    ).subscribe(
      (data) => {
        this.areaList = data;
        this.areadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'areaName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,
        };
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetAreaMasterByCityIDAndLanguageID',
          error
        );
      }
    );
  }
  public GetAreaID(item3: any) {
    this.areaID = item3.id;
    for (let i = 0; i < this.areaList.length; i++) {
      if (this.areaList[i].id == this.areaID) {
        this.pinCode = this.areaList[i].pincode;
      }
    }
  }


}
