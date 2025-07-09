import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as OT from '@opentok/client';
@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {
  @ViewChild('subscriberDiv') subscriberDiv: ElementRef | undefined | any;
  @Input() session: OT.Session | undefined | any;
  @Input() stream: OT.Stream | undefined;

  constructor() { }



  ngOnInit(): void {
    
  }


  ngAfterViewInit() {
    // { width:"118%",height:"750px"}

    
    const subscriber = this.session.subscribe(this.stream, this.subscriberDiv.nativeElement, { width: "100%", height: "95vh",nameDisplayMode: "off",buttonDisplayMode: 'on'}, (err: any) => {
      // subscriber.restrictFrameRate(true);
      if (err) {
        alert(err.message);
      }
      
      

    });
    subscriber.on("streamDestroyed", function (event: any) {

      console.log("Stream stopped. Reason: ");
    });

    // subscriber.on('videoDimensionsChanged', function (event: any) {
    //   subscriber.element.style.width = event.newValue.width + '700px';
    //   subscriber.element.style.height = event.newValue.height + '700px';
    //   // You may want to adjust other UI.
    // });

  }





}
