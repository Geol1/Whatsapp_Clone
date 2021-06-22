import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorThemeService {
  colorThemes: Array<any> = [
    {
    name: "Red",
    color: "#ce4e57"
    }, {
    name: "Green",
    color: "#00643C"
    }, {
    name: "Blue",
    color: "#3490eb"
    }, {
    name: "Dark",
    color: "#222428"
    }];
  constructor() { }
  setTheme() {
    var color= localStorage.getItem("theme")
    if(color=="#222428"){
      document.documentElement.style.setProperty("--ion-color-light", "#222428");
      document.documentElement.style.setProperty("--ion-color-dark", "#f4f5f8");
      document.documentElement.style.setProperty("--ion-color-primary", "#41b05d");
      document.documentElement.style.setProperty("--ion-color-oldrichColor", color);
      document.documentElement.style.setProperty("--ion-color-medium", "#f4f5f8");
    }else if(color=="#3490eb"){
      document.documentElement.style.setProperty("--ion-color-light", "#3490eb");
      document.documentElement.style.setProperty("--ion-color-dark", "#222428");
      document.documentElement.style.setProperty("--ion-color-primary", "#41b05d");
      document.documentElement.style.setProperty("--ion-color-oldrichColor", color);
    }else if(color=="#ce4e57"){
      document.documentElement.style.setProperty("--ion-color-light", "#ce4e57");
      document.documentElement.style.setProperty("--ion-color-dark", "#222428");
      document.documentElement.style.setProperty("--ion-color-primary", "#3490eb");
      document.documentElement.style.setProperty("--ion-color-oldrichColor", color);
    }else if(color=="#00643C"){
      document.documentElement.style.setProperty("--ion-color-light", "#f4f5f8");
      document.documentElement.style.setProperty("--ion-color-dark", "#222428");
      document.documentElement.style.setProperty("--ion-color-primary", "#41b05d");
      document.documentElement.style.setProperty("--ion-color-oldrichColor", color);
    }
    
    }
}
