import { NewgroupComponent } from './../newgroup/newgroup.component';
import { AlertcontrolService } from './../services/alertcontrol.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MesdonneescontactService } from '../services/mesdonneescontact.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-newgroupeinfos',
  templateUrl: './newgroupeinfos.component.html',
  styleUrls: ['./newgroupeinfos.component.scss'],
})
export class NewgroupeinfosComponent implements OnInit {
  imageURL:any;
  imageValide=false
	IdCreation: any;
  infosGroup: any;
  Image: any;
  nbrContact=0;
  userId=localStorage.getItem('userId')
  TabUserDiscuss=[]
  tabElementSelectionner=this.contact.TabUserGroup;
  Menbres=this.contact.Menbres

  public userForm:FormGroup
  validationUserMessage={
    nom:[ {type:"required", message:"Veuillez entrer le nom du groupe."},
            {type:"minLength", message:"Doit contenir au moins 6 characteres."}
  ]
  }

  constructor(formBuilder: FormBuilder,public contact:MesdonneescontactService,public activateRoute:ActivatedRoute,
    public route:Router,public modalCtrl: ModalController,
    public afstore: AngularFirestore,public afsstorage:AngularFireStorage,
    public alertContr:AlertcontrolService) {
      this.userForm= formBuilder.group({
        nom: new FormControl('', Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(20)])),
      });

   }

    
  private addNewGroup(){
    
    this.infosGroup={
      nom: this.userForm.value.nom,
      image: this.imageURL,
      id:  `${this.userForm.value.nom}_${new Date().getMinutes()}`
   }
   localStorage.setItem("tchatId",this.infosGroup.id)
    const fileStoragePath = `ImageGroupProfil/${this.Image.name}_UID:${this.infosGroup.id}`;
    const imageRef= this.afsstorage.ref(fileStoragePath);
    imageRef.put(this.Image).then((resp)=>{
      this.afstore.collection(`TchatGroup/`).doc(this.infosGroup.id).collection(`descriptionGroup`).doc("informations").set({
        admin:this.userId,
        nom: this.infosGroup.nom,
        Menbre: this.Menbres,
        lastMessage: '',
        date: new Date(),
        heure: `${new Date().getHours()}:${new Date().getMinutes()}`,
        id: this.infosGroup.id,
        image: fileStoragePath
      })
      
      this.afstore.collection(`TchatGroup/`).doc(this.infosGroup.id).collection(`MenbreGroup`).add({
        id: this.userId,
        permission: "admin"
      })
      this.tabElementSelectionner.forEach((action)=>{
        var permission="lambda"
          this.afstore.collection(`TchatGroup/`).doc(this.infosGroup.id).collection(`MenbreGroup`).add({
          id: action.id,
          nom: action.nom,
          permission: permission
        }) 
      })
      this.afstore.collection(`TchatGroup/`).doc(`IdGroup`).collection(`IdGroup`).add({
        id: this.infosGroup.id
      })
    })
   const link=["groupeconversation", this.infosGroup.id];
    this.route.navigate(link);
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
      this.alertContr.ToastServiceWar('error de lecture du fichier')
    };
      if(folder.type.split('/')[0] !=='image' ){
        this.alertContr.ToastServiceWar('veuiller entrer une image');
      }else{ 
        this.imageValide=true
      }
    return this.Image=folder;
  }

 private fermer(){
  this.alertContr.openModal(NewgroupComponent)
  }

  ngOnInit() { }

}
