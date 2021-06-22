import { Injectable } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertcontrolService {

  constructor(public alertController:AlertController,public toastServ:ToastController,public modalCtrl:ModalController) { }

  ToastServiceWar = async (monMessage,position ='top') =>{
    const toast = await this.toastServ.create({
      message: monMessage,
      duration: 3500,
      position: 'top',
      color: 'danger'
    });
    toast.present()
  }

  ToastServiceSucess = async (monMessage,position ='top') =>{
    const toast = await this.toastServ.create({
      message: monMessage,
      duration: 4500,
      position: 'bottom',
      color: 'success'
    });
    toast.present()
  }

  async presentAlert(title:string,content='') {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [{
        text: "Oui",
        handler: ()=> {
          
        }
  }]
  });
    await alert.present();
  }

  async presentAlertFunct(title:string,content='',fonction) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [{
        text: "Oui",
        handler: 
          fonction
        },
        {
          text: "non"
        }
  ]
  });
    await alert.present();
  }

  async openModal(MonComponent){
    let modal = await this.modalCtrl.create({
      component: MonComponent,
    });

    await modal.present();
  }

  onDismissModalService(){
    this.modalCtrl.dismiss()
  }

}
