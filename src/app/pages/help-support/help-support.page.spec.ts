import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelpSupportPage } from './help-support.page';

describe('HelpSupportPage', () => {
  let component: HelpSupportPage;
  let fixture: ComponentFixture<HelpSupportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpSupportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpSupportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
