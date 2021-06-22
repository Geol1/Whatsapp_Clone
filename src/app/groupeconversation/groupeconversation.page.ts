import { Component, OnInit } from '@angular/core';

import { MesdonneescontactService } from './../services/mesdonneescontact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { FormBuilder,FormGroup} from '@angular/forms';
import { PhotoService } from '../services/photo.service';


@Component({
  selector: 'app-groupeconversation',
  templateUrl: './groupeconversation.page.html',
  styleUrls: ['./groupeconversation.page.scss'],
})

export class GroupeconversationPage implements OnInit {

  public Profil={
    nom: '',
    image: File
  }
   messageForm: FormGroup;
   UserCourant
   groupeInfos
  Menbres=this.contact.Menbres
  MesDiscussion=[]
  sendSms:any;
  idConvExist=false
  IdTchat=localStorage.getItem('tchatId')
  TabStatut=[]
  connecte=false
   messages=[];
  userId=localStorage.getItem('userId')
  

  constructor(public activateRoute:ActivatedRoute,
    public afstore: AngularFirestore,public afsstorage:AngularFireStorage,public route: Router,
    public contact:MesdonneescontactService,public afsstore11:AngularFirestore,
    public formBuilder: FormBuilder,public photoService: PhotoService) { 
      this.messageForm = this.formBuilder.group({
        message: [''],
      })
      this.UserCourant= this.contact.getCurrentUser(this.userId)
      this.getGroupeInfo();
      console.log(this.UserCourant);
      
    }

  ngOnInit() {
    this.activateRoute.params.subscribe((param)=>{
      // this.Profil=this.contact.findDiscById(param.id)
      this.IdTchat= param.id
      
      // localStorage.setItem("groupId",param.id)
    })
    
    this.getMessage(this.IdTchat);
  }
  addEmoji(event){
    var sms= this.messageForm.value.message+event.data
    this.messageForm.setValue({message: sms})
  }

  fermer(){
    this.route.navigate(["tabs"])
  }
  addPhotoToGallery() {
    this.photoService.addImageConversation(this.afsstorage,this.afstore,"groupe")
  }

  sendMessage() {
    this.sendSms=this.messageForm.value.message;
    const infosMessage  ={
      uidSend:this.userId,
      // nomSend: this.UserCourant.nom,
      contentMessage: this.sendSms,
      date: new Date(),
      heure: `${new Date().getHours()}:${new Date().getMinutes()}`,
      assets: "",
      image: File,
      imageValide: false
    };
    this.messages.push(infosMessage);
    this.messageForm.reset();
    this.afstore.collection(`TchatGroup/`).doc(this.IdTchat).collection(`Messages`).add({
        uidSend:this.userId,
        // nomSend: this.UserCourant.nom,
        contentMessage: this.sendSms,
        date: new Date(),
        heure: `${new Date().getHours()}:${new Date().getMinutes()}`,
        assets: '',
        imageValide: false
      })
      this.afstore.collection(`TchatGroup/`).doc(this.IdTchat).collection(`descriptionGroup`).doc("informations").update({
        lastMessage: this.sendSms,
        heure: `${new Date().getHours()}:${new Date().getMinutes()}`,
      })
  }
 
  getMessage(id) {
   const data= this.afsstore11.collection(`TchatGroup/`).doc(this.IdTchat).collection(`Messages`,ref =>ref.orderBy('date'))
    .snapshotChanges(['added'])
    .subscribe(actions => {
      this.messages = [];
      actions.forEach(action => {
        if(action.payload.doc.get('assets')!=""){
          const refImage = this.afsstorage.ref(action.payload.doc.get('assets'))
          refImage.getDownloadURL().subscribe(imgUrl=>{
            this.messages.push({
              uidSend:action.payload.doc.get('uidSend'),
              nomSend: action.payload.doc.get('nomSend'),
              contentMessage: action.payload.doc.get('contentMessage'),
              date: action.payload.doc.get('date'),
              heure: action.payload.doc.get('heure'),
              assets: action.payload.doc.get('assets'),
              image:imgUrl,
              imageValide: true
            })
          })
        }else{
            this.messages.push({
              uidSend:action.payload.doc.get('uidSend'),
              contentMessage: action.payload.doc.get('contentMessage'),
              date: action.payload.doc.get('date'),
              heure: action.payload.doc.get('heure'),
              assets: action.payload.doc.get('assets'),
              image:'',
              imageValide: false
            })
        }
      });
      
      this.getGroupeInfo();
    });
    
  }
  getGroupeInfo() {
    var TabUserDiscuss=[];
   const data =this.afstore.collection(`TchatGroup`).doc(this.IdTchat).collection(`descriptionGroup`).get().subscribe(images => {
      images.docs.forEach((doc)=>{
        TabUserDiscuss.push(doc.data());
      });
      TabUserDiscuss.map((element)=>{
        const refImage = this.afsstorage.ref(element.image)
        refImage.getDownloadURL().subscribe(imgUrl => {
              const groupe={
                admin:element.id,
                nom: element.nom,
                Menbre: element.Menbres,
                lastMessage: element.lastMessage,
                date: element.date,
                heure: element.heure,
                id: element.id,
                image: imgUrl,
                description:"groupe"
              }
              
              this.groupeInfos =groupe;
              this.contact.setDataConversation(groupe);
              this.Profil=groupe
              console.log(this.Profil);
              
        });
      });
    });
    
  }

}
