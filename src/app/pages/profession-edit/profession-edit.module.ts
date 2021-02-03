import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfessionEditPage } from './profession-edit.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule
  ],
  declarations: [ProfessionEditPage],
  exports: [ProfessionEditPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ProfessionEditPage]
})
export class ProfessionEditPageModule {}
