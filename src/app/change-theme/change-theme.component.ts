import { Component, OnInit } from '@angular/core';
import { AlertcontrolService } from '../services/alertcontrol.service';
import { ColorThemeService } from '../services/color-theme.service';

@Component({
  selector: 'app-change-theme',
  templateUrl: './change-theme.component.html',
  styleUrls: ['./change-theme.component.scss'],
})
export class ChangeThemeComponent implements OnInit {
  colorThemes: Array<any> 
   
  setTheme(color) {
    this.themeColor.setTheme();
    localStorage.setItem("theme",color)
  }
 
  constructor(public themeColor: ColorThemeService,public alertCont:AlertcontrolService) {
    this.colorThemes=themeColor.colorThemes

   }

   fermer(){
    this.alertCont.onDismissModalService()
   }
 
  ngOnInit() { }

}
