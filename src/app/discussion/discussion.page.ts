import { NewDiscussionComponent } from './../new-discussion/new-discussion.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MesdonneescontactService } from './../services/mesdonneescontact.service';
import { Component ,OnInit } from '@angular/core';
import { AlertcontrolService } from '../services/alertcontrol.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ColorThemeService } from '../services/color-theme.service';
import { Subject, Subscription } from 'rxjs';



@Component({
  selector: 'app-discussion',
  templateUrl: 'discussion.page.html',
  styleUrls: ['discussion.page.scss']
})
export class DiscussionPage implements OnInit{

  tabDisc=this.contact.TabDataConversation;
  message
  userId=localStorage.getItem("userId")
  
  submit: Subscription
  constructor(themeColor: ColorThemeService,public afstore: AngularFirestore,public afsstorage:AngularFireStorage,
    public contact:MesdonneescontactService,
    public route:Router,public activateRoute:ActivatedRoute,
    public alertCont:AlertcontrolService) {
     
      themeColor.setTheme();
      
      
  }
  ngOnInit() { 
    this.groupToString()
    this.discToString();
    
    // this.submit=this.contact.subject.subscribe(res=>{
      // this.contact.emptyDataConversation()})
      // this.contact.observeTchat()

  }
  //------------------------------------------------------------------------------------------
  async NewDiscuss(){
    this.alertCont.openModal(NewDiscussionComponent)
  }

  public vueConversation(datas){
    if(datas.description=="groupe"){
    const link=["groupeconversation", datas.id];
    this.route.navigate(link);
     }else{
      const link=["maconversation", datas.id];
      this.route.navigate(link);
     }
  }
  
  discToString(){
    this.afstore.collection(`Conversation/`).doc(`tchatId`).collection(`tchatId`)
    .snapshotChanges()
    .subscribe(actions => {
      this.tabDisc=[]
      actions.forEach(action => {
        var id=action.payload.doc.get('id')
          if(this.userId.localeCompare(id.substring(0,28))==0 || id.substring(28,56).localeCompare(this.userId)==0){
            this.contact.getDisc(this.afstore,id);
          }
        })  
        this.tabDisc=this.contact.TabDataConversation;
      });
  }

  groupToString(){
    this.afstore.collection(`TchatGroup/`).doc(`IdGroup`).collection(`IdGroup`)
    .snapshotChanges()
    .subscribe(actions => {
      actions.forEach(action => {
        this.contact.getGroup(this.afstore,action.payload.doc.get('id'));
        })
      });
  }
  
}