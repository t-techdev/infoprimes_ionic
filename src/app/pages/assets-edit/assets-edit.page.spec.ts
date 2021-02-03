import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsEditPage } from './assets-edit.page';

describe('AssetsEditPage', () => {
  let component: AssetsEditPage;
  let fixture: ComponentFixture<AssetsEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
