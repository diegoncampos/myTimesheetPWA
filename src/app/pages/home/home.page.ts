import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { NewTimePage } from '../new-time/new-time.page'
import { SharePage } from '../share/share.page'
import * as moment from 'moment';
import { NotificationsService } from '../../services/notifications.service';
import { UserService } from '../../services/user.service'
import { Times } from 'src/app/models/times';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public weekInfo = { from: null, to: null, totalHours: 0, totalProd: 0 };
  public searchMode: boolean = false;
  public currentWeek: any = [];
  public userInfo: any = {displayName: 'User', uid:'', times: []};
  public showSpinner:boolean = true;
  // public showDetails:boolean = false;

  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    private notificationsService: NotificationsService,
    private userService: UserService
    ) {
    this.weekInfoUpdate();

    this.getWeeklyProduction();
    this.getWeeklyHours();
  }
  

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userInfo.uid = JSON.parse(localStorage.getItem('user')).uid;
    this.userService.getUser(this.userInfo.uid).subscribe(res => {
      // console.log("Traigo User:", res.data())
      this.userInfo = {
        displayName: res.data().displayName,
        email: res.data().email,
        groupId: 1,
        photoURL: "",
        times: res.data().times
      }
      this.weekInfoUpdate();
      this.showSpinner = false;
    })
  }

  // public data = {
  //   "email": "prueba@gmail.com",
  //   "times": [{
  //     "date": "2020-08-15T00:15:06.785Z",
  //     "weekNumber": 5,
  //     "startTime": "2020-09-24T10:12:39.191+12:00",
  //     "endTime": "2020-09-24T17:12:39.191+12:00",
  //     "byProd": false,
  //     "quantity": 0
  //   },
  //   {
  //     "date": "2020-09-22T00:15:06.785Z",
  //     "weekNumber": 5,
  //     "startTime": "2020-09-24T08:00:39.191+12:00",
  //     "endTime": "2020-09-24T16:30:39.191+12:00",
  //     "byProd": false,
  //     "quantity": 0
  //   },
  //   {
  //     "date": "2020-09-24T00:15:06.785Z",
  //     "weekNumber": 5,
  //     "startTime": "2020-09-24T10:12:39.191+12:00",
  //     "endTime": "2020-09-24T13:12:39.191+12:00",
  //     "byProd": false,
  //     "quantity": 0
  //   },
  //   {
  //     "date": "2020-09-29T00:15:06.785Z",
  //     "weekNumber": 5,
  //     "startTime": "",
  //     "endTime": "",
  //     "byProd": true,
  //     "quantity": 25
  //   }
  //   ]
  // };

  async addTime() {
    const modal = await this.modalController.create({
      component: NewTimePage
    });
    modal.onDidDismiss().then(data => {
      let newDate = data.data;
      if (newDate) {
        let newTime: Times = {
          date: newDate.date,
          startTime: newDate.startTime,
          endTime: newDate.endTime,
          byProd: newDate.byProd,
          quantity: newDate.quantity,
          hadLunch: newDate.byProd? false : newDate.hadLunch,
          lunchTime: newDate.byProd? null : newDate.lunchTime,
          comments: newDate.comments
        }
        this.userInfo.times.push(newTime);
        let uid = JSON.parse(localStorage.getItem('user')).uid;
        this.userService.addTime(uid, this.userInfo.times);
        this.weekInfoUpdate();
      }

    })
    return await modal.present();
  }

  async editTime(time) {
    const modal = await this.modalController.create({
      component: NewTimePage,
      componentProps: {editMode: true, time: time}
    });
    modal.onDidDismiss().then(data => {
      let newDate = data.data;
      if(newDate) {
        this.userInfo.times.forEach((elem, index, object) => {
          if (elem === time) {
            elem = newDate;
            // Close details after update
            elem.showDetails = false;
            let uid = JSON.parse(localStorage.getItem('user')).uid;
            this.userService.addTime(uid, this.userInfo.times);
            this.weekInfoUpdate();
          }
        });
      }
    })
    return await modal.present();
  }

  async removeTime(time) {
    const alert = await this.alertController.create({
      cssClass: 'modalStyle',
      header: moment(time.date).format('dddd DD MMM YYYY'),
      subHeader: time.byProd ? "Quantity:" + time.quantity : "From: " + moment(time.startTime).format('HH:mm') + " - To: " + moment(time.endTime).format('HH:mm'),
      // message: 'This is an alert message.',
      buttons: [
        {
          text: 'Remove',
          role: 'remove',
          handler: () => {
            this.userInfo.times.forEach((elem, index, object) => {
              if (elem === time) {
                object.splice(index, 1)
                let uid = JSON.parse(localStorage.getItem('user')).uid;
                this.userService.addTime(uid, this.userInfo.times);
                this.weekInfoUpdate();
              }
            });
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

  async onPress(time) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: moment(time.date).format('dddd DD MMM YYYY'),
      subHeader: 'Edit or Delete date entry',
      // message: 'This is an alert message.',
      buttons: [
        {
          text: 'Edit',
          role: 'edit',
          cssClass: 'secondary',
          handler: (blah) => {
            this.editTime(time);
          }
        },
        {
          text: 'Remove',
          role: 'remove',
          handler: () => {
            this.removeTime(time);
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
    await alert.present();
  }

  // removeTime(time:any) {
  //   console.log("Remove:", time)
  //   this.userInfo.times.forEach((elem, index, object) => {
  //     if(elem === time) {
  //       console.log("encomntre", elem, "Index:", index)
  //       object.splice(index, 1)
  //       let uid = JSON.parse(localStorage.getItem('user')).uid;
  //       this.userService.addTime(uid, this.userInfo.times);
  //       this.weekInfoUpdate();
  //     }
  //   });
  // }

  weekInfoUpdate() {
    this.weekInfo.from = moment().startOf('isoWeek');
    this.weekInfo.to = moment().endOf('isoWeek');

    this.findSelectedDays(this.weekInfo.from, this.weekInfo.to);
  }

  getWeeklyHours() {

    let count: number = 0;
    this.currentWeek.forEach(element => {

      if (!element.byProd && element.endTime !== '' && element.startTime !== '') {

        var endTime = moment(element.endTime);
        var startTime = moment(element.startTime);

        var duration = moment.duration(endTime.diff(startTime));
        if (element.hadLunch) {
          duration.subtract(element.lunchTime, 'minutes');
        }
        var hours = duration.asHours();

        count = hours > 0 ? count + hours : count;

      }
    });
    this.weekInfo.totalHours = count;

  }

  getWeeklyProduction() {

    let count: number = 0;
    this.currentWeek.forEach(element => {
      if (element.byProd && element.quantity !== 0) {
        count = +count + +element.quantity;
      }
    });
    this.weekInfo.totalProd = count;
  }

  nextWeek() {
    if (!this.searchMode) {
      // console.log("Next week")
      this.weekInfo.from = moment(this.weekInfo.from, "DD-MM-YYYY").add(7, 'days');
      this.weekInfo.to = moment(this.weekInfo.to, "DD-MM-YYYY").add(7, 'days');

      this.findSelectedDays(this.weekInfo.from, this.weekInfo.to);
    }
  }

  previousWeek() {
    if (!this.searchMode) {
      // console.log("Previous week")
      this.weekInfo.from = moment(this.weekInfo.from, "DD-MM-YYYY").subtract(7, 'days');
      this.weekInfo.to = moment(this.weekInfo.to, "DD-MM-YYYY").subtract(7, 'days');

      this.findSelectedDays(this.weekInfo.from, this.weekInfo.to);
    }
  }

  findSelectedDays(from: any, to: any) {

    this.currentWeek = [];
    let week = [];

    this.userInfo.times.forEach(elem => {
      if (moment(elem.date).isBetween(from, to)) {
        week.push(elem);
      }
    })
    //Sort array by Date
    this.currentWeek = week.sort(function (a, b) {
      return moment.utc(a.date).diff(moment.utc(b.date))
    });
    this.getWeeklyProduction();
    this.getWeeklyHours();
  }

  // share() {
  //   console.log("Share")
  //   this.notificationsService.showMessage("Share is Not implemented yet.. Sorry!");
  // }

  async share() {
    const modal = await this.modalController.create({
      component: SharePage,
      componentProps: {weekInfo: this.weekInfo, currentWeek: this.currentWeek}
    });
    modal.onDidDismiss().then(data => {
      let newDate = data.data;
      if(newDate) {
        console.log("Regreso")
      }
    })
    return await modal.present();
  }

  totalDayTime(time) {
    var duration = moment.duration(moment(time.endTime).diff(moment(time.startTime)));
    // console.log("TIME", time)
    if (time.hadLunch) {
      duration.subtract(time.lunchTime, 'minutes');
    }
    return duration.asHours();
  }

  async presentAlertSearch() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Find Range of dates',
      subHeader: 'Select from - to dates',
      inputs: [
        // input date with min & max
        {
          name: 'fromDate',
          type: 'date'
          // min: '2017-03-01',
          // max: '2018-01-12'
        },
        {
          name: 'toDate',
          type: 'date'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Search',
          handler: data => {
            console.log('Confirm Ok', data);
            if(data.fromDate && data.toDate) {
              this.weekInfo.from = moment(data.fromDate, "YYYY-MM-DD");
              this.weekInfo.to = moment(data.toDate, "YYYY-MM-DD");
              // Added one day in 'to date' in order to include that date
              this.findSelectedDays(moment(data.fromDate, "YYYY-MM-DD"), moment(data.toDate, "YYYY-MM-DD").add(1, 'days'));
              this.searchMode = true;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  finishSearch() {
    this.searchMode = false;
    this.weekInfoUpdate();
  }

  showDescription(item) {
    // this.purchases.forEach(elem =>{
    //   if(item !== elem){
    //     elem.showDescription = false;
    //   }
    // })
    item.showDescription = !item.showDescription;
  }

  showDetailsF(time) {
    this.currentWeek.forEach(elem => {
      elem.showDetails = false;
    });
    time.showDetails = !time.showDetails;
  }

}
