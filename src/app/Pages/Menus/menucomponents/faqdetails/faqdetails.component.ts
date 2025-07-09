import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Report/reportlabels.json';

@Component({
  selector: 'app-faqdetails',
  templateUrl: './faqdetails.component.html',
  styleUrls: ['./faqdetails.component.css']
})
export class FAQDetailsComponent implements OnInit {
  typeofPopUp:any;
  showPopup:any;
  messageID:any;
  languageid:any;
  id:any;
  labels:any;
  faqlist:any;
  faq:any;
  description:any;
  typeid:any;
  currentUrl:any;
  faqid:any;
  folderName:any;
  attachmentsurl:any=[];
  showphoto:any;
  loader:boolean | undefined;
  showbit:any;


  constructor(private  MenuService: MenuService,private SharedService:SharedService,private ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.ActivatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.showbit = 0;
      if (this.id == undefined) {
      }
      else if (this.id != undefined) {
        this.showbit = 1;
        this.id=atob(this.id);
        this.getfaq();

      }
    }
    )
    this.description = "";
    this.typeid = "";

  }


  public getfaq() {
    this.MenuService.GetFrequentlyAskedQuestions(this.languageid).subscribe(
      data => {
        this.faqlist = data;
        var list = this.faqlist.filter((x: { id: any; }) => x.id == this.id)
        this.faq = list[0].faq,
          this.description = list[0].answers,
          this.typeid = list[0].typeID
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"GetFrequentlyAskedQuestions",error);
      }
    )
  }

  public GetTypeID(even:any) {   
    this.typeid = even.target.value;
  }



  files: File[] = [];
  onSelect(event: any) {
    this.attachmentsurl.length = 0;
    console.log(event);
    this.files.push(...event.addedFiles);
    this.uploadsAttchments();
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.attachmentsurl.splice(this.files.indexOf(event), 1);

  }

  //To Upload Attachments 
  uploadsAttchments() {
    this.folderName = "Images/FAQ"
    this.MenuService.AllFilesUploads(this.files, this.folderName).subscribe(res => {
      this.attachmentsurl.push(res);
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      console.log("FAQ", this.attachmentsurl);
    })
  }
 

  public insertdetails() {
    if(this.typeid==0)
    {
      this.showPopup=1;
      this.typeofPopUp=2;
      this.messageID=36;
    }
    else
    {
      var entity = {
        'Faq': this.faq,
        'answers': this.description,
        'LanguageID': this.languageid,
        'TypeID': this.typeid
      }
      this.MenuService.InsertFrequentlyAskedQuestions(entity).subscribe(data => {
        if (data != 0) {
          this.showPopup=1;
          this.typeofPopUp=1;
          this.messageID=1;
          this.faqid = data;
          this.insertattachments();
         
          location.href = "#/menus/FAQ";
  
        }
      })
    }
   
  }

  public insertattachments() {
    ;
    for (let i = 0; i < this.attachmentsurl.length; i++) {
      var entity = {
        'FaqID': this.faqid,
        'PhotoUrl': this.attachmentsurl[i]
      }
      this.MenuService.InsertFAQ_Attachments(entity).subscribe(data => {
       
      })
    }
  }

  cancel(){
    location.href = "#/menus/FAQ";
  }

  
  public updatedetails() {

    var entity = {
      'ID': this.id,
      'Faq': this.faq,
      'answers': this.description,
      'TypeID': this.typeid
    }
    this.MenuService.UpdateFrequentlyAskedQuestions(entity).subscribe(data => {
      let res = data;
    this.showPopup=1;
    this.messageID=34;
    this.typeofPopUp=1;

    location.href = "#/menus/FAQ";
    })
  }


}
