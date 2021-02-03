import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsuranceInvestEditPage } from './insurance-invest-edit.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule
  ],
  declarations: [InsuranceInvestEditPage],
  exports: [InsuranceInvestEditPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [InsuranceInvestEditPage]
})
export class InsuranceInvestEditPageModule {}
