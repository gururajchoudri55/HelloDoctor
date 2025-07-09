import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../../Lables/WorkingDetails/workinglabels.json';

@Component({
  selector: 'app-nurse-planning',
  templateUrl: './nurse-planning.component.html',
  styleUrls: ['./nurse-planning.component.css']
})
export class NursePlanningComponent implements OnInit {
  loader: boolean | undefined
  constructor(private CommonService: CommonService, private SharedService: SharedService) { }

  public nurseid: any;
  public workinglist: any;
  public nursehospitaldetilsid: any;
  public dayid: any;
  public startdatetime: any;
  public enddatetime: any;
  public term: any;
  public dayslist: any;
  public id: any;

  public languageid: any;
  public labels: any;
  public hospitalclinicid: any;
  public dummworkinglist: any;
  public dummlist: any;
  public nurselist: any;
  public count: any;
  public daysname: any;
  public nursename: any;
  public nursedd = {};
  public search: any;


  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  currentUrl: any;
  appointmentypeid: any;
  slotid: any;
  allappointmentid: any;
  docslotid: any;
  fees: any;
  slotTypeID: any;
  slectNurse:any;
  
  showSms: boolean | undefined;

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.slectNurse=this.labels.selectNurse;
    this.search=this.labels.search,
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    this.currentUrl = window.location.href;
    this.GetDaysMaster()
    
