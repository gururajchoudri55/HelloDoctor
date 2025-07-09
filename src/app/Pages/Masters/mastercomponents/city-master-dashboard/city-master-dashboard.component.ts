import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/Masters/Masterlabels.json'

import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-city-master-dashboard',
  templateUrl: './city-master-dashboard.component.html',
  styleUrls: ['./city-master-dashboard.component.css']
})
export class CityMasterDashboardComponent implements OnInit {

  languageid: any;
  loader: boolean | undefined;
  currentUrl: any;
  countryid: any;
  cityid: any;
  cityslist: any;
  dummlist: any;
  count: any;
  countrylist: any;
  citylist: any;
  p: any;
  search: any;
  labels: any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;

  constructor(private MasterService: MasterService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.getcitymasters();
    this.GetCountryMaster();
    this.countryid = 0
    this.cityid = 0
  }

  //Get City List
  public getcitymasters() {
    this.MasterService.GetAreaMasterByLangID(this.languageid).subscribe(
      data => {
        this.loader = false;
        this.cityslist = data;
        this.dummlist = this.cityslist;
        this.count = this.cityslist.length;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetAreaMasterByLangID", error);
      }
    )
  }


  //Get Country List

  public GetCountryMaster() {
    this.MasterService.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
        this.countrylist = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetCountryMasterByLanguageID", error);
      }
    )
  }
  //Get Country ID
  public GetCountryID(even: any) {
    if (even.target.value != 0) {

      this.countryid = even.target.value;

      this.cityslist = this.dummlist.filter((x: { countryID: any; }) => x.countryID == this.countryid);
      this.count = this.cityslist.length;

      this.getcity();
    }
    else if (even.target.value == 0) {
      this.getcitymasters()
    }
  }

  //Get city

  public getcity() {

    this.MasterService.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {

        this.citylist = data;
        this.count = this.cityslist.length;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetCityMasterBYIDandLanguageID", error);
      }
    )
  }

  //Get City ID
  public GetCityID(even: any) {
    if (even.target.value != 0) {
      this.cityid = even.target.value;
      this.cityslist = this.dummlist.filter((x: { cityID: any; }) => x.cityID == this.cityid)
    }
    else if (even.target.value == 0) {
      this.getcity()
    }
  }

  //Delete Area
  public DeleteAreaMaster(id: any) {
    this.showPopup=0;
    
    Swal.fire({
      title:this.labels.title,
      text:this.labels.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.labels.confirmButtonText,
      cancelButtonText:this.labels.cancelButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        this.MasterService.DeleteAreaMaster(id).subscribe(res => {
          let test = res;
          this.ngOnInit();
        })
           this.showPopup=1;
           this.messageID=75;
           this.typeofPopUp=1;
      }
    })
  }

  //Pagination
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  //Edit
  edit(id: any) {
    location.href = "#/Masters/Citymaster/" + btoa(id);
  }




  

  file: File | undefined;
  contactdata: any;
  arrayBuffer: any;
  incomingfile(event:any) {
    
    this.file = event.target.files[0];
    let a = this.file!.name;
    var characters = a.substr(a.length - 5);

    if (characters == ".xlsx") {

      let fileReader = new FileReader();
      fileReader.onload = e => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
        this.contactdata = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      };
      fileReader.readAsArrayBuffer(this.file!);

    } else {
      Swal.fire("Imported file format not supported.");
    }
  }

  public Upload_file() {
    
    this.MasterService.InsertImportCityMaster(this.contactdata).subscribe(data => {

      if (data != undefined || data != null) {
        Swal.fire("Saved Successfully");

      }
    });
  }
}

