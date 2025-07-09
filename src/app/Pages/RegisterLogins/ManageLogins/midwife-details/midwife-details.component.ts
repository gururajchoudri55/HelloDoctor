import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../RegisterService/register.service';
import Labels from '../../../Lables/managelogins/managelabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';

@Component({
  selector: 'app-midwife-details',
  templateUrl: './midwife-details.component.html',
  styleUrls: ['./midwife-details.component.css']
})
export class MidwifeDetailsComponent implements OnInit {
  midewifeid: any;
  languageid: any;
  hospitalclinicid: any;
  midwifeList: any;
  middd: any;
  dummmidwifelist: any;
  showPopup: any;
  password: any;
  messageID: any;
  typeofPopUp: any;
  userName: any;
  labels: any;
  selecthospital: any;
  search:any;
  loader:boolean | undefined;
  currentUrl:any;


  constructor(private RegisterService: RegisterService,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    
    this.hospitalclinicid = sessionStorage.getItem('hospitalid');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.selecthospital = this.labels.selectHospital;
    this.search=this.labels.search;
    
    if (this.hospitalclinicid == undefined) {
      this.RegisterService.GetMidWivesRegistratingLogins(this.languageid).subscribe(
        data => {

          this.midwifeList = data;
          this.loader=false;
          this.middd = {
            singleSelection: true,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
            closeDropDownOnSelection: true
          };
        },
        error => {
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl,"GetMidWivesRegistratingLogins",error);
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.RegisterService.GetMidWivesRegistratingLogins(this.languageid).subscribe(
        data => {
          this.dummmidwifelist = data;
          this.midwifeList = this.dummmidwifelist.filter((x: { hospitalClinicID: any; }) => x.hospitalClinicID == this.hospitalclinicid)
          this.middd = {
            singleSelection: true,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search
          };
        }, error => {
          this.loader=false;
          this.SharedService.insertexceptions(this.currentUrl,"GetMidWivesRegistratingLogins",error);
        }
      )
    }
    
  }

  public Getmidewifeid(item: any) {

    this.midewifeid = item.id;
  }

  public save() {
    this.showPopup = 0;
   
    this.password=  this.RegisterService.generateRandomPassword();
    console.log("password",this.password);

    if (this.midewifeid == undefined) {
      this.showPopup = 1;
      this.messageID = 18;
      this.typeofPopUp = 2;
    }
    else {
      var entity = {
        'MidWiveID': this.midewifeid,
        'UserName': this.userName,
        'Password': this.password
      }
      this.RegisterService.InsertMidWivesLogin(entity).subscribe(data => {

        if (data != 0) {
          this.GetMidWivesLoginAdmin()
          this.showPopup = 1;
          this.messageID = 1;
          this.typeofPopUp = 1;
          location.href = "#/Registerlogins/MidwifeDash";
        }
        else {
          this.showPopup = 1;
          this.messageID = 1;
          this.typeofPopUp = 1;

        }
      },error=>{
        this.loader=false;
        this.SharedService.insertexceptions(this.currentUrl,"InsertMidWivesLogin",error);
      })

    }
  }

  midwifename:any;
  email:any;
  pinno:any;
  smsmobileno:any;

  public GetMidWivesLoginAdmin() {

    this.RegisterService.GetMidWivesLoginAdmin(this.languageid).subscribe(
      data => {

    
        var list =data.filter(x => x.midWiveID == this.midewifeid)
        this.midwifename = list[0].name,
          this.email = list[0].email,
          this.pinno = list[0].pinno,
          this.smsmobileno = list[0].smsmobileno
    
          this.SharedService.SendEmailSmsToProvider(
            this.pinno,
            this.userName,
            this.password,
            this.smsmobileno,
            this.email,
            this.midwifename
          );
      }, error => {
      }
    )
  }


}
