import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UserService } from 'src/app/services/user.service';
import { Settings } from 'src/app/models/settings';
import { ModalController, AlertController } from '@ionic/angular';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public settings:Settings = {showRates: true, offlineMode: false, tasks:[]};
  private userUid: string;

  constructor(
    private userService: UserService,
    private notificationsService: NotificationsService,
    public router: Router,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    let set = localStorage.getItem('userSettings');
    if (typeof set !== 'undefined' && set) {
      let settings = JSON.parse(set);
      //Delete hourly rate in old users
      if(settings.hourlyRate) { delete settings.hourlyRate}
      console.log("Settings: ", settings)
      this.settings = settings;
    }
    this.userUid = JSON.parse(localStorage.getItem('user')).uid;
  }

  saveRates() {
    this.userService.setSettings(this.userUid, this.settings).then( res => {
      this.notificationsService.showMessage("Settings saved.");
      this.router.navigate(['home']);
    })
    .catch (err => this.notificationsService.showMessage("Fail saving settings."))
    console.log(this.settings)
  }

  updateShowRate() {
    this.userService.setSettings(this.userUid, this.settings);
  }

  updateOfflineMode() {
    this.userService.updateOfflineMode(this.userUid, this.settings.offlineMode);
  }

  async deleteTask(index) {
    const alert = await this.alertController.create({
      cssClass: 'modalStyle',
      header: 'Remove task?',
      subHeader: "\"" + this.settings.tasks[index].name + "\" will be remove permanently",
      buttons: [
        {
          text: 'Remove',
          role: 'remove',
          handler: () => {
            this.settings.tasks.splice(index, 1)
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel');
          }
        }
      ]
    });
    return await alert.present();
  }

  addTask() {
    let randomColor:any = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    if(this.settings.tasks) {
      this.settings.tasks.push({name: "", hourlyRate: null, prodRate: null, color: randomColor});
    }
    else {
      this.settings.tasks = [];
      this.settings.tasks.push({name: '', hourlyRate: null, prodRate: null, color: randomColor});
    }
  }

}
