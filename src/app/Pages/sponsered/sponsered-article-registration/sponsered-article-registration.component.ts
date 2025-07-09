import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import Labels from '../../Lables/sponsred/sponsered.json';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sponsered-article-registration',
  templateUrl: './sponsered-article-registration.component.html',
  styleUrls: ['./sponsered-article-registration.component.css']
})
export class SponseredArticleRegistrationComponent implements OnInit {
  doctorid: any;
  languageid: any;
  id: any;
  showicon: any;
  showPhotoURL: any = [];
  folderName: any;
  categoryid: any;
  showsubphoto: any;
  articlelist: any;
  showphotos: any;
  topic: any;
  subtopic: any;
  writeup: any;
  tags: any;
  typeid: any;
  mobilewriteup: any;
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  categorylist: any;
  labels: any = {};
  description: any;


  constructor(private CommonService: CommonService, private SharedService: SharedService,
    private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.typeid = 1
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.doctorid = sessionStorage.getItem('userid');
    this.CommonService.GetArticleCategory(this.languageid).subscribe(
      data => {

        this.categorylist = data;
      }, error => {

      }
    )
    this.ActivatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id == undefined) {
        this.showicon = 0;
      }
      else {
        this.showicon = 1;
        this.id = atob(this.id);
        this.GetArticles();
     
      }
    })
    this.categoryid = "";

  }


  photoUrl: any = []



  public GetArticles() {
    this.CommonService.GetArticleForAdminForWeb().subscribe(
      data => {

        this.articlelist = data;
        var list = this.articlelist.filter((x: { id: any; }) => x.id == this.id)
        this.topic = list[0].topic,
          this.subtopic = list[0].subTopic,
          this.description = list[0].writeup
        this.tags = list[0].tags
        this.categoryid = list[0].categoryID,
          this.showphotos = list[0].photo,
          this.showsubphoto = list[0].subPhotoUrl,
          this.photoUrl[0] = list[0].photossss,
          this.showPhotoURL[0] = list[0].SubPhotoUrlss,
          this.typeid = list[0].typeID,
          this.GetCategoryID(this.categoryid);
      },
     
      error => { }
    );
  }

  subattachmentsurl: any = [];
  attachments: any = [];

  public onattachmentUpload1(abcd: any) {
    this.subattachmentsurl.length = 0
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadsAttchments();
    this.showPopup = 1;
    this.messageID = 11;
    this.typeofPopUp = 1;
    abcd.length = 0;
  }










  files: File[] = [];
  files1: File[] = [];
  onSelect(event: any, typeID: any) {
    if (typeID == 1) {
      this.showPhotoURL.length = 0;
      // this.showPopup = 0;
      console.log(event);
      this.files.push(...event.addedFiles);
      this.uploadsAttchments();
    }
    else {
      this.photoUrl.length = 0;
      // this.showPopup = 0;
      console.log(event);
      this.files1.push(...event.addedFiles);
      this.uploadsAttchments1();
    }
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.showPhotoURL.splice(this.files.indexOf(event), 1);
  }

  onRemove1(event: any) {
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
    this.photoUrl.splice(this.files1.indexOf(event), 1);
  }
  uploadsAttchments() {
    this.folderName = "Images/HomePage"
    this.CommonService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
      this.showPhotoURL.push(res);
    })
  }
  uploadsAttchments1() {
    this.folderName = "Images/HomePage"
    this.CommonService.AllFilesUploads(this.files1, this.folderName).subscribe(res => {
      this.photoUrl.push(res);
    })
  }



  public GetCategoryID(even: any) {
    this.categoryid = even.target.value;
  }


  public insertdetails() {
    
      if (this.typeid!=3 && (this.showPhotoURL[0]==undefined ||this.showPhotoURL[0].length != 0 ) ) {
      this.tags = "NA"
      //this.typeid = 1
    }
    var entity = {
      'PhotoURL': this.photoUrl[0],
      'Topic': this.topic,
      'SubTopic': this.subtopic,
      'Writeup': this.description,
      'Tags': this.tags,
      'CategoryID': this.categoryid,
      'DoctorID': this.doctorid,
      'MobileWriteup': this.tags,
      'SubPhotoUrl': this.showPhotoURL[0],
      'TypeID': this.typeid
    }
    
    this.CommonService.InsertArticle(entity).subscribe(data => {
      if (data != 0) {
        this.showPopup = 1;
        this.messageID = 11;
        this.typeofPopUp = 1;
        location.href = "#/Sponsered/SponseredArticleDashboard/";
      }
    })
  }

  public updatedetails() {
    document.getElementById("qwerty")!.innerHTML = this.writeup;
    this.mobilewriteup = document.getElementById("qwerty")!.innerText;
    var entity = {
      'ID': this.id,
      'PhotoURL': this.showPhotoURL[0],
      'Topic': this.topic,
      'SubTopic': this.subtopic,
      'Writeup': this.description,
      'Tags': this.tags,
      'Date': new Date(),
      'CategoryID': this.categoryid,
      'MobileWriteup': this.mobilewriteup,
      'SubPhotoUrl': this.showPhotoURL[0],
      'TypeID': this.typeid
    }
    this.CommonService.UpdateArticle(entity).subscribe(data => {
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
      location.href = "#/Sponsered/SponseredArticleDashboard/"
    })
  }
  
}
