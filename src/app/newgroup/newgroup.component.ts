import { Component, OnInit } from '@angular/core';

import { AlertcontrolService } from './../services/alertcontrol.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { MesdonneescontactService } from '../services/mesdonneescontact.service';


@Component({
  selector: 'app-newgroup',
  templateUrl: './newgroup.component.html',
  styleUrls: ['./newgroup.component.scss'],
})
export class NewgroupComponent implements OnInit {
  
  nbrParticipants=this.contact.nbrParticipants
  TabUserDiscuss=[];
  userSelect=[]
  TabNomMenbre=this.contact.TabNomMenbre
  tabElementSelectionner=this.contact.TabUserGroup
  tabDisc=[]
  isSelect=false;
  constructor(public contact:MesdonneescontactService,
    public route:Router,public modalCtrl: ModalController,
    public afstore: AngularFirestore,public afsstorage:AngularFireStorage,
    public alertContr:AlertcontrolService,public actionSheetController: ActionSheetController) {
    
    this.afstore.collection('user/').get().subscribe(images => {
      this.tabDisc=[]
      images.docs.forEach((doc)=>{
        this.TabUserDiscuss.push(doc.data());
      })
      
      this.TabUserDiscuss.map((element)=>{
        const refImage = this.afsstorage.ref(element.image)
        refImage.getDownloadURL().subscribe(imgUrl => {
          if(element.id!=localStorage.getItem("userId")){
              const contact={
                nom: element.username,
                email: element.email,
                id: element.id,
                image:imgUrl,
              }
            this.tabDisc.push(contact)
          }
        });
      })
    });
   }
  select(data){
    var i=0;
    this.isSelect=false;
    this.tabElementSelectionner.forEach((groupe)=>{
      if(groupe.id==data.id){
        console.log("non");
        this.nbrParticipants--;
        this.contact.setNbrMenbre(this.nbrParticipants)
        this.TabNomMenbre.splice(i,1)
        this.tabElementSelectionner.splice(i,1)
        this.isSelect=true
      } 
      i++;
    })
    if(this.isSelect==false){
      this.contact.setContactGroupe(data)
      this.contact.setNomMenbre(data.nom)
      this.nbrParticipants++;
      this.contact.setNbrMenbre(this.nbrParticipants)
    }
  }

   AddNewGroup(){
   this.modalCtrl.dismiss()
    const link=["groupe", this.tabElementSelectionner];
    this.route.navigate(link);
  }

  fermer(){
    this.modalCtrl.dismiss()
    this.route.navigate(["tabs"])
  }
  ngOnInit() { }

}
