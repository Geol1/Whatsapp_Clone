import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';
// import { ProfilePhotoOptionComponent } from '../components/profile-photo-option/profile-photo-option.component';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { Router } from '@angular/router';
const { Camera } = Plugins;

@Component({
  selector: 'app-statut',
  templateUrl: 'statut.page.html',
  styleUrls: ['statut.page.scss']
})
export class StatutPage {
  photo
  // photo = ‘https://i.pravatar.cc/150';
  
  constructor(private modalController: ModalController,public router:Router) {
  }

  // async openOptionSelection() {
  //   const modal = await this.modalController.create({
  //     component: ProfilePhotoOptionComponent,
  //     cssClass: ‘transparent-modal’
  //   });
  //   modal.onDidDismiss()
  //   .then(res => {
  //     console.log(res);
  //     if (res.role !== 'backdrop') {
  //       this.takePicture(res.data);
  //     }
  //   });
  //   return await modal.present();
  // }
  async takePicture() {
    this.router.navigate(['/groupe'])
    // const image = await Camera.getPhoto({
    //   quality: 90,
    //   allowEditing: false,
    //   resultType: CameraResultType.Uri,
    //   source: CameraSource[type]
    // });
    // this.photo = image.webPath;
  }
}
