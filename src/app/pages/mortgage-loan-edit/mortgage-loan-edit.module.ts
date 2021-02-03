import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MortgageLoanEditPage } from './mortgage-loan-edit.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule
  ],
  declarations: [MortgageLoanEditPage],
  exports: [MortgageLoanEditPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [MortgageLoanEditPage]
})
export class MortgageLoanEditPageModule {}
