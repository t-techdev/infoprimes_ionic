import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SvgHouseholdComponent } from './svg-household.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SvgHouseholdComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule
  ],
  exports: [SvgHouseholdComponent]
})
export class SVGHouseHoldViewModule {}
