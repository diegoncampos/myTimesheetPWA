import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewTimePage } from '../new-time/new-time.page'
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public weekInfo = {from: "", to: "", totalHours: 0, totalProd: 0};
  public currentWeekNumber: number = 0;
  private newDate:any = "";

  constructor(public modalController: ModalController) {
    // let todayDate = moment();
    this.currentWeekNumber = moment().isoWeek();
    this.weekInfoUpdate();
    // this.weekInfoUpdate(moment("30-09-2020", "DD-MM-YYYY"));

    this.getWeeklyProduction();
    this.getWeeklyHours();

  

    // console.log("First Day:", moment("2020-09-08").startOf('isoWeek').format("DD-MM-YYYY"));
    // console.log("Last Day:", moment("2020-09-08").endOf('isoWeek').format("DD-MM-YYYY"));

    

    // console.log("First Day: ", moment("2020-09-09").weekday(1).format("DD-MM-YYYY"))
    // console.log("Last Day: ", moment("2020-09-09").weekday(7).format("DD-MM-YYYY"))
  }

  ngOnInit() {
  }

  public date = "";
  public startTime = "";
  public endTime = "";
  
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
      "date": "2020-09-17T00:15:06.785Z",
      "weekNumber": 5,
      "startTime": "2020-09-24T08:00:39.191+12:00",
      "endTime": "2020-09-24T16:30:39.191+12:00",
      "byProd": false,
      "quantity": 0
    },
    {
      "date": "2020-09-18T00:15:06.785Z",
      "weekNumber": 5,
      "startTime": "2020-09-24T10:12:39.191+12:00",
      "endTime": "2020-09-24T13:12:39.191+12:00",
      "byProd": false,
      "quantity": 0
    },
    {
      "date": "2020-09-19T00:15:06.785Z",
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
    modal.onDidDismiss().then(data=>{
      this.newDate=data.data;
      console.log("Selected Date:", this.newDate)
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
      if(this.newDate.quantity !== 0){
        this.getWeeklyProduction();
        this.getWeeklyHours();
      }
    })
    return await modal.present();
  }

  weekInfoUpdate(date?: any) {

    if(date) {
      this.weekInfo.from = moment(date).startOf('isoWeek').format("DD-MM-YYYY");
      this.weekInfo.to = moment(date).endOf('isoWeek').format("DD-MM-YYYY");
    }
    else {
      this.weekInfo.from = moment().startOf('isoWeek').format("DD-MM-YYYY");
      this.weekInfo.to = moment().endOf('isoWeek').format("DD-MM-YYYY");
    }
  }

  getWeeklyHours() {

    let count: number = 0;
    this.data.times.forEach(element => {

      if (!element.byProd && element.endTime !== '' && element.startTime !== '') {

        var endTime = moment(element.endTime);
        var startTime = moment(element.startTime);

        var duration = moment.duration(endTime.diff(startTime));
        var hours = duration.asHours();

        count = hours > 0 ? count + hours : count;

      }
    });
    this.weekInfo.totalHours = count > 0 ? count : this.weekInfo.totalHours;

  }

  getWeeklyProduction() {

    let count:number = 0;
    this.data.times.forEach(element => {
      if(element.byProd && element.quantity !== 0) {
        count = +count + +element.quantity;
      }
    });
    this.weekInfo.totalProd = count;
  }

  nextWeek() {

  }

  previousWeek() {
    
  }

}
