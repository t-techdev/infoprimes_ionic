import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasscodePage } from './passcode.page';

describe('PasscodePage', () => {
  let component: PasscodePage;
  let fixture: ComponentFixture<PasscodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasscodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasscodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
