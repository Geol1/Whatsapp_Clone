import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-profil-discuss',
  templateUrl: './new-profil-discuss.component.html',
  styleUrls: ['./new-profil-discuss.component.scss'],
})
export class NewProfilDiscussComponent implements OnInit {

  @Input() nom :String;
  @Input() image :String;

  constructor() { }

  ngOnInit() {}

}
