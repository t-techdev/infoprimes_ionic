import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TouchidPage } from './touchid.page';

describe('TouchidPage', () => {
  let component: TouchidPage;
  let fixture: ComponentFixture<TouchidPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouchidPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouchidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
