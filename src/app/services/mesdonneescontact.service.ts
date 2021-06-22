import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MesdonneescontactService {
  nom=''
  messages=[]
  TabUserGroup=[]
  TabDataConversation=[]
  tabDisc=[]
  nbrParticipants=0
  TabNomMenbre=[]
  Menbres=''
  dataChange=false
  tab=[]
  UserCourantGroup={
    nom: '',
    email: '',
    id: '',
    image: null,
  }
  isSelect=false
  subject=new Subject<any[]>();

  constructor(public afstore: AngularFirestore,public afsstorage:AngularFireStorage) { }

  public findUserById(id){
    const user=this.tabDisc.find((userInfo)=>{
      return userInfo.id==id;
    });
    return user;
  }
  public findDiscById(id){
    const user=this.TabDataConversation.find((userInfo)=>{
      return userInfo.id==id;
    });
    return user;
  }

  public setContactGroupe(datas){
    this.TabUserGroup.push(datas)
  }

  public setContact(datas){
    this.tabDisc.push(datas)
  }

  public setUserCourantGroup(datas){
    this.UserCourantGroup=datas
  }

  public setNbrMenbre(datas){
    this.nbrParticipants=datas
  }

  public setNomMenbre(datas){
    var MenbreGroup='Vous'
    this.TabNomMenbre.push(datas)
    this.TabNomMenbre.forEach((name)=>{
      MenbreGroup=MenbreGroup+", "+name;
    })
    this.Menbres=MenbreGroup
  }

  public setDataConversation(datas){
    this.isSelect=false;
    var i=0
    this.TabDataConversation.forEach((conversation)=>{
      if(conversation.id==datas.id){
        this.isSelect=true
        this.TabDataConversation.splice(i,1)
      } 
      i++;

    })
    this.TabDataConversation.push(datas)
    // this.observeTchat()
    return  this.TabDataConversation
  }

  // observeTchat(){
  //   this.subject.next(this.TabDataConversation.slice())
  // }

  getDiscu(){
    return  this.TabDataConversation
  }

  getAllContact(afstore,afsstorage){
    afstore.collection('user/').get().subscribe(images => {
      this.tab=[]
      var TabUserDiscuss=[]
      images.docs.forEach((doc)=>{
        TabUserDiscuss.push(doc.data());
      })
      console.log("yep");
      
      TabUserDiscuss.map((element)=>{
        const refImage = afsstorage.ref(element.image)
        refImage.getDownloadURL().subscribe(imgUrl => {
          if(element.id!=localStorage.getItem("userId")){
              const contact={
                nom: element.username,
                email: element.email,
                id: element.id,
                image:imgUrl,
                description: "tchat"
              }
            this.nbrParticipants++;
            console.log(this.tab);
            
            this.tab.push(contact)
            return this.tab
          }
        });
      })
    });
  }

  getDisc(afstore,id) {
    afstore.collection(`Conversation/`).doc(id).collection(`descriptionTchat`,ref =>ref.orderBy('date'))
     .snapshotChanges()
     .subscribe(actions => {
       actions.forEach(action => {
             const groupe={
               nom:  action.payload.doc.get('nom'),
               lastMessage: action.payload.doc.get('lastMessage'),
               date:action.payload.doc.get('date'),
               heure: action.payload.doc.get('heure'),
               id: action.payload.doc.get('id'),
               image: action.payload.doc.get('image'),
             }
             this.setDataConversation(groupe);
       });
      //  localStorage.setItem("tchat",tab)
     });
  }

  getGroup(afstore,id) {
    afstore.collection(`TchatGroup/`).doc(id).collection(`descriptionGroup`,ref =>ref.orderBy('date'))
     .snapshotChanges()
     .subscribe(actions => {
       actions.forEach(action => {
           const refImage = this.afsstorage.ref(action.payload.doc.get('image'))
           refImage.getDownloadURL().subscribe(imgUrl=>{
             const groupe={
               admin:action.payload.doc.get('admin'),
               nom:action.payload.doc.get('nom'),
               Memnbre: action.payload.doc.get('Menbre'),
               lastMessage: action.payload.doc.get('lastMessage'),
               date:action.payload.doc.get('date'),
               heure: action.payload.doc.get('heure'),
               id: action.payload.doc.get('id'),
               image: imgUrl,
               description: "groupe"
             }
             this.setDataConversation(groupe)
           })
       });
     });
     
   }

  public emptyDataConversation(){
    this.TabDataConversation=[]
  }

  getLastMessageDisc(id) {
    this.TabDataConversation.forEach((element)=>{
      this.afstore.collection(`Conversation/`).doc(id).collection(`descriptionTchat`,ref =>ref.orderBy('date'))
     .snapshotChanges()
     .subscribe(actions => {
       actions.forEach(action => {
             const groupe={
               lastMessage: action.payload.doc.get('lastMessage'),
               date:action.payload.doc.get('date'),
               id: action.payload.doc.get('id'),
             }
             console.log( action.payload.doc.get('lastMessage'));
             
            // this.setDataConversation(groupe);
       });
     });
  })}
    
  getCurrentUser(id){
    this.afstore.collection('user/').doc(id).get().subscribe(profil=>{
      var Profil=profil.data();
      return Profil
     });
  }
  
}
