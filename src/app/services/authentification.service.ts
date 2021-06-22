import { MesdonneescontactService } from './mesdonneescontact.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertcontrolService } from './alertcontrol.service';

interface user{
  username:string;
  email:string,
  uid:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public connecte="false"
  public userId:any;
  private user:user
  constructor(public afstore: AngularFirestore,public alertControl:AlertcontrolService,public router:Router,public contact:MesdonneescontactService) { }
  
  etatConnexion(ngFireAuth){
    let test= ngFireAuth.authState.subscribe( (auth)=>{
      if(!auth) {console.log("utilisateur non connecte");
      }else{
        this.connecte="true"
        this.userId=auth.uid;
         localStorage.setItem('userId',auth.uid)
         localStorage.setItem('userStatut',this.connecte)
      }
      
    })
    return this.connecte
  }

  logIn(ngFireAuth,mail,password){
    ngFireAuth.signInWithEmailAndPassword(mail,password)
    localStorage.setItem('userStatut','true')
  }

  logOut(ngFireAuth,afstore){
    this.alertControl.presentAlertFunct("voulez-vous vraiment vous deconnecte? ","action irreversible",()=>this.GoOut(ngFireAuth,afstore))
  }
  GoOut(ngFireAuth,afstore){
    ngFireAuth.signOut()
    localStorage.setItem('userStatut','false')
    var id=localStorage.getItem("userId")
    afstore.collection("userStatut").doc(id).update({
      uid: id,
      date: new Date(),
      statut: "off line",
    })
    console.log(this.contact.TabDataConversation);
    
    this.contact.emptyDataConversation()
    console.log(this.contact.TabDataConversation);
    localStorage.setItem('userId','')
    localStorage.setItem('tchatId','')
    this.router.navigate(['/connexion'])
  }

  EmailVerifier(userAuthen,router){
    localStorage.setItem('userId',userAuthen.user.uid)
    localStorage.setItem('userStatut',"true")
    console.log(userAuthen);
    if(userAuthen.user.emailVerified){
      router.navigate(['/tabs']);
    }else{
      this.alertControl.presentAlert('Allez verifier vos mails',"votre email n'as pas ete activer")
    }
  }

  LogIfConnect(router){
    if(localStorage.getItem("userStatut")=="true"){
      router.navigate(['/tabs']);
    }
  }

  setUser(user:user){
    user=this.user
  }
  GetUserName(){
    return this.user.username
  }
  getUID(){
    return this.user.uid
  }
}
