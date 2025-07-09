import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import Labels from '../../../Lables/Report/reportlabels.json';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-announcementdetails',
  templateUrl: './announcementdetails.component.html',
  styleUrls: ['./announcementdetails.component.css']
})
export class AnnouncementdetailsComponent implements OnInit {

  regionID:any;
  
  countryList:any;
  countrydd:any;
  countryID:any;
  regionList:any;
  regiondd:any;
  cityList:any;
  citydd:any;
  cityID:any;
  areaList:any;
  areadd:any;
  areaID:any;
  pinCode:any;
  languageID:any;
  loader:boolean | undefined;
  currentUrl:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  announcementphotourl:any=[];
  folderName:any;
  selectregion:any;
  labels:any;
  selectcity:any;
  search:any;
  selectprovince:any;
  id:any;
  showicon:any;
  annousments:any;
  photo:any;
  attachmentsurl1:any=[];
  announsementname:any;
  description:any;
  countryid:any;
  cityid:any;
  areaid:any;
  pincode:any;
  mobilewriteup:any;
  websitelink:any;



  constructor(private MenuService: MenuService, private SharedService: SharedService,private ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.selectregion=this.labels.selectRegion;
    this.selectcity=this.labels.selectCity;
    this.selectprovince=this.labels.selectProvince;
    this.search=this.labels.search;
    this.ActivatedRoute.params.subscribe(params => {

      this.showicon=0
      this.id = params['id'];
      if (this.id == undefined) {
        this.showicon = 0
      }
      else {
        this.showicon = 1;
        this.id=atob(this.id);
        this.getannounsements();
      }
    }
    )
    this.getCountryMaster();
  }


  public getannounsements() {
    this.MenuService.GetAnnouncements('2020-01-01', '2090-01-01', this.languageID).subscribe(
      data => {

        this.annousments = data;
        var list = this.annousments.filter((x: { id: any; }) => x.id == this.id)
        this.announsementname = list[0].announsementName,
          this.description = list[0].description,
          this.countryID = list[0].countryID,
          this.cityID = list[0].cityID,
          this.areaID = list[0].areaID,
          this.pincode = list[0].pincode,
          this.photo = list[0].photo,
          this.attachmentsurl1[0] = list[0].photourl,
          this.websitelink = list[0].websitelink
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetAnnouncements",error);
      }
    )
  }



  // getCountry 

  public getCountryMaster() {
    this.MenuService.GetCountryMasterByLanguageID(this.languageID).subscribe(
      data => {
        this.countryList = data;
        console.log("CountryList", this.countryList)
        this.countrydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true.valueOf,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,
         
        };
        this.loader=false;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetCountryMasterByLanguageID",error);
      }
    )
  }


  //getRegion

  public getCountryID(even: any) {
   
    this.countryID = even.target.value;
    this.MenuService.GetRegionMasterWeb(this.countryID).subscribe(
      data => {
        this.regionList = data;
        this.regiondd = {
          singleSelection: false,
          idField: 'id',
          textField: 'regionName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,
        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetRegionMasterWeb",error);
      }
    )
  }

  //GetProvince

  GetRegionID(item: any) {
    
    this.regionID = item.id
    this.MenuService.GetCityMasterBYIDandLanguageID(this.regionID, this.languageID).subscribe(
      data => {
        this.cityList = data;
        this.citydd = {
          singleSelection: false,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true

        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetCityMasterBYIDandLanguageID",error);
      }
    )
  }



  //GetAreaMaster

  public GetCityID(item1: any) {
    
    this.cityID = item1.id;
    this.getareamasterbyid();
  }


  public getareamasterbyid() {
    this.MenuService.GetAreaMasterByCityIDAndLanguageID(this.cityID, this.languageID).subscribe(
      data => {
        this.areaList = data;
        this.areadd = {
          singleSelection: false,
          idField: 'id',
          textField: 'areaName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true
        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetAreaMasterByCityIDAndLanguageID",error);
            }
    )
  }


  public GetAreaID(item3: any) {
    this.areaID = item3.id;
    for (let i = 0; i < this.areaList.length; i++) {
      if (this.areaList[i].id == this.areaID) {
        this.pinCode = this.areaList[i].pincode
      }
    }
  }


  files: File[] = [];

  onSelect(event: any) {
    this.loader = true;
    this.showPopup = 0;
    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadsAttchments();
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.announcementphotourl.splice(this.files.indexOf(event), 1);
  }


  uploadsAttchments() {
    this.folderName = "Images/announcement"
    this.MenuService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
      this.announcementphotourl.push(res);
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("announcenmentPhoto", this.announcementphotourl);
      this.loader = false;
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"AllFilesUploads",error);
    })
  }





  public insertdetails() {
    
    if (this.countryID == undefined || this.countryID.length == 0) {
         this.showPopup=1;
         this.messageID=5;
         this.typeofPopUp=2;
    }
    else {
      if (this.announcementphotourl.length == 0) {
        this.announcementphotourl[0] = 0
      }
      var entity = {
        'AnnounsementName': this.announsementname,
        'Description': this.description,
        'CountryID': this.countryID,
        'Photo': this.announcementphotourl[0],
        'LanguageID': 1,
        'CityID': this.cityID,
        'AreaID': this.areaID,
        'Pincode': this.pincode,
        'MobileWriteup': this.mobilewriteup,
        'Websitelink': this.websitelink
      }
      this.MenuService.InsertAnnouncements(entity).subscribe(data => {
        if (data != 0) {
            location.href = "#/menus/Announcements";
         
        }
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"InsertAnnouncements",error);
      })
    }
  }

  public updatedetails() {   
    this.showPopup=0; 
    var entity = {
      'ID': this.id,
      'AnnounsementName': this.announsementname,
      'Description': this.description,
      'CountryID': this.countryID,
      'Photo': this.attachmentsurl1[0],
      'LanguageID': 1,
      'CityID': this.cityID,
      'AreaID': this.areaID,
      'Pincode': this.pincode,
      'MobileWriteup': this.mobilewriteup,
      'Websitelink': this.websitelink
    }

    console.log('AnnouncementList');
    this.MenuService.UpdateAnnouncements(entity).subscribe(data => {
      this.showPopup=1;
      this.messageID=34;
      this.typeofPopUp=1;
      location.href = "#/menus/Announcements";
    
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"UpdateAnnouncements",error);
    })
  }



}
