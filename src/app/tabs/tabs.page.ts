import { AuthentificationService } from './../services/authentification.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  connecte=false

  classCss="bar"
  public userId:any;
  

  constructor(public connexionService:AuthentificationService ,
    public afstore: AngularFirestore,public ngFireAuth: AngularFireAuth ,public router:Router) {
    
    connexionService.etatConnexion(ngFireAuth)
    if(localStorage.getItem('userStatut')=='true'){
      this.connecte=true;
    }
 
   }
   
  monProfil(){
    this.router.navigate(['/profil'])
  }

}
