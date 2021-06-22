import { TranslateServiceService } from './service/translate-service.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( public langue: TranslateServiceService) {
    langue.setInitialAppLanguage()
  }
}
