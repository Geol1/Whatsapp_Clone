import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatutPage } from './statut.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { DemoImage } from '../../assets/image';


import { StatutPageRoutingModule } from './statut-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule.forChild(),
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: StatutPage }]),
    StatutPageRoutingModule,
  ],
  declarations: [StatutPage],providers: [DemoImage]
})
export class StatutPageModule {}
