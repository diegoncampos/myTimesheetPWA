import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SwUpdate } from '@angular/service-worker';
import { NotificationsService } from './services/notifications.service';

import { AuthenticationService } from "../app/services/authentication-service.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public user = {email: 'user@email.com'};
  public appPages = [
    {
      title: 'My Timesheet',
      url: '/home',
      icon: 'timer',
      action: 'selectedIndex = i'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'information-circle',
      action: 'selectedIndex = i'
    },
    {
      title: 'Log Out',
      url: '/home',
      icon: 'log-out'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public updates:SwUpdate,
    private notificationsService: NotificationsService,
    public authService: AuthenticationService,
    public router: Router, 
  ) {
    this.initializeApp();

    // Update PWA
    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => this.updateApp());
    });
  }

  updateApp() {
    document.location.reload();
    console.log("The app is updating right now");
    this.notificationsService.showMessage("Updating App", 5000)

  }
   //end

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    let info = JSON.parse(localStorage.getItem("user"));
    this.user.email = info? info.email: '';
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  exitApp() {
    this.authService.SignOut().then( () => {
      this.user.email = 'user@email.com';
      this.router.navigate(['login']);
    })
    
  }
}
