import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent implements OnInit {



  getExceptionEvent: Subscription | undefined
  languageID: any;
  smsMobileNo: any;
  smsDesc: any;

  constructor(private SharedService: SharedService, private CommonService: CommonService) {
    this.getExceptionEvent = this.SharedService.getExceptionEvent().subscribe((data) => {
      
      console.log(data);
      this.exception(data);
      // this.SharedService.ngOnDestroy()
    })

  }

  ngOnInit(): void {
    this.languageID = sessionStorage.getItem('LanguageID');
  }


  exception(data: any) {

    return true;
    
    // this.CommonService.InsertApplicationExceptions(data).subscribe(data => {
    //   
    //   // alert("Exception Saved")
    // }, error => {

    // })
  }










}




