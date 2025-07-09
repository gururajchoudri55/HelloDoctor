import { Component, OnInit } from '@angular/core';
import { letterSpacing } from 'html2canvas/dist/types/css/property-descriptors/letter-spacing';
import { CommonService } from 'src/app/Pages/services/common.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../../Lables/WorkingDetails/workinglabels.json';

@Component({
  selector: 'app-midwife-planning',
  templateUrl: './midwife-planning.component.html',
  styleUrls: ['./midwife-planning.component.css']
})
export class MidwifePlanningComponent implements OnInit {

  constructor(private CommonService: CommonService, private SharedService: SharedService) { }
  loader: boolean | undefined;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  public languageid: any;
  public labels: any;
  public workinglist: any;
  public hospitalclinicid: any;
  public dummworkinglist: any;
  public term: any;
  public dayslist: any;
  public daysname: any;
  public dummlist: any;
  public midwifelist: any;
  public count: any;
  public miwifename: any;
  public middd = {};
  public search: any;
  midwifeid: any;
  slotTypeID: any;
  currentUrl: any;
  selectmidwife:any;

  ngOnInit(): void {
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.selectmidwife=this.labels.selectMidewife;
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    this.search=this.labels.search;
    this.miwifename = ''
    this.daysname = '';
    this.currentUrl = window.location.href;

    if (this.hospitalclinicid == undefined) {
      this.GetMidWivesRegistration();
    }
    if (this.hospitalclinicid != undefined) {
      this.CommonService.GetMidWifeHospitalDetails(this.languageid).subscribe(
        data => {

          this.dummlist = data;
          this.midwifelist = this.dummlist.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.midwifelist.length;

          this.middd = {
            singleSelection: true,
            idField: 'midWifeID',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
            closeDropDownOnSelection: true
          
          };
        }, error => {
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl, "GetMidWifeHospitalDetails", error);
        }
      )
    }

  }



  Timings: any;


  public GetMidwifeTimings() {
    this.loader = true;
    this.CommonService.GetMidwifeYearwiseCalender(this.midwifeid, this.slotTypeID, this.languageid).subscribe(
      data => {
        
        this.Timings = data;
        this.loader = false;
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl, "GetMidwifeYearwiseCalender", error);
      }
    )
  }

  public GetMidWivesRegistration() {
    this.CommonService.GetMidWifeHospitalDetails(this.languageid).subscribe(
      data => {
        this.midwifelist = data;
        this.dummlist = this.midwifelist
        this.count = this.midwifelist.length;
        this.middd = {
          singleSelection: true,
          idField: 'midWifeID',
          textField: 'name',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,
        
        };
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl, "GetMidWifeHospitalDetails", error);
      }
    )
  }





  public GetmidwifeID(item: any) {

    this.midwifeid = item.midWifeID;
    var list = this.midwifelist.filter((x: { midWifeID: any; }) => x.midWifeID == this.midwifeid);
    this.midwifehospitalid = list[0].midwifehospitalid,
      this.slotTypeID = list[0].slotDurationID
    this.GetMidwifeTimings()

  }
  public midwifehospitalid: any;
  public dayid: any;
  public startdatetime: any;
  public enddatetime: any;
  public midid: any;

  appointmentypeid: any;
  slotid: any;
  allappointmentid: any;
  docslotid: any;
  fees: any;



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
        'MidWifeHospitalDetailsID': this.midwifehospitalid,
        'MidWifeID': this.midwifeid,
        'DayID': this.dayid,
        'SlotID': this.docslotid,
        'LanguageID': this.languageid,
        'Fees': this.fees,
        'AppointmentTypeID': this.appointmentypeid
      }
      this.CommonService.InsertMidWifeWorkingDetailsYearwise(entity1).subscribe(data => {

        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
        this.GetMidwifeTimings();
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl, "InsertMidWifeWorkingDetailsYearwise", error);
      })
    }


    else if (this.allappointmentid == 1 && this.appointmentypeid == 6) {
      
      this.loader = true;
      var entity1 = {
        'MidWifeHospitalDetailsID': this.midwifehospitalid,
        'MidWifeID': this.midwifeid,
        'DayID': this.dayid,
        'SlotID': this.docslotid,
        'LanguageID': this.languageid,
        'Fees': this.fees,
        'AppointmentTypeID': this.appointmentypeid
      }
      this.CommonService.InsertMidWifeWorkingDetailsYearwise(entity1).subscribe(data => {
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
        this.GetMidwifeTimings();

      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "InsertMidWifeWorkingDetailsYearwise", error);
      })
    }
    else if (this.allappointmentid == 4 && this.appointmentypeid == 6) {
      
      this.loader = true;
      var entity1 = {
        'MidWifeHospitalDetailsID': this.midwifehospitalid,
        'MidWifeID': this.midwifeid,
        'DayID': this.dayid,
        'SlotID': this.docslotid,
        'LanguageID': this.languageid,
        'Fees': this.fees,
        'AppointmentTypeID': this.appointmentypeid
      }
      this.CommonService.InsertMidWifeWorkingDetailsYearwise(entity1).subscribe(data => {
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
        this.GetMidwifeTimings();

      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl, "InsertMidWifeWorkingDetailsYearwise", error);
      })
    }

    else if (this.allappointmentid == 1 && this.appointmentypeid == 4) {
      
      this.loader = true;
      this.CommonService.DeleteMidWifeWorkingDetails(this.slotid).subscribe(data => {
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;

        this.GetMidwifeTimings();
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "DeleteMidWifeWorkingDetails", error);
      })
    }
    else if (this.allappointmentid == 6 && this.appointmentypeid == 4) {
      
      this.loader = true;
      this.CommonService.DeleteMidWifeWorkingDetails(this.slotid).subscribe(data => {
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
        this.GetMidwifeTimings();
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl, "DeleteMidWifeWorkingDetails", error);
      })
    }
  }

}
