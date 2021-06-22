import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profildiscussion',
  templateUrl: './profildiscussion.component.html',
  styleUrls: ['./profildiscussion.component.scss'],
})
export class ProfildiscussionComponent implements OnInit {

  @Input() nom :String;
  @Input() heure :String;
  @Input() description :String;
  @Input() image :String;


  constructor() { }

  ngOnInit() {}

}
