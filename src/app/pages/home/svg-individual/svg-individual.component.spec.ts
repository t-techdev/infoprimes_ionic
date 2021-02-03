import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgIndividualComponent } from './svg-individual.component';

describe('SvgIndividualComponent', () => {
  let component: SvgIndividualComponent;
  let fixture: ComponentFixture<SvgIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
