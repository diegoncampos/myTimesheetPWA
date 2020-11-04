import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-help-support',
  templateUrl: './help-support.page.html',
  styleUrls: ['./help-support.page.scss'],
})
export class HelpSupportPage implements OnInit {

  public options = [{text:'Add app to homescreen', active: false},{text:'Contact us', active: false}];
  public slideOpts = {
    initialSlide: 0,
    effect: 'cube',
    speed: 500,
    slidesPerView: 1,
    autoplay: true
  };
  public isIOS: boolean = false;
  public isAndroid: boolean = false;

  constructor(
    private platform: Platform
  ) { 
    this.isIOS = platform.is ('ios');
    this.isAndroid = platform.is ('android');
  }

  ngOnInit() {
  }

}
