import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Pages/services/common.service';
import { ActivatedRoute } from '@angular/router';
import Labels from '../../../../Lables/WorkingDetails/workinglabels.json';
@Component({
  selector: 'app-diagnostic-test-new',
  templateUrl: './diagnostic-test-new.component.html',
  styleUrls: ['./diagnostic-test-new.component.css']
})
export class DiagnosticTestNewComponent implements OnInit {
  testid:any;
  testlist:any;
  languageid:any;
  diagnosticid:any;
  id:any;
  dummlist:any;
  diagnosticname:any;
  price:any;
  description:any;
  testtype:any;
  showPopup:any;
  typeofPopUp:any;
  messageID:any;
  labels:any;

  constructor(private CommonService:CommonService,private ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.languageid = sessionStorage.getItem('LanguageID');
    this.diagnosticid = sessionStorage.getItem('diagnosticid')
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];

    this.ActivatedRoute.params.subscribe(params => {
     
      this.id = params['id'];
      this.getdiagnosticservices()
    }
    )


    this.getdiagnostictestmaster();
    this.testid="";
  }


  public getdiagnostictestmaster() {
   
    this.CommonService.GetDiagnosticTestMasterByLanguageID(this.languageid).subscribe(
      data => {
        this.testlist = data;
      }, error => {
      }
    )
  }



  public GetTestID(even:any) {
   
    this.testid = even.target.value;
  }



  public getdiagnosticservices() {
    this.CommonService.GetDiagnosticCenterTestsForDash(this.languageid).subscribe(
      data => {
        this.dummlist = data;
        var list = this.dummlist.filter((x: { id: any; }) => x.id == this.id)
        this.diagnosticname = list[0].diagnosticCenterName
        this.testid = list[0].diagnosticTestID,
          this.price = list[0].price,
          this.description = list[0].description,
          this.diagnosticid = list[0].diagnosticCenterID
          this.testtype=list[0].name
      }, error => {

      }
    )
  }

  public updatedetails() {
    this.showPopup=0;
    var entity = {
      'ID': this.id,
      'DiagnosticCenterID': this.diagnosticid,
      'DiagnosticTestID': this.testid,
      'Description': this.description,
      'Price': this.price
    }
    this.CommonService.UpdateDiagnosticCenterTests(entity).subscribe(data => {
     
      let res = data;
      this.showPopup=1;
      this.typeofPopUp=1;
      this.messageID=34;
      location.href = "#/countrymanager/DiagnosticTest";
  
    })

  }

}
