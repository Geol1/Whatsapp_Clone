import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewProfilDiscussComponent } from './new-profil-discuss.component';

describe('NewProfilDiscussComponent', () => {
  let component: NewProfilDiscussComponent;
  let fixture: ComponentFixture<NewProfilDiscussComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProfilDiscussComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewProfilDiscussComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