    if (this.hospitalclinicid == undefined) {
      this.CommonService.GetNurseHospitalDetailsNurses(this.languageid).subscribe(
        data => {
          this.loader = false;
          this.dummlist = data;
          this.nurselist = data;
          this.count = this.nurselist.length;

          this.nursedd = {
            singleSelection: true,
            idField: 'nurseID',
            textField: 'nurseName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
            closeDropDownOnSelection: true,
          };
        }, error => {
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl, "GetNurseHospitalDetailsNurses", error);
        }
      )
    }

    if (this.hospitalclinicid != undefined) {
      this.loader = false;
      this.CommonService.GetNurseHospitalDetailsNurses(this.languageid).subscribe(
        data => {
          this.dummlist = data;
          this.nurselist = this.dummlist.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.nurselist.length
          this.nursedd = {
            singleSelection: true,
            idField: 'nurseID',
            textField: 'nurseName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            closeDropDownOnSelection: true,
            searchPlaceholderText: this.search,
          };

        }, error => {
             this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl, "GetNurseHospitalDetailsNurses", error);
        }
      )
    }
  }

  public GetDaysMaster() {
    this.CommonService.GetDaysMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.dayslist = data;
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetDaysMasterByLanguageID",error);
      }
    )
  }




  public GetNurseID(item: any) {
    this.nurseid = item.nurseID;
    var list = this.nurselist.filter((x: { nurseID: any; }) => x.nurseID == this.nurseid);
    this.nursehospitaldetilsid = list[0].nursehospitalid,
      this.slotTypeID = list[0].slotDurationID
    this.GetNurseTimings()
  }

  Timeings: any
  public GetTimings() {
    this.CommonService.GetSlotMasterTimings(this.slotTypeID).subscribe(
      data => {

        this.Timeings = data;
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetSlotMasterTimings",error);
      }
    )
  }


  public Timings: any;

  public GetNurseTimings() {
    this.loader = true;
    this.CommonService.GetNurseSlotsByNurseID(this.nurseid, this.slotTypeID, this.languageid).subscribe(
      data => {
        
        this.Timings = data;
        this.loader = false;
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetNurseSlotsByNurseID",error);
      }
    )
  }




  public GetDay1List(details: any) {
    this.appointmentypeid = details.mondayappointmentID;
    this.slotid = details.mondaySlotID;
    this.allappointmentid = details.mondayappointmentID;
    this.dayid = details.mondayDayID;
    this.docslotid = details.docMondaySlotID;
    this.fees = details.mondayFees;
  }



  public GetDay2List(details: any) {
    this.appointmentypeid = details.tuesdayAppointmentID;
    this.slotid = details.tuesdaySlotID;
    this.allappointmentid = details.tuesdayAppointmentID;
    this.dayid = details.tuesDayID;
    this.docslotid = details.docTuesDaySlotID;
    this.fees = details.tuesdayFees;
  }

  public GetDay3List(details: any) {

    this.appointmentypeid = details.wednesdayAppointmentID;
    this.slotid = details.wednessdaySlotID;
    this.allappointmentid = details.wednesdayAppointmentID;
    this.dayid = details.wednessDayID;
    this.docslotid = details.docWednessDaySlotID;
    this.fees = details.wednessdayFees;
  }

  public GetDay4List(details: any) {

    this.appointmentypeid = details.thursdayAppointmentID;
    this.slotid = details.tursdaySlotID;
    this.allappointmentid = details.thursdayAppointmentID;
    this.dayid = details.thursDayID;
    this.docslotid = details.docThursaDaySlotID;
    this.fees = details.thursdayFees;
  }

  public GetDay5List(details: any) {

    this.appointmentypeid = details.fridayAppointmentID;
    this.slotid = details.fridaySlotID;
    this.allappointmentid = details.fridayAppointmentID;
    this.dayid = details.friDayID;
    this.docslotid = details.docFridayDaySlotID;
    this.fees = details.fridayFees;
  }

  public GetDay6List(details: any) {

    this.appointmentypeid = details.saturdayAppintmentID;
    this.slotid = details.saturdaySlotID;
    this.allappointmentid = details.saturdayAppintmentID;
    this.dayid = details.saturDayID;
    this.docslotid = details.docSatDaySlotID;
    this.fees = details.satdayFees;
  }

  public GetDay7List(details: any) {

    this.appointmentypeid = details.sundayAppointmentID;
    this.slotid = details.sundaySlotID;
    this.allappointmentid = details.sundayAppointmentID;
    this.dayid = details.sunDayID;
    this.docslotid = details.doSunDaySlotID;
    this.fees = details.sundayFees;
  }




  public Updateslots() {
    
    this.showPopup = 0;

    if (this.allappointmentid == 4 && this.appointmentypeid == 1) {
      this.loader = true;
      var entity1 = {
        'NurseHospitalDetailsID': this.nursehospitaldetilsid,
        'NurseID': this.nurseid,
        'DayID': this.dayid,
        'SlotID': this.docslotid,
        'LanguageID': this.languageid,
        'Fees': this.fees,
        'AppointmentTypeID': this.appointmentypeid
      }
      this.CommonService.InsertNurseWorkingDetailsSlots(entity1).subscribe(data => {
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
        this.GetNurseTimings();

      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl, "InsertNurseWorkingDetailsSlots", error);
      })
    }

    else if (this.allappointmentid == 4 && this.appointmentypeid == 6) {
      this.loader = true;
      var entity1 = {
        'NurseHospitalDetailsID': this.nursehospitaldetilsid,
        'NurseID': this.nurseid,
        'DayID': this.dayid,
        'SlotID': this.docslotid,
        'LanguageID': this.languageid,
        'Fees': this.fees,
        'AppointmentTypeID': this.appointmentypeid
      }
      this.CommonService.InsertNurseWorkingDetailsSlots(entity1).subscribe(data => {
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
        this.GetNurseTimings();

      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl, "InsertNurseWorkingDetailsSlots", error);
      })
    }
    else if (this.allappointmentid == 1 && this.appointmentypeid == 6) {
      this.loader = true;
      var entity1 = {
        'NurseHospitalDetailsID': this.nursehospitaldetilsid,
        'NurseID': this.nurseid,
        'DayID': this.dayid,
        'SlotID': this.docslotid,
        'LanguageID': this.languageid,
        'Fees': this.fees,
        'AppointmentTypeID': this.appointmentypeid
      }
      this.CommonService.InsertNurseWorkingDetailsSlots(entity1).subscribe(data => {
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
        this.GetNurseTimings();

      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl, "InsertNurseWorkingDetailsSlots", error);
      })
    }

    else if (this.allappointmentid == 1 && this.appointmentypeid == 4) {
      
      this.loader = true;
      this.CommonService.DeleteNurseWorkingDetailsBySlot(this.slotid).subscribe(data => {
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
        this.GetNurseTimings();
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl, "DeleteNurseWorkingDetailsBySlot", error);
      })
    }
    else if (this.allappointmentid == 6 && this.appointmentypeid == 4) {
      
      this.loader = true;
      this.CommonService.DeleteNurseWorkingDetailsBySlot(this.slotid).subscribe(data => {
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
        this.GetNurseTimings();
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl, "DeleteNurseWorkingDetailsBySlot", error);
      })
    }
  }

}
