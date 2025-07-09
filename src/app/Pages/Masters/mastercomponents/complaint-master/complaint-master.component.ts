import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/Masters/Masterlabels.json';

@Component({
  selector: 'app-complaint-master',
  templateUrl: './complaint-master.component.html',
  styleUrls: ['./complaint-master.component.css']
})
export class ComplaintMasterComponent implements OnInit {
  languageid: any;
  complaints: any;
  currentUrl: any;
  count: any;
  p: any;
  search: any;
  loader: boolean | undefined;
  labels: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  departmentList: any = [];
  AnotherComplaints: any = [];
  departmentID: number = 0;



  constructor(private MasterService: MasterService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.getcomplaintmaster();
    this.getDepartmentMaster()

  }


  public getDepartmentMaster() {
    this.MasterService.GetDepartmentMasterByLanguageID(
      this.languageid
    ).subscribe(
      (data) => {
        this.departmentList = data;
      },
      (error) => {
        this.SharedService.insertexceptions(
          this.currentUrl,
          'GetDepartmentMasterByLanguageID',
          error
        );
      }
    );
  }



  //get Complaint List
  public getcomplaintmaster() {
    this.MasterService.GetCompalintMasterLangID(this.languageid).subscribe(
      data => {
        this.loader = false;
        this.complaints = data;
        this.AnotherComplaints = data;
        this.count = this.complaints.length;
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl, "GetCompalintMasterLangID", error);
      }
    )
  }


  //Delete Complaints
  public DeleteComplaintMaster(id: any) {
    this.showPopup = 0;
    
    Swal.fire({
      title: this.labels.title,
      text: this.labels.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.labels.confirmButtonText,
      cancelButtonText: this.labels.cancelButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        this.MasterService.DeleteComplaintMaster(id).subscribe(res => {
          let test = res;
          this.ngOnInit();
        })
        this.showPopup = 1;
        this.messageID = 75;
        this.typeofPopUp = 1;

      }
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "DeleteComplaintMaster", error);
    })
  }


  //Pagination
  public pageChanged(even: any) {
    let fgdgfgd = even;
    this.p = even;
  }

  //Redirecting The Page
  edit(id: any) {
    location.href = "#/Masters/ComplaintMasterDetails/" + btoa(id);
  }


  public GetDepartmentID(even: any) {
    this.departmentID = even.target.value;
    if (this.departmentID != 0) {
      this.complaints = this.AnotherComplaints.filter((x: { departmentID: number; }) => x.departmentID == this.departmentID)
    }
    else{
      this.getDepartmentMaster()
    }

  }
}
