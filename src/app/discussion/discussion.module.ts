import { NewgroupeinfosComponent } from './../newgroupeinfos/newgroupeinfos.component';
import { NewgroupComponent } from './../newgroup/newgroup.component';
import { NewProfilDiscussComponent } from './../new-profil-discuss/new-profil-discuss.component';
import { NewDiscussionComponent } from './../new-discussion/new-discussion.component';
import { MaconversationComponent } from './../maconversation/maconversation.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DiscussionPage } from './discussion.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { DiscussionPageRoutingModule } from './discussion-routing.module';
import { ProfildiscussionComponent } from '../profildiscussion/profildiscussion.component';
import { TranslateModule } from '@ngx-translate/core';

import { Ionic4EmojiPickerModule } from 'ionic4-emoji-picker';

@NgModule({
  imports: [
    Ionic4EmojiPickerModule,
    TranslateModule.forChild(),
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    DiscussionPageRoutingModule
  ],
  declarations: [DiscussionPage,ProfildiscussionComponent,MaconversationComponent,
    NewDiscussionComponent,NewProfilDiscussComponent,NewgroupComponent,NewgroupeinfosComponent,],
  entryComponents: [NewDiscussionComponent,NewgroupComponent,NewgroupeinfosComponent]
})
export class DiscussionPageModule {}
