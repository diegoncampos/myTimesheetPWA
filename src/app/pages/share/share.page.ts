import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import domtoimage from 'dom-to-image';
import { jsPDF } from 'jspdf';
import * as moment from 'moment';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NotificationsService } from 'src/app/services/notifications.service';



@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {

  @Input() weekInfo: any;
  @Input() currentWeek: any;
  @Input() userInfo: any;


  constructor(
    private modalController: ModalController,
    private socialSharing: SocialSharing,
    private notificationsService: NotificationsService,

    ) { }

  ngOnInit() {
    // console.log("Me llega a share:", this.weekInfo, this.currentWeek)
  }

  closeModal() {
    this.modalController.dismiss();
  }

  // I can not make work with ionic and pwa (error cordova_not_enable)
  send() {
    const div = document.getElementById('screenshot');
    const options = { background: 'white', height: 850, width: 400 };
    domtoimage.toPng(div, options).then((dataUrl) => {
      console.log(dataUrl)

      this.socialSharing.shareViaWhatsApp('Este es el texto', dataUrl).then((res) => {
        // Success
        this.notificationsService.showMessage("Enviado")
      }).catch((e) => {
        // Error!
        this.notificationsService.showMessage(e)
      });
    })
  }

  saveImage() {
    const div = document.getElementById('screenshot');
    const options = { background: 'white', height: 850, width: 400 };
    domtoimage.toPng(div, options).then((dataUrl) => {
      // console.log(dataUrl)
      var download = document.createElement('a');
      download.href = dataUrl;
      download.download = 'time.png';
      download.click();
    })
  }

  savePdf() {
    const div = document.getElementById('screenshot');
    const options = { background: 'white', height: 850, width: 400 };
    domtoimage.toPng(div, options).then((dataUrl) => {
      //Initialize JSPDF
      const doc = new jsPDF('p', 'mm', 'a4');
      // //Add image Url to PDF
      doc.addImage(dataUrl, 'PNG', 0, 0, 210, 340);
      doc.save('times.pdf');;
    })
  }

  totalDayTime(time) {
    var duration = moment.duration(moment(time.endTime).diff(moment(time.startTime)));
    // console.log("TIME", time)
    if (time.hadLunch) {
      duration.subtract(time.lunchTime, 'minutes');
    }
    return duration.asHours();
  }

  webshare() {
    let text: string = "*" + this.userInfo.displayName + " - Weekly Summary:*\n" 
                        + "\n*Total Hours:* " + this.weekInfo.totalHours.toFixed(2) + "hs"
                        + "\n*Total Prod:* " + this.weekInfo.totalProd+ "\n";

    this.currentWeek.forEach(element => {

      text += "\n__________________";
      text += "\n*Date: " + moment(element.date).format('ddd DD MMM YYYY') + "*";
      if(element.byProd) {
        text += "\n*Quantity:* " + element.quantity
      }
      else {
        text += "\n*From:* " + moment(element.startTime).format('HH:mm') + " *- To:* " + moment(element.endTime).format('HH:mm') + " *- Total:* " + this.totalDayTime(element).toFixed(2) + "hs"
      }
      text += element.comments? "\n*Comment:* _" + element.comments + "_" : "";
    });

    text += "\n\n\n_MyTimesheet App_ 😎";

    console.log("Final",text)

    if (navigator.share) {
      navigator.share({
        title: 'Weekly Summary',
        text: text,
        url: "https://mytimesheetpwa.web.app/"
      }).then()
      .catch((e) => {
        // Error!
        this.notificationsService.showMessage(e)
      });
    }

  }

}
