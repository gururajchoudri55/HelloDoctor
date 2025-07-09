import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../../Lables/WorkingDetails/workinglabels.json'

@Component({
  selector: 'app-care-giver-planning',
  templateUrl: './care-giver-planning.component.html',
  styleUrls: ['./care-giver-planning.component.css']
})
export class CareGiverPlanningComponent implements OnInit {

  constructor(private CommonService: CommonService, private SharedService: SharedService,) { }
  loader: boolean | undefined;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;

  public languageid: any;
  public labels: any;
  public workinglist: any;
  public hospitalclinicid: any;
  public dummworkinglist: any;
  public dummlistphysiolist: any;
  public physioist: any;
  public term: any;
  public count: any;
  public dummlist: any;
  public dayslist: any;
  public daysname: any;
  public physioname: any;
  public phsyodd = {};
  public search: any;

  phsyhospitadetailsid: any;
  public dayid: any;
  public id: any;
  appointmentypeid: any;
  slotid: any;
  allappointmentid: any;
  docslotid: any;
  fees: any;
  physioid: any;
  SlotTypeID: any;
  Timings: any;
  currentUrl: any;
  selectcaregiver:any;
  

  ngOnInit(): void {
    this.loader = true;
    this.daysname = ''
    this.physioname = '';
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.search=this.labels.search;
    this.selectcaregiver=this.labels.selectCaregiver
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');


    if (this.hospitalclinicid != undefined) {
      this.CommonService.GetPhysiotherapyHospitalDetails(this.languageid).subscribe(
        data => {

          this.dummlistphysiolist = data;
          this.physioist = this.dummlistphysiolist.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.physioist.length
          this.loader = false;
          this.phsyodd = {
            singleSelection: true,
            idField: 'physiotherapyID',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
            closeDropDownOnSelection: true,

          };
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetPhysiotherapyHospitalDetails", error);
        }
      )
    }
    else if (this.hospitalclinicid == undefined) {

      this.CommonService.GetPhysiotherapyHospitalDetails(this.languageid).subscribe(
        data => {

          this.physioist = data;
          this.dummlist = this.physioist
          this.count = this.physioist.length
          this.loader = false;
          this.phsyodd = {
            singleSelection: true,
            idField: 'physiotherapyID',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            closeDropDownOnSelection: true,
            searchPlaceholderText: this.search

          };


        }, error => {
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl, "GetPhysiotherapyHospitalDetails", error);
        }
      )
    }

  }






  public getPhysioTimings() {
    this.CommonService.GetPhysioYearwiseCalender(this.physioid, this.SlotTypeID, this.languageid).subscribe(
      data => {
        
        this.Timings = data;
        this.loader = false;

      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl, "GetPhysioYearwiseCalender", error);
      }
    )
  }





  public GetPhysioID(item: any) {
    this.loader = true;
    this.physioid = item.physiotherapyID
    var list = this.physioist.filter((x: { physiotherapyID: any; }) => x.physiotherapyID == this.physioid);
    this.phsyhospitadetailsid = list[0].id,
      this.SlotTypeID = list[0].slotDurationID
    this.getPhysioTimings()
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
        'PhysiotherapyHospitalDetailsID': this.phsyhospitadetailsid,
        'PhysiotherapistID': this.physioid,
        'DayID': this.dayid,
        'SlotID': this.docslotid,
        'LanguageID': this.languageid,
        'Fees': this.fees,
        'AppointmentTypeID': this.appointmentypeid
      }
      this.CommonService.InsertPhysiotherapistWorkingDetailsByYearWise(entity1).subscribe(data => {
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
        this.getPhysioTimings();
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl, "InsertPhysiotherapistWorkingDetailsByYearWise", error);
      })
    }


    else if (this.allappointmentid == 1 && this.appointmentypeid == 6) {
      
      this.loader = true;
      var entity1 = {
        'PhysiotherapyHospitalDetailsID': this.phsyhospitadetailsid,
        'PhysiotherapistID': this.physioid,
        'DayID': this.dayid,
        'SlotID': this.docslotid,
        'LanguageID': this.languageid,
        'Fees': this.fees,
        'AppointmentTypeID': this.appointmentypeid
      }
      this.CommonService.InsertPhysiotherapistWorkingDetailsByYearWise(entity1).subscribe(data => {
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
        this.getPhysioTimings();

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "InsertPhysiotherapistWorkingDetailsByYearWise", error);
      })
    }
    else if (this.allappointmentid == 4 && this.appointmentypeid == 6) {
      
      this.loader = true;
      var entity1 = {
        'PhysiotherapyHospitalDetailsID': this.phsyhospitadetailsid,
        'PhysiotherapistID': this.physioid,
        'DayID': this.dayid,
        'SlotID': this.docslotid,
        'LanguageID': this.languageid,
        'Fees': this.fees,
        'AppointmentTypeID': this.appointmentypeid
      }
      this.CommonService.InsertPhysiotherapistWorkingDetailsByYearWise(entity1).subscribe(data => {
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
        this.getPhysioTimings();
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "InsertPhysiotherapistWorkingDetailsByYearWise", error);
      })
    }

    else if (this.allappointmentid == 1 && this.appointmentypeid == 4) {
      
      this.loader = true;
      this.CommonService.DeletePhysiotherapistWorkingDetails(this.slotid).subscribe(data => {
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;

        this.getPhysioTimings();
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "DeletePhysiotherapistWorkingDetails", error);
      })
    }
    else if (this.allappointmentid == 6 && this.appointmentypeid == 4) {
      
      this.loader = true;
      this.CommonService.DeletePhysiotherapistWorkingDetails(this.slotid).subscribe(data => {
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;

        this.getPhysioTimings();

      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl, "DeletePhysiotherapistWorkingDetails", error);
      })
    }
  }
}
