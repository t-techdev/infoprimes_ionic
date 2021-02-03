import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileEditPage } from './profile-edit.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule
  ],
  declarations: [ProfileEditPage],
  exports: [ProfileEditPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ProfileEditPage]
})
export class ProfileEditPageModule {}
