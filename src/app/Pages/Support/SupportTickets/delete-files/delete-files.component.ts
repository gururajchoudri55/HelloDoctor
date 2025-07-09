import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Doctors/myAppointments.json'
import { SupportService } from 'src/app/Pages/services/support.service';

@Component({
  selector: 'app-delete-files',
  templateUrl: './delete-files.component.html',
  styleUrls: ['./delete-files.component.css']
})
export class DeleteFilesComponent implements OnInit {
  p: any;

  constructor(private SupportService: SupportService) { }
  loader: boolean | undefined;
  currentUrl: any;
  languageid: any;
  labels: any;
  count: any;
  search: any;
  patientslist: any;
  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem("LanguageID");
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.getSupport()
  }



  getSupport() {
    this.SupportService.GetDeleteuserProfileWeb().subscribe(data => {
      this.patientslist = data;
      console.log("patient List", this.patientslist)
      this.count = this.patientslist.length;
      this.loader = false;
    })
  }


  // Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }






  updatedetails(list: any, value: any, updatevalue: any) {
    
    var entity = {
      'ID': list.id,
      'calledPatient': updatevalue == 1 ? value : list.calledPatient,
      'sentForm':  updatevalue == 2 ? value :list.sentForm,
      'CompletedForm':  updatevalue == 3 ? value :list.completedForm,
      'Investigate':  updatevalue == 4 ? value :list.investigate,
      'fileDeleted':  updatevalue == 5 ? value :list.fileDeleted,
      "requestRejected": updatevalue == 6 ? value : list.requestRejected
    }
    this.SupportService.UpdateDeleteUserProfile(entity).subscribe(data => {
      this.getSupport()
    })
  }


  public onSaveUsernameChanged(value: boolean) {
    console.log(value)
  }
}
