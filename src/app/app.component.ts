import { Component, HostListener } from '@angular/core';
import { ConnectionService } from 'ngx-connection-service';
import { Subject } from 'rxjs';
import { CommonService } from './Pages/services/common.service';
declare var window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Voiladoc"
  temp: any;
  hasNetworkConnection: boolean | undefined;
  hasInternetAccess: boolean | undefined;
  status: string | undefined;
  typeofPopUp: any;
  messageID: any;
  showPopup: any;
  showSidebar: any;
  timeoutId: any;
  userInactive: Subject<any> = new Subject();
  isMobileResolution: boolean | undefined;
  isDescktopResolution: boolean | undefined;
  errorModal: any;
  LanguageID:any;
  constructor(private connectionService: ConnectionService, private CommonService: CommonService) {
    this.checkTimeOut();
    this.userInactive.subscribe((message) => {
      // alert(message);
      console.log(message);
      this.logOut();
    }
    );
  }
  ngOnInit(): void {
    this.temp = sessionStorage.getItem('temp');
    this.LanguageID = sessionStorage.getItem('LanguageID');
    //Check Internet Connection
    this.connectionService.monitor().subscribe(currentState => {
      this.showPopup = 0;
      this.hasNetworkConnection = currentState.hasNetworkConnection;
      this.hasInternetAccess = currentState.hasInternetAccess;
      // && this.hasInternetAccess
      if (this.hasNetworkConnection) {
        this.status = 'ONLINE';
        console.log("Online", this.status);
      } else {
        this.status = 'OFFLINE';
        console.log("OFFLINE", this.status);
        this.showPopup = 1;
        this.messageID = 30;
        this.typeofPopUp = 2;
      }
    });
    

    if (window.innerWidth < 600) {
      this.isMobileResolution = true;
      this.isDescktopResolution = false;
      this.showSidebar = 0;
      setInterval(() => {
        this.showSidebar = sessionStorage.getItem('showSidebar');
      }, 1000);
    } else {
      this.isMobileResolution = false;
      this.isDescktopResolution = true;
      this.showSidebar = 1;
    }


    this.errorModal = new window.bootstrap.Modal(
      document.getElementById("errorModal")
    )

    if (this.temp == 1) {
      setInterval(() => {
        this.getserverdateandtime()
      }, 2000)

     
    }
  }
  showError: any;
  errlist: any;

  public getserverdateandtime() {

    this.CommonService.GetServerDateAndTime().subscribe(
      data => {
        this.errlist = data;

        this.showError = this.errlist.errorModal;

        if (this.showError == 1) {
          this.errorModal.show()
        }
        else {
          this.errorModal.hide()
        }

        // this.hours = this.dateList.hours,
        //   this.minutes = this.dateList.minutes,
        //   this.seconds = this.dateList.seconds
      }, error => {
      }
    )
  }


  // 1800000

  checkTimeOut() {
    this.timeoutId = setTimeout(
      () =>

        this.userInactive.next(
          "User has been inactive for 5 seconds"), 1800000
    );


  }

  @HostListener('window:keydown')
  @HostListener('window:mousedown')
  @HostListener('window:mouseover')



  checkUserActivity() {
    
    clearTimeout(this.timeoutId);
    this.checkTimeOut();
  }







  logOut() {
    let loginid = sessionStorage.getItem('loginid');
    if (loginid != undefined || loginid != null) {
      this.updateProvidersAuditReport()
    }
    else {


      alert("En raison de votre inactivité, la session a expiré. Veuillez vous reconnecter pour continuer");

      sessionStorage.clear()
      sessionStorage.clear()
      location.href = '#/login';
      location.reload();
    }

  }


  updateProvidersAuditReport() {
    this.CommonService.UpdateProvidersAuditReport(sessionStorage.getItem('loginid')).subscribe(data => {

      window.alert("En raison de votre inactivité, la session a expiré. Veuillez vous reconnecter pour continuer");

      sessionStorage.clear();
      sessionStorage.clear();
      location.href = "#/login";
      location.reload();

    })
  }



  @HostListener('window:unload', ['$event'])
        onPopState(event:any) {
          alert('Back button pressed');
        }
}




