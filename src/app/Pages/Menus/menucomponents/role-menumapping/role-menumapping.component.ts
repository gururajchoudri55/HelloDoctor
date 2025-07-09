import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Labels from '../../../Lables/Report/reportlabels.json';
@Component({
  selector: 'app-role-menumapping',
  templateUrl: './role-menumapping.component.html',
  styleUrls: ['./role-menumapping.component.css']
})
export class RoleMenumappingComponent implements OnInit {

 
  menuid: any;
  showdash: any;
  currentUrl: any;
  languageid: any;
  submenulist: any;
  Menulist: any;
  menudd = {};
  rolelist: any;
  roleid: any;
  id: any;
  showbutton: any;
  RoleMappinglist: any;
  submenuid: any;
  menuname: any;
  menusarray: any[] = [];

  savedlist: any[] = [];
  dummarray: any[] = [];

  constructor(private MenuService: MenuService, private SharedService: SharedService, private activatedroute: ActivatedRoute) { }
  showPopup: any;
  messageID: any;
  typeofPopUp: any;
  labels: any;
  ngOnInit(): void {
    
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem("LanguageID");
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.roleid = 0
    this.GetMenuMaster();
    this.GetRoleMaster();
    this.activatedroute.params.subscribe(params => {
      ;
      this.id = (params['id'] != undefined) ? atob(params['id']) : undefined;
      if (this.id == undefined) {
        this.showbutton = 0
      }
      else if (this.id != undefined) {
        this.showbutton = 1
      }
      this.menumapping();

    }
    )
  }
  public GetMenuID(item: any) {
    ;
    this.menuid = item.id
    this.GetSubmenuMater();
    this.showdash = 1
  }
  public GetSubmenuMater() {
    
    this.MenuService.GetSubMenuMaster(this.languageid, this.menuid).subscribe(
      data => {
        ;
        this.submenulist = data;
        for (let i = 0; i < this.submenulist.length; i++) {
          let ggff = this.RoleMappinglist.filter((x: {
            roleID: any;
            menuID: any; submenuID: any;
          }) => x.submenuID == this.submenulist[i].id && x.menuID == this.submenulist[i].menuID && x.roleID == this.roleid);

          if (ggff.length > 0) {

            this.submenulist[i]["isChecked"] = true;
          }
          else {
            this.submenulist[i]["isChecked"] = false;
          }
        }
      }, error => {
      }
    )
    this.showdash = 1
  }
  public GetMenuMaster() {
    ;
    this.MenuService.GetMenuMaster(this.languageid).subscribe(
      data => {

        this.Menulist = data;
        this.menudd = {
          singleSelection: true,
          idField: 'id',
          textField: 'menus',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          enableCheckAll: false

          /*   singleSelection: true,
          idField: 'id',
          textField: 'regionName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search */
        };
      }, error => {
      }
    )
  }

  public GetRoleMaster() {
    this.MenuService.GetRoleTypesMasterByAdminLogins(this.languageid).subscribe(
      data => {

        this.rolelist = data;
      }, error => {
      }
    )
  }

  public GetRoleID(even: any) {
    this.roleid = even.target.value;
  }

  public InsertSaveMenus() {
    ;
    for (let i = 0; i < this.menusarray.length; i++) {
      var entity = {
        'RoleID': this.roleid,
        'MenuID': this.menusarray[i].menuID,
        'SubmenuID': this.menusarray[i].id
      }
      this.dummarray.push(entity)

    }
    this.MenuService.InsertMenuRoleMappingTable(this.dummarray).subscribe(data => {
      if (data != 0) {
        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
        location.href = "#/menus/RoleMenumappingDetails"
      }
    })
  }

  updatedummarray: any = [];

  public UpdateMenunus() {
    
    // this.MenuService.DeleteMenuRoleMappingTable(this.roleid, this.menuid).subscribe(data => {
    // })
    let deletelist = [];
    let savelist = []
    if (this.updatedummarray.length > 0) {
      for (let i = 0; i < this.updatedummarray.length; i++) {
        var entity = {
          'RoleID': this.roleid,
          'MenuID': this.updatedummarray[i].menuID,
          'SubmenuID': this.updatedummarray[i].submenuID
        }
        deletelist.push(entity);
      }
      this.MenuService.DisableMenuRoleMappingTable(deletelist).subscribe(data => {
        if (data != 0) {
          // Swal.fire('Updated Successfully');
          ///location.href = "#/RolemenuDash"
          this.showPopup = 1;
          this.messageID = 34;
          this.typeofPopUp = 1;
        }
      })
    }
    else {
      for (let i = 0; i < this.savedlist.length; i++) {
        var entity = {
          'RoleID': this.roleid,
          'MenuID': this.savedlist[i].menuID,
          'SubmenuID': this.savedlist[i].submenuID
        }
        savelist.push(entity);
      }
      this.MenuService.EnableMenuRoleMappingTable(savelist).subscribe(data => {
        if (data != 0) {
          this.showPopup = 1;
          this.messageID = 34;
          this.typeofPopUp = 1;
          ///location.href = "#/RolemenuDash"
        }
      })
    }

  }

  public GetSavedList(even: any, list: any) {
    
    if (even.target.checked == true) {
      this.savedlist.push(list);
    }
    else if (even.target.checked == false) {
      this.updatedummarray.push(list);
      //this.savedlist.splice(this.savedlist.indexOf(list), 1);
      // list.selected=0;
    }
  }

  public GetMenuslist(even: any, list: any) {
    
    if (even.target.checked == true) {
      this.menusarray.push(list)
    }
    else if (even.target.checked == false) {

      this.menusarray.splice(this.menusarray.indexOf(list), 1);
      // list.selected=0;
    }
  }

  public menumapping() {
    this.MenuService.GetMenuRoleMappingTable(this.languageid).subscribe(
      data => {
        this.RoleMappinglist = data;
        ;
        let list = this.RoleMappinglist.filter((x: { id: any; }) => x.id == this.id)
        this.menuid = list[0].menuID,
          this.roleid = list[0].roleID,
          this.submenuid = list[0].submenuID,
          this.menuname = list[0].menus


        this.menusarray = list;
        this.MenuService.GetSubMenuMaster(this.languageid, this.menuid).subscribe(
          data => {
            ;
            this.submenulist = data;
            for (let i = 0; i < this.submenulist.length; i++) {
              let ggff = this.RoleMappinglist.filter((x: {
                roleID: any;
                menuID: any; submenuID: any;
              }) => x.submenuID == this.submenulist[i].id && x.menuID == this.submenulist[i].menuID && x.roleID == this.roleid);

              if (ggff.length > 0) {

                this.submenulist[i]["isChecked"] = true;
                // var entity1 = {
                //   'RoleID': this.roleid,
                //   'menuID': this.submenulist[i].menuID,
                //   'submenuID': this.submenulist[i].id
                // }
                // this.savedlist.push(entity1)
              }
              else {
                this.submenulist[i]["isChecked"] = false;
              }
            }
          }, error => {
          }
        )
        this.showdash = 1


      }, error => {
      }
    )
  }


}
