import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as OT from '@opentok/client';
import { Subscription } from 'rxjs';
import { OpentokService } from '../opentok.service';

const publish = () => {

};

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements AfterViewInit {

  @ViewChild('publisherDiv') publisherDiv: ElementRef | undefined | any;
  @Input() session: OT.Session | undefined | any;

  publisher: OT.Publisher | undefined;
  publishing: Boolean | undefined;


  cameraEvent: Subscription | undefined

  audio: any;
  video: any;
  constructor(private opentokService: OpentokService) {
    this.publishing = false;


    this.cameraEvent = this.opentokService.cameraEvent().subscribe((data) => {
      
      console.log("camera event");
      console.log(data)
      this.cameraControls(data)


    })
  }


  ngAfterViewInit(): void {
    const OT = this.opentokService.getOT();
    this.publisher = OT.initPublisher(this.publisherDiv.nativeElement, { insertMode: 'append', width: 180, height: 120, name: "Bob's stream", publishAudio: this.audio, publishVideo: this.video },);

    if (this.session) {
      if (this.session['isConnected']()) {
        this.publish();
      }
      this.session.on('sessionConnected', () => this.publish());
    }
  }


  publish() {
    this.session.publish(this.publisher, (err: any) => {
      if (err) {
        alert(err.message);
      } else {
        this.publishing = true;
      }
    });
  }

  ngOnInit(): void {
    this.audio = true;
    this.video = true;
  }




  cameraControls(data: any) {

    switch (data) {
      case 1:
        //vidoe tuen off
        this.publisher!.publishVideo(false);
        break;
      case 2:
        // audio off
        this.publisher!.publishAudio(false);
        break;
      case 3:
        //video on 
        this.publisher!.publishVideo(true);
        break;
      case 4:
        //audio on
        this.publisher!.publishAudio(true);
        break;

    }

    // if (data == 1) {
    //   //vidoe tuen off

    //   // this.publisher!.publishAudio(true);
    //   this.publisher!.publishVideo(false);
    // }
    // if (data == 2) {
    //   //Audio Turn Off
    //   // this.publisher!.publishAudio(true);
    //   this.publisher!.publishVideo(false);
    // }

  }
}
