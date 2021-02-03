import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'page-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {

  constructor(
    public navCtrl: NavController
  ) {}

  ngOnInit() {
  }

  goBroker() {
    this.navCtrl.navigateRoot('/tabs/broker');
  }

  goHome() {
    this.navCtrl.navigateRoot('/tabs/home');
  }

  goBack() {
    this.navCtrl.back();
  }
}
