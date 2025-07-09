import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../RegisterService/register.service';
import Labels from '../../../Lables/managelogins/managelabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';


@Component({
  selector: 'app-diagnostic-details',
  templateUrl: './diagnostic-details.component.html',
  styleUrls: ['./diagnostic-details.component.css']
})
export class DiagnosticDetailsComponent implements OnInit {
  
  constructor(private RegisterService:RegisterService,private SharedService:SharedService ) { }
  diadd:any;
  languageID:any;
  diagnosticList:any;
  diagnosticid:any;
  diagnoticloginList:any;
  DiagnosticCenterID:any;
  userName:any;
  showPopup:any;
  password:any;
  messageID:any;
  typeofPopUp:any;
  labels:any;
  selectdiagnostic:any;
  search:any;
  currentUrl:any;

  diagnosticname:any;
  pinno:any;
  email:any;
  smsmobileno:any;
  ngOnInit(): void {
    this.currentUrl=window.location.href;
    this.languageID = sessionStorage.getItem('LanguageID');
    this.labels = this.languageID == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.selectdiagnostic=this.labels.selectDiagnosticCenter;
    this.search=this.labels.search
    this.RegisterService.GetDiagnosticCenterListByLanguageID(this.languageID).subscribe(
      data => {

        this.diagnosticList = data;
        this.diadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'diagnosticCenterName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search
        };
      }, error => {
         this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticCenterListByLanguageID",error);
      }
    )
  }


  public GetDiagnosticID(item1: any) {

    this.diagnosticid = item1.id;
  }



  public insertDetails() {
    this.showPopup = 0;
    this.password=  this.RegisterService.generateRandomPassword();
    console.log("password",this.password);

    if (this.diagnosticid == undefined) {
      this.showPopup = 1;
      this.messageID = 17;
      this.typeofPopUp = 2;
    }
    else {
      var entity = {
        'DiagnosticCenterID': this.diagnosticid,
        'UserName': this.userName,
        'Password': this.password
      }
      this.RegisterService.InsertDiagnosticCenterAdminRegistration(entity).subscribe(data => {
        if (data != 0) {
          this.getdiagnosticloginfordash()
          this.showPopup = 1;
          this.messageID = 1;
          this.typeofPopUp = 1;

          location.href="#/Registerlogins/DiagnosticDash";
          
        }
        else {
          this.showPopup = 1;
          this.messageID = 15;
          this.typeofPopUp = 2;
        }
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"InsertDiagnosticCenterAdminRegistration",error);
      })

    }
  }


  public getdiagnosticloginfordash() {
    
    this.RegisterService.GetDiagnosticLoginForDash(this.languageID).subscribe(
      data => {
        
       

        var list = data.filter(x => x.diagnosticCenterID == this.diagnosticid)
        this.diagnosticname = list[0].diagnosticCenterName,
          this.pinno = list[0].pinno,
          this.email = list[0].emailID
          this.smsmobileno = list[0].smsmobileno

          this.SharedService.SendEmailSmsToProvider(
            this.pinno,
            this.userName,
            this.password,
            this.smsmobileno,
            this.email,
            this.diagnosticname
          );

      }, error => {
      }
    )
  }




}
