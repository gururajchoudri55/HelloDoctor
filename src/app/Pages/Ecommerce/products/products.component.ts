import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../Lables/Masters/Masterlabels.json';
import { MenuService } from '../../services/MenuServices/menu.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private MenuService: MenuService, private ActivatedRoute: ActivatedRoute) { }
  languageid: any;
  showbit: any;
  currentUrl: any;
  labels: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  ID: any;
  CategoryID: any;
  loader:boolean | undefined
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
        // this.getSubCategory()
      }




    });

    this.GetItemCategory()
  }

  CategoryList: any;

  public GetItemCategory() {
    this.MenuService.GetItemCategory().subscribe(
      data => {

        this.CategoryList = data;
      }, error => {
      }
    )
  }




  SubcategoryID: any;
  productname: any;
  productDescription: any;
  productCode: any;
  productprice: any;
  attachmentsurl:any=[];
  insertdetail() {
    let entity = {
      productname: this.productname,
      CategoryID: this.CategoryID,
      SubcategoryID: this.SubcategoryID,
      productDescription: this.productDescription,
      ProductCode: this.productCode,
      productprice: this.productprice,
      Quantity: 10,
      photourl: 'NULL'
    };

    this.MenuService.insertItems(entity).subscribe(data => {
      if (data >= 0) {

        this.inserthspphotos(data);
        location.href = '#/ItemMaster';
        //this._router.navigate(['/ItemMaster']);
      }
      else {
        alert("something went wrong");
      }
    })
  }
  Categorylist:any;
  Subcategorylist:any;

  getCategory() {

    this.MenuService.GetItemCategory().subscribe(data => {

      this.Categorylist = data;
    })
  }

  getCategoryID(eve:any) {
    let cid = eve.target.value

    this.MenuService.GetsubcategoryByCategoryID(cid).subscribe(data => {
      this.Subcategorylist = data;
    })
  }




  public inserthspphotos(ID:any) {

    for (let i = 0; i < this.attachmentsurl.length; i++) {
      let entity = {
        'ItemsID': ID,
        'PhotoUrl': this.attachmentsurl[i]
      }
      this.MenuService.Insert_ItemPhotos(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    let Entity = {
      'ID': ID,
      'PhotoURL': this.attachmentsurl[0]
    }

    this.MenuService.UpdateProductImages(Entity).subscribe(data => {

      // if (data != 0) {
      //   Swal.fire('Saved Sucessfully')
      // }
    })
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

  public GetCategoryID(evn: any) {

    this.CategoryID = evn.target.value;
    this.MenuService.GetsubcategoryByCategoryID(this.CategoryID).subscribe(data => {
      this.Subcategorylist = data;
    })
  }



  
  Updatedetail() {
  
    let entity = {
      'ID': this.ID,
      'ProductName': this.productname,
      'ProductDescription': this.productDescription,
      'ProductCode': this.productCode,
      'ProductPrice': this.productprice,
      'CategoryID': this.CategoryID,
      'SubcategoryID': this.SubcategoryID,
    };
    this.MenuService.UpdateProducts(entity).subscribe(data => {
      
      // Swal.fire('Updated Successfully');
      location.href = '#/ItemMaster';
      // if (data != 0) {
      
      // }
    })
  }
}
