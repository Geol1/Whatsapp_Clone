

import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import { AuthentificationService } from '../services/authentification.service';
import { AlertController, ToastController } from '@ionic/angular';
import { AlertcontrolService } from '../services/alertcontrol.service';
import { AngularFireStorage } from '@angular/fire/storage';

const imageNom="imageprofil"
const cle="user"

@Component({
  selector: 'app-creationdecompte',
  templateUrl: './creationdecompte.page.html',
  styleUrls: ['./creationdecompte.page.scss'],
})
export class CreationdecomptePage implements OnInit {
  imageURL:any;
  imageValide=false
	IdCreation: any;
  sentTimestamp;
  public userForm:FormGroup
  tabUser=[]
  Image: any;
  Donnees: any;
  validationUserMessage={
    email:[ {type:"required", message:"Veuillez entrer votre adresse mail."},
            {type:"email", message:"Cet adresse mail est incorrecte."}
  ],
    password:[ {type:"required", message:"Veuillez entrer votre mot de passe."},
    {type:"minLength", message:"Le mot de passe doit contenir au moins 6 characteres."}
  ],
   nom:[ {type:"required", message:"Veuillez entrer votre nom."},
    {type:"minLength", message:"Le mot de passe doit contenir au moins 6 characteres."}
  ]
  }
  constructor(
    public user:AuthentificationService,
    formBuilder: FormBuilder ,
    public afstore: AngularFirestore,public afsstorage:AngularFireStorage,
    public alertControl:AlertcontrolService,public toastServ:ToastController,
    public router:Router,public ngFireAuth: AngularFireAuth) {
    this.userForm= formBuilder.group({
      nom: new FormControl('', Validators.compose([Validators.required,Validators.maxLength(50)])),
      email: new FormControl('', Validators.compose([Validators.required,Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      image: ['']
    });
    
    
  }

  async logForm(){
    try{
    const userAuthen= await this.ngFireAuth.createUserWithEmailAndPassword(this.userForm.value.email,this.userForm.value.password).then((resp)=>{
      this.router.navigate(["/connexion"]);
      resp.user.sendEmailVerification();
      this.IdCreation=resp.user.uid;
      const fileStoragePath = `ImageUserProfil/${this.Image.name}_UID:${resp.user.uid}`;
      const imageRef= this.afsstorage.ref(fileStoragePath);
      imageRef.put(this.Image).then((resp)=>{
        this.afstore.doc(`user/${this.IdCreation}`).set({
          username:this.userForm.value.nom,
          email:this.userForm.value.email,
          password:this.userForm.value.password,
          image: fileStoragePath,
          id:this.IdCreation
        })
      })
    })
    this.alertControl.ToastServiceSucess('Veuiller verifier vos email avant de pouvoir active votre compte et vous connecte');
    }catch(error){
      console.dir(error);
    }
    
  }

  Annuler(){
    this.router.navigate(["/connexion"]);
  }

  monImage ( event: any ) {
    var folder = event.srcElement.files[0];
    const file = event.target.files[0];

  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = () => {
    this.imageURL = reader.result as string;
  };
  reader.onerror = (error) => {
    this.alertControl.ToastServiceWar('error de lecture du fichier')
  };
    if(folder.type.split('/')[0] !=='image' ){
      this.alertControl.ToastServiceWar('veuiller entrer une image');
    }else{ 
      this.imageValide=true
    }
   
    return this.Image=folder;
  }
  ngOnInit() {
  }

}
