import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { DiagnosticService } from 'src/app/Pages/services/diagnostic.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../Lables/diagnostic/diagnosticlabels.json'

@Component({
  selector: 'app-diagnostic-field-team-details',
  templateUrl: './diagnostic-field-team-details.component.html',
  styleUrls: ['./diagnostic-field-team-details.component.css']
})
export class DiagnosticFieldTeamDetailsComponent implements OnInit {
  languageid: any;
  showbit: any;
  id: any;
  myteamlist: any;
  name: any;
  phoneno: any;
  email: any;
  address: any;
  username: any;
  password: any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  loader:boolean | undefined;
  currentUrl:any;
  labels:any;
  

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
        this.GetMyTeam();
      }
    }
    )
    this.loader=false;
  }


  public GetMyTeam() {
    this.DiagnosticService.GetMyTeam(sessionStorage.getItem('diagnosticid')).subscribe(data => {
      this.myteamlist = data;
       var list = this.myteamlist.filter((x: { id: any; }) => x.id == this.id);
        this.name = list[0].name,
        this.phoneno = list[0].phoneNo,
        this.email = list[0].emailID,
        this.address = list[0].address,
        this.username = list[0].userName,
        this.password = list[0].password
        this.loader=false;
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"GetMyTeam",error);
    })
  }

  public InsertDetailes() {
    this.showPopup=0;
    var entity = {
        DiagnosticID: sessionStorage.getItem('diagnosticid'),
        Name: this.name,
        PhoneNo: this.phoneno,
        EmailID: this.email,
        Address: this.address,
        UserName: this.username,
        LanguageID:this.languageid,
        Password: this.password
    }
    this.loader=false;
    this.DiagnosticService.InsertMyTeam(entity).subscribe(res => {
            this.showPopup=1;
            this.messageID=11;
            this.typeofPopUp=1;
            location.href = "#/Diagnostic/DiagnosticFieldTeam";
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"InsertMyTeam",error);
    })
}


public UpdateDetailes() {
  this.showPopup=0;
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
  this.DiagnosticService.UpdateMyTeam(entity).subscribe(res => {
          this.showPopup=1;
          this.messageID=34;
          this.typeofPopUp=1;
          location.href = "#/Diagnostic/DiagnosticFieldTeam";
  },error=>{
    this.SharedService.insertexceptions(this.currentUrl,"UpdateMyTeam",error);
  })
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
