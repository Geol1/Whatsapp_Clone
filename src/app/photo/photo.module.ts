import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhotoPage } from './photo.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PhotoPageRoutingModule } from './photo-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule.forChild(),
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    PhotoPageRoutingModule
  ],
  declarations: [PhotoPage]
})
export class PhotoPageModule {}
