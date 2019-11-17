import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerProfilePage } from './beer-profile.page';

describe('BeerProfilePage', () => {
  let component: BeerProfilePage;
  let fixture: ComponentFixture<BeerProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
