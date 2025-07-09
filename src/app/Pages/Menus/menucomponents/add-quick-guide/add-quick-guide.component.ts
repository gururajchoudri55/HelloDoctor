import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Labels from '../../../Lables/Report/reportlabels.json';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-quick-guide',
  templateUrl: './add-quick-guide.component.html',
  styleUrls: ['./add-quick-guide.component.css']
})
export class AddQuickGuideComponent implements OnInit {
  showPopup: any;
  typeofPopUp: any;
  messageID: any;
  folderName: any;
  loader: boolean | undefined;
  //public Editor = ClassicEditor;
  constructor(private activatedroute: ActivatedRoute, private MenuService: MenuService) { }
  public languageid: any;
  public description: any;
  public id: any;
  public showbit: any;
  public faq: any;
  public faqlist: any;
  public term: any;
  public labels: any;
  public dropzonelable: any;
  public topiclist: any;
  public chaptername: any;
  public subchapter: any;

  public tablecount: any;
  public idcount: any;
  ngOnInit() {
    ;   
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.showPopup == 1
    // this.docservice.GetAdmin_FrequntlyAskedQuestions(this.languageid).subscribe(
    //   data => {

    //     this.labels = data;

    //   }, error => {
    //   }
    // )


    // this.docservice.GetTopicMaster().subscribe(
    //   data => {

    //     this.topiclist = data;

    //   }, error => {
    //   }
    // )

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
    this.typeid = 0;
    this.description = "";
    this.idcount = 1;

    this.showvideo = 0;
    this.showphoto = 0;
  }


  public dummshowsignatureurl = []
  public attachments = [];
  public attachmentsurl: any = [];
  public attachmentsVediourl: any = [];
  public showphoto: any;


  public typeid: any;
  public topicname: any;

  public GetTypeID(even: any) {
    
    this.typeid = even.target.value;
  }

  public topicid: any;


  public Videoattachmenturl = [];
  public showvideo: any;
  public videoattachmentsss = []




  public qwerty: any = [];
  uploadsAttchmentsvedio() {
    ;
    this.folderName = "vedio/quikevedio"
    this.MenuService.AllFilesUploads(this.vediofiles, this.folderName).subscribe(res => {
      this.attachmentsVediourl.push(res);
      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("FAQ", this.attachmentsVediourl);
    })
  }
  uploadsAttchments() {
    ;
    this.folderName = "Images/quike"
    this.MenuService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
      this.attachmentsurl.push(res);
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("FAQ", this.attachmentsurl);
    })
  }
  form: NgForm | undefined;
  public adddetails() {
    ;
    if (this.attachmentsVediourl[0] == undefined) {
      this.attachmentsVediourl[0] = null
    }
    this.tablecount = 1;
    var entity = {
      'TopicID': this.topicid,
      'ChapterName': this.chaptername,
      'SubChpterName': this.subchapter,
      'Description': this.description,
      'PhotoUrl': this.attachmentsurl[0],
      'VideoUrl': this.attachmentsVediourl[0],
      'ShowPhoto': this.showphoto,
      'ShowVideo': this.showvideo,
      'TopicName': this.topicname
    }
    console.log("Entity" + entity)
    this.qwerty.push(entity);
    this.idcount = this.idcount + 1;
    this.attachmentsurl[0] = [];
    this.attachmentsVediourl[0] = [];
    this.attachmentsurl.length = 0;
    this.attachmentsVediourl.length = 0;
    this.showvideo = 0;
    this.showphoto = 0;

  }


  public chapterid: any;

  public InsertChapterMaster() {
    this.tablecount = 0;
    var entity1 = {
      'TopicID': this.topicid,
      'ChapterName': this.chaptername,
      'TypeID': this.typeid,
      'LanguageID': this.languageid
    }
    this.MenuService.InsertChapterMaster(entity1).subscribe(data => {
      this.chapterid = data;
      this.InsertSubChapters();
      Swal.fire('Saved Successfully');
      location.href = "#/menus/QuickerGuide"
    })
  }


  public InsertSubChapters() {
    ;
    for (let i = 0; i < this.qwerty.length; i++) {
      var entity1 = {
        'ChapterID': this.chapterid,
        'SubTopicName': this.qwerty[i].SubChpterName,
        'Description': this.qwerty[i].Description,
        'Photo': this.qwerty[i].PhotoUrl,
        'VideoUrl': this.qwerty[i].VideoUrl,

      }
      this.MenuService.InsertQuickGuide(entity1).subscribe(data => {
        if (data != 0) {

        }

      })
    }
  }
  onAttchamneVideoupload(event: any) {
    ;
    console.log("event" + event)

  }


  public delete(Sno: any) {
    ;
    for (let i = 0; i < this.qwerty.length; i++) {
      if (Sno == this.qwerty[i].Sno) {

        this.qwerty.splice(i, 1);
      }
    }
    if (this.qwerty.length == 0) {
      this.tablecount = 0;
    }

  }

  files: any = [];
  onSelect(event: any) {
    ;

    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadsAttchments();
  }
  vediofiles: any = [];
  onSelectVedio(event: any) {
    ;
    this.loader = true;
    console.log(event);
    this.vediofiles.push(...event.addedFiles);
    this.uploadsAttchmentsvedio();
  }


  onRemovevedui(event: any) {
    console.log(event);
    this.files.splice(this.vediofiles.indexOf(event), 1);
    this.attachmentsurl.splice(this.vediofiles.indexOf(event), 1);

  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.attachmentsurl.splice(this.files.indexOf(event), 1);

  }
}
