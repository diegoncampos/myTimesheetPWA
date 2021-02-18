import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInput, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Times } from 'src/app/models/times';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Task, Settings } from 'src/app/models/settings';
import { Router } from '@angular/router';




@Component({
  selector: 'app-new-time',
  templateUrl: './new-time.page.html',
  styleUrls: ['./new-time.page.scss'],
})
export class NewTimePage implements OnInit {

  @Input() time: Times;
  @Input() editMode: boolean;
  @ViewChild('byProd', {  static: false })  guestElement: IonInput;

  public newDate:any = {
    date: moment().startOf('day').toISOString(),
    startTime: '',
    endTime: '',
    byProd: false,
    quantity: null,
    hadLunch: true,
    lunchTime: 30,
    comments: null
  };
  public settings:Settings;
  public selectedTask: Task = {name: "", prodRate: null, hourlyRate: null};
  public createTaskMessage: boolean = false;

  constructor(
    private modalController: ModalController,
    private notificationsService: NotificationsService,
    private router: Router

    ) {}
  
  ngOnInit() {
    if (this.editMode) {
      this.newDate = {
        date: this.time.date,
        startTime: this.time.startTime !== "" && this.time.startTime != null ? moment(this.time.startTime).format('HH:mm') : '',
        endTime: this.time.endTime !== "" && this.time.endTime != null ? moment(this.time.endTime).format('HH:mm') : '',
        byProd: this.time.byProd,
        quantity: this.time.quantity,
        hadLunch: this.time.hadLunch,
        lunchTime: this.time.lunchTime,
        comments: this.time.comments,
        task: this.time.task
      };
      this.selectedTask = this.time.task;
    }

    let set = localStorage.getItem('userSettings');
    if (typeof set !== 'undefined' && set) {
      let settings = JSON.parse(set);
      if(!settings.tasks) {
        settings.tasks = [{name: 'Default Task', hourlyRate: 0, prodRate: 0}];
        this.selectedTask = settings.tasks[0];
        this.createTaskMessage = true;
      }
      this.settings = settings;
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  saveTime() {
    let toSend = JSON.parse(JSON.stringify(this.newDate));
    toSend.date = moment(toSend.date).toISOString();
    toSend.startTime = moment(toSend.startTime, "HH:mm").toISOString();
    toSend.endTime = moment(toSend.endTime, "HH:mm").toISOString();
    toSend.task = this.selectedTask;
    if (this.totalDayTime(toSend) || toSend.byProd) {
      this.modalController.dismiss(toSend);
    }
    else {
      this.notificationsService.showMessage("Please check Start/End times")
    }
  }

  byProdFocus() {
    this.guestElement.setFocus();
  }

  totalDayTime(time) {
    var duration = moment.duration(moment(time.endTime).diff(moment(time.startTime)));
    if (time.hadLunch) {
      duration.subtract(time.lunchTime, 'minutes');
    }
    return duration.asHours() > 0 ? true : false;
  }

  readyToSave() {
    let allowSave: boolean = true;

    //By Prod
    if(this.newDate.byProd && this.selectedTask.name !== '' && this.newDate.quantity > 0) {
      allowSave = false;
    }

    //By Time
    if(!this.newDate.byProd && this.newDate.startTime !== '' && this.newDate.endTime !== '' && this.selectedTask.name !== '') {
      allowSave = false;
    }

    return allowSave;
  }

  goToSettings() {
    this.router.navigateByUrl('/settings');
    this.modalController.dismiss();
  }
}
