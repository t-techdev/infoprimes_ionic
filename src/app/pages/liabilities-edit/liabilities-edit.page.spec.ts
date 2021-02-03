import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiabilitiesEditPage } from './liabilities-edit.page';

describe('LiabilitiesEditPage', () => {
  let component: LiabilitiesEditPage;
  let fixture: ComponentFixture<LiabilitiesEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiabilitiesEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiabilitiesEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
