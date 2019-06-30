import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdPageComponent } from './user-id-page.component';

describe('UserIdPageComponent', () => {
  let component: UserIdPageComponent;
  let fixture: ComponentFixture<UserIdPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserIdPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
