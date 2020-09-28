import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { NewTimePage } from '../new-time/new-time.page'
import * as moment from 'moment';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public weekInfo = { from: null, to: null, totalHours: 0, totalProd: 0 };
  // public currentWeekNumber: number = 0;
  private newDate: any = "";
  public closeSearch: boolean = false;

  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    private notificationsService: NotificationsService
    ) {
    // this.currentWeekNumber = moment().isoWeek();
    this.weekInfoUpdate();

    this.getWeeklyProduction();
    this.getWeeklyHours();
  }

  ngOnInit() {
  }

  public date = "";
  public startTime = "";
  public endTime = "";
  public currentWeek: any = [];

  public data = {
    "email": "prueba@gmail.com",
    "times": [{
      "date": "2020-08-15T00:15:06.785Z",
      "weekNumber": 5,
      "startTime": "2020-09-24T10:12:39.191+12:00",
      "endTime": "2020-09-24T17:12:39.191+12:00",
      "byProd": false,
      "quantity": 0
    },
    {
      "date": "2020-09-22T00:15:06.785Z",
      "weekNumber": 5,
      "startTime": "2020-09-24T08:00:39.191+12:00",
      "endTime": "2020-09-24T16:30:39.191+12:00",
      "byProd": false,
      "quantity": 0
    },
    {
      "date": "2020-09-24T00:15:06.785Z",
      "weekNumber": 5,
      "startTime": "2020-09-24T10:12:39.191+12:00",
      "endTime": "2020-09-24T13:12:39.191+12:00",
      "byProd": false,
      "quantity": 0
    },
    {
      "date": "2020-09-29T00:15:06.785Z",
      "weekNumber": 5,
      "startTime": "",
      "endTime": "",
      "byProd": true,
      "quantity": 25
    }
    ]
  };

  async addTime() {
    const modal = await this.modalController.create({
      component: NewTimePage
    });
    modal.onDidDismiss().then(data => {
      this.newDate = data.data;
      console.log("Selected Date:", this.newDate)
      if (this.newDate) {
        this.data.times.push(
          {
            "date": this.newDate.date,
            "weekNumber": 5,
            "startTime": this.newDate.from,
            "endTime": this.newDate.to,
            "byProd": this.newDate.byProd,
            "quantity": this.newDate.quantity
          }
        )
        this.weekInfoUpdate();
      }

    })
    return await modal.present();
  }

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
    console.log("Next week")
    this.weekInfo.from = moment(this.weekInfo.from, "DD-MM-YYYY").add(7, 'days');
    this.weekInfo.to = moment(this.weekInfo.to, "DD-MM-YYYY").add(7, 'days');

    this.findSelectedDays(this.weekInfo.from, this.weekInfo.to);
  }

  previousWeek() {
    console.log("Previous week")
    this.weekInfo.from = moment(this.weekInfo.from, "DD-MM-YYYY").subtract(7, 'days');
    this.weekInfo.to = moment(this.weekInfo.to, "DD-MM-YYYY").subtract(7, 'days');

    this.findSelectedDays(this.weekInfo.from, this.weekInfo.to);
  }

  findSelectedDays(from: any, to: any) {

    console.log("findSelectedDays")
    this.currentWeek = [];
    let week = [];

    this.data.times.forEach(elem => {
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

  share() {
    console.log("Share")
    this.notificationsService.showMessage("Share is Not implemented yet.. Sorry!");
  }

  totalDayTime(from, to) {
    var duration = moment.duration(moment(to).diff(moment(from)));
    return duration.asHours();
  }

  async presentAlertSearch() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Find Date',
      subHeader: 'Select from - to dates',
      inputs: [
        // input date with min & max
        {
          name: 'fromDate',
          type: 'date',
          placeholder: 'Username'
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
          text: 'Ok',
          handler: data => {
            console.log('Confirm Ok', data);
            if(data.fromDate && data.toDate) {
              this.weekInfo.from = moment(data.fromDate, "YYYY-MM-DD");
              this.weekInfo.to = moment(data.toDate, "YYYY-MM-DD");
              this.findSelectedDays(moment(data.fromDate, "YYYY-MM-DD"), moment(data.toDate, "YYYY-MM-DD"));
              this.closeSearch = true;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  finishSearch() {
    this.closeSearch = false;
    this.weekInfoUpdate();
  }

}
