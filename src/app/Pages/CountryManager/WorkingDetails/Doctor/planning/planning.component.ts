import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import Labels from '../../../../Lables/WorkingDetails/workinglabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css'],
  animations: [
    fadeInUpOnEnterAnimation({ anchor: 'enter', duration: 2000, delay: 100 }),
    fadeOutOnLeaveAnimation({ anchor: 'leave', duration: 500, delay: 200})

  ]
})
export class PlanningComponent implements OnInit {

  loader: boolean | undefined
  constructor(private CommonService: CommonService,private SharedService:SharedService) { }
  public languageid: any;
  public labels: any;
  public workingdetails: any;
  public hospitalid: any;
  public dummworkingdetails: any;
  public term: any;
  public daysname: any;
  public dayslist: any;
  public dummlist: any;
  public doctorlist: any;
  public doctorname: any;
  public doctorid: any;
  public timeid: any;
  public availabilityid: any;
  public hospitallist: any;
  public availabilitylist: any;
  public slotslist: any;
  public slotsdd: any;
  public timedivisonid: any;
  public morningslotid: any;
  public aftrenoonslots: any = [];
  public eveningslots: any = [];
  public nightslots: any = [];
  public slotslist1: any;
  public slotsdd1: any;
  public slotslist2: any;
  public slotsdd2: any;
  public slotslist3: any;
  public slotsdd3: any;
  public tablecount: any;
  public dayid: any;
  public fees: any;
  public hosipitalidd: any;
  public qwerty: any = [];
  public slotid: any;
  public morningslots: any = [];
  public slotname: any;
  public mrng: any;
  public slotnameid: any;
  public mrngid: any;
  public afternoonslotarray: any = [];
  public slotname1: any;
  public slotnameid1: any;
  public eveningarray: any = [];
  public slotname2: any;
  public evening: any;
  public eveningid: any;
  public slotnameid2: any;
  public slotname3: any;
  public night: any;
  public slotnameid3: any;
  public nightid: any;
  public short: any;
  public hospital_ClinicName: any;
  public dayOfTheWeek: any;
  public details: any;
  public day: any;
  public name: any;
  public docid: any;
  public qwertyy: any = [];
  public idcount: any;
  public cleardropdown4: any = [];
  public abcd: any;
  public dis1: any;
  public dis2: any;
  public dis3: any;
  public hspcliid: any;
  public dochspid: any;
  public hopitslname: any;
  public hopitsllist: any;
  public slottypeid: any;
  public docdd = {};
  public search: any;
  workingdetailscopy: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  selectDoctor:any;
  currentUrl:any;


