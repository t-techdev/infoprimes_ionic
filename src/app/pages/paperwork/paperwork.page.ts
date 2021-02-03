import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'page-paperwork',
  templateUrl: './paperwork.page.html',
  styleUrls: ['./paperwork.page.scss'],
})
export class PaperworkPage implements OnInit {

  constructor(public navCtrl: NavController,
              public navParams: NavParams) { }

  ngOnInit() {
  }

  ionViewDidLoad() {
  }

  goBack() {
  }

}
