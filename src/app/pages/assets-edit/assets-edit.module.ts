import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetsEditPage } from './assets-edit.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule
  ],
  declarations: [AssetsEditPage],
  exports: [AssetsEditPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [AssetsEditPage]
})
export class AssetsEditPageModule {}
