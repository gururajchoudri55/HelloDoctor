import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { DiagnosticService } from 'src/app/Pages/services/diagnostic.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/diagnostic/diagnosticlabels.json'

@Component({
  selector: 'app-diagnostic-receptionist-login-details',
  templateUrl: './diagnostic-receptionist-login-details.component.html',
  styleUrls: ['./diagnostic-receptionist-login-details.component.css']
})
export class DiagnosticReceptionistLoginDetailsComponent implements OnInit {
  languageid: any;
  id: any;
  showbit: any;
  receptionistlist: any;
  name:any;
  phoneno:any;
  email:any;
  address:any;
  password:any;
  username:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  pinno:any;
  loader:boolean | undefined;
   currentUrl:any;
   labels:any;
   countryCode: any = 0;
   countryCodeList:any=[];
   
  
  constructor(private DiagnosticService: DiagnosticService, private SharedService: SharedService,
    private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.ActivatedRoute.params.subscribe(params => {
      this.showbit = 0;
      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.showbit = 1;
        this.id = atob(this.id);
        this.GetDiagnosticReceptionistLogin();

      }
    }
    )
    this.loader=false;
    this.getCountryCodeNew()
  }

  getCountryCodeNew() {
    this.DiagnosticService.GetCountryCodeMasterWeb().subscribe(data => {
      this.countryCodeList = data;
    }, error => {
      console.log(error)
    })
  }



  public GetDiagnosticReceptionistLogin() {
    this.DiagnosticService.GetDiagnosticReceptionistLogin(sessionStorage.getItem('diagnosticid')).subscribe(data => {
      this.receptionistlist = data;
      var list = this.receptionistlist.filter((x: { id: any; }) => x.id == this.id);
       this.name = list[0].name,
        this.phoneno = list[0].phoneNo,
        this.email = list[0].email,
        this.address = list[0].address,
        this.username = list[0].userName,
        this.password = list[0].password
        this.loader=false;
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"GetDiagnosticReceptionistLogin",error);
      this.loader=false;
    })
  }

  public InsertDetailes() {
    
    this.password = Math.random().toString(36).slice(-8);
    this.showPopup=0;   
    var entity = {
        DiagnosticID: sessionStorage.getItem('diagnosticid'),
        Name: this.name,
        PhoneNo: this.phoneno,
        EmailID: this.email,
        Address: this.address,
        UserName: this.username,
        Password: this.password
    }
    this.DiagnosticService.InsertDiagnosticReceptionistLogin(entity).subscribe(res => {
            this.pinno=res;
            this.showPopup=1;
            this.messageID=11;
            this.typeofPopUp=1;
            this.sendmail()
            location.href = "#/Diagnostic/DiagnosticReceptionistLogin";
    } ,error=>{
      this.SharedService.insertexceptions(this.currentUrl,"InsertDiagnosticReceptionistLogin",error);
      this.loader=false;
    })
}

public UpdateDetailes() {
    
  var entity = {
      ID: this.id,
      DiagnosticID: sessionStorage.getItem('diagnosticid'),
      Name: this.name,
      PhoneNo: this.phoneno,
      EmailID: this.email,
      Address: this.address,
      UserName: this.username,
      Password: this.password
  }
  this.DiagnosticService.UpdateDiagnosticReceptionistLogin(entity).subscribe(res => {
    this.showPopup=1;
    this.typeofPopUp=1;
    this.messageID=34;
    location.href = "#/Diagnostic/DiagnosticReceptionistLogin";
  },error=>{
    this.SharedService.insertexceptions(this.currentUrl,"UpdateDiagnosticReceptionistLogin",error);
    this.loader=false;
  })
}



getCountryCode(even: any) {
  this.countryCode = even.target.value;
}



preventHospitalnoZero(even: any) {
  
  this.showPopup = 0;
  var no = even.split();
  if (no.length >= 1) {
    if (no[0] == '0') {
      this.phoneno = ""
      this.typeofPopUp = 2;
      this.messageID = 84;
      this.showPopup = 1;
    }

  }


}


sendmail() {
  this.showPopup = 0;
  let smsNumber = this.countryCode + '' + this.phoneno;
  console.log(smsNumber);
  this.SharedService.SendEmailSmsToProvider(
    this.pinno,
    this.username,
    this.password,
    smsNumber,
    this.email,
    this.name
  );

}
}
