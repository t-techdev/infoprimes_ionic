import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfileReviewPage } from './profile-review.page';
import { TranslateModule } from '@ngx-translate/core';

import { ProfileEditPageModule } from '../profile-edit/profile-edit.module';
import { MortgageLoanEditPageModule } from '../mortgage-loan-edit/mortgage-loan-edit.module';
import { ProfessionEditPageModule } from '../profession-edit/profession-edit.module';
import { AssetsEditPageModule } from '../assets-edit/assets-edit.module';
import { LiabilitiesEditPageModule } from '../liabilities-edit/liabilities-edit.module';
import { InsuranceInvestEditPageModule } from '../insurance-invest-edit/insurance-invest-edit.module';

const routes: Routes = [
  {
    path: '',
    component: ProfileReviewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ProfileEditPageModule,
    MortgageLoanEditPageModule,
    ProfessionEditPageModule,
    AssetsEditPageModule,
    LiabilitiesEditPageModule,
    InsuranceInvestEditPageModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ProfileReviewPage]
})
export class ProfileReviewPageModule {}
