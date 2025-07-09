import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../Lables/Masters/Masterlabels.json';
import { MenuService } from '../../services/MenuServices/menu.service';
@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {

  constructor(private MenuService: MenuService, private ActivatedRoute: ActivatedRoute) { }
  languageid: any;
  showbit: any;
  currentUrl: any;
  labels: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  ID: any;
  SubcategoryLists: any;
  CategoryList: any;
  CategoryID: any;
  SubcategoryName: any;

  Description: any;
  productname: any;
  categoryID: any;
  subcategoryID: any;
  productDescription: any;
  productCode: any;
  productprice: any;
  quantity: any;
  photourl: any;
  Categorylist: any;
  Subcategorylist: any;

  dropzonelable: any;

  ngOnInit(): void {
    this.CategoryID = ""
    this.languageid = sessionStorage.getItem('LanguageID');
    this.showbit = 0;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];

    this.ActivatedRoute.params.subscribe(params => {
      this.ID = params['id'];

      if (this.ID == undefined) {

      }
      else {
        this.showbit = 1;
        this.getSubCategory()
      }




    });
    this.GetItemCategory()

  }


  public GetItemCategory() {
    this.MenuService.GetItemCategory().subscribe(
      data => {

        this.CategoryList = data;
      }, error => {
      }
    )
  }




  getSubCategory() {
    this.MenuService.GetSubcategory().subscribe(
      data => {

        let temp: any = data;
        this.SubcategoryLists = temp.filter((x: { subCatID: any; }) => x.subCatID == this.ID);
        this.MenuService.GetItemCategory().subscribe(
          data => {

            this.CategoryList = data;
          }, error => {
          }
        )
        this.CategoryID = this.SubcategoryLists[0].categoryID;
        this.SubcategoryName = this.SubcategoryLists[0].subacategoryName;
        this.Description = this.SubcategoryLists[0].description;

      }, error => {
      }
    )
  }

  attachmentsurl: any = []



  public InsertSubcategory() {
    this.showPopup = 0;
    let Entity = {
      'ItemCategoryID': this.CategoryID,
      'SubacategoryName': this.SubcategoryName,
      'Description': this.Description,
      'PhotoURL': this.attachmentsurl[0]
    }
    this.MenuService.InsertSubcategory(Entity).subscribe(data => {
      if (data != 0) {
        // Swal.fire('Saved Successfully');
        // location.href = '#/SubCategoryDash';
        this.showPopup = 1;
        this.messageID = 1;
        this.typeofPopUp = 1;
        location.href = '#/menus/SubCategorydash';
      }
    })
  }
  public UpdateSubcategory() {

    let Entity = {
      'ID': this.ID,
      'ItemCategoryID': this.CategoryID,
      'SubacategoryName': this.SubcategoryName,
      'Description': this.Description,
    }
    this.MenuService.UpdateSubcategory(Entity).subscribe(data => {
      if (data != 0) {
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
        // Swal.fire('Updated Successfully');
         location.href = '#/menus/SubCategorydash';
      }
    })
  }


  public GetCategoryID(evn: any) {

    this.CategoryID = evn.target.value;
  }




  files: File[] = [];

  loader: boolean | undefined

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
      this.attachmentsurl.push(res);
    });
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
