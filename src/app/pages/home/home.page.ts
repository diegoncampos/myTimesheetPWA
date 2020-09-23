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

    this.getWeeklyProduction();

  

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
      "startTime": "2020-09-18T08:15:06.785Z",
      "endTime": "2020-09-18T17:15:06.785Z",
      "byProd": false,
      "quantity": 0
    },
    {
      "date": "2020-09-17T00:15:06.785Z",
      "weekNumber": 5,
      "startTime": "2020-09-18T08:15:06.785Z",
      "endTime": "2020-09-18T16:15:06.785Z",
      "byProd": false,
      "quantity": 0
    },
    {
      "date": "2020-09-18T00:15:06.785Z",
      "weekNumber": 5,
      "startTime": "2020-09-18T08:15:06.785Z",
      "endTime": "2020-09-18T16:30:06.785Z",
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
      }
    })
    return await modal.present();
  }

  weekInfoUpdate(date?: number) {
    this.weekInfo.from = moment().startOf('isoWeek').format("DD-MM-YYYY");
    this.weekInfo.to = moment().endOf('isoWeek').format("DD-MM-YYYY");
    var totalHours = moment();

    this.data.times.forEach(element => {
      var startTime = moment(element.startTime, "HH:mm");
      var endTime = moment(element.endTime, "HH:mm");
      var h = endTime.diff(startTime, 'hours');
      var m = moment.utc(endTime.diff(startTime)).format("mm")
      // console.log("Tiempo:", h, ":", m)
      console.log("Tiempo:", moment(h+":"+m, 'HH:mm').format('HH:mm:ss'))
      totalHours = moment(totalHours).add(h, 'hour').add(m, 'minutes');
    });

    console.log("Horas totales: ", totalHours.format('HH:mm:ss'))
  }

  getWeeklyHours() {

    this.weekInfo.totalHours = 15;

  }

  getWeeklyProduction() {

    let count:number = 0;

    this.data.times.forEach(element => {
      if(element.quantity !== 0) {
        count = +count + +element.quantity;
      }
    });


    this.weekInfo.totalProd = count;

  }

}
