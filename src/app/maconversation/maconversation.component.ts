import { Component, OnInit, ViewChild } from '@angular/core';
import { MesdonneescontactService } from './../services/mesdonneescontact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';

import { FormBuilder, FormGroup,} from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { PhotoService } from '../services/photo.service';
import { IonInfiniteScroll } from '@ionic/angular';



@Component({
  selector: 'app-maconversation',
  templateUrl: './maconversation.component.html',
  styleUrls: ['./maconversation.component.scss'],
})
export class MaconversationComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public Moncontact =JSON.parse(localStorage.getItem("Discussion"));
  public messageForm: FormGroup;
  StatutUserCurentConversation={}
  MesDiscussion=[]
  
  idConvExist=false
  IdConversation=localStorage.getItem('monContactId')+""+localStorage.getItem('userId')
  connecte=false
  public messages=[];
  public userId=localStorage.getItem('userId')
  

  constructor(public activateRoute:ActivatedRoute,
    public afstore: AngularFirestore,public afsstorage:AngularFireStorage,public route: Router,
    public contact:MesdonneescontactService,public connexionService:AuthentificationService,
    public formBuilder: FormBuilder,public ngFireAuth: AngularFireAuth,public photoService: PhotoService) { 
      this.messageForm = this.formBuilder.group({
        message: [''],
      })
      connexionService.etatConnexion(ngFireAuth)
      if(localStorage.getItem('userStatut')=='true'){
        this.connecte=true
      }
      
      this.StatutUser()
    }
  
    loadData(event) {
      setTimeout(() => {
        console.log('Done');
        event.target.complete();
        if (this.messages.length == 100) {
          event.target.disabled = true;
        }
      }, 500);
    }
    toggleInfiniteScroll() {
      this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }


    addEmoji(event){
      var sms= this.messageForm.value.message+event.data
      this.messageForm.setValue({message: sms})
    }
    
  ngOnInit() {
    this.activateRoute.params.subscribe((params)=>{
      this.Moncontact=this.contact.findDiscById(params.id)
      console.log(params.id);
    })
    if (this.Moncontact.description!="tchat"){
      if((this.Moncontact.id).substring(0,28)==this.userId){
        this.Moncontact.id= (this.Moncontact.id).substring(28,56)
      }else this.Moncontact.id= (this.Moncontact.id).substring(0,28)
    }
    this.existe(this.Moncontact.id+""+this.userId)
    
  }

  addPhotoToGallery() {
    this.photoService.addImageConversation(this.afsstorage,this.afstore,"tchat")
  }

  StatutUser(){
    var TabStatut=[]
    this.afstore.collection('userStatut/').snapshotChanges().subscribe( (statut)=>{
        statut.forEach((doc)=>{
          const contact={
            statut: doc.payload.doc.get("statut"),
            date: new Date(doc.payload.doc.get("date")*100),
          }
          this.StatutUserCurentConversation=contact;
          localStorage.setItem("userStatutConversation",contact.statut)
      })
    });
  }

  sendMessage() {
    var sendSms=this.messageForm.value.message
    const desrciptionMessage  ={
      uidSend:this.userId,
      contentMessage: sendSms,
      date: new Date(),
      heure: `${new Date().getHours()}:${new Date().getMinutes()}`,
      assets: "",
      images: File,
      imageValide: false
    };
    this.messages.push(desrciptionMessage);
    this.messageForm.reset();

      this.afstore.collection(`Conversation/`).doc(this.IdConversation).collection(`message`).add({
        uidSend:this.userId,
        contentMessage: sendSms,
        date: new Date(),
        heure: `${new Date().getHours()}:${new Date().getMinutes()}`,
        assets: '',
        imageValide: false
      })
      try {
        this.afstore.collection(`Conversation/`).doc(this.IdConversation).collection(`descriptionTchat`).doc("informations").update({
          lastMessage: sendSms,
          heure: `${new Date().getHours()}:${new Date().getMinutes()}`,
        })
      } catch (error) {
        console.log(error);
      }
      
  }
  existe(id) {
    this.afstore.collection(`Conversation/`).doc(`tchatId`).collection(`tchatId`)
    .snapshotChanges(['added'])
    .subscribe(actions => {
      var trouve=false
      actions.forEach(action => {
          if((id).localeCompare(action.payload.doc.get('id'))==0)  trouve = true 
        })
        if(trouve==false) this.IdConversation=this.userId+""+this.Moncontact.id;
        else{
          this.IdConversation=this.Moncontact.id+""+this.userId;
          var nom= `${new Date().getMinutes()}`
          const fileStoragePath = `ImageSend/${nom}_UID:${this.userId}`;
          const imageRef= this.afsstorage.ref(fileStoragePath);
          console.log(this.Moncontact.image);
    
          imageRef.put(this.Moncontact.image).then((resp)=>{
            this.afstore.collection(`Conversation/`).doc(this.Moncontact.id+""+this.userId).collection(`descriptionTchat`).doc("informations").set({
              nom:this.Moncontact.nom,
              lastMessage: '',
              date: new Date(),
              heure: `${new Date().getHours()}:${new Date().getMinutes()}`,
              id:this.IdConversation,
              image: this.Moncontact.image,
              })
            })
        } 
        this.getMessage(this.IdConversation)
    });
    localStorage.setItem("tchatId",this.IdConversation)
  }

  getMessage(id) {
    localStorage.setItem("tchatId",id)
    this.afstore.doc(`Conversation/${id}`).collection(`message/`,ref =>ref.orderBy('date'))
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
    });
  }

  
}
