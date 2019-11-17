import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IbuInfoPage } from './ibu-info.page';

describe('IbuInfoPage', () => {
  let component: IbuInfoPage;
  let fixture: ComponentFixture<IbuInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IbuInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IbuInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