  ngOnInit(): void {

    this.loader = true;
    this.currentUrl=window.location.href;
    this.daysname = '';
    
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.selectDoctor=this.labels.selectDoctor;
    this.search=this.labels.search;
    this.hospitalid = sessionStorage.getItem('hospitalid');
    this.GetDaysMaster()
    
    if (this.hospitalid == undefined) {
      
      this.getdoctorforadmin();
    }
    if (this.hospitalid != undefined) {
      this.CommonService.GetDoctorForAdminByLanguageIDForWorking(this.languageid).subscribe(
        data => {
          
          this.dummlist = data;
          this.loader = false;
          this.doctorlist = this.dummlist.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.hospitalid)
          this.docdd = {
            singleSelection: true,
            idField: 'id',
            textField: 'doctorName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
            closeDropDownOnSelection: true,
          };

        }, error => {
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl,"GetDoctorForAdminByLanguageIDForWorking",error);
        }
      )
    }
  }








  public getdoctorforadmin() {

    this.CommonService.GetDoctorForAdminByLanguageIDForWorking(this.languageid).subscribe(
      data => {
        this.doctorlist = data;
        this.dummlist = this.doctorlist
        this.loader = false;
        this.docdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'doctorName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          closeDropDownOnSelection: true,
          searchPlaceholderText: this.search
        };
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetDoctorForAdminByLanguageIDForWorking",error);
      }
    )
  }

  public SelectLabel: any;

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
  public docselect: any;



  public GetDoctorHospitalDetails() {
    if (this.hospitalid == undefined) {
      this.CommonService.GetDoctorWorkingDetails(this.languageid).subscribe(
        data => {
          this.workingdetails = data;
        }, error => {
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl,"GetDoctorWorkingDetails",error);
        }
      )
    }
    else if (this.hospitalid != undefined) {
      this.CommonService.GetDoctorWorkingDetails(this.languageid).subscribe(
        data => {
          this.dummworkingdetails = data;
          this.workingdetails = this.dummworkingdetails.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.hospitalid)
          this.workingdetailscopy = this.workingdetails;
        }, error => {
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl,"GetDoctorWorkingDetails",error);
        }
      )
    }

  }
  dummwork: any;
  // doctorid: any;


  public GetDoctorID(item: any) {
    this.doctorid = item.id


    this.loader = true;
    // this.GetDoctorsworkinglist()

    this.CommonService.GetDoctorHospitalDetailsWebByDoctorID(this.doctorid, this.languageid).subscribe(
      data => {

        this.workingdetails = data;
        var list = this.workingdetails.filter((x: { doctorID: any; }) => x.doctorID == this.doctorid)
        this.slottypeid = list[0].slotDurationID;
        this.dochspid = list[0].id;
        this.hospitalid = list[0].hospital_ClinicID;
        this.GetDoctorTimings();

      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetDoctorHospitalDetailsWebByDoctorID",error);
      }
    )
  }


  public Timings: any;

  public GetDoctorTimings() {

    this.CommonService.GetDoctorSlotsByDoctorID(this.doctorid, this.slottypeid, this.languageid).subscribe(
      data => {

        this.Timings = data;
        this.loader = false;
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetDoctorSlotsByDoctorID",error);
      }
    )
  }



  public GetDoctorsworkinglist() {
    this.CommonService.GetDoctorWorkingDetails(this.languageid).subscribe(
      data => {

        this.dummworkingdetails = data;
        this.workingdetails = this.dummworkingdetails.filter((x: { doctorID: any; }) => x.doctorID == this.doctorid)
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetDoctorWorkingDetails",error);
      }
    )

  }


  public appointmentypeid: any;



  public gettimeid(tid: any, dochspid: any, hspcliid: any, dayid: any, appointmentypeid: any, doctorID: any) {
    this.timeid = tid;
    this.dochspid = dochspid;
    this.hspcliid = hspcliid;
    this.dayid = dayid;
    this.appointmentypeid = appointmentypeid;
    this.doctorid = doctorID;



  }


  public GetMorningSlotsMasterbyid() {

    this.CommonService.GetSlotsMasterByID(1, this.slottypeid).subscribe(
      data => {

        this.slotslist = data;
        this.slotsdd = {
          singleSelection: false,
          idField: 'id',
          textField: 'slots',

          itemsShowLimit: 3,
          allowSearchFilter: false,
          enableCheckAll: false,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,
        };
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetSlotsMasterByID",error);
      }
    )
  }




  public GetAfternoonSlotsMasterbyID() {

    this.CommonService.GetSlotsMasterByID(2, this.slottypeid).subscribe(
      data => {

        this.slotslist1 = data;
        this.slotsdd1 = {
          singleSelection: false,
          idField: 'id',
          textField: 'slots',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: false,
          enableCheckAll: false,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,
        };
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetSlotsMasterByID",error);
      }
    )
  }
  public GetEveningSlotsMasterByID() {

    this.CommonService.GetSlotsMasterByID(3, this.slottypeid).subscribe(
      data => {

        this.slotslist2 = data;
        this.slotsdd2 = {
          singleSelection: false,
          idField: 'id',
          textField: 'slots',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: false,
          enableCheckAll: false,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,
        };
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetSlotsMasterByID",error);
      }
    )
  }
  public GetNightSlotsMasterByID() {

    this.CommonService.GetSlotsMasterByID(4, this.slottypeid).subscribe(
      data => {

        this.slotslist3 = data;
        this.slotsdd3 = {
          singleSelection: false,
          idField: 'id',
          textField: 'slots',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: false,
          enableCheckAll: false,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,
        };
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetSlotsMasterByID",error);
      }
    )
  }





  public GetMorningSlotsID(item: any) {

    this.morningslots.push(item);

    if (this.morningslots.length == 2) {
      this.abcd = 1;
    }
  }

  onItemDeSelect(item: any) {

    this.morningslots = this.morningslots.slice(item.id)
  }

  public GetAfternoonSlotsID(item1: any) {

    this.aftrenoonslots.push(item1);

    if (this.aftrenoonslots.length == 2) {
      this.dis1 = 1;
    }
  }


  onItemDeSelect1(item1: any) {

    this.aftrenoonslots = this.aftrenoonslots.slice(item1.id)
  }

  public GetEveningSlotsID(item2: any) {

    this.eveningslots.push(item2);

    if (this.eveningslots.length == 2) {
      this.dis2 = 1;
    }
  }

  onItemDeSelect2(item2: any) {

    this.eveningslots = this.eveningslots.slice(item2.id)
  }


  public GetNightSlotsID(item3: any) {

    this.nightslots.push(item3);
    if (this.nightslots.length == 2) {
      this.dis3 = 1;
    }
  }

  onItemDeSelect3(item3: any) {

    this.eveningslots = this.eveningslots.slice(item3.id)
  }

  public docslotid: any;

  public insertbookappointmenttype() {
    var entity = {
      'DoctorHospitalID': this.dochspid,
      'AppointmentTypeID': this.appointmentypeid
    }
    this.CommonService.InsertBookAppointmentType(entity).subscribe(data => {
      if (data != undefined) {

      }
    },error=>{
      this.loader=false;
      this.SharedService.insertexceptions(this.currentUrl,"InsertBookAppointmentType",error);
    })
  }

  public allappointmentid: any;

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


  public GetHospital(even: any) {

    this.hopitslname = even.target.value;
  }

  public Updateslots() {
    this.showPopup = 0;
    this.loader = true;
    if (this.allappointmentid == 4 && this.appointmentypeid == 1) {
      var entity1 = {
        'SlotID': this.docslotid,
        'DoctorID': this.doctorid,
        'DayID': this.dayid,
        'Hospital_ClinicID': this.hospitalid,
        'LanguageID': this.languageid,
        'AppointmentTypeID': this.appointmentypeid,
        'DoctorHospitalDetailsID': this.dochspid,
        'DoctorFees': this.fees
      }
      this.CommonService.InsertDoctorSlotsWeb(entity1).subscribe(data => {
        this.messageID = 34;
        this.typeofPopUp = 1;
        this.showPopup = 1;
        this.loader = true;
        this.GetDoctorTimings();
        this.insertbookappointmenttype()

      })
    }

    else if (this.allappointmentid == 4 && this.appointmentypeid == 2) {
      this.loader = true;
      var entity1 = {
        'SlotID': this.docslotid,
        'DoctorID': this.doctorid,
        'DayID': this.dayid,
        'Hospital_ClinicID': this.hospitalid,
        'LanguageID': this.languageid,
        'AppointmentTypeID': this.appointmentypeid,
        'DoctorHospitalDetailsID': this.dochspid,
        'DoctorFees': this.fees
      }
      this.CommonService.InsertDoctorSlotsWeb(entity1).subscribe(data => {
        this.messageID = 34;
        this.typeofPopUp = 1;
        this.showPopup = 1;
        this.insertbookappointmenttype()
        this.GetDoctorTimings()


      })
    }
    else if (this.allappointmentid == 4 && this.appointmentypeid == 5) {
      this.loader = true;
      var entity1 = {
        'SlotID': this.docslotid,
        'DoctorID': this.doctorid,
        'DayID': this.dayid,
        'Hospital_ClinicID': this.hospitalid,
        'LanguageID': this.languageid,
        'AppointmentTypeID': this.appointmentypeid,
        'DoctorHospitalDetailsID': this.dochspid,
        'DoctorFees': this.fees
      }
      this.CommonService.InsertDoctorSlotsWeb(entity1).subscribe(data => {
        this.messageID = 34;
        this.typeofPopUp = 1;
        this.showPopup = 1;
        this.loader = true;
        this.insertbookappointmenttype()
        this.GetDoctorTimings()
      })

    }
    else if (this.allappointmentid == 4 && this.appointmentypeid == 6) {
      this.loader = true;

      var entity1 = {
        'SlotID': this.docslotid,
        'DoctorID': this.doctorid,
        'DayID': this.dayid,
        'Hospital_ClinicID': this.hospitalid,
        'LanguageID': this.languageid,
        'AppointmentTypeID': this.appointmentypeid,
        'DoctorHospitalDetailsID': this.dochspid,
        'DoctorFees': this.fees
      }
      this.CommonService.InsertDoctorSlotsWeb(entity1).subscribe(data => {
        this.messageID = 34;
        this.typeofPopUp = 1;
        this.showPopup = 1;
        this.loader = true;
        this.insertbookappointmenttype()
        this.GetDoctorTimings()
      },error=>{
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"InsertDoctorSlotsWeb",error);
      })
    }

    else if (this.allappointmentid == 1 && this.appointmentypeid == 4) {
      this.loader = true;
      this.CommonService.DeleteDoctSlots(this.slotid).subscribe(
        data => {
          this.messageID = 34;
          this.typeofPopUp = 1;
          this.showPopup = 1;
          this.loader = true;
          this.insertbookappointmenttype()
          this.GetDoctorTimings()
        }, error => {
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl,"DeleteDoctSlots",error);
        }
      )
    }
    else if (this.allappointmentid == 2 && this.appointmentypeid == 4) {
      this.loader = true;
      this.CommonService.DeleteDoctSlots(this.slotid).subscribe(
        data => {
          this.messageID = 34;
          this.typeofPopUp = 1;
          this.showPopup = 1;
          this.GetDoctorTimings()
        }, error => {
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl,"DeleteDoctSlots",error);
        }
      )
    }
    else if (this.allappointmentid == 5 && this.appointmentypeid == 4) {
      this.loader = true;
      this.CommonService.DeleteDoctSlots(this.slotid).subscribe(
        data => {
          this.messageID = 34;
          this.typeofPopUp = 1;
          this.showPopup = 1;
          this.GetDoctorTimings()
        }, error => {
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl,"DeleteDoctSlots",error);
        }
      )
    }
    else if (this.allappointmentid == 6 && this.appointmentypeid == 4) {
      this.loader = true;
      this.CommonService.DeleteDoctSlots(this.slotid).subscribe(
        data => {
          this.messageID = 34;
          this.typeofPopUp = 1;
          this.showPopup = 1;
          this.GetDoctorTimings()
        }, error => {
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl,"DeleteDoctSlots",error);
        }
      )
    }
    else if (this.appointmentypeid == 1 || this.appointmentypeid == 2 || this.appointmentypeid == 5 || this.appointmentypeid == 6 && this.allappointmentid == 1 || this.allappointmentid == 2 || this.allappointmentid == 5 || this.allappointmentid == 6) {

      this.loader = true;
      var entity = {
        'ID': this.slotid,
        'AppointmentTypeID': this.appointmentypeid,
        'DoctorFees': this.fees
      }
      this.CommonService.UpdateDoctorSlotsWeb(entity).subscribe(data => {
        this.messageID = 34;
        this.typeofPopUp = 2;
        this.showPopup = 1;
        this.insertbookappointmenttype()
        this.GetDoctorTimings()
      },error=>{
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"UpdateDoctorSlotsWeb",error);
      })
    }
    else {
      this.messageID = 34;
      this.typeofPopUp = 1;
      this.showPopup = 1;
    }

  }
}
