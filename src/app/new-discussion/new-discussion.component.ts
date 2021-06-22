import { NewgroupComponent } from './../newgroup/newgroup.component';
import { AlertcontrolService } from './../services/alertcontrol.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MesdonneescontactService } from '../services/mesdonneescontact.service';

@Component({
  selector: 'app-new-discussion',
  templateUrl: './new-discussion.component.html',
  styleUrls: ['./new-discussion.component.scss'],
})
export class NewDiscussionComponent implements OnInit {

  nbrContact=0;
  TabUserDiscuss=[]
  tabDisc=this.contact.tab
  userId=localStorage.getItem("userId")
  constructor(public contact:MesdonneescontactService,
    public route:Router,public modalCtrl: ModalController,
    public afstore: AngularFirestore,public afsstorage:AngularFireStorage,
    public alertContr:AlertcontrolService) {
    
    // this.contact.getAllContact(this.afstore,this.afsstorage)
    afstore.collection('user/').get().subscribe(images => {
      this.tabDisc=[]
      var TabUserDiscuss=[]
      images.docs.forEach((doc)=>{
        TabUserDiscuss.push(doc.data());
      })
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
            this.nbrContact++;
            this.tabDisc.push(contact)
            return this.tabDisc
          }
        });
      })
    });
   }


  private addNewDiscuss(datas){
    this.fermer()
    this.afstore.collection(`Conversation/`).doc(`tchatId`).collection(`tchatId`)
    .get()
    .subscribe(actions => {
      var trouve=false
      var tab=[]
      actions.docs.forEach(action => {
        tab.push(action.data())
      })
      tab.map(element=>{
        if((this.userId+""+datas.id).localeCompare(element.id)==0 || 
          ((element.id)).localeCompare(datas.id+""+this.userId)==0){
            trouve = true
          }
      })
          
        if(trouve==false){
          this.afstore.collection(`Conversation/`).doc(`tchatId`).collection(`tchatId`).add({
            id: localStorage.getItem("tchatId")
          })
        }
        
      });
    localStorage.setItem("monContactId",datas.id)
    this.contact.setDataConversation(datas)
    const link=["maconversation", datas.id];
    this.route.navigate(link);

  }

  private newDiscuss(){
    this.alertContr.openModal(NewgroupComponent)
    this.fermer()
  }

 private fermer(){
    this.alertContr.onDismissModalService()
  }

  ngOnInit() {

  }

}
