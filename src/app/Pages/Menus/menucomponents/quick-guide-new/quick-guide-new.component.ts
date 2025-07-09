import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import { CommonService } from 'src/app/Pages/services/common.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../../Pages/Lables/Doctors/AllLabels.json'


@Component({
  selector: 'app-quick-guide-new',
  templateUrl: './quick-guide-new.component.html',
  styleUrls: ['./quick-guide-new.component.css']
})
export class QuickGuideNewComponent implements OnInit {

  constructor(private CommonService: CommonService, private SharedService: SharedService) { }

  public languageid: any;
  public chapterlist: any;
  subchapterlist: any;
  pharmacyid: any;
  nurseid: any;
  midwifeid: any;
  physioid: any;
  diagnosticid: any;
  doctorid: any;
  hospitalid: any;
  term: any;
  public description: any;
  public photo: any;
  public video: any;
  search: any;
  count: any;
  loader: boolean | undefined;
  currentUrl: any;
  labels:any;


  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.pharmacyid = sessionStorage.getItem('pharmacyid');
    this.nurseid = sessionStorage.getItem('nurseid');
    this.midwifeid = sessionStorage.getItem('midwifeid');
    this.physioid = sessionStorage.getItem('physioid');
    this.diagnosticid = sessionStorage.getItem('diagnosticid');
    this.doctorid = sessionStorage.getItem('userid');
    this.hospitalid = sessionStorage.getItem('hospitalid');


    if (this.doctorid != undefined) {
      this.CommonService.GetChapterMaster(this.languageid, 2).subscribe(
        data => {
          this.loader = false;
          this.chapterlist = data;
          this.count = this.chapterlist.length;

        }, error => {
          this.loader = false;
          this.SharedService.insertexceptions(this.currentUrl, "GetChapterMaster", error);
        }
      )
    }
    else if (this.nurseid != undefined || this.midwifeid != undefined || this.physioid != undefined) {
      this.CommonService.GetChapterMaster(this.languageid, 3).subscribe(
        data => {
          this.loader = false;
          this.chapterlist = data;
          this.count = this.chapterlist.length;
        }, error => {
          this.loader = false;
          this.SharedService.insertexceptions(this.currentUrl, "GetChapterMaster", error);
        }
      )
    }
    else if (this.hospitalid != undefined) {
      this.CommonService.GetChapterMaster(this.languageid, 4).subscribe(
        data => {
          this.loader = false;
          this.chapterlist = data;
          this.count = this.chapterlist.length;

        }, error => {
          this.loader = false;
          this.SharedService.insertexceptions(this.currentUrl, "GetChapterMaster", error);
        }
      )
    }
    else if (this.pharmacyid != undefined) {
      this.CommonService.GetChapterMaster(this.languageid, 5).subscribe(
        data => {
          this.loader = false;
          this.chapterlist = data;
          this.count = this.chapterlist.length;
        }, error => {
          this.loader = false;
          this.SharedService.insertexceptions(this.currentUrl, "GetChapterMaster", error);
        }
      )
    }
    else if (this.diagnosticid != undefined) {
      this.CommonService.GetChapterMaster(this.languageid, 6).subscribe(
        data => {
          this.loader = false;
          this.chapterlist = data;
          this.count = this.chapterlist.length;
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetChapterMaster", error);
          this.loader = false;
        }
      )
    }
  }



  public GetID(id: any) {

    this.GetSubchpters(id)
  }

  public GetSubchpters(id: any) {
    this.CommonService.GetQuickGuideByWeb(id).subscribe(
      data => {
        
        this.subchapterlist = data;

      }, error => {
        this.count = this.chapterlist.length;
        this.SharedService.insertexceptions(this.currentUrl,"GetQuickGuideByWeb",error);
      }
    )
  }



  public GetData(data: any) {
    this.description = data.description,
      this.photo = data.photoUrl,
      this.video = data.videoUrl

  }
}
