import { Component, OnInit } from '@angular/core';
import Labels from '../../../Lables/Masters/Masterlabels.json';
import { SharedService } from 'src/app/Pages/services/shared.service';
import { MasterService } from 'src/app/Pages/services/MasterServices/master.service';
@Component({
  selector: 'app-degree-masterdash',
  templateUrl: './degree-masterdash.component.html',
  styleUrls: ['./degree-masterdash.component.css']
})
export class DegreeMasterdashComponent implements OnInit {
  p: any;

  constructor(private MasterService: MasterService, private SharedService: SharedService) { }
  public labels: any;
  public languageid: any;
  count: any;
  public term: any;
  public degreelist: any;
  loader: boolean | undefined;
  typeofPopUp: any;
  showPopup: any;
  messageID: any;
  ngOnInit(): void {

    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];
    this.getdegreemaster()

  }




  public getdegreemaster() {

    this.MasterService.GetDegreeMasterBylanguageID(this.languageid).subscribe(
      data => {

        this.degreelist = data;
        this.count = this.degreelist.length;
      }, error => {
      }
    )
  }


  //Pagination
  public pageChanged(even: any) {

    let fgdgfgd = even;
    this.p = even;
  }


  delete(id: any) {
    this.showPopup = 0
    this.MasterService.DeleteDegreeMaster(id).subscribe(res => {
      let test = res;
      this.showPopup = 1;
      this, this.messageID = 75;
      this.typeofPopUp = 1;
      this.getdegreemaster()
    })
  }
}
