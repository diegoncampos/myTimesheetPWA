import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public searchDates:any = {fromDate: '', toDate: ''};

  constructor(
    private modalController: ModalController,
    private notificationsService: NotificationsService,
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

  search() {
    var isafter = moment(this.searchDates.toDate).isAfter(this.searchDates.fromDate);
    if(isafter) {
      this.modalController.dismiss(this.searchDates);
    }
    else {
      this.notificationsService.showMessage("Please check dates, \nTO date should be after FROM date");
    }
  }

}
