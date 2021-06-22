import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupeconversationPageRoutingModule } from './groupeconversation-routing.module';

import { GroupeconversationPage } from './groupeconversation.page';
import { TranslateModule } from '@ngx-translate/core';

import { Ionic4EmojiPickerModule } from 'ionic4-emoji-picker';

@NgModule({
  imports: [
    Ionic4EmojiPickerModule,
    TranslateModule.forChild(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GroupeconversationPageRoutingModule
  ],
  declarations: [GroupeconversationPage]
})
export class GroupeconversationPageModule {}
