import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import domtoimage from 'dom-to-image';
import * as moment from 'moment';



@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {

  @Input() weekInfo: any;
  @Input() currentWeek: any;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log("Me llega a share:", this.weekInfo, this.currentWeek)
  }

  closeModal() {
    this.modalController.dismiss();
  }

  send() {
    const div = document.getElementById('screenshot');
    const options = { background: 'white', height: 850, width: 400 };
    domtoimage.toPng(div, options).then((dataUrl) => {
        // //Initialize JSPDF
        // const doc = new jsPDF('p', 'mm', 'a4');
        // //Add image Url to PDF
        // doc.addImage(dataUrl, 'PNG', 0, 0, 210, 340);
        // doc.save('pdfDocument.pdf');
        console.log(dataUrl)
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

}
