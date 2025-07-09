import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Revenue/revenuelabels.json';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css'],
})
export class RevenueComponent implements OnInit {
  loader: boolean | undefined;
  startdate: any;
  enddate: any;
  bsRangeValue: any;
  languageid: any;
  subHospitalID: any;
  labels: any;
  search: any;
  typeid: any;
  hospitalID: any;
  hospitallist: any;
  selectdoctor: any;
  selectnurse: any;
  selectcaregiver: any;
  selectmidwife: any;
  currentUrl: any;
  public dummnurse: any;
  public nurselist1: any;
  public nursedd = {};
  public filterdid: any;
  inddoctorslist: any;
  docdd = {};
  public hospitalSubscriptionslist: any;
  dummphysiolist: any;
  public physiolist1: any;
  public physiodd = {};
  hospdd = {};
  public dummmidwifes: any;
  public midwifes1: any;
  public midwifedd = {};
  diaphacounts: any;
  diagnmosticList: any;
  PhargrandTotal: any;
  grandTotal: any;
  pharmaList: any;

  constructor(
    private CommonService: CommonService,
    private SharedService: SharedService
  ) {}

  ngOnInit(): void {
    debugger;
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels['en'][0] : Labels['fr'][0];
    this.search = this.labels.search;
    this.selectdoctor = this.labels.selectDoctor;
    this.selectnurse = this.labels.selectNurse;
    this.selectcaregiver = this.labels.selectCaregiver;
    this.selectmidwife = this.labels.selectMidwife;
    this.GetAllIndependentPeopleRevenueByTypeID();
    var date = new Date();
    this.startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var start = new Date(date.getFullYear(), date.getMonth(), 1);
    var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.startdate = formatDate(this.startdate, format, locale);

    const format1 = 'yyyy-MM-dd';
    const locale1 = 'en-US';
    this.enddate = formatDate(this.enddate, format1, locale1);

    this.bsRangeValue = [start, end];

    this.hospitalID = 0;
    this.subHospitalID = 0;

    this.GetAllHospitalSubscriptions();
    this.getHospitals();
    this.GetAllIndepenentPeopleRevenue();
    this.getIndependentDoctors();
    this.GetAllIndependentNurseList();
    this.GetAllIndependentphysiotherapits();
    this.GetAllIndependentMidWife();
    this.getDiagnostcic();
    this.GetDiaPharmacCounts();
    this.GetAllClinicSubscriptionRevenue();
  }

