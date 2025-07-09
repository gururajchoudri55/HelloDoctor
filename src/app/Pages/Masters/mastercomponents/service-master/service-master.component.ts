import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
import { SharedService } from 'src/app/Pages/services/shared.service';
import Swal from 'sweetalert2';
import Labels from '../../../Lables/Masters/Masterlabels.json';

@Component({
  selector: 'app-service-master',
  templateUrl: './service-master.component.html',
  styleUrls: ['./service-master.component.css']
})
export class ServiceMasterComponent implements OnInit {
  languageid: any;
  loader: boolean | undefined;
  currentUrl: any;
  serviceList: any;
  count: any;
  search: any;
  p: any;
  labels:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;





  constructor(private MasterService: MasterService, private SharedService: SharedService) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.GetServicemaster();
  }

    //Get Service Master

    public GetServicemaster() {
      this.MasterService.GetServiceMasterWeb(this.languageid).subscribe(
        data => {
          this.loader=false;
          this.serviceList = data;
          this.count = this.serviceList.length;
        }, error => {
          this.SharedService.insertexceptions(this.currentUrl, "GetServiceMasterWeb", error);
        }
      )
    }
  
  
    //Pagination
    public pageChanged(even: any) {
      let fgdgfgd = even;
      this.p = even;
    }
  
  
  
    //Delete Service
    public DeleteServiceMaster(id: any) {
      
      Swal.fire({
        title:this.labels.title,
        text:this.labels.text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText:this.labels.confirmButtonText,
        cancelButtonText:this.labels.cancelButtonText
      }).then((result) => {
        if (result.isConfirmed) {
          this.MasterService.DeleteServiceMaster(id).subscribe(res => {
            let test = res;
            this.ngOnInit();
          })
           this.showPopup=1;
           this.typeofPopUp=1;
           this.messageID=75;
        }
      },error=>{
        this.SharedService.insertexceptions(this.currentUrl,"DeleteServiceMaster",error);
      })
    }
  
   //Page Redirection 
   edit(id:any){
     location.href="#/Masters/ServiceMasterDetails/" + btoa(id);
   }

}
