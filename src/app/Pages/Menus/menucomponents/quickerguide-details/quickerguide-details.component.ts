import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Report/reportlabels.json';
import { TotalPhysiotherapistReportsComponent } from 'src/app/Pages/Reports/Reportlogins/total-physiotherapist-reports/total-physiotherapist-reports.component';

@Component({
  selector: 'app-quickerguide-details',
  templateUrl: './quickerguide-details.component.html',
  styleUrls: ['./quickerguide-details.component.css']
})
export class QuickerguideDetailsComponent implements OnInit {
  languageid: any;
  id: any;
  quickguidephotourl: any = [];
  quicklist: any;
  typeid: any;
  topicid: any;
  chpterid: any;
  chaptername: any;
  subchapter: any;
  description: any;
  attachmentsurl: any;
  topiclist: any;
  labels: any;
  folderName: any;
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  loader: boolean | undefined;
  currentUrl: any;
  vedioURl: any = [];
  attachmentsVediourl: any;
  photourl: any;
  Videourl: any;
  constructor(private MenuService: MenuService, private SharedService: SharedService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.ActivatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id != undefined) {
        ;
        this.id = atob(this.id)
        this.MenuService.GetQuickGuide(this.languageid).subscribe(
          data => {
            this.loader=false
            this.quicklist = data;
            var list = this.quicklist.filter((x: { id: any; }) => x.id == this.id)
            this.typeid = list[0].typeID,
              this.topicid = list[0].topicID,
              this.chpterid = list[0].chapterID,
              this.chaptername = list[0].chapterName,
              this.subchapter = list[0].subTopicName,
              this.description = list[0].description,
              // this.typeid = list[0].typeID,
              // this.files = list[0].photoUrl,
              // this.quickguidephotourls = list[0].photoUrl,
              this.photourl = list[0].photoUrl;
            this.quickguidephotourl.push(list[0].photo);
            this.vedioURl.push(list[0].video);
            this.Videourl = list[0].videoUrl
            // this.showvideo = list[0].videoUrl,
            // this.showphoto = list[0].photoUrl



          }, error => {
            this.SharedService.insertexceptions(this.currentUrl, "GetQuickGuide", error);
          }
        )
      }


    }
    )


    this.typeid = 0;
    this.description = "";


  }


  files: File[] = [];

  onSelect(event: any) {
    ;
    this.showPopup = 0;
    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadsAttchments();
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.quickguidephotourl.splice(this.files.indexOf(event), 1);
  }




  uploadsAttchments() {
    ;
    this.loader=true;
    this.folderName = "Images/quickguidephoto"
    this.MenuService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
      this.quickguidephotourl = [];
      this.quickguidephotourl.push(res);
      this.loader=false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("quickguidephoto", this.quickguidephotourl);
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "AllFilesUploads", error);
    })
  }



  public UpdateDetails() {
    
    this.showPopup = 0;
    var entity = {
      'ID': this.id,
      'ChapterID': this.chpterid,
      'SubTopicName': this.subchapter,
      'Description': this.description,
      'Photo': this.quickguidephotourl[0],
      'VideoUrl': this.vedioURl[0],
      'TypeID': this.typeid,
      'ChapterName': this.chaptername,

    }
    this.MenuService.UpdateQuickGuide(entity).subscribe(data => {
      let res = data;
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      location.href = "#/menus/QuickerGuide"
    }, error => {
      this.SharedService.insertexceptions(this.currentUrl, "UpdateQuickGuide", error);
    })
  }

  public GetTypeID(even: any) {
    this.typeid = even.target.value;
  }



  vediofiles: any = [];
  onSelectVedio(event: any) {
    ;

    console.log(event);
    this.vediofiles.push(...event.addedFiles);
    this.uploadsAttchmentsvedio();
  }

  uploadsAttchmentsvedio() {
    ;
    this.loader=true;
    this.folderName = "vedio/quikevedio"
    this.MenuService.AllFilesUploads(this.vediofiles, this.folderName).subscribe(res => {
      this.vedioURl=[];
      this.vedioURl.push(res);
      this.loader=false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;     
    })
  }
  onRemovevedui(event: any) {
    console.log(event);
    this.files.splice(this.vediofiles.indexOf(event), 1);
    this.vedioURl.splice(this.vediofiles.indexOf(event), 1);

  }
}
