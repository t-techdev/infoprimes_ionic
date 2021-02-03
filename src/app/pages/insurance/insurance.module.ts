import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SVGHouseHoldViewModule } from '../home/svg-household/svg-household.module';
import { SVGIndividualViewModule } from '../home/svg-individual/svg-individual.module';
import { InsurancePage } from './insurance.page';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: InsurancePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SVGHouseHoldViewModule,
    SVGIndividualViewModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InsurancePage]
})
export class InsurancePageModule {}
