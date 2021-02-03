import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiabilitiesEditPage } from './liabilities-edit.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule
  ],
  declarations: [LiabilitiesEditPage],
  exports: [LiabilitiesEditPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [LiabilitiesEditPage]
})
export class LiabilitiesEditPageModule {}
