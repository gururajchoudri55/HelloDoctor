import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../Lables/Masters/Masterlabels.json';
import { MenuService } from '../../services/MenuServices/menu.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sub-categorydash',
  templateUrl: './sub-categorydash.component.html',
  styleUrls: ['./sub-categorydash.component.css']
})
export class SubCategorydashComponent implements OnInit {
  p: any;
  constructor(private MenuService: MenuService) { }

  public term: any;
  CategoryList: any;
  languageid: any;
  loader: boolean | undefined
  showbit: any;
  currentUrl: any;
  labels: any;
  typeofPopUp: any;
  showPopup: any;
  messageID: any;
  count: any;
  ngOnInit(): void {
    this.loader = true;
    this.showbit = 0;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.GetSubcategory()
  }


 



  SubcategoryLists: any;
  FilteredSubcategoryLists: any
  public GetSubcategory() {
    this.MenuService.GetSubcategory().subscribe(
      data => {
        this.loader = false;
        this.SubcategoryLists = data;
        this.FilteredSubcategoryLists = this.SubcategoryLists;
        this.count = this.SubcategoryLists.length
      }, error => {
      }
    )
  }



  CategoryID: any;
  public GetCategoryID(evn: any) {

    if (evn.target.value != 0) {
      this.CategoryID = evn.target.value;
      this.FilteredSubcategoryLists = this.SubcategoryLists.filter((x: { categoryID: any; }) => x.categoryID == this.CategoryID);
    }
    else {
      this.GetSubcategory();
    }
  }


  //Pagination
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


  public DeleteSubcategory(id:any) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Sub Category!",
      // type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.MenuService.DeleteSubcategory(id).subscribe(res => {
          let test = res;
          this.GetSubcategory();
        })
        Swal.fire(
          'Deleted!',
          'Subcategory has been deleted.',
          'success'
        )
      }
      else {
        this.GetSubcategory();
      }
    })
  }
}
