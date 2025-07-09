import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../../Lables/WorkingDetails/workinglabels.json';

@Component({
  selector: 'app-midwife-planing-details',
  templateUrl: './midwife-planing-details.component.html',
  styleUrls: ['./midwife-planing-details.component.css']
})
export class MidwifePlaningDetailsComponent implements OnInit {

  constructor(private CommonService: CommonService, private SharedService: SharedService) { }
  loader: boolean | undefined;

  showPopup: any;
  typeofPopUp: any;
  messageID: any;

  public midwifelist: any;
  public dayslist: any;
  public hospitalcliniclist: any;
  public detailsarray = [];
  public idcount: any;
  public table: any;

  public widwifeid: any;
  public nursename: any;
  public dayid: any = [];
  public day: any;
  public worktypeid: any;
  public hsp_clinicID: any;
  public hospital_ClinicName: any;
  public starttime: any;
  public endtime: any;
  public fees: any;
  public languageid: any;
  public labels: any;
  public dummid: any;
  public dummlist: any;
  midwifename: any;
  active: any;
  Timeings: any
  middd = {};
  search: any;
  currentUrl: any;
  selectmidwife:any;
  selectday:any;
  midWifename:any;
  

  ngOnInit(): void {
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.dummid = sessionStorage.getItem('hospitalid');
    this.hsp_clinicID = sessionStorage.getItem('hospitalid');
    this.midwifename = sessionStorage.getItem('user');
    this.widwifeid = sessionStorage.getItem('midwifeid');
    this.selectmidwife=this.labels.selectMidewife;
    this.midWifename=this.labels.midWifeName;
    this.selectday=this.labels.selectDay;
    this.search=this.labels.search;
    this.currentUrl = window.location.href;
    this.getmidwifelist();

    this.GetDaysMaster();
    this.endid = "";
    this.startid=""
  }






  public getmidwifelist() {
    if (this.dummid == undefined) {
      this.CommonService.GetMidWivesRegistrationByLanguageID(this.languageid).subscribe(
        data => {
          this.dummlist = data;
          this.midwifelist = data;



          this.middd = {
            singleSelection: true,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            enableCheckAll: false,
            searchPlaceholderText: this.search,
            closeDropDownOnSelection: true,
         
          };

        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetMidWivesRegistrationByLanguageID", error);
        }
      )
    }
    else if (this.dummid != undefined) {
      this.CommonService.GetMidWivesRegistrationByLanguageID(this.languageid).subscribe(
        data => {

          this.dummlist = data;
          this.midwifelist = this.dummlist.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.hsp_clinicID);

          this.middd = {
            singleSelection: true,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            enableCheckAll: false,
            searchPlaceholderText: this.search,
            closeDropDownOnSelection: true,
         
          };
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetMidWivesRegistrationByLanguageID", error);
        }
      )
    }
  }




  public GetDaysMaster() {
    this.CommonService.GetDaysMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.dayslist = data;

        this.daysdd = {
          singleSelection: false,
          idField: 'id',
          textField: 'dayOfTheWeek',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          enableCheckAll: false,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,
        };

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetDaysMasterByLanguageID", error);
      }
    )
  }
  slotTypeID: any;

  public getmidwifeid(item: any) {
    this.widwifeid = item.id;
    var list1 = this.dummlist.filter((x: { id: any; }) => x.id == this.widwifeid)
    this.hsp_clinicID = list1[0].hospitalClinicID,
      this.hospital_ClinicName = list1[0].hospital_ClinicName,
      this.slotTypeID = list1[0].slotDurationID

    this.GetTimings();
  }



  public GetTimings() {
    this.CommonService.GetSlotMasterTimings(this.slotTypeID).subscribe(
      data => {

        this.Timeings = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetSlotMasterTimings", error);
      }
    )
  }




  public GetDaysID(item: any) {
    
    this.dayid.push(item);
  }

  daysdd = {};
  startid: any;
  endslotlist: any;
  endid: any;
  slotids: any;
  midwifehospitalid: any;

  public changeStarttime(even: any) {
    this.startid = even.target.value;
    this.endslotlist = this.Timeings.filter((x: { id: number; }) => x.id > this.startid);
    this.endid = 0;
  }

  changeEndtime(even: any) {
    this.endid = even.target.value;
    this.slotids = this.startid + "," + this.endid
  }


  public insertMidwife() {
    this.loader = true;
    this.showPopup = 0;
    var entity = {
      'MidWifeID': this.widwifeid,
      'Fees': 0,
      'HospitalClinicID': this.hsp_clinicID,
      'LanguageID': 1
    }
    this.CommonService.InsertMidWifeHospitalDetails(entity).subscribe(data => {
      this.midwifehospitalid = data;
      this.inserMidwifeworkingDetails();
      this.showPopup = 1;
      this.typeofPopUp = 1;
      this.messageID = 1;
      this.loader = false;
      location.href = "#/countrymanager/MidwifePlanning"
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl, "InsertMidWifeHospitalDetails", error);
    })

  }



  public inserMidwifeworkingDetails() {
    for (let j = 0; j < this.dayid.length; j++) {
      
      var entity = {
        'MidWifeHospitalDetailsID': this.midwifehospitalid,
        'MidWifeID': this.widwifeid,
        'DayID': this.dayid[j].id,
        'SlotTimings': this.slotids,
        'Fees': this.fees,
        'AppointmentTypeID': 1
      }
      this.CommonService.InsertMidWifeWorkingDetails(entity).subscribe(data => {
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl, "InsertMidWifeWorkingDetails", error);
      })

    }
  }



}
