import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/Pages/services/common.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../../Lables/WorkingDetails/workinglabels.json';

@Component({
  selector: 'app-nurse-planning-details',
  templateUrl: './nurse-planning-details.component.html',
  styleUrls: ['./nurse-planning-details.component.css']
})
export class NursePlanningDetailsComponent implements OnInit {

  constructor(private CommonService: CommonService, private SharedService: SharedService) { }


  public nurselist: any;
  public dayslist: any;
  public hospitalcliniclist: any;
  public detailsarray: any = [];
  public idcount: any;

  public nurseid: any;
  public nursename: any;
  public dayid: any = []
  public day: any;
  public worktypeid: any;
  public hsp_clinicID: any;
  public hospital_ClinicName: any;
  public starttime: any;
  public endtime: any;
  public fees: any;
  public languageid: any;
  public labels: any;
  public dummnurselist: any;
  public dummid: any;
  NurseName: any;
  nursedd = {};
  currentUrl: any;

  loader: boolean | undefined;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  slotTypeID: any;
  daysdd = {};
  slectNurse:any;
  selectDate:any;
  search:any;
  journ:any;
  

  ngOnInit(): void {
    this.loader = true;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.slectNurse=this.labels.selectNurse;
    this.selectDate=this.labels.selectDate;
    this.journ=this.labels.journe;
    this.search=this.labels.search,
    this.currentUrl = window.location.href;
    this.dummid = sessionStorage.getItem('hospitalid');
    this.hsp_clinicID = sessionStorage.getItem('hospitalid');
    this.NurseName = sessionStorage.getItem('user');
    this.nurseid = sessionStorage.getItem('nurseid');
    this.getnurselist();
    this.GetDaysMaster();
    this.startid="";
    this.endid=""
  }



  public getnurselist() {
    if (this.hsp_clinicID == undefined) {
      this.CommonService.GetNurseRegistrationAdminByLanguageID(this.languageid).subscribe(
        data => {

          this.dummnurselist = data;
          this.nurselist = data;

          this.nursedd = {
            singleSelection: true,
            idField: 'id',
            textField: 'nurseName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            enableCheckAll: false,
            closeDropDownOnSelection: true,
            searchPlaceholderText: this.search

          };

        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetNurseRegistrationAdminByLanguageID", error);
        }
      )
    }
    else if (this.hsp_clinicID != undefined) {
      this.CommonService.GetNurseRegistrationAdminByLanguageID(this.languageid).subscribe(
        data => {

          this.dummnurselist = data;
          this.nurselist = this.dummnurselist.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.hsp_clinicID);

          this.nursedd = {
            singleSelection: true,
            idField: 'id',
            textField: 'nurseName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            enableCheckAll: false,
            closeDropDownOnSelection: true,
            searchPlaceholderText: this.search
          };
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetNurseRegistrationAdminByLanguageID", error);
        }
      )
    }
  }


  public getnurseid(item: any) {
    this.nurseid = item.id;
    
    var list = this.dummnurselist.filter((x: { id: any; }) => x.id == this.nurseid)
    this.hsp_clinicID = list[0].hospitalClinicID,
      this.hospital_ClinicName = list[0].hospital_ClinicName,
      this.slotTypeID = list[0].slotDurationID

    this.GetTimings();
    
  }

  public Getworktypeid(even: any) {

    this.worktypeid = even.target.value;
    this.GetAllHospitalclinicById();

  }

  public GetAllHospitalclinicById() {

    this.CommonService.GetAllHospital_ClinicListByID(this.worktypeid).subscribe(
      data => {

        this.hospitalcliniclist = data;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetAllHospital_ClinicListByID", error);
      }
    )
  }

  public Gethsp_clinicID(even: any) {
    this.hsp_clinicID = even.target.value;
    this.CommonService.GetHospital_ClinicDetailsForAdmin(this.hsp_clinicID).subscribe(
      data => {

        this.hospital_ClinicName = data[0].hospital_ClinicName
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetHospital_ClinicDetailsForAdmin", error);
      }
    )
  }


  public GetDaysMaster() {
    this.CommonService.GetDaysMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.dayslist = data;
        this.loader = false;
        this.daysdd = {
          singleSelection: false,
          idField: 'id',
          textField: 'dayOfTheWeek',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          enableCheckAll: false,
          closeDropDownOnSelection: true,
          searchPlaceholderText: this.search

        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetDaysMasterByLanguageID", error);
        this.loader = false;
      }
    )
  }
  Timeings: any
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

  startid: any;
  endid: any;
  endslotlist: any;
  slotids: any;

  public changeStarttime(even: any) {
    this.startid = even.target.value;
    this.endslotlist = this.Timeings.filter((x: { id: number; }) => x.id > this.startid);



  }

  changeEndtime(even: any) {
    this.endid = even.target.value;
    this.slotids = this.startid + "," + this.endid
  }


  nursehosid: any;



  InsertNurseHospitalDetailsAdmin() {
    this.showPopup = 0;
    this.loader = true;
    
    var entity = {
      'NurseID': this.nurseid,
      'Fees': 0,
      'Hospital_ClinicID': this.hsp_clinicID,
      'LanguageID': 1
    }
    this.CommonService.InsertNurseHospitalDetailsAdmin(entity).subscribe(data => {
      
      this.nursehosid = data;
      this.InsertNurseworking();
      this.showPopup = 1;
      this.typeofPopUp = 1;
      this.messageID = 1;
      location.href = "#/countrymanager/NursePlanning"
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "InsertNurseHospitalDetailsAdmin", error);
      this.loader = false;
    })

  }



  async InsertNurseworking() {
    for (let j = 0; j < this.dayid.length; j++) {
      var entity1 = {
        'NurseHospitalDetailsID': this.nursehosid,
        'NurseID': this.nurseid,
        'DayID': this.dayid[j].id,
        'SlotTimings': this.slotids,
        'Fees': this.fees,
        'AppointmentTypeID': 1
      }
      this.CommonService.InsertNurseWorkingDetails(entity1).subscribe(data => {

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "InsertNurseWorkingDetails", error);
        this.loader = false;
      })
    }
    this.loader = false;
  }






}
