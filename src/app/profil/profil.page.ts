import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  profilForm: FormGroup
  userId=localStorage.getItem("userId")
  Profil:any;
  nom=''
  email=''
  ImageProfile:any;
  constructor( public afstore: AngularFirestore,public afsstorage:AngularFireStorage,public formBuilder: FormBuilder) { 
    this.profilForm= formBuilder.group({
      nom: ['', Validators.required],
      email: ['', Validators.required]
    });


    this.afstore.collection('user/').doc(this.userId).get().subscribe(profil=>{
     this.Profil=profil.data();
      this.nom=this.Profil.username
      this.email=this.Profil.email
      this.afsstorage.ref(this.Profil.image).getDownloadURL().subscribe(image=>{
        this.ImageProfile=image
      })
    });
  }

  ngOnInit() {
  }

}
