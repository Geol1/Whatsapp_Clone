import { TranslateServiceService } from './../service/translate-service.service';
import { ModalController, AlertController } from '@ionic/angular';
import { AlertcontrolService } from './../services/alertcontrol.service';
import { Component, OnInit } from '@angular/core';
import { ChangeThemeComponent } from '../change-theme/change-theme.component';
import { AuthentificationService } from '../services/authentification.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { NewgroupComponent } from '../newgroup/newgroup.component';

@Component({
  selector: 'app-appels',
  templateUrl: './appels.page.html',
  styleUrls: ['./appels.page.scss'],
})
export class AppelsPage implements OnInit {

  constructor(public ngFireAuth: AngularFireAuth,public modalCtrl:ModalController,
    public router:Router,public connexionService:AuthentificationService,public afstore: AngularFirestore,
    public translate: TranslateServiceService,public alertController:AlertController) { }

  ngOnInit() { }
  Deconnection(){
    this.connexionService.logOut(this.ngFireAuth,this.afstore)

  }
 async changeTheme(){
    let modal = await this.modalCtrl.create({
      component: ChangeThemeComponent,
    });
    await modal.present();  
  }

  async ChangeLang(){
      const alert = await this.alertController.create({
        header: "Choiser une langue",
        buttons: [
          {
          text: "Anglais",
          handler: ()=> {
            this.translate.setLanguage("en")
          }
        },
          {
            text: "Francais",
            handler: ()=> {
              this.translate.setLanguage("fr")
            }
          }
    ]
    });
      await alert.present();
    }

 async groupe() {
      let modal = await this.modalCtrl.create({
        component: NewgroupComponent,
      });
  
      await modal.present();
    }
    // this.alertCont.openModal(NewgroupComponent)
  
}
