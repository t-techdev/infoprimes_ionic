import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ResetpasswordConfirmPage } from './resetpassword-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: ResetpasswordConfirmPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResetpasswordConfirmPage]
})
export class ResetpasswordConfirmPageModule {}