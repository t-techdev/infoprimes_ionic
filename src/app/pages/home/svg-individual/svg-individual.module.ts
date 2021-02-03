import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SvgIndividualComponent } from './svg-individual.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SvgIndividualComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule
  ],
  exports: [SvgIndividualComponent]
})
export class SVGIndividualViewModule {}
