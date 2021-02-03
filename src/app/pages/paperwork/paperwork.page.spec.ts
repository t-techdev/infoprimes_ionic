import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperworkPage } from './paperwork.page';

describe('PaperworkPage', () => {
  let component: PaperworkPage;
  let fixture: ComponentFixture<PaperworkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperworkPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
