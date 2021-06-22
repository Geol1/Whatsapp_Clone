import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupeconversationPage } from './groupeconversation.page';

const routes: Routes = [
  {
    path: '',
    component: GroupeconversationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupeconversationPageRoutingModule {}
