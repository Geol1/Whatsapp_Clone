import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatutPage } from './statut.page';

const routes: Routes = [
  {
    path: '',
    component: StatutPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatutPageRoutingModule {}
