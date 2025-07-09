import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../Lables/sponsred/sponsered.json';

@Component({
  selector: 'app-sp-diagnostic-details',
  templateUrl: './sp-diagnostic-details.component.html',
  styleUrls: ['./sp-diagnostic-details.component.css']
})
export class SpDiagnosticDetailsComponent implements OnInit {
  languageid: any;
  id: any;
  showbutton: any;
  diagnosticlist: any;
  diadd: any;
  search: any;
  diagnosticid: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  startdate: any;
  enddate: any;
  fees: any;
  sponserdialist: any;
  diagnosticcentername: any;
  loader: boolean | undefined;
  labels:any;
labDescription: any;

  constructor(private CommonService: CommonService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.search=this.labels.search;
    this.ActivatedRoute.params.subscribe(params => {
      this.showbutton = 0;
      this.id = params['id'];
      if (this.id == undefined) {
        this.showbutton = 0;
      }
      else if (this.id != undefined) {
        this.showbutton = 1;
        this.id = atob(this.id);
        this.GetSponsoredDiagnosticCenterForAdmin();
      }
    }
    )
    this.getdiagnosticforadmin();
  }



  public GetSponsoredDiagnosticCenterForAdmin() {
    this.CommonService.GetSponsoredDiagnosticCenterForAdmin().subscribe(
      data => {
        this.sponserdialist = data;
        var list = this.sponserdialist.filter((x: { id: any; }) => x.id == this.id)
        this.startdate = list[0].sDate,
          this.enddate = list[0].eDate,
          this.fees = list[0].fees,
          this.labDescription = list[0].labDescription,

          this.diagnosticcentername = list[0].diagnosticCenterName
      }, error => {
      }
    )
  }


  public getdiagnosticforadmin() {
    this.CommonService.GetDiagnosticCenterListByLanguageID(this.languageid).subscribe(
      data => {
        this.diagnosticlist = data;
        this.diadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'diagnosticCenterName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search
        };

      }, error => {
      }
    )
  }


  public GetDiagnosticID(item2: any) {
    this.diagnosticid = item2.id;
  }

  public insertdetails() {
    this.showPopup = 0;
    if (this.diagnosticid == undefined) {
      this.showPopup = 1;
      this.messageID = 17;
      this.typeofPopUp = 2;
    }
    else {
      
      var sdate = this.CommonService.GetDates(this.startdate);
      var edate = this.CommonService.GetDates(this.enddate);
      var entity = {
        'DiagnosticID': this.diagnosticid,
        'SDate': sdate,
        'EDate': edate,
        'Fees': this.fees,
        'LabDescription':this.labDescription

      }
      this.CommonService.InsertSponsoredDiagnosticCenter(entity).subscribe(data => {

        if (data != 0) {

          location.href = "#/Sponsered/SpDiagnosticCenter";
          this.clear();

        }
      })
    }
  }

  getStartDate(startdate: any) {
    this.startdate = this.CommonService.GetDates(startdate)
  }


  getenddadte(enddate: any) {
    this.enddate = this.CommonService.GetDates(enddate)
  }
  public clear() {
    this.startdate = '';
    this.enddate = '';
  }


  public updatedetails() {
    
    this.showPopup = 0;
    var entity1 = {
      'ID': this.id,
      'SDate': this.startdate,
      'EDate': this.enddate,
      'Fees': this.fees,
      'LabDescription':this.labDescription
    }
    this.CommonService.UpdateSponsoredDiagnosticCenter(entity1).subscribe(data => {
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      location.href = "#/Sponsered/SpDiagnosticCenter";

    })
  }

  back() {
    location.href = "#/Sponsered/SpDiagnosticCenter";
  }



}
