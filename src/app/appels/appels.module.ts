import { ChangeThemeComponent } from './../change-theme/change-theme.component';
import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppelsPageRoutingModule } from './appels-routing.module';

import { AppelsPage } from './appels.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    TranslateModule.forChild(),
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    AppelsPageRoutingModule
  ],
  declarations: [AppelsPage,ChangeThemeComponent],
  entryComponents: [ChangeThemeComponent],
  exports: [
    AppelsPage
  ]
})
export class AppelsPageModule {}
