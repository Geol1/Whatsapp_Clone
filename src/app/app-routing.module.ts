import { NewgroupeinfosComponent } from './newgroupeinfos/newgroupeinfos.component';
import { NewgroupComponent } from './newgroup/newgroup.component';

import { MaconversationComponent } from './maconversation/maconversation.component';

import { NgModule, Component } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'creationdecompte',
    loadChildren: () => import('./creationdecompte/creationdecompte.module').then( m => m.CreationdecomptePageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'connexion',
    loadChildren: () => import('./connexion/connexion.module').then( m => m.ConnexionPageModule)
  },
  {
    path: 'maconversation/:id',component:MaconversationComponent
  },
  {
    path: 'groupe',component:NewgroupeinfosComponent
  },
  {
    path: '',
    redirectTo: '/connexion',
    pathMatch: 'full'
  },
  {
    path: 'groupeconversation/:id',
    loadChildren: () => import('./groupeconversation/groupeconversation.module').then( m => m.GroupeconversationPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
