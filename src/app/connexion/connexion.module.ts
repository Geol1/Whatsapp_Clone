import { ResetpasswordComponent } from './../resetpassword/resetpassword.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnexionPageRoutingModule } from './connexion-routing.module';

import { ConnexionPage } from './connexion.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule.forChild(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ConnexionPageRoutingModule
  ],
  declarations: [ConnexionPage,ResetpasswordComponent],
  entryComponents: [ResetpasswordComponent]
})
export class ConnexionPageModule {}
