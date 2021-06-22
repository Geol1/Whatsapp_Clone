import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertcontrolService } from '../services/alertcontrol.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {

  public userForm:FormGroup
  validationUserMessage={
    email:[ {type:"required", message:"Veuillez entrer votre adresse mail."},
            {type:"email", message:"Cet adresse mail est incorrecte."}
  ]
  }
  constructor(formBuilder: FormBuilder, public alertControl:AlertcontrolService,public modalCtrl: ModalController  ,public router:Router,public ngFireAuth: AngularFireAuth) {
    this.userForm= formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required,Validators.email])),
    });
  }

  async updatePass(){
      const user = await this.ngFireAuth.sendPasswordResetEmail(this.userForm.value.email);
  
      if (this.userForm.value.email) {
        this.alertControl.ToastServiceSucess('Veuiller consulter vos mails et suivre les instructions');
      }
      this.Annuler()
    
  }
  Annuler(){
    this.modalCtrl.dismiss()
  }


  ngOnInit() {}

}
