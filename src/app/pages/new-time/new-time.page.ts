import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, ModalController } from '@ionic/angular';
import * as moment from 'moment';


@Component({
  selector: 'app-new-time',
  templateUrl: './new-time.page.html',
  styleUrls: ['./new-time.page.scss'],
})
export class NewTimePage implements OnInit {

  constructor(private modalController: ModalController) { }

  public newDate:any = {date: moment().toISOString(), from: '', to: '', byProd: false, quantity: null};
  @ViewChild('byProd', {  static: false })  guestElement: IonInput;

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

  addTime() {
    this.modalController.dismiss(this.newDate);
  }

  byProdFocus() {
    console.log("Entro")
    this.guestElement.setFocus();
  }

}
