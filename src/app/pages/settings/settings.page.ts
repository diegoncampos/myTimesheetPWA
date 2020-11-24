import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UserService } from 'src/app/services/user.service';
import { Settings } from 'src/app/models/settings';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public settings:Settings = {hourlyRate: 0, prodRate: 0, showRates: false, offlineMode: false};
  private userUid;

  constructor(
    private userService: UserService,
    private notificationsService: NotificationsService,
    public router: Router,
  ) { }

  ngOnInit() {
    let set = localStorage.getItem('userSettings');
    if (typeof set !== 'undefined' && set) {
      this.settings = JSON.parse(set);
    }
    this.userUid = JSON.parse(localStorage.getItem('user')).uid;
  }

  saveRates() {
    this.userService.setSettings(this.userUid, this.settings).then( res => {
      this.notificationsService.showMessage("Settings saved.");
      this.router.navigate(['home']);
    })
    .catch (err => this.notificationsService.showMessage("Fail saving settings."))
  }

  updateShowRate() {
    this.userService.setSettings(this.userUid, this.settings);
  }

  updateOfflineMode() {
    this.userService.updateOfflineMode(this.userUid, this.settings.offlineMode);
  }

}
