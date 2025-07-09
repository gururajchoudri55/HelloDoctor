import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../Lables/Masters/Masterlabels.json';
import { MenuService } from '../../services/MenuServices/menu.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


  constructor(private MenuService: MenuService, private ActivatedRoute: ActivatedRoute) { }
  loader: boolean | undefined;
  showbit: any;
  currentUrl: any;
  languageid: any;
  labels: any;
  count: any;
  search: any;
  catgeorylist: any;
  term: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  description: any;
  categoryName: any;
  id: any;
  ngOnInit(): void {

    this.languageid = sessionStorage.getItem('LanguageID');
    this.showbit = 0;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    
    this.ActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.showbit = 1;
      
      this.GetCategoryById()


    });


  }



  public GetCategoryById() {

    this.MenuService.GetCategoryById(this.id).subscribe((data: any) => {

      this.categoryName = data[0].categoryName;
      this.description = data[0].description;

    });
  }


  files: File[] = [];
  identityProofUrl: any = [];

  getIdentityProof(event: any) {
    this.showPopup = 0;
    this.loader = true;
    console.log(event);
    ;
    this.files.push(...event.addedFiles);
    this.uploadeIdentityProofs();
  }

  public uploadeIdentityProofs() {
    this.MenuService.DoctorIdentityProof(this.files).subscribe((res) => {
      this.loader = false;
      this.showPopup = 1;
      this.messageID = 11;
      this.typeofPopUp = 1;
      this.identityProofUrl.push(res);
    });
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  public insertdetail() {
    this.loader = true;
    this.showPopup = 0
    let entity = {
      CategoryName: this.categoryName,
      Description: this.description,
      PhotoURL: this.identityProofUrl[0]
    }
    this.MenuService.InsertCategoryItem(entity).subscribe(data => {
      this.showPopup = 1;
      this.messageID = 1;
      this.typeofPopUp = 1;
      this.loader = false;
      location.href = "#/menus/CategoryDash"

    });
  }



  public update() {
    this.showPopup=0;
    let entity = {
      Id: this.id,
      CategoryName: this.categoryName,
      Description: this.description,
    }
    this.MenuService.UpdateCategory(entity).subscribe(data => {
      if (data != undefined) {

        this.showPopup=1;
        this.messageID=34;
        this.typeofPopUp=1;
       location.href="#/menus/CategoryDash"
        
      }
      else {
        alert("something went wrong");
      }
    });
  }
}
