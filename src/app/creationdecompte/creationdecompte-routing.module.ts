import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreationdecomptePage } from './creationdecompte.page';

const routes: Routes = [
  {
    path: '',
    component: CreationdecomptePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreationdecomptePageRoutingModule {}
