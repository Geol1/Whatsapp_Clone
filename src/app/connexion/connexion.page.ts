
import { ResetpasswordComponent } from './../resetpassword/resetpassword.component';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthentificationService } from '../services/authentification.service';
import { AlertcontrolService } from '../services/alertcontrol.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ColorThemeService } from '../services/color-theme.service';

const cle="user"

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  public userForm:FormGroup
  
  validationUserMessage={
    email:[ {type:"required", message:"Veuillez entrer votre adresse mail."},
            {type:"email", message:"Cet adresse mail est incorrecte."}
  ],
    password:[ {type:"required", message:"Veuillez entrer votre mot de passe."},
    {type:"minLength", message:"Le mot de passe doit contenir au moins 6 characteres."}
  ]
  
  }

  constructor(public themeColor: ColorThemeService,public userService:AuthentificationService,
     public alertControl:AlertcontrolService, formBuilder: FormBuilder,
     public modalCtrl: ModalController ,public router:Router,
     public ngFireAuth: AngularFireAuth,public alertController:AlertController,
     public afstore: AngularFirestore) {
    
      this.themeColor.setTheme();

      this.userForm= formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required,Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
    
    this.userService.LogIfConnect(this.router)
  }
  async logForm(){
    const userAuthen= await this.ngFireAuth.signInWithEmailAndPassword(this.userForm.value.email,this.userForm.value.password);
      this.userService.EmailVerifier(userAuthen,this.router)
      this.alertControl.ToastServiceSucess('Connection etablie avec succes :) .');
      this.afstore.doc(`userStatut/${userAuthen.user.uid}`).set({
        uid: userAuthen.user.uid,
        date: new Date(),
        statut: "en ligne",
      })
  }
  CreerCompte(){
    this.router.navigate(["/creationdecompte"]);
  }
  
  public openModal() {
    this.alertControl.openModal(ResetpasswordComponent)
  }
  ngOnInit() {
  }
 

}
