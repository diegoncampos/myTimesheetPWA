import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewTimePage } from './new-time.page';

describe('NewTimePage', () => {
  let component: NewTimePage;
  let fixture: ComponentFixture<NewTimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTimePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewTimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
