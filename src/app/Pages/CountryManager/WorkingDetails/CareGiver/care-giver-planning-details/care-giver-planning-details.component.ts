import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../../Lables/WorkingDetails/workinglabels.json';

@Component({
  selector: 'app-care-giver-planning-details',
  templateUrl: './care-giver-planning-details.component.html',
  styleUrls: ['./care-giver-planning-details.component.css']
})
export class CareGiverPlanningDetailsComponent implements OnInit {

  constructor(private CommonService: CommonService, private SharedService: SharedService) { }

  loader: boolean | undefined;

  public physiolist: any;
  public dayslist: any;
  public hospitalcliniclist: any;
  public detailsarray = [];
  public idcount: any;
  public table: any;

  public physioid: any;
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
  public physioname: any
  public hospitalname: any
  active: any
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  physiohospitalid: any;
  startid: any;
  endslotlist: any;
  endid: any;
  slotids: any;
  currentUrl: any;
  selectcaregiver:any;
  selectday:any;
  search:any;

  

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.dummid = sessionStorage.getItem('hospitalid');
    this.hsp_clinicID = sessionStorage.getItem('hospitalid');
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.selectcaregiver=this.labels.selectCareGiver;
    this.selectday=this.labels.selectDay;
    this.search=this.labels.search;
    this.physioname = sessionStorage.getItem('user');
    this.physioid = sessionStorage.getItem('physioid');
    this.GetDaysMaster();
    this.getphysiolist();
  }





  physiodd = {};

  public getphysiolist() {
    if (this.dummid == undefined) {
      this.CommonService.GetPhysiotherapyRegistrationAdminByLanguageID(this.languageid).subscribe(
        data => {
          this.dummlist = data;
          this.physiolist = data;
          this.loader = false;
          this.physiodd = {
            singleSelection: true,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            enableCheckAll: false,
            searchPlaceholderText: this.search,
            closeDropDownOnSelection: true

          };


        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetPhysiotherapyRegistrationAdminByLanguageID", error);
        }
      )
    }
    else if (this.dummid != undefined) {
      this.CommonService.GetPhysiotherapyRegistrationAdminByLanguageID(this.languageid).subscribe(
        data => {

          this.dummlist = data;
          this.physiolist = this.dummlist.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.hsp_clinicID);
          this.loader = false;
          this.physiodd = {
            singleSelection: true,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            enableCheckAll: false,
            searchPlaceholderText: this.search,
            closeDropDownOnSelection: true

          };

        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetPhysiotherapyRegistrationAdminByLanguageID", error);
        }
      )
    }

  }

  slotTypeID: any;

  public getphysioid(item: any) {
    this.physioid = item.id;
    var list = this.dummlist.filter((x: { id: any; }) => x.id == this.physioid)
    this.hsp_clinicID = list[0].hospitalClinicID,
      this.hospital_ClinicName = list[0].hospital_ClinicName,
      this.slotTypeID = list[0].slotDurationID
    this.GetTimings();
  }

  daysdd = {};
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
          closeDropDownOnSelection: true

        };

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetDaysMasterByLanguageID", error);
      }
    )
  }

  public GetDaysID(item: any) {

    this.dayid.push(item)
  }
  Timeings: any;
  public GetTimings() {
    this.CommonService.GetSlotMasterTimings(this.slotTypeID).subscribe(
      data => {

        this.Timeings = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetSlotMasterTimings", error);
      }
    )
  }



  public changeStarttime(even: any) {
    this.startid = even.target.value;
    this.endslotlist = this.Timeings.filter((x: { id: number; }) => x.id > this.startid);
  }

  changeEndtime(even: any) {
    this.endid = even.target.value;
    this.slotids = this.startid + "," + this.endid
  }




  public InsertPhysiotherapyHospitalDetailsAdmin() {
    this.showPopup = 0;
    this.loader = true;
    var entity = {
      'physiotherapyID': this.physioid,
      'Fees': 0,
      'Hospital_ClinicID': this.hsp_clinicID,
      'LanguageID': 1
    }
    this.CommonService.InsertPhysiotherapyHospitalDetailsAdmin(entity).subscribe(data => {
      this.physiohospitalid = data;
      this.InsertPhyoeorking()

      this.showPopup = 1;
      this.typeofPopUp = 1;
      this.messageID = 1;
      this.loader = false;
      location.href = "#/countrymanager/CareGiverPlanning"

    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "InsertPhysiotherapyHospitalDetailsAdmin", error);
    })
  }

  async InsertPhyoeorking() {
    for (let j = 0; j < this.dayid.length; j++) {

      var entity = {
        'PhysiotherapyHospitalDetailsID': this.physiohospitalid,
        'PhysiotherapistID': this.physioid,
        'DayID': this.dayid[j].id,
        'SlotTimings': this.slotids,
        'Fees': this.fees,
        'AppointmentTypeID': 1
      }
      this.CommonService.InsertPhysiotherapistWorkingDetails(entity).subscribe(data => {

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "InsertPhysiotherapistWorkingDetails", error);
      })
    }

  }

}
