import { Component, OnInit } from '@angular/core';
import Labels from '../../Lables/Login/loginlabels.json'
@Component({
  selector: 'app-intensive-loader',
  templateUrl: './intensive-loader.component.html',
  styleUrls: ['./intensive-loader.component.css']
})
export class IntensiveLoaderComponent implements OnInit {

  constructor() { }


  

  ModalText:any = [];
  loader1: boolean | undefined;
  loader2: boolean | undefined;
  loader3: boolean | undefined;
  languageid: any;
  labels: any;
  ngOnInit(): void {
    this.languageid = sessionStorage.getItem('LanguageID');
    this.labels = this.languageid == 1 ? Labels["en"][0] : Labels["fr"][0];

    
    this.ModalText = [
      {
        "title1": 'We are fetching your calendar',
        'Subtitle1': 'Location is an important factor!',
        'title2': 'Searching records,Just a moment',
        'Subtitle2': 'We’re finding stats to help you save!',
        'title3': 'Compiling data',
        'Subtitle3': 'One moment please. Available soon'
      }]
    this.loader1 = false;
    this.loader2 = false;
    this.loader3 = false;


    // document.getElementById('errorModal').style.display = 'block';
    // document.getElementById('loader_id').style.filter = 'blur(10px)';
    
  
    setTimeout(() => {
      this.loader1 = true;
      setTimeout(() => {
        this.loader2 = true;
      },180000);
    }, 3000);


  }

}
