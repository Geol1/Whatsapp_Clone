import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'disc',
        loadChildren: () => import('../discussion/discussion.module').then(m => m.DiscussionPageModule)
      },
      {
        path: 'photo',
        loadChildren: () => import('../photo/photo.module').then(m => m.PhotoPageModule)
      },
      {
        path: 'statut',
        loadChildren: () => import('../statut/statut.module').then(m => m.StatutPageModule)
      },
      {
        path: 'appel',
        loadChildren: () => import('../appels/appels.module').then(m => m.AppelsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/disc',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
