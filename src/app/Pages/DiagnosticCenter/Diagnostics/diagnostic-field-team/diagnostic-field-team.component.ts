import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { DiagnosticService } from 'src/app/Pages/services/diagnostic.service';
import Labels from '../../../Lables/diagnostic/diagnosticlabels.json';

@Component({
  selector: 'app-diagnostic-field-team',
  templateUrl: './diagnostic-field-team.component.html',
  styleUrls: ['./diagnostic-field-team.component.css']
})
export class DiagnosticFieldTeamComponent implements OnInit {
  p:any;
  languageid:any;
  currentpwd:any;
  pinno:any;
  myteamlist:any;
  count:any;
  loader:boolean | undefined;
  currentUrl:any;
   search:any;
   showPopup:any;
   messageID:any;
   typeofPopUp:any;
   oldpassword:any;
   mypinno:any;
   firstname:any;
   lastname:any;
   phoneno:any;
   email:any;
   roleid:any;
   Showpassword:any;
   name:any;
   address:any;
   Enteredpinno:any;
   entercurrentpwd:any;
   password:any;
   pp:any;
   id:any;
   username:any;
   labels:any;

  constructor(private DiagnosticService:DiagnosticService,private SharedService:SharedService ) { }

  ngOnInit(): void {
    this.loader=true;
    this.currentUrl=window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.currentpwd = sessionStorage.getItem('Password');
    this.pinno = sessionStorage.getItem('Pinno');
    this.currentpwd = sessionStorage.getItem('Password');
    this.GetMyTeam();
  }


  public GetMyTeam() {
    this.DiagnosticService.GetMyTeam(sessionStorage.getItem('diagnosticid')).subscribe(data => {
      this.myteamlist = data;
      this.count = this.myteamlist.length;
      this.loader=false;
    },error=>{
      this.SharedService.insertexceptions(this.currentUrl,"GetMyTeam",error);
    })
  }




    // Pagination
    public pageChanged(even: any) {
      let fgdgfgd = even;
      this.p = even;
    }



      //TO  Enable

  public Enable(id: any) {
    this.showPopup = 0;
    this.DiagnosticService.DeleteMyTeam(id, 2).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 23;
        this.typeofPopUp = 1;
        this.GetMyTeam();
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"DeleteMyTeam",error);
      }
    )
  }

   
  //disable

  public Delete(id:any) {
    this.showPopup = 0;
    this.DiagnosticService.DeleteMyTeam(id,1).subscribe(
      data => {
        this.showPopup = 1;
        this.messageID = 24;
        this.typeofPopUp = 1;
        this.GetMyTeam();
      }, error => {
        this.SharedService.insertexceptions(this.currentUrl,"DeleteMyTeam",error);
      }
    )
  }

  


  
  //Checkpassword
  
    public CheckPasswordvalidate() {
    if (this.Enteredpinno == "" || this.entercurrentpwd == "") {
      this.entercurrentpwd = "";
      this.Enteredpinno = "";
      this.showPopup = 1;
      this.messageID = 26;
      this.typeofPopUp = 2;
    }
    else {
      if (this.pinno == this.Enteredpinno && this.currentpwd == this.entercurrentpwd) {
        this.Showpassword = 1;
        this.Enteredpinno = ""
        this.entercurrentpwd = "";
      }
      else{      
        this.showPopup = 1;
        this.messageID = 27;
        this.typeofPopUp = 2;
      }
    }
  }
  


  


  
    //Update Details
  
    public insertdetails() {
      
      this.showPopup = 0;
      if (this.password != undefined) {
        var valpassword = this.DiagnosticService.strongpassword(this.password);
        if (valpassword == false) {
          this.pp = 1;
        }
        else {
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
          this.username = '';
          this.password = '';
          this.DiagnosticService.UpdateMyTeam(entity).subscribe(data => {
            this.pp = 0;
            this.showPopup = 1;
            this.messageID = 25;
            this.typeofPopUp = 1;

          },error=>{
            this.SharedService.insertexceptions(this.currentUrl,"UpdateMyTeam",error);
          })
        }
      }
    }
  




  

  public getpassword(details:any) {
    this.oldpassword = details.password,
      this.mypinno = details.pinno,
      this.id = details.id

    this.DiagnosticService.GetMyTeam(sessionStorage.getItem('diagnosticid')).subscribe(data => {
      this.myteamlist = data;
      var list = this.myteamlist.filter((x: { id: any; }) => x.id == this.id);
        this.name = list[0].name,
        this.phoneno = list[0].phoneNo,
        this.email = list[0].emailID,
        this.address = list[0].address,
        this.username = list[0].userName
        // this.password = list[0].password
    })
    this.Showpassword = 0;

  }

  edit (id:any){
    location.href="#/Diagnostic/DiagnosticFieldTeamDetails/" +btoa(id);
  }

}
