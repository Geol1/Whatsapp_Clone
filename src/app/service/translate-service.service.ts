import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const key ="langue"

@Injectable({
  providedIn: 'root'
})
export class TranslateServiceService {

  selected=''

  constructor(public translate: TranslateService) { }

  setInitialAppLanguage(){
    var language= this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
    if(localStorage.getItem(key)!=null){
      this.setLanguage(localStorage.getItem(key));
      this.selected=localStorage.getItem(key);
    }
  }

  getLanguages(){
    return [
      {text: 'English', value: 'en' ,img :'./assets/icon/ic_group.jpg'},
      {text: 'Francais', value: 'fr' ,img :'./assets/icon/ic_newCon.jpg'}
    ];
  }
  setLanguage(ln){
    this.translate.use(ln)
    this.selected=ln;
    localStorage.setItem(key,ln)
  }
}
