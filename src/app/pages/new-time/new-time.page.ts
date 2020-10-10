import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInput, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Times } from 'src/app/models/times';


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
    date: moment().toISOString(),
    startTime: '',
    endTime: '',
    byProd: false,
    quantity: null,
    hadLunch: true,
    lunchTime: 30,
    comments: null
  };

  constructor(private modalController: ModalController) {}
  
  ngOnInit() {
    console.log("Me llega:", this.time)
    if (this.editMode) {
      this.newDate = this.time;
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  saveTime() {
    this.modalController.dismiss(this.newDate);
  }

  byProdFocus() {
    this.guestElement.setFocus();
  }

}