  public GetAllIndepenentPeopleRevenue() {
    this.CommonService.GetAllIndepenedentSubscriptionRevenue(
      this.startdate,
      this.enddate,
      0
    ).subscribe(
      (data) => {
        this.IndependentSubscriptionList = data;
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetAllIndepenedentSubscriptionRevenue',
          error
        );
      }
    );
  }

  //To Select Date
  selectDate(data: any) {
    debugger;
    this.startdate = this.CommonService.GetDates(data[0]);
    this.enddate = this.CommonService.GetDates(data[1]);
    sessionStorage.setItem('startdate', this.startdate);
    sessionStorage.setItem('enddate', this.enddate);
    var dateobj = {
      Startdate: this.startdate,
      Enddate: this.enddate,
    };
    this.CommonService.setData(dateobj);
    this.GetAllHospitalSubscriptions();
    this.GetAllIndepenentPeopleRevenue();
    this.getDiagnostcic();
    this.GetAllClinicSubscriptionRevenue();
    this.loader = false;
  }

  public GetAllHospitalSubscriptions() {
    this.CommonService.GetAllHospitalSubscriptionRevenue(
      this.startdate,
      this.enddate,
      this.hospitalID
    ).subscribe(
      (data) => {
        this.hospitalSubscriptionslist = data;
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetAllHospitalSubscriptionRevenue',
          error
        );
      }
    );
  }

  incliniccommesionlist: any;
  public GetAllClinicSubscriptionRevenue() {
    this.CommonService.GetAllClinicSubscriptionRevenue(
      this.startdate,
      this.enddate,
      this.hospitalID
    ).subscribe(
      (data) => {
        this.incliniccommesionlist = data;
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetAllClinicSubscriptionRevenue',
          error
        );
      }
    );
  }

  getHospitals() {
    this.CommonService.GetHospital_ClinicForAdminByAdmin(
      this.languageid
    ).subscribe(
      (data) => {
        this.hospitallist = data;
        this.hospdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
          closeDropDownOnSelection: true,
        };
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetHospital_ClinicForAdminByAdmin',
          error
        );
      }
    );
  }

  public GetAllSubScriptionRevenueID(item: any) {
    this.subHospitalID = item.id;
    sessionStorage.setItem('SubhospitalID', this.subHospitalID);

    this.GetAllHospitalSubscriptions();
  }

  public GetNurseID(item2: any) {
    this.filterdid = item2.nurseID;
    this.GetAllIndependentPeopleRevenueByTypeID();
  }

  public GetMidWifeID(item3: any) {
    this.filterdid = item3.midWifeID;
    this.GetAllIndependentPeopleRevenueByTypeID();
  }

  public GetPhysiotherapistID(item4: any) {
    this.filterdid = item4.physiotherapyID;
    this.GetAllIndependentPeopleRevenueByTypeID();
  }

  //independent doctors

  IndependentSubscriptionList: any;

  public GetTypeID(even: any) {
    this.typeid = even.target.value;
  }

  public GetHomecareTypeID(item: any) {
    debugger;
    this.filterdid = item.id;
    this.GetAllIndependentPeopleRevenueByTypeID();
  }

  public GetAllIndependentPeopleRevenueByTypeID() {
    debugger;
    this.CommonService.GetAllIndepenedentSubscriptionRevenueByTypeID(
      this.startdate,
      this.enddate,
      0,
      this.typeid,
      this.filterdid
    ).subscribe(
      (data) => {
        this.IndependentSubscriptionList = data;
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetAllIndepenedentSubscriptionRevenueByTypeID',
          error
        );
      }
    );
  }

  public getIndependentDoctors() {
    this.CommonService.GetDoctorForAdminByLanguageIDIndependentDoctors(
      this.languageid
    ).subscribe(
      (data) => {
        this.inddoctorslist = data;

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
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDoctorForAdminByLanguageIDIndependentDoctors',
          error
        );
      }
    );
  }

  public GetAllIndependentNurseList() {
    this.CommonService.GetNurseHospitalDetailsNurses(this.languageid).subscribe(
      (data) => {
        this.dummnurse = data;
        this.nurselist1 = this.dummnurse.filter(
          (x: { hospitalClinicID: number }) => x.hospitalClinicID == 612
        );

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
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetNurseHospitalDetailsNurses',
          error
        );
      }
    );
  }

  public GetAllIndependentphysiotherapits() {
    this.CommonService.GetPhysiotherapyHospitalDetails(
      this.languageid
    ).subscribe(
      (data) => {
        this.dummphysiolist = data;
        this.physiolist1 = this.dummphysiolist.filter(
          (x: { hospitalClinicID: number }) => x.hospitalClinicID == 613
        );

        this.physiodd = {
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
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetPhysiotherapyHospitalDetails',
          error
        );
      }
    );
  }

  public GetAllIndependentMidWife() {
    this.CommonService.GetMidWifeHospitalDetails(this.languageid).subscribe(
      (data) => {
        this.dummmidwifes = data;
        this.midwifes1 = this.dummmidwifes.filter(
          (x: { hospitalClinicID: number }) => x.hospitalClinicID == 614
        );

        this.midwifedd = {
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
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetMidWifeHospitalDetails',
          error
        );
      }
    );
  }

  public GetDiaPharmacCounts() {
    this.CommonService.GetDiaPharmacCounts(
      this.startdate,
      this.enddate,
      this.languageid
    ).subscribe(
      (data) => {
        this.diaphacounts = data;
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDiaPharmacCounts',
          error
        );
      }
    );
  }

  getDiagnostcic() {
    this.CommonService.GetDiagnosticForAdminByLanguageID(
      this.languageid
    ).subscribe(
      (data) => {
        this.PhargrandTotal = 0;
        this.diagnmosticList = data;

        for (let i = 0; i < this.diagnmosticList.length; i++) {
          this.PhargrandTotal =
            this.PhargrandTotal + this.diagnmosticList[i].monthlySubscription;
        }
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDiagnosticForAdminByLanguageID',
          error
        );
      }
    );

    this.CommonService.GetPharmacyForAdminByLanguageID(
      this.languageid
    ).subscribe(
      (data) => {
        this.grandTotal = 0;
        this.pharmaList = data;

        for (let i = 0; i < this.pharmaList.length; i++) {
          this.grandTotal =
            this.grandTotal + this.pharmaList[i].monthlySubscription;
        }
      },
      (error) => {
        this.loader = false;
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetPharmacyForAdminByLanguageID',
          error
        );
      }
    );
  }

  getTypeID(id: any) {
    sessionStorage.setItem('TypeID', id);
  }

  getTypeID1(id: any) {
    sessionStorage.setItem('TypeID', id);
    sessionStorage.setItem('SDATE', this.startdate);
    sessionStorage.setItem('EDATE', this.enddate);
  }
}
