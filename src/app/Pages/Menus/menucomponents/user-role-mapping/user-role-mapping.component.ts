import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/Pages/services/MenuServices/menu.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/Report/reportlabels.json';


@Component({
  selector: 'app-user-role-mapping',
  templateUrl: './user-role-mapping.component.html',
  styleUrls: ['./user-role-mapping.component.css']
})
export class UserRoleMappingComponent implements OnInit {
  languageid: any;
  pinno: any;
  currentpwd: any;
  countryid: any;
  showadd: any;
  userList: any;
  count: any;
  p: any;
  currentUrl: any;
  search: any;
  loader: boolean | undefined;
  Enteredpinno: any;
  entercurrentpwd: any;
  Showpassword: any;
  showPopup: any;
  messageID: any;
  typeofPopUp: any
  id: any;
  firstname: any;
  lastname: any;
  phoneno: any;
  email: any;
  username: any;
  password: any;
  roleid: any;
  oldpassword: any;
  mypinno: any;
  pp: any;
  labels: any;


  constructor(private MenuService: MenuService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.pinno = sessionStorage.getItem('Pinno');
    this.currentpwd = sessionStorage.getItem('Password');
    this.countryid = sessionStorage.getItem('Commacountryid');
    if (this.countryid == undefined) {
      this.showadd = 1;
    }
    else {
      this.showadd = 2;
    }

    this.GetUserRoleList();

  }


  //GetUserRoleList

  public GetUserRoleList() {
    if (this.countryid == undefined) {
      this.MenuService.GetUsers_RoleMapping(this.languageid).subscribe(
        data => {
          this.loader = false;
          this.userList = data;
          this.count = this.userList.length;
        }, error => {
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl, "GetUsers_RoleMapping", error);
        }
      )
    }
    else {
      this.MenuService.GetUsers_RoleMapping(this.languageid).subscribe(
        data => {
          this.loader = false;
          var list = data;
          this.userList = list.filter(x => x.id == this.countryid)
        }, error => {
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl, "GetUsers_RoleMapping", error);
        }
      )
    }

  }


  //Pagination

  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }

  //Delete User Role Mapping

  public DeleteUsers_RoleMapping(id: any) {
    
    Swal.fire({
      title: this.labels.title,
      text: this.labels.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.labels.confirmButtonText,
      cancelButtonText: this.labels.cancelButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        this.MenuService.DeleteUsers_RoleMapping(id).subscribe(res => {
          let test = res;
          this.ngOnInit()
        })
       this.showPopup=1;
       this.messageID=75;
       this.typeofPopUp=1;
      }
    },error=>{
      this.loader=false;
      this.SharedService.insertexceptions(this.currentUrl,"DeleteUsers_RoleMapping",error);
    })
  }


  //Check Password

  public CheckPasswordvalidate() {
    this.showPopup = 0;
    if (this.Enteredpinno == "" || this.entercurrentpwd == "") {
      if (this.languageid == 1) {
        this.showPopup = 1;
        this.messageID = 26;
        this.typeofPopUp = 2;
        this.entercurrentpwd = "";
        this.Enteredpinno = "";
      }
    }
    else {
      
      this.showPopup = 0;
      if (this.pinno == this.Enteredpinno && this.currentpwd == this.entercurrentpwd) {
        this.Showpassword = 1;
        this.Enteredpinno = ""
        this.entercurrentpwd = "";
        
      }
      else {

        if (this.languageid == 1) {
          this.showPopup = 1;
          this.messageID = 27;
          this.typeofPopUp = 2;
        }
      }
    }
  }

  //Update Details

  public Updatedetails() {

    var entity = {
      'ID': this.id,
      'FirstName': this.firstname,
      'LastName': this.lastname,
      'PhoneNo': this.phoneno,
      'Email': this.email,
      'UserName': this.username,
      'Password': this.password,
      'RoleID': this.roleid
    }
    this.MenuService.UpdateUsers_RoleMapping(entity).subscribe(data => {
      this.showPopup = 1;
      this.messageID = 34;
      this.typeofPopUp = 1;
    },error=>{
      this.loader=false;
      this.SharedService.insertexceptions(this.currentUrl,"UpdateUsers_RoleMapping",error);
    })

  }

  //Get Password
  public getpassword(details: any) {
    this.oldpassword = details.password,
      this.mypinno = details.pinno,
      this.id = details.id,
      this.firstname = details.firstName,
      this.lastname = details.lastName,
      this.phoneno = details.phoneNo,
      this.email = details.email,
      this.username = details.userName,
      this.roleid = details.roleID
      this.Showpassword = 0;
  }



  edit(id: any) {
    location.href = "#/menus/UserRoleMappingDetails/" + id

  }
}