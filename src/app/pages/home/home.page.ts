import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewTimePage } from '../new-time/new-time.page'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async addTime() {
    const modal = await this.modalController.create({
    component: NewTimePage
    });
    return await modal.present();
   }

}
