import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../../Lables/WorkingDetails/workinglabels.json';


@Component({
  selector: 'app-diagnostic-planning-details',
  templateUrl: './diagnostic-planning-details.component.html',
  styleUrls: ['./diagnostic-planning-details.component.css']
})
export class DiagnosticPlanningDetailsComponent implements OnInit {

  constructor(private CommonService: CommonService,private SharedService:SharedService) { }
  public diagnosticlist: any;
  public diagnosticid: any;
  public slotslist: any;
  public slotsdd: any;
  public slotslist1: any;
  public slotsdd1: any;
  public slotslist2: any;
  public slotsdd2: any;
  public slotslist3: any;
  public slotsdd3: any;
  public mrngslots: any = [];
  public afternoonslots: any = [];
  public evngslots: any = [];
  public nightslots: any = [];
  public tablecount: any;
  public mrngslotarray: any = [];
  public mrngslotarrayid: any = [];
  public slotname: any;
  public mrng: any;
  public slotnameid: any;
  public mrngid: any;
  public evngslotarray: any = [];
  public evngslotarrayid: any = [];
  public afternoonslotarray: any = [];
  public afternoonslotarrayid: any = [];
  public slotname1: any;
  public afternoon: any;
  public slotnameid1: any;
  public afternoonid: any;
  public slotname2: any;
  public evng: any;
  public slotnameid12: any;
  public evngid: any;
  public nightslotarray: any = [];
  public nightslotarrayid: any = [];

  public slotname3: any;
  public night: any;
  public slotnameid13: any;
  public nightid: any;
  public dropdownclear1: any = [];
  public dropdownclear2: any = [];
  public dropdownclear3: any = [];
  public dropdownclear4: any = [];
  public diadnosticdd = {};
  public labels: any;
  public languageid: any;
  public dayslist: any;
  public daysdd = {}
  public dayid: any = [];
  public dummdiagnosticid: any;
  public diagnosticname: any;
  public search: any;

  public dianoofappointments: any;
  public homenoofappointments: any;
  public shodrop: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  loader: boolean | undefined;
  currentUrl:any;
  selectname:any;
  selectday:any;
  


