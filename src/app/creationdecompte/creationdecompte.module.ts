import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreationdecomptePageRoutingModule } from './creationdecompte-routing.module';

import { CreationdecomptePage } from './creationdecompte.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule.forChild(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreationdecomptePageRoutingModule
  ],
  declarations: [CreationdecomptePage]
})
export class CreationdecomptePageModule {}
