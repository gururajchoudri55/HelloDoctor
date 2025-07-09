import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/Report/reportlabels.json';
import { CommonService } from 'src/app/Pages/services/common.service';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-user-role-mapping-details',
  templateUrl: './user-role-mapping-details.component.html',
  styleUrls: ['./user-role-mapping-details.component.css']
})
export class UserRoleMappingDetailsComponent implements OnInit {
  languageid: any;
  labels: any;
  id: any;
  showbutton: any;
  messageID: any;
  typeofPopUp: any;
  showPopup: any;
  loader: boolean | undefined

  currentUrl:any;
  public rolelist: any;
  public roleid: any;
  public firstname: any;
  public lastname: any;
  public phoneno: any;
  public email: any;
  public username: any;
  public password: any;
  public userlist: any;

  constructor(private activatedroute: ActivatedRoute, private CommonService: CommonService,private SharedService:SharedService ) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];

    this.activatedroute.params.subscribe(params => {

      this.id = params['id'];
      if (this.id == undefined) {
        this.showbutton = 0
      }
      else if (this.id != undefined) {
        this.showbutton = 1
        this.GetUserRoleList()
      }
    })
    this.roleid = 0;
    this.GetRoleMaster()
  }


  public GetRoleMaster() {
    this.CommonService.GetRoleTypesMasterByAdminLogins(this.languageid).subscribe(
      data => {
        this.loader=false;
        this.rolelist = data;
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetRoleTypesMasterByAdminLogins",error);
      }
    )
  }







  public GetRoleID(even: any) {
    
    this.roleid = even.target.value;
  }


  public userid: any;


  public InsertDetails() {
    this.showPopup = 0;
    this.password = Math.random().toString(36).slice(-8);
    
    if (this.roleid == "" || this.roleid == undefined) {
      this.showPopup = 1;
      this.messageID = 2;
      this.typeofPopUp = 2;
    }
    else {
      var entity = {
        'FirstName': this.firstname,
        'LastName': this.lastname,
        'PhoneNo': this.phoneno,
        'Email': this.email,
        'UserName': this.username,
        'Password': this.password,
        'RoleID': this.roleid
      }
      this.CommonService.InsertUsers_RoleMapping(entity).subscribe(data => {
        if (data != 0) {

          this.pinno = data;
          // this.GetuserRoles();
          this.sendmail();
          this.showPopup = 1;
          this.messageID = 1;
          this.typeofPopUp = 1;
          location.href = "#/menus/UserRoleMapping"

        }
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"InsertUsers_RoleMapping",error);
      })
    }
  }


  pinno: any;
  emailattchementurl = [];
  public doctorname: any;

  public sendmail() {

    var entity = {
      'emailto': this.email,
      'emailsubject': "Voiladoc",
      'emailbody': 'Dear ' + this.firstname + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Please use the below link to  login Voiladoc Platform ' + "<br><br>" + 'Link : https://maroc.voiladoc.org/' + "<br>" + 'Pin : ' + this.pinno + "<br>" + 'UserName :' + this.username + "<br>" + 'Password : ' + this.password + "<br><br>" + 'Dont Share Your Passwords to Anyone. For any further help. Please contact our support clients' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
      'attachmenturl': this.emailattchementurl,
      'cclist': 0,
      'bcclist': 0
    }
    this.CommonService.sendemail(entity).subscribe(data => {
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"sendemail",error);
    })
  }


  // public GetuserRoles() {
  //   this.docservice.GetUsers_RoleMapping(this.languageid).subscribe(
  //     data => {
  //       this.userlist = data;
  //       var list= this.userlist.filter(x=>x.)

  //     }, error => {
  //     }
  //   )
  // }



  public GetUserRoleList() {
    this.CommonService.GetUsers_RoleMapping(this.languageid).subscribe(
      data => {
        this.userlist = data;

        var list = this.userlist.filter((x: { id: any; }) => x.id == this.id)
        this.firstname = list[0].firstName,
          this.lastname = list[0].lastName,
          this.phoneno = list[0].phoneNo,
          this.email = list[0].email,
          this.email = list[0].email,
          this.username = list[0].userName,
          this.username = list[0].userName,
          this.password = list[0].password,
          this.roleid = list[0].roleID
          this.loader=false;
      }, error => {
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"GetUsers_RoleMapping",error);
      }
    )
  }






  public Updatedetails() {
    this.showPopup = 0;
    this.loader=true;
    if (this.roleid == "" || this.roleid == undefined) {
      this.showPopup = 1;
      this.messageID = 2;
      this.typeofPopUp = 2;
    }
    else {
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
      this.CommonService.UpdateUsers_RoleMapping(entity).subscribe(data => {

        this.showPopup = 1;
        this.messageID = 34;
        this.typeofPopUp = 1;
        location.href = "#/menus/UserRoleMapping"

      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"UpdateUsers_RoleMapping",error);
      })
    }
  }

  
  numberOnly(event: { which: any; keyCode: any; }): boolean {
    
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


  
  valid: boolean | undefined

  public isValidEmail(emailString: string): boolean {
    
    try {
      let pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
      this.valid = pattern.test(emailString);
      
      return this.valid;


    } catch (TypeError) {
      return false;
    }
  }









}