  ngOnInit(): void {
    this.loader = true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.selectname=this.labels.selectName;
    this.search=this.labels.search;
    this.selectday=this.labels.selectDay
    this.diagnosticid = sessionStorage.getItem('diagnosticid')
    this.dummdiagnosticid = sessionStorage.getItem('diagnosticid')
    this.diagnosticname = sessionStorage.getItem('user');

    if (this.diagnosticid == undefined) {
      this.shodrop = 1;
    }
    else {
      this.shodrop = 0;
    }
    this.getdiagnosticCenterList();
    this.GetdicgnosticMasterSlotByID();
    this.GetdicgnosticAfternoonSlotsMaster();
    this.GetDiagnosticEveningSlotsMaster();
    this.GetDiagnosticNightSlotsMaster();
    this.tablecount = 0;
    this.GetDaysMaster()
    this.mrngfromid = "";
    this.mrngtoid = "";
    this.idcount = 1;
    this.diafromid = "";
    this.diatoid = "";
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
        this.SharedService.insertexceptions(this.currentUrl,"GetDaysMasterByLanguageID",error);
      }
    )
  }

  public GetDaysID(item10: any) {
    // this.dayid = item10.id;

    this.dayid.push(item10)
  }


  public getdiagnosticCenterList() {

    this.CommonService.GetDiagnosticCenterListByLanguageID(this.languageid).subscribe(
      data => {

        this.diagnosticlist = data;
        this.diadnosticdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'diagnosticCenterName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          enableCheckAll: false,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,

        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticCenterListByLanguageID",error);
      }
    )
  }


  public GetDiagnosticID(item7: any) {

    this.diagnosticid = item7.id;
  }

  public mrngfromlist: any;
  public diagnsticfromlist: any;

  public GetdicgnosticMasterSlotByID() {

    this.CommonService.GetDiagnosticSlotMasterByTimeID(1).subscribe(
      data => {

        this.slotslist = data;
        this.mrngfromlist = this.slotslist;
        this.diagnsticfromlist = this.slotslist;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticSlotMasterByTimeID",error);
      }
    )
  }
  public GetdicgnosticAfternoonSlotsMaster() {

    this.CommonService.GetDiagnosticSlotMasterByTimeID(2).subscribe(
      data => {

        this.slotslist1 = data;
        this.slotsdd1 = {
          singleSelection: false,
          idField: 'id',
          textField: 'slotName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          enableCheckAll: false,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,

        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticSlotMasterByTimeID",error);
      }
    )
  }
  public GetDiagnosticEveningSlotsMaster() {

    this.CommonService.GetDiagnosticSlotMasterByTimeID(3).subscribe(
      data => {

        this.slotslist2 = data;
        this.slotsdd2 = {
          singleSelection: false,
          idField: 'id',
          textField: 'slotName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          enableCheckAll: false,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,

        };
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticSlotMasterByTimeID",error);
      }
    )
  }


  public GetDiagnosticNightSlotsMaster() {
    this.CommonService.GetDiagnosticSlotMasterByTimeID(4).subscribe(
      data => {
        this.loader = false;
        this.slotslist3 = data;
        this.slotsdd3 = {
          singleSelection: false,
          idField: 'id',
          textField: 'slotName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          enableCheckAll: false,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,

        };
      }, error => {
        this.loader = false;
        this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticSlotMasterByTimeID",error);
      }
    )
  }


  public morningslots: any = [];
  public qwerty: any = [];


  public appointmenttype: any;
  public idcount: any;
  public colorcode: any;
  public cleardropwn: any = [];
  entity: any

  public AppointmentName: any;

  public adddetails() {
    this.shodrop = 0
    this.loader = true;

    if (this.diagnosticid == undefined || this.diagnosticid == null) {

      this.showPopup = 1;
      this.messageID = 17;
      this.typeofPopUp = 2;

    }
    else if (this.appointmenttype == undefined || this.appointmenttype == "") {
      this.showPopup = 1;
      this.messageID = 79;
      this.typeofPopUp = 2;
    }
    else {
      

      this.tablecount = 1

      if (this.appointmenttype == 1) {
        var mrgfrm = {
          slotName: this.mrngfromslot,
          id: this.mrngfromid
        };
        this.mrngslots.push(mrgfrm);

        var mrgto = {
          slotName: this.mrngtoslot,
          id: this.mrngtoid
        };
        this.mrngslots.push(mrgto);

        for (let i = 0; i < this.mrngslots.length; i++) {
          this.mrngslotarray.push(this.mrngslots[i].slotName)
          this.mrngslotarrayid.push(this.mrngslots[i].id)
        }
        this.slotname = this.mrngslotarray;
        this.mrng = this.slotname.join(' to ')
        this.slotnameid = this.mrngslotarrayid;
        this.mrngid = this.slotnameid.join(',')
        
        if (this.appointmenttype == '1') {
          this.colorcode = '#ADD8E6'
          this.AppointmentName = 'Home Sample'
        }
        else if (this.appointmenttype == '2') {
          this.colorcode = '#5F9EA0'
          this.AppointmentName = 'Diagnostic Center'
        }
        
        this.entity = {
          'Sno': this.idcount,
          'DiagnosticName': this.diagnosticname,
          'Morning': this.mrng,
          'Nightid': this.nightid,
          'mrngAppointmenttype': this.appointmenttype,
          'StartTime': this.mrngfromslot,
          'EndTime': this.mrngtoslot,
          'Color': this.colorcode,
          'AppointmentTypeID': this.appointmenttype,
          'Morningid': this.mrngid,
          'DiagnosticCenterID': this.diagnosticid,
          'NoOfAppointments': this.homenoofappointments,
          'AppointmentName': this.AppointmentName,
          'MrngfromID': this.mrngfromid
        }
      }

      if (this.appointmenttype == 2) {
        var mrgfrm = {
          slotName: this.diagnosticfromslot,
          id: this.diafromid
        };
        this.mrngslots.push(mrgfrm);

        var mrgto = {
          slotName: this.diagnostictoslot,
          id: this.diatoid
        };
        this.mrngslots.push(mrgto);

        for (let i = 0; i < this.mrngslots.length; i++) {
          this.mrngslotarray.push(this.mrngslots[i].slotName)

          this.mrngslotarrayid.push(this.mrngslots[i].id)
        }
        this.slotname = this.mrngslotarray;
        this.mrng = this.slotname.join(' to ')
        this.slotnameid = this.mrngslotarrayid;
        this.mrngid = this.slotnameid.join(',')

        if (this.appointmenttype == '1') {
          this.colorcode = '#ADD8E6'
          this.AppointmentName = 'Home Sample'
        }
        else if (this.appointmenttype == '2') {
          this.colorcode = '#5F9EA0'
          this.AppointmentName = 'Diagnostic Center'
        }
        this.entity = {
          'Sno': this.idcount,
          'DiagnosticName': this.diagnosticname,
          'Morning': this.mrng,
          'Nightid': this.nightid,
          'mrngAppointmenttype': this.appointmenttype,
          'StartTime': this.diagnosticfromslot,
          'EndTime': this.diagnostictoslot,
          'Color': this.colorcode,
          'AppointmentTypeID': this.appointmenttype,
          'Morningid': this.mrngid,
          'DiagnosticCenterID': this.diagnosticid,
          'NoOfAppointments': this.dianoofappointments,
          'AppointmentName': this.AppointmentName,
          'MrngfromID': this.diafromid
        }
      }

      this.qwerty.push(this.entity);
      this.idcount = this.idcount + 1;
      if (this.appointmenttype == 1) {
        var mrngslots = this.mrngfromlist.findIndex((x: { id: any; }) => x.id == this.mrngtoid);
        this.mrngfromlist = this.mrngfromlist.slice(mrngslots + 1, this.mrngfromlist.length);
      }
      else if (this.appointmenttype == 2) {
        var diaslots = this.diagnsticfromlist.findIndex((x: { id: any; }) => x.id == this.diatoid);
        this.diagnsticfromlist = this.diagnsticfromlist.slice(diaslots + 1, this.diagnsticfromlist.length);
      }

      this.mrngfromid = "";
      this.mrngtoid = "";
      this.diafromid = "";
      this.diatoid = "";
      this.appointmenttype = "";
      this.morningslots = [];
      this.morningslots.length = 0;
      this.cleardropwn.length = 0;
      this.homenoofappointments = ""
      this.dianoofappointments = ""
      this.mrngslotarray = [];
      this.mrngslotarray.length = 0;
      this.mrngslots = [];
      this.mrngslotarrayid = [];
      this.slotnameid = "";
      this.loader = false;
    }

  }




  public insertdetails1() {
    this.loader = true;
    var entity = {
      'dayList': this.dayid,
      'slotsList': this.qwerty,
    }
    this.CommonService.InsertDiagnosticRelatedSlots(entity).subscribe(data => {

      if (data == 0) {
        this.loader = false;
        this.showPopup = 1;
        this.messageID = 1;
        this.typeofPopUp = 1;
        location.href = "#/countrymanager/DiagnosticPlanning"
        
      }
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"InsertDiagnosticRelatedSlots",error);
    })



  }





  // public insertdetails1() {
  //   
  //   for (let j = 0; j < this.dayid.length; j++) {
  //     
  //     for (let i = 0; i < this.qwerty.length; i++) {
  //       var entity = {
  //         'DiagnosticCenterID': this.diagnosticid,
  //         'DayID': this.dayid[j].id,
  //         'Morning': this.qwerty[i].Morningid,
  //         'AppointmentTypeID': this.qwerty[i].AppointmentTypeID,
  //         'Noon': this.afternoonid,
  //         'Evening': this.evngid,
  //         'Night': this.nightid,
  //       }
  //       this.docservice.InsertDiagnosticRelatedSlots(entity).subscribe(data => {
  //         
  //       })
  //     }
  //   }
  //   if (this.languageid == 1) {
  //     Swal.fire('', 'Added Successfully');
  //     location.href = "#/DiagnosticSlotsDash"
  //   }
  //   else {
  //     Swal.fire('', 'Ajouté avec succès');
  //     location.href = "#/DiagnosticSlotsDash"
  //   }
  // }



  public mrngfromid: any;
  public mrngfromslot: any;
  public mrngtolist: any;
  public mrngtoid: any;
  public mrngtoslot: any;



  public getmrngfrom(even: any) {
    this.mrngfromid = even.target.value;
    var qwerty = this.mrngfromlist.filter((x: { id: any; }) => x.id == this.mrngfromid);
    this.mrngfromslot = qwerty[0].slotName;
    this.mrngtolist = this.mrngfromlist.filter((x: { id: number; }) => x.id > this.mrngfromid);
    this.mrngtoid = "";
  }


  public getmrngto(even: any) {
    this.mrngtoid = even.target.value;
    var qwerty = this.mrngtolist.filter((x: { id: any; }) => x.id == this.mrngtoid);
    this.mrngtoslot = qwerty[0].slotName;
  }

  public diafromid: any;
  public diagnosticfromslot: any;
  public diagnostictolist: any;
  public diatoid: any;
  public diatoslot: any;
  public diatolist: any;
  public diagnostictoslot: any;



  public GetDiagnosticFromSlots(even: any) {
    this.diafromid = even.target.value;
    var qwerty = this.diagnsticfromlist.filter((x: { id: any; }) => x.id == this.diafromid);
    this.diagnosticfromslot = qwerty[0].slotName;
    this.diatolist = this.diagnsticfromlist.filter((x: { id: number; }) => x.id > this.diafromid);
    this.diatoid = "";
  }


  public getDiagnosticToSlots(even: any) {
    this.diatoid = even.target.value;
    var qwerty = this.diatolist.filter((x: { id: any; }) => x.id == this.diatoid);
    this.diagnostictoslot = qwerty[0].slotName;
  }





  public delete(Sno: any) {

    for (let i = 0; i < this.qwerty.length; i++) {

      if (Sno == this.qwerty[i].Sno) {

        if (this.qwerty[i].mrngAppointmenttype == 1) {
          var mrngslots = this.slotslist.findIndex((x: { id: any; }) => x.id == this.qwerty[i].MrngfromID);
          this.mrngfromlist = this.slotslist.slice(mrngslots, this.slotslist.length);
          this.qwerty.splice(i, 1);
        }
        if (this.qwerty[i].mrngAppointmenttype == 2) {
          var mrngslots = this.slotslist.findIndex((x: { id: any; }) => x.id == this.qwerty[i].MrngfromID);
          this.diagnsticfromlist = this.slotslist.slice(mrngslots, this.slotslist.length);
          this.qwerty.splice(i, 1);
        }
      }
    }

  }
}
